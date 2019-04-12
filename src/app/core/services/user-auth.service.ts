import { Injectable, NgZone } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { switchMap, merge, catchError } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppConfig } from 'src/app/configs/app.config';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from 'src/app/modules/users/shared/user.model';
import { UserUtilsService } from './user-utils.service';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  user$: Observable<any>;
  userData: Partial<User>; // Save logged in user data
  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User | null;

  constructor(
    public afd: AngularFireDatabase,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,// NgZone service to remove outside scope warning
    private userService: UserUtilsService
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userService.getUser(user.uid).then(data => {
          let l_user = new User({ id: user.uid, ...data.val() });
          l_user.isActive = true;
          l_user.lastActive = new Date(Date.now());
          localStorage.setItem('user', JSON.stringify(l_user));
          this.userService.updateUser(l_user);
        })
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password) {

    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUser();

        return true;
      }).catch((error) => false));
  }

  // Sign up with email/password
  SignUp(user: User, password) {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        user.uid = result.user.uid;
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
        this.setUser();
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
  private setUser() {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */

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
  private setCurrentUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currentUserSnapshot = user);

  }
}