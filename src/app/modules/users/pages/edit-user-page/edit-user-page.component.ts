import { AfterViewInit, ChangeDetectorRef, Component, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatTabChangeEvent } from "@angular/material";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from "ngx-gallery";
import { Observable, Subscription } from "rxjs";
import { catchError } from "rxjs/operators";
import { PostService } from "src/app/core/services/Post.service";
import { PresenceService } from "src/app/core/services/presence.service";
import { ProgressBarService } from "src/app/core/services/progress-bar.service";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { Post } from "src/app/modules/posts/shared/post.model";
import { Review } from "src/app/shared/components/review-card/review-card";
import { User } from "../../shared/user.model";

@Component({
  selector: "app-edit-user-page",
  templateUrl: "./edit-user-page.component.html",
  styleUrls: ["./edit-user-page.component.css"],
})
export class EditUserPageComponent implements OnInit, AfterViewInit, OnDestroy {

  public user: User;
  public presence$;

  public CurrentUser: User;
  public canEdit = false;
  public photoUrl: string;
  public reviews: Review[];
  public subscriptions: Subscription[] = [];
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  public canDoAction = true;
  @ViewChild("editForm", { static: false }) public editForm: NgForm;
  private x = new Subscription();
  constructor(private activatedRoute: ActivatedRoute,
              private userAuthService: UserAuthService,
              private progressBarService: ProgressBarService,
              public presence: PresenceService,
              private router: Router,
              private datachang: ChangeDetectorRef,

              private userService: UserUtilsService) { this.canDoAction = true; }
  @HostListener("window:beforeunload", ["$event"])
  public unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  public ngOnInit() {
    if (!this.userAuthService.isUserSignedIn()) {
      this.router.navigate(["404"]);
    }
    this.userService.getUser( this.userAuthService.currentUser.value.uid).subscribe((data: User) => {
      const c_user = new User({ id: data.uid, ...data });
      c_user.isActive = true;
      c_user.lastActive = new Date(Date.now());
      const fName = c_user.displayName.split(" ");
      let fiName, lasName;
      if (fName.length > 1) {
        fiName = fName[0];
        lasName = c_user.displayName.substring(fiName.length + 1, c_user.displayName.length);
        c_user.displayName = fiName;
        c_user.familyName = lasName;

      }
      this.userAuthService.currentUser.next(c_user);
      localStorage.setItem("user", JSON.stringify(c_user));

    });

    this.progressBarService.increase();

    const id: string = this.activatedRoute.snapshot.params.id;
    this.presence$ = this.presence.getPresence(id);

    if (this.userAuthService.currentUser.value) {
      this.userAuthService.currentUser.subscribe((data) => {
        this.user = data;
        this.loadImage();
        if (id !== this.user.uid) {

          this.router.navigate(["/404"]);

        }
        this.loadImage();
        if (this.user.photoURL === "" || this.user.photoURL === undefined) {
          this.userAuthService.photoUrl.subscribe((url) => {
            this.user.photoURL = url;
          });
        }
        this.canDoAction = true;

        this.canEdit = true;
      });
    }
  }
  public getReview(event: MatTabChangeEvent) {

    if (event.index === 4) {
      this.reviews = new Array<Review>();
      this.userService.getReviews(this.user.uid).subscribe((data) => {
        console.log(data);
        data.forEach((review) => {
          this.reviews.push(review);
        });
      });
    }
  }
  public ngAfterViewInit() {
    this.canDoAction = false;
    this.datachang.detectChanges();
    setTimeout((a) => {
      this.progressBarService.decrease();

    }, 700);

  }
  public updateProfile() {
    this.userService.updateUser(this.user).finally(() => {
      this.editForm.reset(this.user);
    });
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
        description: "this.user.photos[i].description",
      });
    }

    return imageUrls;
  }

  public setMainPhoto(url: string) {
    this.user.photoURL = url;
  }
  public ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());

  }

}
