import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/modules/heroes/shared/hero.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/modules/heroes/shared/hero.model';
import { Location } from '@angular/common';
import { AppConfig } from 'src/app/configs/app.config';
import { UtilsHelperService } from 'src/app/core/services/utils-helper.service';
import { PostService } from '../../shared/Post.service';
import { Post } from '../../shared/post.model';

@Component({
  selector: 'app-post-detail-page',
  templateUrl: './post-detail-page.component.html',
  styleUrls: ['./post-detail-page.component.scss'],
  animations: [UtilsHelperService.fadeInOut()]

})
export class PostDetailPageComponent implements OnInit {
  post: Post;
  canVote: boolean;

  constructor(private postService: PostService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.getPost(postId).then(a => {
      console.log(a.toJSON() as Post)
   this.post = new Post({id: a.key, ...a.toJSON() as Post})
    });
  }
  goBack(): void {
    this.location.back();
  }

  goToTheAnchor(): void {
    this.router.navigate([`/${AppConfig.routes.heroes}/${this.post.id}`], {fragment: 'heroe-detail'});
  }
}
