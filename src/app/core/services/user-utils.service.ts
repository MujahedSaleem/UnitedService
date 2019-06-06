import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, NgZone, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { I18n } from "@ngx-translate/i18n-polyfill";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot } from "angularfire2/database";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, filter, finalize, map, switchMap, tap } from "rxjs/operators";
import { AppConfig } from "src/app/configs/app.config";
import { PostService } from "src/app/core/services/Post.service";
import { User } from "src/app/modules/users/shared/user.model";
import { Review } from "src/app/shared/components/review-card/review-card";
import { LoggerService } from "./logger.service";

@Injectable({
  providedIn: "root",
})
export class UserUtilsService {

  private static handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  public userdata: BehaviorSubject<any>;
  public CUrrentUser: User;
  public sederId: string;
  private usersCollection: AngularFirestoreCollection<User>;
  private chatsContainerCollection: AngularFirestoreDocument<any>;
  constructor(private db: AngularFirestore, public afd: AngularFireDatabase,
              public router: Router,
              public ngZone: NgZone,
              private postService: PostService,
              private http: HttpClient,
              private Logger: LoggerService,
              private i18n: I18n,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.usersCollection = this.db.collection(AppConfig.routes.users);
    const x: User = JSON.parse(localStorage.getItem("user"));
    if (x != null) {
      this.userdata = new BehaviorSubject<any>(x);
    }

  }
  // setMainPhoto(photoid, userID){
  //  this.db.collection(AppConfig.routes.users).doc(userID).update({photoURL:})
  // }

  public checkIfUserCanVote(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return Number(localStorage.getItem("votes")) < AppConfig.votesLimit;
    }
    return false;
  }
  public getReviews(uid) {
    return this.db.collection<Review>(`${AppConfig.routes.users}/${uid}/rate`, (ref) => ref.orderBy("date", "asc")).valueChanges();
  }
  public getFollowerName(uid) {
    const m = [];
    return this.db.doc(`${AppConfig.routes.users}/${uid}`).collection("follower").stateChanges().pipe(
      map((data) => {
        data.forEach((xo) => {
          this.getUserPromise(xo.payload.doc.data().uid).then((user) => {
            m.push({ name: user.displayName, state: xo.payload.type });
          });

        });
        return m;
      }),
    );
  }
  public getUsers(searchString): Observable<User[]> {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "value": searchString,
    });
    const options = {
      headers: httpHeaders,
    };
    return this.http.post<User[]>("http://mujshrf-001-site1.etempurl.com/api/values",
      {}, { headers: httpHeaders, observe: "body" });

  }

  public getUser(id: string): Observable<User | string> {
    return this.db.collection(`${AppConfig.routes.users}`).doc(id).snapshotChanges()
      .pipe(map((data) => {
        if (data.payload.exists) {
          const x = new User({ uid: id, ...data.payload.data() });
          return x;
        } else {
          throw null;
        }
      }), catchError((err) => {
        return of(err);
      }));

  }
  public getUserPromise(id: string): Promise<User> {
    return this.db.doc(`${AppConfig.routes.users}/${id}`).ref.get().then((data) => {
      if (data.exists) {
        return new User({ uid: id, ...data.data() });
      }
      return null;
    });

  }
  public setMainPhoto(photoUrl) {

    const x: User = this.userdata.value;
    x.photoURL = photoUrl;
    this.updateUser(x);
    this.postService.updatePosts(this.userdata.value.uid, photoUrl);
  }
  public deletePhoto(photoURL: string) {
    const xs = new Subscription();
    xs.add(this.userdata.pipe(map((user) => {
      const index = user.photos.indexOf(photoURL, 0);
      if (index > -1) {
        const x = user;
        x.photos.splice(index, 1);
        this.updateUser(x).then((a) => xs.unsubscribe());

      }

    }), finalize(() => xs.unsubscribe())).subscribe());

  }
  public addPhoto(url: string): void {
    const x: User = this.userdata.value;
    if (x.photos === undefined || x.photos === null) {
      x.photos = [];

    }
    x.photos.push(url);
    this.updateUser(x);
  }
  public getUserChanges(id: string): Observable<User> {
    this.db.collection(AppConfig.routes.users).doc(id).snapshotChanges().pipe(
      map((data) => {
        this.userdata.next(data);
      },
      ),
      tap(() => LoggerService.log("changes fetched")),
      catchError(UserUtilsService.handleError("getChanges", [])),
    );

    return this.userdata.asObservable();

  }

  public createUser(user: {}) {
    const us = new User({created: new Date(Date.now()), ...user });
    return this.db.doc(`${AppConfig.routes.users}/${us.uid}`).set(JSON.parse(JSON.stringify(us)));
  }

  public updateUser(user: User): Promise<void> {
    const u: User = JSON.parse(localStorage.getItem("user"));
    const x: any = user;

    if (u && user.uid === u.uid) {
      localStorage.setItem("user", JSON.stringify(x));
    }
    return this.db.collection(`${AppConfig.routes.users}`).doc(`${user.uid}`).
      update(JSON.parse(JSON.stringify(Object.assign({}, x)))).then(() => {
        LoggerService.log(`updated hero w/ id=${user.uid}`);
        this.Logger.showSnackBar(this.i18n({ value: "Saved", id: "@@saved" }));
        this.userdata.next(user);
      });
  }

  public deleteUser(id: string): Promise<void> {
    const user: User = JSON.parse(localStorage.getItem("user"));
    user.disabled = true;
    return this.updateUser(user);
  }

  public getProfilePicUrl(): String {
    const user: User = JSON.parse(localStorage.getItem("user"));

    return user.photoURL;
  }
  public getUserName() {
    const user: User = JSON.parse(localStorage.getItem("user"));
    return user.displayName;
  }
  public like(userId, recipientId) {
    return this.getLike(userId, recipientId).pipe(switchMap((data) => {
      if (data.empty) {
        this.db.doc(`${AppConfig.routes.users}/${userId}`).collection("following").add({ uid: recipientId }).then((data) => {
          this.db.doc(`${AppConfig.routes.users}/${recipientId}`).collection("follower").add({ uid: userId });
        });
        return of("You Like Him");

      } else {
        data.forEach((y) => {
          this.db.doc(`${AppConfig.routes.users}/${userId}/following/${y.id}`).delete().then((data) => {
            this.db.doc(`${AppConfig.routes.users}/${recipientId}`)
              .collection("follower", (ref) => ref.where("uid", "==", userId)).get().subscribe((dataa) => {
                dataa.forEach((y) => {
                  this.db.doc(`${AppConfig.routes.users}/${recipientId}/follower/${y.id}`).delete();
                });
              });
          });
        });
        return of("You DisLike Him");

      }
    }), tap((data) => this.Logger.showSnackBar(data)));

  }
  public getLike(userId, recipientId) {
    return this.db.doc(`${AppConfig.routes.users}/${userId}`).collection("following", (ref) => ref.where("uid", "==", recipientId)).get();
  }

}
