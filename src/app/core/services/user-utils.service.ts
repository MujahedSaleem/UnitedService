import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { AppConfig } from 'src/app/configs/app.config';
import { User } from 'src/app/modules/users/shared/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoggerService } from './logger.service';
import { isPlatformBrowser } from '@angular/common';
import { map, tap, catchError, filter } from 'rxjs/operators';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Injectable({
  providedIn: 'root'
})
export class UserUtilsService {
  private usersCollection: AngularFireList<User>;
  constructor(public afd: AngularFireDatabase,
    public router: Router,
    public ngZone: NgZone,
    private Logger: LoggerService,
    private i18n: I18n,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.usersCollection = this.afd.list<User>(AppConfig.routes.users, user =>
      user.orderByKey()
    );
  }
  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  checkIfUserCanVote(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
    }
    return false;
  }

  getUsers(): Observable<User[]> {
    return this.usersCollection.snapshotChanges([])
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            return new User({ id: action.key, ...action.payload.val() as User });
          });
        }),
        tap(() => LoggerService.log(`fetched Users`)),
        catchError(UserUtilsService.handleError('getUser', []))
      );
  }

  getUser(id: string): Promise<firebase.database.DataSnapshot> {
    return this.afd.database.ref(`${AppConfig.routes.users}`).child(id).once('value', value => {
      return new User({ uid: value.key, ...value.val() });
    }
    );
  }
  getUserChanges(id: string): Observable<User> {

    return new Observable(subscriber => {
      const ref = this.afd.database.ref(`${AppConfig.routes.users}/${id}`);

      const callbackFn = ref.on('value',
        // emit a value from the Observable when firebase data changes
        (snapshot) => subscriber.next(snapshot.val()),

        // error out the Observable if there is an error
        // such as permission denied
        error => subscriber.error(error)
      );

      // The function passed to Observable.create can return a callback function
      // which will be called when the observable we created is unsubscribed from.
      // Just as we used `ref.on()` previously our callback function calls `ref.off`
      // to tell firebase that we are no longer interested in the changes
      return () => ref.off('value', callbackFn);
    });
  }

  createUser(user: User) {
    user.created = new Date(Date.now());
    return this.afd.database.ref(`${AppConfig.routes.users}/${user.uid}`).set(JSON.parse(JSON.stringify(user)));
  }

  updateUser(user: User): Promise<void> {
    const u: User = JSON.parse(localStorage.getItem('user'));
    if (user.uid === u.uid) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return this.afd.database.ref(`${AppConfig.routes.users}/${user.uid}`).
      update(JSON.parse(JSON.stringify(user))).then(() => {
        LoggerService.log(`updated hero w/ id=${user.uid}`);
        this.Logger.showSnackBar(this.i18n({ value: 'Saved', id: '@@saved' }));
      });
  }

  // deleteUser(id: string): Promise<void> {
  //   return this.afs.doc(`${AppConfig.routes.posts}/${id}`).delete();
  // }

  getProfilePicUrl() {
    // TODO 4: Return the user's profile pic URL.
  }
  getUserName() {
    const user:User = JSON.parse(localStorage.getItem('user'));
    return user.displayName;
  }
  getUserData(id: string): Promise<User> {
    return this.afd.database.ref(AppConfig.routes.users).child(id).once('value').then(data => {
      return new User({ id: data.key, ...data.val() });
    });
  }


}