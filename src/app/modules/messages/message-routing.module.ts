import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatMainComponent } from "./chat-main/chat-main.component";
import { ChatappComponent } from "./chatapp/chatapp.component";

const routes = [

  {
    path: ":id",
    component: ChatappComponent,
  },
  {
    path: "**",
    component: ChatMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class MessageRoutingModule { }
