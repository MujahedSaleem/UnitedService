import { Injectable, Type, InjectableType } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, switchMap, tap, first } from 'rxjs/operators';
import { of } from 'rxjs';
import * as firebase from 'firebase';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { ChatModule } from '../chat.module';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private userService: UserUtilsService) {
    console.log('let there be presence messenger');
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    this.updateOnAway();
  }

  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          this.db.object(`msstatus/${user.uid}`).query.ref.onDisconnect()
            .update({
              status: 'offline',
              timestamp: this.timestamp
            });
        }
      })
    );
  }
  updateOnAway() {
    document.onvisibilitychange = (e) => {

      if (document.visibilityState === 'hidden') {
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    };
  }
  updateOnUser() {
    const connection = this.db.object('.info/connected').valueChanges().pipe(
      map(connected => connected ? 'online' : 'offline')
    );

    return this.afAuth.authState.pipe(
      switchMap(user => user ? connection : of('offline')),
      tap(status => this.setPresence(status))
    );
  }
  async setPresence(status: string) {
    const user = await this.userService.userdata.value;
    if (user) {
      return this.db.object(`msstatus/${user.uid}`).update({ status, timestamp: this.timestamp });
    }
  }
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  getPresence(uid: string) {
    return of('online');
    return this.db.object(`msstatus/${uid}`).valueChanges().pipe(map(data => data));
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}