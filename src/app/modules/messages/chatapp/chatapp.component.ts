import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit {
  id: string;
  constructor(private atuhservice: UserAuthService,private router: Router,private ActivatedRouter:ActivatedRoute) { }

  ngOnInit() {
    if (!this.atuhservice.isUserSignedIn()) {
      this.router.navigate(['404']);
          }
    this.id =this.ActivatedRouter.snapshot.params['id'];

  }

 

}
