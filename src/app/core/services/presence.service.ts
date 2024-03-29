import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase";
import { of } from "rxjs";
import { first, map, switchMap, tap } from "rxjs/operators";
import { UserAuthService } from "./user-auth.service";
import { UserUtilsService } from "./user-utils.service";

@Injectable({
  providedIn: "root",
})
export class PresenceService {

  constructor(private afAuth: AngularFireAuth, private auth: UserAuthService,
              private db: AngularFireDatabase, private userService: UserUtilsService) {
      if (auth.isUserSignedIn()) {
         console.log("let there be presence");
         this.updateOnUser().subscribe();
         this.updateOnDisconnect().subscribe();
         this.updateOnAway(); }

  }

  public updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap((user) => {
        if (user) {
          this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
            .update({
              status: "offline",
              timestamp: this.timestamp,
            });
        }
      }),
    );
  }
  public updateOnAway() {
    document.onvisibilitychange = (e) => {

      if (document.visibilityState === "hidden") {
        this.setPresence("away");
      } else {
        this.setPresence("online");
      }
    };
  }
  public updateOnUser() {
    const connection = this.db.object(".info/connected").valueChanges().pipe(
      map((connected) => connected ? "online" : "offline"),
    );

    return this.afAuth.authState.pipe(
      switchMap((user) => user ? connection : of("offline")),
      tap((status) => this.setPresence(status)),
    );
  }
  public async setPresence(status: string) {
    if (this.auth.currentUser && this.auth.currentUser.value) {
      const user = await this.auth.currentUser.value;

      return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
    }
  }
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  public getPresence(uid: string) {
    return this.db.object(`status/${uid}`).valueChanges();
  }

  public getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
