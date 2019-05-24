import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() Comment: any;
  user: Observable<any>;
  constructor(private userService: UserUtilsService) { }

  ngOnInit() {
    this.user = this.userService.getUser(this.Comment.authoruid);
  }

}
