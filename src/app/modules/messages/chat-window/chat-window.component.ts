import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import {
  PerfectScrollbarComponent,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import { Subscription } from "rxjs";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { PresenceService } from "../../../core/services/presence.service";
import { User } from "../../users/shared/user.model";
import { ChatMessage } from "../model/chat-message";
import { ActiveService } from "../services/active.service";
import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-chat-window",
  templateUrl: "./chat-window.component.html",
  styleUrls: ["./chat-window.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent implements OnInit, AfterViewInit, OnDestroy {

  public name: string;
  public displayName: string;
  public chats: ChatMessage[] = [];
  public isContentLoader = true;
  public disabled = false;
  public type = "component";
  public config: PerfectScrollbarConfigInterface = {};
  public user: User;
  @ViewChild(PerfectScrollbarComponent, { static: true }) public componentRef?: PerfectScrollbarComponent;
  @ViewChild("chatPS", { static: true }) public chatPS?: PerfectScrollbarComponent;
  @Input() public reciverId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private chatSvc: ChatService,
    public userActive: PresenceService,
    private atuhservice: UserAuthService,
    public active: PresenceService,
    private userService: UserUtilsService,
    private cd: ChangeDetectorRef) { }

  public ngOnInit() {

    this.active.setPresence("online");
    if (this.reciverId) {
      this.displayName = this.atuhservice.currentUser.value.displayName;
      this.chatSvc.getUserName().subscribe((result) => {
        console.log("ChatHeaderComponent" + result);
        this.name = result;
      });
      this.userService.getUser(this.reciverId).subscribe(async (user: User) => {
        this.user = user;
        this.isContentLoader = false;
        this.chatSvc.setName(this.user.displayName);
        this.chatSvc.doUserHaveMessage(this.atuhservice.currentUser.value.uid, this.reciverId).subscribe(async (data) => {
          if (data.length > 0) {
            const m = await this.chatSvc.getAllChatMessages(this.atuhservice.currentUser.value.uid, this.reciverId);
            this.subscriptions.push(m.subscribe((results) => {
              if (results) {
                this.chatSvc.updateMessages(this.atuhservice.currentUser.value.uid, { isRead: true }, results.room);

                setTimeout(() => {

                  this.chats = results.messages;
                  this.cd.detectChanges();
                  this.chatPS.directiveRef.scrollToBottom(0, 300);
                }, 1100);

              }
            }));

          }
        });

      });
    }
  }

  public ngAfterViewInit() {
    this.subscriptions.push(
      this.chatSvc.getUserName().subscribe((result) => {
        console.log("ngAfterViewInit" + JSON.stringify(result));
        const jsonName = JSON.stringify(result);
        if ((typeof (result) === "undefined") || (jsonName === "{}")) {
          console.log("NAME >" + JSON.stringify(result));
          setTimeout(() => {
            this.name = result;
            this.isContentLoader = false;
          });
        }
      }));

  }
  public ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
    this.cd.detach();
  }

  public onScrollEvent(event) { }
}
