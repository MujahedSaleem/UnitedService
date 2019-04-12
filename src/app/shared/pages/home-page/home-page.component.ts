import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../../../modules/heroes/shared/hero.model';
import { HeroService } from '../../../modules/heroes/shared/hero.service';
import { AppConfig } from '../../../configs/app.config';
import { UtilsHelperService } from '../../../core/services/utils-helper.service';
import { PostService } from 'src/app/modules/posts/shared/Post.service';
import { Post } from 'src/app/modules/posts/shared/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [UtilsHelperService.fadeInOut()]
})

export class HomePageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  posts: Post[] = null;
  workdone: boolean = false;

  constructor(private postService: PostService) {
  }
  ngOnInit() {
    this.subscriptions.push(
      this.postService.getPosts().subscribe((posts: Array<Post>) => {
        this.posts = posts.slice(0, AppConfig.topHeroesLimit);
        this.workdone = true;

      }, () => {
        this.workdone = true;
      }));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
