import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { User } from "../../shared/user.model";

@Component({
  selector: "app-member-card",
  templateUrl: "./member-Card.component.html",
  styleUrls: ["./member-Card.component.css"],
})
export class MemberCardComponent implements OnInit {
  public recipientId: string;
  public userId: any;
  public done: any = true;
  @Input() public user: User;
  constructor(
    private userService: UserUtilsService,
    private route: ActivatedRoute,
  ) {}
  public ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem("user"));
    this.recipientId = this.user.uid;
  }
  public message() {
    this.done = false;
}
}
