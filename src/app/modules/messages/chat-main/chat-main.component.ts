import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { timeout } from "q";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { LoggerService } from "src/app/core/services/logger.service";
import { ProgressBarService } from "src/app/core/services/progress-bar.service";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { Message } from "../../users/shared/message.model";
import { User } from "../../users/shared/user.model";
import { ChatMessage } from "../model/chat-message";
import { ChatUser } from "../model/chat-user";
import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-chat-main",
  templateUrl: "./chat-main.component.html",
  styleUrls: ["./chat-main.component.css"],
})
export class ChatMainComponent implements OnInit {
  public userId: string;
  public messagesContainer: string = "Unread";
  public currentRoom: string;
  public messages: ChatMessage[];
  public users: BehaviorSubject<any[]>;
  public name: string;
  private subscriptions: Subscription[] = [];
  constructor(
    private progressBar: ProgressBarService,
    private atuhservice: UserAuthService,
    private rotue: ActivatedRoute,
    private router: Router,
    private messageService: ChatService,
    private alertify: LoggerService,
  ) {
    this.users = new BehaviorSubject<any[]>([]);
  }

  public ngOnInit() {
    this.progressBar.increase();
    if (!this.atuhservice.isUserSignedIn()) {
      this.router.navigate(["404"]);
    }

    this.messageService.getMessages(`${this.messagesContainer}`).subscribe((data) => {

      this.users.next(data);
      setTimeout(() => {
        this.progressBar.decrease();
      }, 300);
    });
    this.userId = this.atuhservice.currentUser.value.uid;

  }

  public do() {
    this.messageService.getMessages(`${this.messagesContainer}`).subscribe((data) => {

      this.users.next(data);

    });
  }
  public delteMessage(id: string) {
console.log(id);
if (confirm("Are you sure you want to remove this message permetaily !!!")) {
      this.messageService.deleteMessage(id);
    }

  }
}
