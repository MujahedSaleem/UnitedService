import { Component, OnInit } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from "ngx-gallery";
import { LoggerService } from "src/app/core/services/logger.service";
import { PresenceService } from "src/app/core/services/presence.service";
import { ProgressBarService } from "src/app/core/services/progress-bar.service";
import { UserUtilsService } from "../../../../core/services/user-utils.service";
import { Review } from "../../../../shared/components/review-card/review-card";
import { User } from "../../shared/user.model";

@Component({
  selector: "app-detail-user-page",
  templateUrl: "./detail-user-page.component.html",
  styleUrls: ["./detail-user-page.component.css"],
})
export class DetailUserPageComponent implements OnInit {
  public user: User;
  public reviews: Review[];

  public done: any = true;
  public presence$;
  public x = true;
  public Action = false;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  constructor(private userService: UserUtilsService,
              public presence: PresenceService,
              private log: LoggerService,
              private progressBarService: ProgressBarService,

              private activatedRoute: ActivatedRoute,
              private router: Router,
  ) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  public ngOnInit() {
    this.progressBarService.increase();

    const id: string = this.activatedRoute.snapshot.params.id;
    const user: User = JSON.parse(localStorage.getItem("user"));
    if (user) {

      if (user && id !== user.uid) {
        this.Action = true;

      }
    }
    this.userService.getUser(id).subscribe((user: User) => {

      this.user = user;
      if (this.user === null) {
        this.router.navigate(["404"]);
      } else {
        this.loadImage();
        this.presence$ = this.presence.getPresence(id);
      }
    }, (err) => this.router.navigate(["404"]));
    setTimeout((a) => {
      this.progressBarService.decrease();

    }, 700);
  }
  public getReview(event: MatTabChangeEvent) {

    if (event.index === 3) {
      this.reviews = new Array<Review>();
      this.userService.getReviews(this.user.uid).subscribe((data) => {
        console.log(data);
        let count: number = 0;

        const user: User = JSON.parse(localStorage.getItem("user"));
        data.forEach((review) => {
          this.reviews.push(review);
        });
        this.reviews.forEach((x: Review) => {
          count += x.rate;
        });
        user.rate = count / this.reviews.length;
        console.log(user.rate);
        this.userService.updateUser(user);

      });
    }
  }
  public like() {
    this.done = false;
    const recipientId = "" + this.activatedRoute.snapshot.params.id;
    const user: User = JSON.parse(localStorage.getItem("user"));
    this.userService.like(user.uid, recipientId)
      .subscribe((data) => {
        if (data.length === 12) {
          this.x = false;
        } else {
          this.x = true;
        }

        this.done = true;

      });
  }

  public sendMessage() {
    const id: string = this.activatedRoute.snapshot.params.id;

    this.router.navigate([`/messages/${id}`]);
  }
  public loadImage() {
    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
        previewFullscreen: false,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
      },
    ];
    this.galleryImages = [];
    this.galleryImages = this.getImages();
  }
  public getImages() {
    const imageUrls = [];
    if (!this.user.photos) {
      return imageUrls;
    }
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i],
        medium: this.user.photos[i],
        big: this.user.photos[i],
        description: " ",
      });
    }

    return imageUrls;
  }

}
