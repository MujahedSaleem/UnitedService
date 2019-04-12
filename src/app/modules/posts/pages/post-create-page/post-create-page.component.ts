import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../shared/post.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { PostService } from '../../shared/Post.service';
import { User } from 'src/app/modules/users/shared/user.model';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
@Component({
  selector: 'app-post-create-page',
  templateUrl: './post-create-page.component.html',
  styleUrls: ['./post-create-page.component.css']
})
export class PostCreatePageComponent implements OnInit {

  createModel: FormGroup;
  isworkdone = false;
  model: Post;
  load = true;
  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserUtilsService,
    private _hotkeysService: HotkeysService,
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
    setTimeout(a => {
      this.load = false
    }, 700)
    console.log('s')
    this.createForm();
  }
  getTags(wrods: string): string[] {
    let values: string[] = new Array();
    wrods.split('#').forEach(val => {
      if (val !== '') {
        values.push(val)

      }
    })
    return values;
  }
  createForm() {
    this.createModel = this.fb.group(
      {
        title: [null, Validators.required],
        description: [null],
        tags: [null],
        price: [null, Validators.required]
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
      this.model.tags = this.getTags(this.createModel.value.tags);
      this.model.uid = user.uid;
      this.model.name = this.userService.getUserName();
      this.postService.createPost(this.model).then(data => {
        if (user.posts instanceof Array) {
          user.posts.push(data.key);
        } else {
          user.posts = new Array<string>();
          user.posts.push(data.key);
        }

        this.userService.updateUser(user).finally(() => {
          this.router.navigate([`/posts/${data.key}`]);
        });
      }, reason => {
        console.log(reason)
      });

    }
  }
}