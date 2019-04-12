import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/user.model';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-Card.component.html',
  styleUrls: ['./member-Card.component.css']
})
export class MemberCardComponent implements OnInit {
  recipientId: string;
  userId: any;
  done: any = true;
  @Input() user: User;
  constructor(
    private userService: UserUtilsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user'));
    this.recipientId = this.user.uid;
  }
  message() {
    this.done = false;
}
}
