import { Component, Input, OnInit } from "@angular/core";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { User } from "src/app/modules/users/shared/user.model";
import { Review } from "./review-card";

@Component({
  selector: "app-review-card",
  templateUrl: "./review-card.component.html",
  styleUrls: ["./review-card.component.scss"],
})
export class ReviewCardComponent implements OnInit {
  @Input() public review: Review;
  public user: User;
  constructor(private userService: UserUtilsService) { }

  public async ngOnInit() {
    this.user = await this.userService.getUserPromise(this.review.uid);

  }
}
