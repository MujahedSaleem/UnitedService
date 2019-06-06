import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { I18n } from "@ngx-translate/i18n-polyfill";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import * as firebase from "firebase";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AppConfig } from "src/app/configs/app.config";
import { LoggerService } from "src/app/core/services/logger.service";
import { Post } from "../../modules/posts/shared/post.model";
import { UserAuthService } from "./user-auth.service";
@Injectable({
  providedIn: "root",
})
export class PostService {
  public static handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }
  private postsCollection: AngularFirestoreCollection<Post>;
  constructor(private afs: AngularFireDatabase,
              private Logger: LoggerService,
              private http: HttpClient,
              private db: AngularFirestore,
              private i18n: I18n,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.postsCollection = this.db.collection(AppConfig.routes.posts, (ref) => ref.limit(25).orderBy("date", "desc"),
    );

  }
  public updatePosts(userId: string, photoUrl: string) {
    const u: firebase.User = JSON.parse(localStorage.getItem("user"));
    if (userId !== u.uid) {
      return;
    }
    return this.db.collection(`${AppConfig.routes.posts}`).ref.where("uid", "==", userId)
      .onSnapshot((data) => {
        data.forEach((doc) => {
          this.db.collection(`${AppConfig.routes.posts}`).doc(doc.id).update({ avatarThumbnailUrl: photoUrl });

        });
      });
  }
  public getPosts(uid): Observable<Post[]> {
    if (uid) {
      return this.http.
        get<Post[]>(`http://mujshrf-001-site1.etempurl.com/api/values/${uid}`, { headers: { "Access-Control-Allow-Origin": "*" } });
    }
    return this.postsCollection.snapshotChanges([])
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            return new Post({ id: action.payload.doc.id, ...action.payload.doc.data() as Post });
          });
        }),
        tap(() => LoggerService.log(`fetched postss`)),
        catchError(PostService.handleError("getposts", [])),
      );
  }
  public getPost(id: string) {

    return this.db.doc<Post>(`${AppConfig.routes.posts}/${id}`).snapshotChanges().pipe(
      map((data) => data.payload.exists === true ? new Post({
        id: data.payload.id
        , ...data.payload.data(),
      }) : undefined),
    );

  }
  public createComment(Comment, postid: string, user: firebase.User) {
    return this.db.doc(`${AppConfig.routes.posts}/${postid}`).collection("Comments").add(
      {
        content: Comment,
        authoruid: user.uid,
        date: new Date(),
      });
  }

  public getComment(postid: string) {
    return this.db.doc(`${AppConfig.routes.posts}/${postid}`).collection("Comments", (ref) => ref.orderBy("date", "asc")).valueChanges()
      .pipe(map((data) => {
        const m = new Array();
        data.forEach((x, y) => {
          m.push(x);
        });
        return m;
      }));
  }
  public setRate(rate, rateContent, post: Post, uid) {
    if (post.uid === uid) {
      this.db.doc(`${AppConfig.routes.posts}/${post.id}`).update({ rate, rateContent });
    } else {

      this.db.doc(`${AppConfig.routes.users}/${post.uid}`).collection("rate").add({
        rate,
        rateContent,
        uid,
        date : new Date(Date.now()).toDateString(),
      }).then(() => {
        this.db.doc(`${AppConfig.routes.users}/${uid}`).collection("rate").add({
          rate: post.rate,
          rateContent: post.rateContent,
          uid: post.uid,
          date : new Date(Date.now()).toDateString(),

        }).then(() => {
          this.db.doc(`${AppConfig.routes.posts}/${post.id}`).update({ closed: true });

        });
      });

    }

  }
  public getTags(postid: string) {
    return this.db.doc(`${AppConfig.routes.posts}/${postid}`).collection("tags").valueChanges()
      .pipe(map((data) => {
        const m = new Array();
        data.forEach((x, y) => {
          m.push(x.content);
        });
        return m;
      }));
  }
  public createTags(Tags, postid: string) {
    return this.db.doc(`${AppConfig.routes.posts}/${postid}`).collection("tags")
      .add({ content: Tags });
  }
  public createPost(post: Post): Promise<string> {
    const date = new Date();
    post.date = date;
    return this.db.collection(`${AppConfig.routes.posts}`).add(JSON.parse(JSON.stringify(post))).then((data) => {
      return data.id;
    });
  }

  // updatePost(post: Post): Promise<void> {
  //   return this.afs.doc(`${AppConfig.routes.heroes}/${post.id}`).
  //     update(JSON.parse(JSON.stringify(post))).then(() => {
  //       LoggerService.log(`updated hero w/ id=${post.id}`);
  //       this.Logger.showSnackBar(this.i18n({ value: 'Saved', id: '@@saved' }));
  //     });
  // }

  // deletePost(id: string): Promise<void> {
  //   return this.afs.doc(`${AppConfig.routes.posts}/${id}`).delete();
  // }

}
