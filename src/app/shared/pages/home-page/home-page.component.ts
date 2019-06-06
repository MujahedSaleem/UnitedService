import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs";
import { MessageService } from "src/app/core/services/Message.service";
import { PostService } from "src/app/core/services/Post.service";
import { ProgressBarService } from "src/app/core/services/progress-bar.service";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { Post } from "src/app/modules/posts/shared/post.model";
import { User } from "src/app/modules/users/shared/user.model";
import { AppConfig } from "../../../configs/app.config";
import { UtilsHelperService } from "../../../core/services/utils-helper.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
  animations: [UtilsHelperService.fadeInOut()],
})

export class HomePageComponent implements OnInit, OnDestroy {

  public posts: Post[] = null;
  public workdone = false;
  private subscriptions: Subscription[] = [];

  constructor(private postService: PostService,
              private userUti: UserUtilsService,
              public auth: UserAuthService, private ms: MessageService, private progressBarService: ProgressBarService) {
  }

  public ngOnInit() {
    this.progressBarService.increase();
    let uid;
    if (this.auth.isUserSignedIn() && !this.auth.isUserAnny()) {
      uid = this.auth.currentUser.value.uid;
    } else {
      uid = undefined;
    }
    this.subscriptions.push(

      this.postService.getPosts(uid).subscribe((posts: Post[]) => {
        this.posts = posts.slice(0, AppConfig.topHeroesLimit).filter((a) => a.closed === false);
        this.workdone = true;
        this.progressBarService.decrease();

      }, () => {
        this.workdone = true;
      }));
  }
  public ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
