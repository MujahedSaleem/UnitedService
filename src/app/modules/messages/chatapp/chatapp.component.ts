import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-chatapp",
  templateUrl: "./chatapp.component.html",
  styleUrls: ["./chatapp.component.css"],
})
export class ChatappComponent implements OnInit {
  public id: string;
  constructor(private atuhservice: UserAuthService, private router: Router, private ActivatedRouter: ActivatedRoute) { }

  public ngOnInit() {
    if (!this.atuhservice.isUserSignedIn()) {
      this.router.navigate(["404"]);
          }
    this.id = this.ActivatedRouter.snapshot.params.id;

  }

}
