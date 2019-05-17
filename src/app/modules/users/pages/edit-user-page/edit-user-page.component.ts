import { Component, OnInit, HostListener, ViewChild, NgZone, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { User } from '../../shared/user.model';
import { PostService } from 'src/app/modules/posts/shared/Post.service';
import { Post } from 'src/app/modules/posts/shared/post.model';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit, AfterViewInit, OnDestroy {

  user: User;
  CurrentUser: User;
  canEdit = false;
  photoUrl: string;
  subscriptions: Subscription[] = [];
  private x = new Subscription()
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  canDoAction = true;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService,
    private datachange: NgZone,
    private router: Router,
    private datachang: ChangeDetectorRef,

    private userService: UserUtilsService) { this.canDoAction = true; }
  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.params.id;
    if (this.userAuthService.isUserSignedIn()) {
      this.userService.userdata.subscribe(data => {
        this.user = data;
        console.log(data);
        this.loadImage();

      });

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
    }
  }
  ngAfterViewInit() {
    this.canDoAction = false;
    this.datachang.detectChanges();


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
    if(!this.user.photos){
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
