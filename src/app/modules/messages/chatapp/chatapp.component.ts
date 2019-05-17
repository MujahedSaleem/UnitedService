import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit {
  id: string;
  constructor(private chatSvc: ChatService,private ActivatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.id =this.ActivatedRouter.snapshot.params['id'];

  }

 

}
