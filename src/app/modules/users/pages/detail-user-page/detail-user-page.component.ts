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
  done: any = true;
  presence$;
  x
  Action = false;
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
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userService.DoLike(user.uid, id).then(data => {
        this.x = data.empty;
      });
      if (user && id !== user.uid) {
        this.Action = true;

      }
    }
    this.userService.getUser(id).subscribe((user: User) => {
      if (user === null) {
        this.router.navigate(['404']);
      }
      this.user = user;
      this.loadImage();
      this.presence$ = this.presence.getPresence(id);

    }, err => this.router.navigate(['404']));
  }
  like() {
    this.done = false;
    this.x = !this.x;
    const id: string = this.activatedRoute.snapshot.params.id;
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (id === user.uid) {
      return;
    }
    this.userService.like(user.uid, id, this.x);
    setTimeout(() => { this.done = true }, 200)

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
