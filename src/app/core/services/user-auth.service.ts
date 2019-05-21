import { Injectable, NgZone } from '@angular/core';
import { Observable, of, from, Subscription, ReplaySubject, Subject, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { switchMap, merge, catchError } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppConfig } from 'src/app/configs/app.config';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from 'src/app/modules/users/shared/user.model';
import { UserUtilsService } from './user-utils.service';
import { MessagingService } from './Messaging.service';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  static public_user: User;
  userData: Partial<User>; // Save logged in user data
  public currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../../../../assets/user.png');
  currentUserUrl = this.photoUrl.asObservable();

  private subscruptions: Subscription[] = [];
  constructor(
    public msg: MessagingService,
    private userService: UserUtilsService,
    public afd: AngularFireDatabase,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,// NgZone service to remove outside scope warning
  ) {
    this.subscruptions.push(
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const date = new Date(Date.now());
          this.userService.getUser(user.uid).subscribe((data: User) => {
            let c_user = new User({ id: user.uid, ...data });
            c_user.isActive = true;
            c_user.lastActive = date;
            this.currentUser = c_user;
            c_user.chats = this.mapToObject(c_user.chats);
            localStorage.setItem('user', JSON.stringify(c_user));
            this.msg.getPermission(c_user)
            this.msg.monitorRefresh(c_user)
            this.msg.receiveMessages()
          }, () => {
          });
        } else {
          localStorage.setItem('user', null);
        }
      }, () => { this.subscruptions.forEach(x => x.unsubscribe()) }));
  }
  private mapToObject(map) {
    if (map instanceof Map) {
      let obj = {};
      map.forEach((x, y) => {
        obj[y] = x;
      });
      return obj;
    }
    return map;
  }

  // Sign in with email/password
  SignIn(email, password) {

    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        return true;

      }).catch((error) => false));
  }
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
  // Sign up with email/password
  SignUp(user: User, password) {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        user.uid = result.user.uid;
        if (user.photoURL === '' || user.photoURL === null) {
          user.photoURL = this.photoUrl.value;
        }
        this.SetUserData(user);
        return true;
      }).catch((error) => false));
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      })
  }

  // Returns true when user is looged in and email is verified
  isUserSignedIn() {

    let users: User = JSON.parse(localStorage.getItem('user'));
    if (!users) {
      return false;
    }
    return users.isActive;
  }

  // Sign in with Google
  GoogleAuth() {
    return from(this.AuthLogin(new firebase.auth.GoogleAuthProvider()).then(result => {
      return true;

    }).catch((err) => false));
  }
  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {

      }).catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: User) {
    this.afd.database.ref(`${AppConfig.routes.users}/${user.uid}`).set(JSON.parse(JSON.stringify(new User({ uid: user.uid, ...user }))));
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      let users: User = JSON.parse(localStorage.getItem('user'));
      users.isActive = false;
      users.lastActive = new Date(Date.now());
      this.userService.updateUser(users).finally(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      });

    }).catch(a => console.log(a));
  }

}