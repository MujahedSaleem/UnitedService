import { Component, Inject, Input, OnInit, PLATFORM_ID, OnChanges } from '@angular/core';
import { AppConfig } from '../../../configs/app.config';
import { HeroService } from '../../../modules/heroes/shared/hero.service';
import { Hero } from '../../../modules/heroes/shared/hero.model';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Post } from 'src/app/modules/posts/shared/post.model';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/core/services/Post.service';
import { User } from 'src/app/modules/users/shared/user.model';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {


  @Input() post: Post;

  canComment: boolean = false;
  tags: Observable<Array<string>>;
  photo:Observable<any>;
  constructor(public auth: UserAuthService,
    private router: Router,
    private userservice: UserUtilsService,
    private postser: PostService,
    private i18n: I18n,
    @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.tags = this.postser.getTags(this.post.id);
    this.photo = this.userservice.getUser(this.post.uid);

  }
  sendMessage() {
    this.router.navigate([`/messages/${this.post.uid}`]);
  }
  seePostDetails(post: Post) {
    this.router.navigate([`/${this.post.uid}`]);

  }
  // like(hero: Hero) {
  //     this.snackBar.open(this.i18n({ value: 'Can\'t vote anymore', id: '@@cannotVote' }), '', { duration: 1000 });
  //    }


}
