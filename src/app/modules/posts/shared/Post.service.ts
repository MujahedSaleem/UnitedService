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

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFireList<Post>;
  constructor(private afs: AngularFireDatabase,
    private Logger: LoggerService,
    private i18n: I18n,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.postsCollection = this.afs.list<Post>(AppConfig.routes.posts, post =>
      post.orderByKey()
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

  getPosts(): Observable<Post[]> {
    return this.postsCollection.snapshotChanges([])
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            console.log(action)
            return new Post({ id: action.key, ...action.payload.val() as Post });
          });
        }),
        tap(() => LoggerService.log(`fetched posts`)),
        catchError(PostService.handleError('getPOsts', []))
      );
  }

  getPost(id: string): Promise<firebase.database.DataSnapshot> {

    return this.afs.database.ref(`${AppConfig.routes.posts}`).child(id).once('value', value => {
      return new Post({ id, ...value.val() });
    }
    );
  }
  createComment(commnet: string, postid: string) {
    return this.afs.database.ref(`${AppConfig.routes.posts}`).child(postid).child('comment').push(commnet);
  }
  createPost(post: Post) {
        return this.postsCollection.push(JSON.parse(JSON.stringify(post)));
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
