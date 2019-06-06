import { Component, OnInit, Input } from '@angular/core';
import { Review } from './review-card';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { User } from 'src/app/modules/users/shared/user.model';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  @Input() review: Review;
  user: User;
  constructor(private userService: UserUtilsService) { }

  async ngOnInit() {
    this.user = await this.userService.getUserPromise(this.review.uid);

  }
}
