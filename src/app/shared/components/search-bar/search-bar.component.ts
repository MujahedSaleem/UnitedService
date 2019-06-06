import { map, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoggerService } from '../../../core/services/logger.service';
import { AppConfig } from '../../../configs/app.config';
import { PostService } from 'src/app/core/services/Post.service';
import { Post } from 'src/app/modules/posts/shared/post.model';
import * as _ from 'lodash';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { User } from 'src/app/modules/users/shared/user.model';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  providers: [
    LoggerService
  ]
})

export class SearchBarComponent implements OnInit {

  defaultPosts: Array<User>;
  postFormControl: FormControl;
  postsFiltered: any;
  tags: any = false;

  constructor(private userService: UserUtilsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.defaultPosts = [];
    this.postFormControl = new FormControl();
  }

  ngOnInit() {
    this.postFormControl.valueChanges
      .subscribe(value => {

        this.userService.getUsers(value).subscribe((users: Array<User>) => {
          this.postsFiltered = users;
        });
      });

  }

  setValue(i, e) {
    if (e.checked) {
      this.tags = 'true'
    } else {
      this.tags = 'false'
    }
  }
  filterHeroes(val: string = ''): User[] {
    // if (this.tags) {
    //   return val ? this.defaultPosts.filter(post => post.description.toLowerCase().includes(val.toLowerCase())
    //                     && post.tags.filter(a => a.toLowerCase().includes(val.toString()))) : this.defaultPosts;

    // }
    let User = new Array<User>();

    return User;
  }

  searchHero(hero: User) {
    LoggerService.log('Moved to hero with id: ' + hero.uid);

    return this.router.navigate(['/', hero.uid], { replaceUrl: true });

  }
}
