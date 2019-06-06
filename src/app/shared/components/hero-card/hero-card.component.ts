import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { I18n } from "@ngx-translate/i18n-polyfill";
import { Observable } from "rxjs";
import { PostService } from "src/app/core/services/Post.service";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { Post } from "src/app/modules/posts/shared/post.model";
import { User } from "src/app/modules/users/shared/user.model";
import { AppConfig } from "../../../configs/app.config";

@Component({
  selector: "app-hero-card",
  templateUrl: "./hero-card.component.html",
  styleUrls: ["./hero-card.component.scss"],
})
export class HeroCardComponent implements OnInit {

  @Input() public post: Post;

  public canComment: boolean = false;
  public tags: Observable<string[]>;
  public photo: Observable<any>;
  constructor(public auth: UserAuthService,
              private router: Router,
              private userservice: UserUtilsService,
              private postser: PostService,
              private i18n: I18n,
              public dialog: MatDialog,

              @Inject(PLATFORM_ID) private platformId: Object) {
  }
  public openDialog(item): void {
    const dialogRef = this.dialog.open(PhotoDialog, {
      maxWidth: "1080px",
      data: { url: item },
    });

  }
  public ngOnInit() {
    this.tags = this.postser.getTags(this.post.id);
    this.photo = this.userservice.getUser(this.post.uid);

  }
  public sendMessage() {
    this.router.navigate([`/messages/${this.post.uid}`]);
  }
  public seePostDetails(post: Post) {
    this.router.navigate([`/${this.post.uid}`]);

  }
  // like(hero: Hero) {
  //     this.snackBar.open(this.i18n({ value: 'Can\'t vote anymore', id: '@@cannotVote' }), '', { duration: 1000 });
  //    }

}

@Component({
  selector: "app-photo-dialog",
  templateUrl: "view-image-dialog.html",
})
export class PhotoDialog  {

  constructor(
    public dialogRef: MatDialogRef<PhotoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  public ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
