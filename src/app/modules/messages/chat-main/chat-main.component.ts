import { Component, OnInit } from '@angular/core';
import { Message } from '../../users/shared/message.model';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger.service';
import { ChatService } from '../services/chat.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../model/chat-message';
import { User } from '../../users/shared/user.model';
import { ChatUser } from '../model/chat-user';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.css']
})
export class ChatMainComponent implements OnInit {
  userId: string;
  messagesContainer: string = 'Unread';
  currentRoom: string;
  private subscriptions: Subscription[] = [];
  messages: ChatMessage[];
  users: BehaviorSubject<any[]>
  constructor(
    private userService: UserUtilsService,
    private atuhservice: UserAuthService,
    private rotue: ActivatedRoute,
    private messageService: ChatService,
    private alertify: LoggerService
  ) {
    this.users = new BehaviorSubject<any[]>([]);
  }

  ngOnInit() {
    this.messageService.getMessages(`${this.messagesContainer}`).subscribe(data => {

      this.users.next(data);

    });
    this.userId = this.atuhservice.currentUser.value.uid;
  }

  do() {
    this.messageService.getMessages(`${this.messagesContainer}`).subscribe(data => {

      this.users.next(data);

    });
  }
  delteMessage(id: string) {
   
    if (confirm('Are you sure you want to remove this message permetaily !!!')) {
      this.messageService.deleteMessage(id);
    }

  }
}
