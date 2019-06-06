import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import * as firebase from "firebase";
import { BehaviorSubject, from, Observable, of, ReplaySubject, Subject, Subscription } from "rxjs";
import { catchError, finalize, merge, switchMap } from "rxjs/operators";
import { AppConfig } from "src/app/configs/app.config";
import { User } from "src/app/modules/users/shared/user.model";
import { UserUtilsService } from "./user-utils.service";
@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  public static public_user: User;
  public currentUser: BehaviorSubject<User>;
  public photoUrl = new BehaviorSubject<string>("/assets/images/user.png");
  public currentUserUrl = this.photoUrl.asObservable();
  public userSigned = new BehaviorSubject(false);
  private subscruptions: Subscription[] = [];
  constructor(
    private userService: UserUtilsService,
    public afd: AngularFireDatabase,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.currentUser = new BehaviorSubject(user);
    } else {
      this.afAuth.authState.subscribe((user) => {

        if (user && !this.currentUser && !user.isAnonymous ||
          this.currentUser === null &&
          this.currentUser.value !== undefined) {
          this.userSigned.next(true);
          const date = new Date(Date.now());
          this.userService.getUser(user.uid).subscribe((data: User) => {
            const c_user = new User({ id: user.uid, ...data });
            const fName = c_user.displayName.split(" ");
            let fiName, lasName;
            if (fName.length > 1) {
              fiName = fName[0];
              lasName = c_user.displayName.substring(fiName.length + 1, c_user.displayName.length);
              c_user.displayName = fiName;
              c_user.familyName = lasName;

            }
            c_user.isActive = true;
            c_user.lastActive = date;
            this.currentUser = new BehaviorSubject(c_user);
            localStorage.setItem("user", JSON.stringify(c_user));

          });
          this.userService.getUserPromise(user.uid).then((muser) => {
            if (muser.displayName === undefined && user.emailVerified) {
              const hisname: string[] = user.displayName.split(" ");
              this.userService.
                createUser(new User(
                  {
                    uid: user.uid,
                    familyName: user.displayName.substring(hisname[0].length + 1),
                    displayName: hisname[0], ...user,
                  }));

              const c_user = new User({ uid: user.uid, lastName: name[1], displayName: name[0], ...user });

              c_user.isActive = true;
              c_user.lastActive = date;
              this.currentUser = new BehaviorSubject(c_user);
              localStorage.setItem("user", JSON.stringify(c_user));
            }
          });
        } else {
          localStorage.setItem("user", null);
          this.userSigned.next(false);

        }
      });
    }
  }

  // Sign in with email/password
  public SignIn(email, password) {

    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserMessageToken(result.user.uid);

        return true;

      }).catch((error) => false));
  }
  public changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
  // Sign up with email/password
  public SignUp(user: User, password) {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        user.uid = result.user.uid;
        if (user.photoURL === "" || user.photoURL === null) {
          user.photoURL = this.photoUrl.value;
        }
        this.SetUserData(user);
        return true;
      }).catch((error) => error));
  }

  // Send email verfificaiton when new user sign up
  public SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(["verify-email-address"]);
      });
  }

  // Reset Forggot password
  public ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  public isUserSignedIn() {
    if (this.afAuth.auth.currentUser != null && this.afAuth.auth.currentUser.isAnonymous) {
      return true;

    } else
      if (!this.currentUser) {
        return false;
      }
    return true;
  }
  public isUserAnny() {
    if (this.afAuth.auth.currentUser != null && this.afAuth.auth.currentUser.isAnonymous) {
      return true;

    }
    return false;
  }

  // Sign in with Google
  public GoogleAuth() {
    return from(this.AuthLogin(new firebase.auth.GoogleAuthProvider()).then((result) => {
      return true;

    }).catch((err) => false));
  }
  public FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  public AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.setUserMessageToken(result.user.uid);
      }).catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  public SetUserData(user: User) {
    this.afd.database.ref(`${AppConfig.routes.users}/${user.uid}`).set(JSON.parse(JSON.stringify(new User({ uid: user.uid, ...user }))));
  }

  // Sign out
  public SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.currentUser.next(null);

      const users: User = JSON.parse(localStorage.getItem("user"));
      localStorage.removeItem("user");
      users.isActive = false;
      users.lastActive = new Date(Date.now());
      this.userService.updateUser(users).finally(() => {
        this.router.navigate(["/"]).finally(() => {

        });
      });

    }).catch((a) => console.log(a)).finally(() => {
      location.reload();

    });
  }
  public setUserMessageToken(uid) {
    // const messages = firebase.messaging();
    // messages.getToken().then(data=>{
    //   console.log(data)
    //   this.db.collection('PrivateUserData').doc(uid).set({ messagingTokens:data  });

    // })
  }
}
