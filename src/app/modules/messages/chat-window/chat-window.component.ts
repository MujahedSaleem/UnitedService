import {
  Component, Inject, Output, EventEmitter, OnInit, ViewChild, ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  Input,
  OnDestroy
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent
} from 'ngx-perfect-scrollbar';
import { ChatMessage } from '../model/chat-message';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { User } from '../../users/shared/user.model';
import { Subscription } from 'rxjs';
import { ActiveService } from '../services/active.service';
import { PresenceService } from 'src/app/core/services/presence.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit, AfterViewInit, OnDestroy {

  name: string;
  chats: ChatMessage[] = [];
  isContentLoader: boolean = true;
  public disabled: boolean = false;
  public type: string = 'component';
  public config: PerfectScrollbarConfigInterface = {};
  user: User;
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild('chatPS') chatPS?: PerfectScrollbarComponent;
  @Input() reciverId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private chatSvc: ChatService,
    public userActive: PresenceService,

    public active: ActiveService,
    private userService: UserUtilsService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.active.setPresence('online');
    this.userService.getUser(this.reciverId).subscribe((user: User) => {
      this.user = user;

      this.isContentLoader = false;
      this.chatSvc.setName(this.user.displayName);


      this.chatSvc.getAllChatMessages(this.reciverId).subscribe((results) => {
        setTimeout(() => {
          this.chats = results.sort((a: any, b: any) => {
            return a.message_date['seconds'] - b.message_date['seconds'];

          });
          this.active.getPresence(this.reciverId).subscribe(precence => {
            this.chats.forEach(x => {
              if (x.senderId === this.userService.userdata.value.uid) {
                x.isRead = true;
              }
            });
            if (precence === 'online') {
              this.chatSvc.updateMessages(this.userService.userdata.value, {
                isRead: true
              });
            }
          
          });
          this.cd.detectChanges();
          this.chatPS.directiveRef.scrollToBottom(0, 300);
        }, 1100);
      });
    });
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.chatSvc.getUserName().subscribe((result) => {
        console.log("ngAfterViewInit" + JSON.stringify(result));
        let jsonName = JSON.stringify(result)
        if ((typeof (result) === 'undefined') || (jsonName == '{}')) {
          console.log("NAME > " + JSON.stringify(result));
          setTimeout(() => {
            this.name = result;
            this.isContentLoader = false;
          });
        }
      }));


  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
    this.active.setPresence('away');
    this.userActive.updateOnAway();
  }

  onScrollEvent(event) { }
}



