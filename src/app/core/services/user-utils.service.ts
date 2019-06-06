import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { AppConfig } from 'src/app/configs/app.config';
import { User } from 'src/app/modules/users/shared/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { LoggerService } from './logger.service';
import { isPlatformBrowser } from '@angular/common';
import { map, tap, catchError, filter, finalize, switchMap } from 'rxjs/operators';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { PostService } from 'src/app/core/services/Post.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from 'src/app/shared/components/review-card/review-card';

@Injectable({
  providedIn: 'root'
})
export class UserUtilsService {

  public userdata: BehaviorSubject<any>;
  private usersCollection: AngularFirestoreCollection<User>;
  private chatsContainerCollection: AngularFirestoreDocument<any>;
  CUrrentUser: User;
  sederId: string;
  constructor(private db: AngularFirestore, public afd: AngularFireDatabase,
    public router: Router,
    public ngZone: NgZone,
    private postService: PostService,
    private http: HttpClient,
    private Logger: LoggerService,
    private i18n: I18n,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.usersCollection = this.db.collection(AppConfig.routes.users);
    let x: User = JSON.parse(localStorage.getItem('user'));
    if (x != null) {
      this.userdata = new BehaviorSubject<any>(x);
    }

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
  // setMainPhoto(photoid, userID){
  //  this.db.collection(AppConfig.routes.users).doc(userID).update({photoURL:})
  // }

  checkIfUserCanVote(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
    }
    return false;
  }
  getReviews(uid) {
    return this.db.collection<Review>(`${AppConfig.routes.users}/${uid}/rate`, ref => ref.orderBy('date', 'asc')).valueChanges();
  }
  getFollowerName(uid) {
    let m = [];
    return this.db.doc(`${AppConfig.routes.users}/${uid}`).collection('follower').stateChanges().pipe(
      map(data => {
        data.forEach(xo => {
          this.getUserPromise(xo.payload.doc.data().uid).then(user => {
            m.push({ name: user.displayName, state: xo.payload.type });
          });

        });
        return m;
      })
    )
  }
  getUsers(searchString): Observable<User[]> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'value': searchString
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post<User[]>('http://mujshrf-001-site1.etempurl.com/api/values',
      {}, { headers: httpHeaders, observe: 'body' });

  }

  getUser(id: string): Observable<User | string> {
    return this.db.collection(`${AppConfig.routes.users}`).doc(id).snapshotChanges()
      .pipe(map(data => {
        if (data.payload.exists) {
          let x = new User({ uid: id, ...data.payload.data() });
          return x;
        } else {
          throw null;
        }
      }), catchError(err => {
        return of(err);
      }));

  }
  getUserPromise(id: string): Promise<User> {
    return this.db.doc(`${AppConfig.routes.users}/${id}`).ref.get().then(data => {
      if (data.exists) {
        return new User({ uid: id, ...data.data() });
      }
      return null;
    });

  }
  setMainPhoto(photoUrl) {

    let x: User = this.userdata.value;
    x.photoURL = photoUrl;
    this.updateUser(x);
    this.postService.updatePosts(this.userdata.value.uid, photoUrl);
  }
  deletePhoto(photoURL: string) {
    let xs = new Subscription();
    xs.add(this.userdata.pipe(map(user => {
      const index = user.photos.indexOf(photoURL, 0);
      if (index > -1) {
        let x = user;
        x.photos.splice(index, 1);
        this.updateUser(x).then(a => xs.unsubscribe());

      }

    }), finalize(() => xs.unsubscribe())).subscribe());


  }
  addPhoto(url: string): void {
    let x: User = this.userdata.value;
    if (x.photos === undefined || x.photos === null) {
      x.photos = [];

    }
    x.photos.push(url);
    this.updateUser(x);
  }
  getUserChanges(id: string): Observable<User> {
    this.db.collection(AppConfig.routes.users).doc(id).snapshotChanges().pipe(
      map((data) => {
        this.userdata.next(data);
      }
      ),
      tap(() => LoggerService.log('changes fetched')),
      catchError(UserUtilsService.handleError('getChanges', []))
    );

    return this.userdata.asObservable();

  }

  createUser(user: {}) {
    let us = new User({created:new Date(Date.now()), ...user });
    return this.db.doc(`${AppConfig.routes.users}/${us.uid}`).set(JSON.parse(JSON.stringify(us)));
  }

  updateUser(user: User): Promise<void> {
    const u: User = JSON.parse(localStorage.getItem('user'));
    let x: any = user;

    if (u && user.uid === u.uid) {
      localStorage.setItem('user', JSON.stringify(x));
    }
    return this.db.collection(`${AppConfig.routes.users}`).doc(`${user.uid}`).
      update(JSON.parse(JSON.stringify(Object.assign({}, x)))).then(() => {
        LoggerService.log(`updated hero w/ id=${user.uid}`);
        this.Logger.showSnackBar(this.i18n({ value: 'Saved', id: '@@saved' }));
        this.userdata.next(user);
      });
  }

  deleteUser(id: string): Promise<void> {
    const user: User = JSON.parse(localStorage.getItem('user'));
    user.disabled = true;
    return this.updateUser(user);
  }

  getProfilePicUrl(): String {
    const user: User = JSON.parse(localStorage.getItem('user'));

    return user.photoURL;
  }
  getUserName() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return user.displayName;
  }
  like(userId, recipientId) {
    return this.getLike(userId, recipientId).pipe(switchMap(data => {
      if (data.empty) {
        this.db.doc(`${AppConfig.routes.users}/${userId}`).collection('following').add({ uid: recipientId }).then(data => {
          this.db.doc(`${AppConfig.routes.users}/${recipientId}`).collection('follower').add({ uid: userId });
        });
        return of('You Like Him');

      } else {
        data.forEach(y => {
          this.db.doc(`${AppConfig.routes.users}/${userId}/following/${y.id}`).delete().then(data => {
            this.db.doc(`${AppConfig.routes.users}/${recipientId}`)
              .collection('follower', ref => ref.where('uid', '==', userId)).get().subscribe(dataa => {
                dataa.forEach(y => {
                  this.db.doc(`${AppConfig.routes.users}/${recipientId}/follower/${y.id}`).delete()
                });
              })
          });
        });
        return of('You DisLike Him');

      }
    }), tap(data => this.Logger.showSnackBar(data)));

  }
  getLike(userId, recipientId) {
    return this.db.doc(`${AppConfig.routes.users}/${userId}`).collection('following', ref => ref.where('uid', '==', recipientId)).get()
  }


}