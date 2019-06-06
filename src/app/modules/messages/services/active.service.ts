import { Injectable, InjectableType, Type } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase";
import { of } from "rxjs";
import { first, map, switchMap, tap } from "rxjs/operators";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { ChatModule } from "../chat.module";

@Injectable({
  providedIn: "root",
})
export class ActiveService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase, private atuhservice: UserAuthService) {
    console.log("let there be presence messenger");
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    this.updateOnAway();
  }

  public updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap((user) => {
        if (user) {
          this.db.object(`msstatus/${user.uid}`).query.ref.onDisconnect()
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
  if (this.atuhservice.currentUser.value) {
     const user = await this.atuhservice.currentUser.value;
     return this.db.object(`msstatus/${user.uid}`).update({ status, timestamp: this.timestamp });
    }
  }
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  public getPresence(uid: string) {
    return this.db.object(`msstatus/${uid}`).valueChanges().pipe(map((data) => data));
  }

  public getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
