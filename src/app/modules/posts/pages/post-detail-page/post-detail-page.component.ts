import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppConfig } from "src/app/configs/app.config";
import { ProgressBarService } from "src/app/core/services/progress-bar.service";
import { UtilsHelperService } from "src/app/core/services/utils-helper.service";
import { PostService } from "../../../../core/services/Post.service";
import { Post } from "../../shared/post.model";

@Component({
  selector: "app-post-detail-page",
  templateUrl: "./post-detail-page.component.html",
  styleUrls: ["./post-detail-page.component.scss"],
  animations: [UtilsHelperService.fadeInOut()],

})
export class PostDetailPageComponent implements OnInit {
  public post: Post;
  public canVote: boolean;

  constructor(private postService: PostService,
              private location: Location,
              private progressBarService: ProgressBarService,

              private router: Router,
              private activatedRoute: ActivatedRoute) {

    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  public ngOnInit() {
    this.progressBarService.increase();
    const postId = this.activatedRoute.snapshot.paramMap.get("id");

    this.postService.getPost(postId).subscribe((data) => {
      if (data === undefined) {
        this.router.navigate(["/404"]);
      }
      this.post = data;

    });

    setTimeout(() => {
      this.progressBarService.decrease();
    }, 400);
  }
  public goBack(): void {
    this.location.back();
  }

  public goToTheAnchor(): void {
    this.router.navigate([`/${AppConfig.routes.heroes}/${this.post.id}`], { fragment: "heroe-detail" });
  }
}
