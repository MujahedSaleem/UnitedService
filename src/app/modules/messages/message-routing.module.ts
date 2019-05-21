import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatappComponent } from './chatapp/chatapp.component';
import { ChatMainComponent } from './chat-main/chat-main.component';

const routes = [
  

  {
    path: ':id',
    component: ChatappComponent,
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