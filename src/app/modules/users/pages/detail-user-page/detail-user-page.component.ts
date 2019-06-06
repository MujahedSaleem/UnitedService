import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger.service';
import { PresenceService } from 'src/app/core/services/presence.service';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';
import { NotifierService } from 'angular-notifier';
import { Review } from 'src/app/shared/components/review-card/review-card';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-detail-user-page',
  templateUrl: './detail-user-page.component.html',
  styleUrls: ['./detail-user-page.component.css']
})
export class DetailUserPageComponent implements OnInit {
  user: User;
    reviews: Review[];

  done: any = true;
  presence$;
  x= true;
  Action = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private userService: UserUtilsService,
    public presence: PresenceService,
    private log: LoggerService,
    private progressBarService:
      ProgressBarService,

    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.progressBarService.increase();

    const id: string = this.activatedRoute.snapshot.params.id;
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {

      if (user && id !== user.uid) {
        this.Action = true;

      }
    }
    this.userService.getUser(id).subscribe((user: User) => {

      this.user = user;
      if (this.user === null) {
        this.router.navigate(['404']);
      } else {
        this.loadImage();
        this.presence$ = this.presence.getPresence(id);
      }
    }, err => this.router.navigate(['404']));
    setTimeout(a => {
      this.progressBarService.decrease();

    }, 700)
  }
  getReview(event: MatTabChangeEvent) {

    if(event.index===3){
    this.reviews = new Array<Review>();
    this.userService.getReviews(this.user.uid).subscribe(data => {
      console.log(data)
       data.forEach((review)=>{
         this.reviews.push(review);
       });
    });
  }
  }
  like() {
    this.done = false;
    const recipientId = '' + this.activatedRoute.snapshot.params.id;
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.userService.like(user.uid, recipientId)
      .subscribe(data => {
        if (data.length === 12) {
          this.x = false;
        } else {
          this.x = true;
        }

        this.done = true;

      });
  }

  sendMessage() {
    const id: string = this.activatedRoute.snapshot.params.id;

    this.router.navigate([`/messages/${id}`]);
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
        description: ' '
      });
    }

    return imageUrls;
  }

}
