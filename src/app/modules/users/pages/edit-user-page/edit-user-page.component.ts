import { Component, OnInit, HostListener, ViewChild, NgZone, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { User } from '../../shared/user.model';
import { PostService } from 'src/app/modules/posts/shared/Post.service';
import { Post } from 'src/app/modules/posts/shared/post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit, AfterViewInit {
  user: User;
  CurrentUser: User;
  canEdit: boolean = true;
  canDoAction: boolean
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
    private datachang: ChangeDetectorRef,


    private userService: UserUtilsService) { }
  ngOnInit() {

    this.canEdit = false;
    this.canDoAction = false;
    const id = this.activatedRoute.snapshot.params.id;
    if (this.userAuthService.isUserSignedIn()) {
      this.user = JSON.parse(localStorage.getItem('user'));

      if (this.user.photoURL === '' || this.user.photoURL === undefined) {
        this.user.photoURL = '../../../../../../../assets/images/user.png';
      } else if (id === this.user.uid) {
        this.canEdit = true;
        this.canDoAction = true;
      }

      if (id !== this.user.uid) {
        this.user = undefined;
        this.datachange.run(() => {
          this.userService.getUser(id).then(user => {
            this.user = new User({ uid: id, ...user.val() });
          });
          this.userService.getUserChanges(id).subscribe(user => {
            console.log(user);
            this.datachange.run(() => {
              this.change(user);

            });
            if (this.user.photoURL === '' || this.user.photoURL === undefined) {
              this.user.photoURL = '../../../../../../../assets/images/user.png';
            }


          });
        });



      }


    } else {
      this.datachange.run(() => {
        this.userService.getUser(id).then(user => {
          this.user = new User({ uid: id, ...user.val() });
        });
        this.userService.getUserChanges(id).subscribe(user => {
          console.log(user);
          this.datachange.run(() => {
            this.change(user);

          });
          if (this.user.photoURL === '' || this.user.photoURL === undefined) {
            this.user.photoURL = '../../../../../../../assets/images/user.png';
          }


        });
      });
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

  private change(user) {

    setTimeout(this.user = user, 1000);

  }



}
