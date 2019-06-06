import { Component, OnInit } from '@angular/core';
import { Message } from '../../users/shared/message.model';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger.service';
import { ChatService } from '../services/chat.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../model/chat-message';
import { User } from '../../users/shared/user.model';
import { ChatUser } from '../model/chat-user';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';
import { timeout } from 'q';

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
    private progressBar: ProgressBarService,
    private atuhservice: UserAuthService,
    private rotue: ActivatedRoute,
    private router: Router,
    private messageService: ChatService,
    private alertify: LoggerService
  ) {
    this.users = new BehaviorSubject<any[]>([]);
  }

  ngOnInit() {
    this.progressBar.increase();
    if (!this.atuhservice.isUserSignedIn()) {
      this.router.navigate(['404']);
    }
    this.messageService.getMessages(`${this.messagesContainer}`).subscribe(data => {

      this.users.next(data);
      setTimeout(() => {
        this.progressBar.decrease();
      }, 300);
    });
    this.userId = this.atuhservice.currentUser.value.uid;

  }
  
  do() {
    this.messageService.getMessages(`${this.messagesContainer}`).subscribe(data => {

      this.users.next(data);

    });
  }
  delteMessage(id: string) {
console.log(id);
    if (confirm('Are you sure you want to remove this message permetaily !!!')) {
      this.messageService.deleteMessage(id);
    }

  }
}
