import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import { Post } from 'src/app/modules/posts/shared/post.model';
import { PostService } from 'src/app/core/services/Post.service';
import { Router, ActivatedRoute } from '@angular/router';
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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PhotoDialog } from '../hero-card/hero-card.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})

export class PostCardComponent implements OnInit, OnDestroy {

  @Input() id: any;
  postId;
  post: Post;
  comments: string;
  show;
  allComments: Observable<Array<any>>;
  tags: Observable<Array<string>>;
  photo: Observable<any>;
  enteredCode;
  rate;
  rateContent;
  canComment: boolean;
  canVote: boolean;
  constructor(private postService: PostService,
    private router: Router,

    private userAuth: UserAuthService,
    private userervice: UserUtilsService,
    private activatedRouter: ActivatedRoute,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.canComment = this.userAuth.isUserSignedIn();
    this.allComments = of(new Array());
    this.tags = of(new Array<string>());
  }
  ngOnDestroy(): void {
  }
  openDialog(item): void {
    const dialogRef = this.dialog.open(PhotoDialog, {
      maxWidth: '1080px',
      data: { url: item }
    });


  }
  ngOnInit() {
    this.postId = this.activatedRouter.snapshot.params['id'];
    if (this.id instanceof Object) {
      this.post = new Post({ id: this.postId, ...this.id });
      this.allComments = this.postService.getComment(this.post.id);
      this.tags = this.postService.getTags(this.post.id);
      this.photo = this.userervice.getUser(this.post.uid);
      console.log(this.post.rate);
    } else {
      this.postService.getPost(this.id).subscribe((data: Post) => {
        this.post = new Post({ id: this.id, ...data });
          this.allComments = this.postService.getComment(this.id);
          this.tags = this.postService.getTags(this.id);
          this.photo = this.userervice.getUser(this.post.uid);


      
      }, err => LoggerService.error(err));
    }


  }
  sendMessage() {
    this.router.navigate([`/messages/${this.post.uid}`]);
  }

  finish() {
    const dialogRef = this.dialog.open(FinishDialog, {
      width: '350px',
      data: {
        displayName: this.userAuth.currentUser.value.displayName,
        code: this.post.code,
        showCode: this.userAuth.currentUser.value.uid === this.post.uid ? true : false,
        enteredCode: this.enteredCode,
        rateContent: this.rateContent,
        rate: this.rate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.rate = result.rate.rating;
      this.rateContent = result.rateContent;
      this.postService.setRate(this.rate, this.rateContent, this.post, this.userAuth.currentUser.value.uid);
    });
  }

  enter(event) {

    if (event.keyCode === 13) {
      if (this.comments.trim() !== '') {
        this.postService.createComment(this.comments, this.post.id, JSON.parse(localStorage.getItem('user')));
        this.comments = '';
      }
    }
  }


  seePostDetails(post: Post): void {
    if (!post.closed) {
      this.router.navigate([`/${this.post.uid}`]);
    }
  }

}
@Component({
  selector: 'app-finish-dialog',
  templateUrl: 'finish-rate.html',
})
export class FinishDialog {
  done = false;
  rateContent: string = '';

  return_data: any;
  constructor(
    public dialogRef: MatDialogRef<FinishDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
    this.done = data.showCode;
    this.return_data = { rate: data.rate, rateContent: this.rateContent };

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  Check() {
    if (this.data.enteredCode === this.data.code) {
      this.done = true;
    }
  }
  rate() {

  }

}