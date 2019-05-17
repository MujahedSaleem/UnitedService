import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Post } from './post.model';
import { MatSnackBar } from '@angular/material';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { AppConfig } from 'src/app/configs/app.config';
import { LoggerService } from 'src/app/core/services/logger.service';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { map, tap, catchError } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<Post>;
  constructor(private afs: AngularFireDatabase,
    private Logger: LoggerService,
    private db: AngularFirestore,
    private i18n: I18n,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.postsCollection = this.db.collection(AppConfig.routes.posts, ref => ref.limit(25).orderBy('date','asc'));
  }
  public static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }
  updatePosts(userId: string, photoUrl: string) {
    const u: User = JSON.parse(localStorage.getItem('user'));
    if (userId !== u.uid) {
      return;
    }
    return this.db.collection(`${AppConfig.routes.posts}`).ref.where('uid', '==', userId)
      .onSnapshot(data => {
        data.forEach(doc => {
          this.db.collection(`${AppConfig.routes.posts}`).doc(doc.id).update({ avatarThumbnailUrl: photoUrl })

        });
      });
  }
  getPosts(): Observable<Post[]> {

    return this.postsCollection.snapshotChanges([])
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            return new Post({ id: action.payload.doc.id, ...action.payload.doc.data() as Post });
          });
        }),
        tap(() => LoggerService.log(`fetched postss`)),
        catchError(PostService.handleError('getposts', []))
      );
  }
  postDoc: AngularFirestoreDocument<Post>;
  getPost(id: string) {
    this.postDoc = this.db.doc(`${AppConfig.routes.posts}/${id}`);
    return this.postDoc.valueChanges();

  }
  createComment(post: Post, postid: string) {
    console.log(post, postid)
    return this.db.collection(`${AppConfig.routes.posts}`).doc(postid).set(post);
  }
  createPost(post: Post): Promise<string> {
    post.avatarThumbnailUrl = JSON.parse(localStorage.getItem('user')).photoURL;
    const date = new Date();
    post.date = date;
    return this.db.collection(`${AppConfig.routes.posts}`).add(JSON.parse(JSON.stringify(post))).then(data => {
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
