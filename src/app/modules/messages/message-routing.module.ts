import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatappComponent } from './chatapp/chatapp.component';
import { VideocallComponent } from './videocall/videocall.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { ChatMainComponent } from './chat-main/chat-main.component';

const routes = [
  {
    path: ':id',
    component: ChatappComponent,
  },
  {
    path: 'video-call',
    component: VideocallComponent,
  },
  {
    path: 'sentiment',
    component: SentimentComponent,
  },

  {
    path: '**',
    component: ChatMainComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class MessageRoutingModule { }