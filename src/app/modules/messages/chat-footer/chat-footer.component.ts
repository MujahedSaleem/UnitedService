import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ChatService } from '../services/chat.service';
import { SentimentService } from '../services/sentiment.service';
import { Guid } from '../shared/util';
import { environment } from 'src/environments/environment.prod';
import { User } from '../../users/shared/user.model';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../model/chat-message';

declare var MediaRecorder: any;
declare var window: any;

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatFooterComponent implements OnInit {

  messageValue: string = '';
  name: string = null;
  isRecording: boolean = false;
  mediaRecorder: any;
  user: User;
  constructor(private chatSvc: ChatService,
    public snackBar: MatSnackBar,
    public storage: AngularFireStorage,
    private Activatedrouter: ActivatedRoute,
    public sentimentSvc: SentimentService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.chatSvc.getUserName().subscribe((result) => {
      this.name = result;
    });
  }

  onStartRecord() {
    navigator.mediaDevices.getUserMedia({ audio: true }).
      then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = this.audioIsAvailable;
        window.localStream = stream;
        this.mediaRecorder.start();
        this.isRecording = true;
      });
  }

  onStopRecord() {
    this.mediaRecorder.stop();
    window.localStream.getAudioTracks()[0].stop();
    this.isRecording = false;
  }

  onMessage() {
    if (typeof (this.name) !== 'undefined') {
      console.log('messaged send')
      if (this.messageValue !== '') {
        const reciverId = this.Activatedrouter.snapshot.params.id;
        let chatMessage: ChatMessage = {
          message_type: 1,
          message: this.messageValue,
          message_date: new Date(),
          from: this.user.displayName,
          to: this.name,
          imageUrl: null,
          webcamUrl: null,
          audioUrl: null,
          senderId: this.user.uid,
          reciverId: reciverId,
          isRead: false
        };
        this.chatSvc.sendMessage(chatMessage)
        this.messageValue = '';

      }

    }
  }

  // function as expression this works!
  audioIsAvailable = e => {
  //   let id = Guid.newGuid();
  //   const filePath = `${id}.webm`;
  //   console.log(filePath);
  //   let chatMessage = {
  //     message_type: 4,
  //     message: null,
  //     message_date: new Date(),
  //     from: this.name,
  //     audioUrl: environment.firebase_cms_url + filePath + environment.firebase_cms_url_postfix,
  //   };
  //   this.chatSvc.sendMessage(chatMessage).subscribe((result) => {
  //     console.log(result);
  //     const task = this.storage.upload(filePath, e.data);
  //   });
  }
}