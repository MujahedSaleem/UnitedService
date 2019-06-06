import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Hotkey, HotkeysService } from "angular2-hotkeys";
import { ProgressBarService } from "src/app/core/services/progress-bar.service";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { Guid } from "src/app/modules/messages/shared/util";
import { User } from "src/app/modules/users/shared/user.model";
import { PostService } from "../../../../core/services/Post.service";
import { Post } from "../../shared/post.model";
@Component({
  selector: "app-post-create-page",
  templateUrl: "./post-create-page.component.html",
  styleUrls: ["./post-create-page.component.css"],
})
export class PostCreatePageComponent implements OnInit {

  public createModel: FormGroup;
  public isworkdone = false;
  public model: Post;
  public photos = new Array();
  public load = true;
  public lat; public lon;
  public locations;
  public url;
  public mainLocation;
  public done: boolean = false;
  public zoom;
  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;
  public tags: string[];
  constructor(private fb: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private auth: UserAuthService,
              private userService: UserUtilsService,
              private _hotkeysService: HotkeysService,
              private progressBarService: ProgressBarService,
              private postService: PostService) {
    this._hotkeysService.add(new Hotkey("ctrl+enter", (event: KeyboardEvent): boolean => {
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

  public ngOnInit() {

    this.progressBarService.increase();

    setTimeout((a) => {
      this.load = false;
      this.progressBarService.decrease();

    }, 700);
    this.createForm();

  }
  public getTags(wrods: string): string[] {
    const values: string[] = new Array();
    wrods.split("#").forEach((val) => {
      if (val !== "") {
        values.push(val);

      }
    });
    return values;
  }
  public createForm() {
    this.createModel = this.fb.group(
      {
        title: [null, Validators.required],
        price: [null, Validators.required],
        location: [null, Validators.required],
        description: [null],
        tags: [null, Validators.required],
      });
  }

  public workdone() {
    if (!this.isworkdone) {
      this.isworkdone = true;
    } else {
      this.register();
    }

  }
  public register() {
    if (this.createModel.valid) {
      const user: User = JSON.parse(localStorage.getItem("user"));
      this.model = Object.assign({}, this.createModel.value);
      this.model.photos = this.photos;
      if (this.createModel.value.tags) {
        this.tags = this.getTags(this.createModel.value.tags);
      }
      const code = Guid.codeGuid();
      this.model.code = code;
      this.model.uid = user.uid;
      this.postService.createPost(this.model).then((data) => {
        if (user.posts instanceof Array) {
          user.posts.push(data);
        } else {
          user.posts = new Array<string>();
          user.posts.push(data);
        }
        this.tags.forEach((x) => {
          this.postService.createTags(x, data);

        });
        this.userService.updateUser(user).finally(() => {
          this.router.navigate([`/posts/${data}`]);
        });
      }, (reason) => {
        console.log(reason);
      });

    }
  }
  public addPhoto(url) {
    this.photos.push(url);
  }
  public doneWork(d) {
    this.done = d;
  }
}
