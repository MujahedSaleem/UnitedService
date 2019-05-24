import { map, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero } from '../../../modules/heroes/shared/hero.model';
import { HeroService } from '../../../modules/heroes/shared/hero.service';
import { LoggerService } from '../../../core/services/logger.service';
import { AppConfig } from '../../../configs/app.config';
import { PostService } from 'src/app/core/services/Post.service';
import { Post } from 'src/app/modules/posts/shared/post.model';
import * as _ from 'lodash';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  providers: [
    LoggerService
  ]
})

export class SearchBarComponent implements OnInit {

  defaultPosts: Array<Post>;
  postFormControl: FormControl;
  postsFiltered: any;
  tags: any = false;
  constructor(private postService: PostService,
    private router: Router) {
    this.defaultPosts = [];
    this.postFormControl = new FormControl();
  }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts: Array<Post>) => {
      this.defaultPosts = posts;
      this.postFormControl.valueChanges.pipe(
        startWith(null),
        map(value => this.filterHeroes(value)))
        .subscribe(postsFiltered => {
          this.postsFiltered = postsFiltered;
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
  filterHeroes(val: string): Post[] {
    // if (this.tags) {
    //   return val ? this.defaultPosts.filter(post => post.description.toLowerCase().includes(val.toLowerCase())
    //                     && post.tags.filter(a => a.toLowerCase().includes(val.toString()))) : this.defaultPosts;

    // }
    return val ? this.defaultPosts.
      filter(post => post.description.toLowerCase().indexOf(val.toLowerCase()) === 0) : this.defaultPosts;

  }
  
  searchHero(hero: Post): Promise<boolean> {
    LoggerService.log('Moved to hero with id: ' + hero.id);
    return this.router.navigate([AppConfig.routes.posts + '/' + hero.id]);
  }
}
