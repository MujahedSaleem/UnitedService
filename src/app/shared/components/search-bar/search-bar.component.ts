import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map, startWith } from "rxjs/operators";

import * as _ from "lodash";
import { PostService } from "src/app/core/services/Post.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { Post } from "src/app/modules/posts/shared/post.model";
import { User } from "src/app/modules/users/shared/user.model";
import { AppConfig } from "../../../configs/app.config";
import { LoggerService } from "../../../core/services/logger.service";
@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  providers: [
    LoggerService,
  ],
})

export class SearchBarComponent implements OnInit {

  public defaultPosts: User[];
  public postFormControl: FormControl;
  public postsFiltered: any;
  public tags: any = false;

  constructor(private userService: UserUtilsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.defaultPosts = [];
    this.postFormControl = new FormControl();
  }

  public ngOnInit() {
    this.postFormControl.valueChanges
      .subscribe((value) => {

        this.userService.getUsers(value).subscribe((users: User[]) => {
          this.postsFiltered = users;
        });
      });

  }

  public setValue(i, e) {
    if (e.checked) {
      this.tags = "true";
    } else {
      this.tags = "false";
    }
  }
  public filterHeroes(val: string = ""): User[] {
    // if (this.tags) {
    //   return val ? this.defaultPosts.filter(post => post.description.toLowerCase().includes(val.toLowerCase())
    //                     && post.tags.filter(a => a.toLowerCase().includes(val.toString()))) : this.defaultPosts;

    // }
    const User = new Array<User>();

    return User;
  }

  public searchHero(hero: User) {
    LoggerService.log("Moved to hero with id: " + hero.uid);

    return this.router.navigate(["/", hero.uid], { replaceUrl: true });

  }
}
