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
import { PresenceService } from '../../../core/services/presence.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit, AfterViewInit, OnDestroy {

  name: string;
  chats: ChatMessage[] = [];
  isContentLoader = true;
  public disabled = false;
  public type = 'component';
  public config: PerfectScrollbarConfigInterface = {};
  user: User;
  @ViewChild(PerfectScrollbarComponent, { static: true }) componentRef?: PerfectScrollbarComponent;
  @ViewChild('chatPS', { static: true }) chatPS?: PerfectScrollbarComponent;
  @Input() reciverId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private chatSvc: ChatService,
    public userActive: PresenceService,
    private atuhservice: UserAuthService,
    public active: PresenceService,
    private userService: UserUtilsService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.active.setPresence('online');
    if (this.reciverId) {
      this.userService.getUser(this.reciverId).subscribe(async (user: User) => {
        this.user = user;
        this.isContentLoader = false;
        this.chatSvc.setName(this.user.displayName);
        this.chatSvc.doUserHaveMessage(this.atuhservice.currentUser.value.uid, this.reciverId).subscribe(async data => {
          if (data.length > 0) {
            let m = await this.chatSvc.getAllChatMessages(this.atuhservice.currentUser.value.uid, this.reciverId);
            this.subscriptions.push(m.subscribe((results) => {
              if (results) {
                this.chatSvc.updateMessages(this.atuhservice.currentUser.value.uid, { 'isRead': true }, results.room)

                setTimeout(() => {

                  this.chats = results.messages.sort((a: any, b: any) => {
                    return a.message_date['seconds'] - b.message_date['seconds'];
                  });
                  this.cd.detectChanges();
                  this.chatPS.directiveRef.scrollToBottom(0, 300);
                }, 1100)

              }
            }));

          }
        })



      });
    }
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.chatSvc.getUserName().subscribe((result) => {
        console.log('ngAfterViewInit' + JSON.stringify(result));
        const jsonName = JSON.stringify(result);
        if ((typeof (result) === 'undefined') || (jsonName === '{}')) {
          console.log('NAME >' + JSON.stringify(result));
          setTimeout(() => {
            this.name = result;
            this.isContentLoader = false;
          });
        }
      }));


  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
    this.cd.detach();
  }

  onScrollEvent(event) { }
}



