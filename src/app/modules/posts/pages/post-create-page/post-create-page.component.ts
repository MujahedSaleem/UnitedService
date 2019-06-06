import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../shared/post.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { PostService } from '../../../../core/services/Post.service';
import { User } from 'src/app/modules/users/shared/user.model';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { Guid } from 'src/app/modules/messages/shared/util';
@Component({
  selector: 'app-post-create-page',
  templateUrl: './post-create-page.component.html',
  styleUrls: ['./post-create-page.component.css']
})
export class PostCreatePageComponent implements OnInit {

  createModel: FormGroup;
  isworkdone = false;
  model: Post;
  photos = new Array();
  load = true;
  lat; lon;
  locations;
  url;
  mainLocation;
  done: boolean = false;
  zoom
  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;
  tags: string[];
  constructor(private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private auth: UserAuthService,
    private userService: UserUtilsService,
    private _hotkeysService: HotkeysService,
    private progressBarService: ProgressBarService,
    private postService: PostService) {
    this._hotkeysService.add(new Hotkey('ctrl+enter', (event: KeyboardEvent): boolean => {
      if (this.createModel.valid) {
        if (!this.isworkdone) {
          this.isworkdone = true;
        } else {
          this.register();
        }
      }
      return false; // Prevent bubbling
    }));
  }

  ngOnInit() {

    this.progressBarService.increase();

    setTimeout(a => {
      this.load = false
      this.progressBarService.decrease();

    }, 700)
    this.createForm();

  }
  getTags(wrods: string): string[] {
    let values: string[] = new Array();
    wrods.split('#').forEach(val => {
      if (val !== '') {
        values.push(val)

      }
    });
    return values;
  }
  createForm() {
    this.createModel = this.fb.group(
      {
        title: [null, Validators.required],
        price: [null, Validators.required],
        location: [null, Validators.required],
        description: [null],
        tags: [null, Validators.required],
      });
  }

  workdone() {
    if (!this.isworkdone) {
      this.isworkdone = true;
    } else {
      this.register();
    }

  }
  register() {
    if (this.createModel.valid) {
      let user: User = JSON.parse(localStorage.getItem('user'));
      this.model = Object.assign({}, this.createModel.value);
      this.model.photos = this.photos;
      if (this.createModel.value.tags) {
        this.tags = this.getTags(this.createModel.value.tags);
      }
      const code = Guid.codeGuid();
      this.model.code = code;
      this.model.uid = user.uid;
      this.postService.createPost(this.model).then(data => {
        if (user.posts instanceof Array) {
          user.posts.push(data);
        } else {
          user.posts = new Array<string>();
          user.posts.push(data);
        }
        this.tags.forEach(x => {
          this.postService.createTags(x, data);

        });
        this.userService.updateUser(user).finally(() => {
          this.router.navigate([`/posts/${data}`]);
        });
      }, reason => {
        console.log(reason)
      });

    }
  }
  addPhoto(url) {
    this.photos.push(url);
  }
  doneWork(d) {
    this.done = d;
  }
}