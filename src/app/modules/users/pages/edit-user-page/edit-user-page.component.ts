import { Component, OnInit, HostListener, ViewChild, NgZone, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { User } from '../../shared/user.model';
import { PostService } from 'src/app/core/services/Post.service';
import { Post } from 'src/app/modules/posts/shared/post.model';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { PresenceService } from 'src/app/core/services/presence.service';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';
import { Review } from 'src/app/shared/components/review-card/review-card';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit, AfterViewInit, OnDestroy {

  user: User;
  presence$;

  CurrentUser: User;
  canEdit = false;
  photoUrl: string;
  reviews: Review[];
  subscriptions: Subscription[] = [];
  private x = new Subscription()
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  canDoAction = true;
  @ViewChild('editForm', { static: false }) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService,
    private progressBarService: ProgressBarService,
    public presence: PresenceService,
    private router: Router,
    private datachang: ChangeDetectorRef,

    private userService: UserUtilsService) { this.canDoAction = true; }
  ngOnInit() {
    if (!this.userAuthService.isUserSignedIn()) {
      this.router.navigate(['404']);
    }
    this.userService.getUser( this.userAuthService.currentUser.value.uid).subscribe((data: User) => {
      let c_user = new User({ id: data.uid, ...data });
      c_user.isActive = true;
      c_user.lastActive = new Date(Date.now());
      let fName = c_user.displayName.split(' ');
      let fiName, lasName;
      if (fName.length > 1) {
        fiName = fName[0];
        lasName = c_user.displayName.substring(fiName.length + 1, c_user.displayName.length)
        c_user.displayName = fiName;
        c_user.familyName = lasName;

      }
      this.userAuthService.currentUser.next(c_user);
      localStorage.setItem('user', JSON.stringify(c_user));

    });

    this.progressBarService.increase();

    const id: string = this.activatedRoute.snapshot.params.id;
    this.presence$ = this.presence.getPresence(id);

    if (this.userAuthService.currentUser.value) {
      this.userAuthService.currentUser.subscribe(data => {
        this.user = data;
        this.loadImage();
        if (id !== this.user.uid) {

          this.router.navigate(['/404']);

        }
        this.loadImage();
        if (this.user.photoURL === '' || this.user.photoURL === undefined) {
          this.userAuthService.photoUrl.subscribe(url => {
            this.user.photoURL = url;
          });
        }
        this.canDoAction = true;

        this.canEdit = true;
      });
    }
  }
  getReview(event: MatTabChangeEvent) {

    if (event.index === 4) {
      this.reviews = new Array<Review>();
      this.userService.getReviews(this.user.uid).subscribe(data => {
        console.log(data)
        data.forEach((review) => {
          this.reviews.push(review);
        });
      });
    }
  }
  ngAfterViewInit() {
    this.canDoAction = false;
    this.datachang.detectChanges();
    setTimeout(a => {
      this.progressBarService.decrease();

    }, 700)


  }
  updateProfile() {
    this.userService.updateUser(this.user).finally(() => {
      this.editForm.reset(this.user);
    });
  }
  loadImage() {
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
        previewFullscreen: false,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true
      }
    ];
    this.galleryImages = [];
    this.galleryImages = this.getImages();
  }
  getImages() {
    const imageUrls = [];
    if (!this.user.photos) {
      return imageUrls;

    }
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i],
        medium: this.user.photos[i],
        big: this.user.photos[i],
        description: 'this.user.photos[i].description'
      });
    }

    return imageUrls;
  }

  setMainPhoto(url: string) {
    this.user.photoURL = url
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());

  }

}
