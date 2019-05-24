import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import { Post } from 'src/app/modules/posts/shared/post.model';
import { PostService } from 'src/app/core/services/Post.service';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger.service';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { isPlatformBrowser } from '@angular/common';
import { AppConfig } from 'src/app/configs/app.config';
import { NgForm } from '@angular/forms';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { catchError } from 'rxjs/operators';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})

export class PostCardComponent implements OnInit, OnDestroy {

  @Input() id: any;
  post: Post;
  comments: string;
  show;
  allComments: Observable<Array<any>>;
  tags: Observable<Array<string>>;
  photo:Observable<any>;
  canComment: boolean;
  canVote: boolean;
  constructor(private postService: PostService,
    private router: Router,

    private userAuth: UserAuthService,
    private userervice: UserUtilsService,
    private i18n: I18n,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.canComment = this.userAuth.isUserSignedIn();
    this.allComments = of(new Array());
    this.tags = of(new Array<string>());
  }
  ngOnDestroy(): void {
  }
  ngOnInit() {
    if (this.id instanceof Object) {
      this.post = new Post({ ...this.id });
      this.allComments = this.postService.getComment(this.post.id);
      this.tags = this.postService.getTags(this.post.id);
      this.photo = this.userervice.getUser(this.post.uid);
    } else {
      this.postService.getPost(this.id).subscribe((data: Post) => {
        this.post = new Post({ ...data });
        if (this.post.avatarThumbnailUrl === undefined) {
          this.post.avatarThumbnailUrl = '/assets/images/user.png';
        }
        this.allComments = this.postService.getComment(this.id);
        this.tags = this.postService.getTags(this.id);
        this.photo = this.userervice.getUser(this.post.uid);


      }, err => LoggerService.error(err));
    }


  }
  sendMessage() {
    this.router.navigate([`/messages/${this.post.uid}`]);
  }
  enter(event) {

    if (event.keyCode === 13) {
      if (this.comments.trim() !== '') {
        this.postService.createComment(this.comments, this.post.id, JSON.parse(localStorage.getItem('user')));
        this.comments = '';
      }
    }
  }



  // like(post: Post): Promise<void> {
  //   if (this.canVote) {
  //     post.like();
  //     if (isPlatformBrowser(this.platformId)) {
  //       localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
  //     }
  //     return this.postService.updatePost(post);
  //   } else {
  //     this.Logger.showSnackBar(this.i18n({ value: 'Can\'t vote anymore', id: '@@cannotVote' }), 1000 );
  //   }
  // }

  seePostDetails(post: Post): void {
    if (!post.closed) {
      this.router.navigate([`/${this.post.uid}`]);
    }
  }

}
