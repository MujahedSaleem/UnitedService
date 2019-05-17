import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger.service';
import { PresenceService } from 'src/app/core/services/presence.service';

@Component({
  selector: 'app-detail-user-page',
  templateUrl: './detail-user-page.component.html',
  styleUrls: ['./detail-user-page.component.css']
})
export class DetailUserPageComponent implements OnInit {
  user: User;
  presence$;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private userService: UserUtilsService,
    public presence: PresenceService,
    private log: LoggerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.params.id;
    this.presence$ = this.presence.getPresence(id);
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
      this.loadImage();
    }, err => this.router.navigate(['404']));
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

}
