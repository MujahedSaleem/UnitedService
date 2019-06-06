import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { ChatFooterComponent } from "./chat-footer/chat-footer.component";
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { WebcamDialog } from "./chat-header/chat-header.component";

import { WebCamModule } from "ack-angular-webcam";

import {
  PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
};

import { ObserversModule } from "@angular/cdk/observers";
import { PlatformModule } from "@angular/cdk/platform";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule, MatInputModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { ButtonsModule } from "ngx-foundation";
import { FirebaseModule } from "src/app/shared/modules/firebase.module";
import { MaterialModule } from "src/app/shared/modules/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { environment } from "src/environments/environment";
import { ChatMainComponent } from "./chat-main/chat-main.component";
import { ChatappComponent } from "./chatapp/chatapp.component";
import { MessageRoutingModule } from "./message-routing.module";
import { ActiveService } from "./services/active.service";
import { ChatService } from "./services/chat.service";
/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ObserversModule,
    ButtonsModule.forRoot(),
    PlatformModule,
    MessageRoutingModule,
    FirebaseModule,
    PerfectScrollbarModule,
    WebCamModule,
    SharedModule,
  ],
  entryComponents: [WebcamDialog],
  declarations: [
    WebcamDialog,
    ChatWindowComponent,
    ChatFooterComponent,
    ChatHeaderComponent,
    ChatappComponent,
    ChatMainComponent,
  ],
  providers: [
    ChatService,
    ActiveService,
    AngularFirestore,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  exports: [
    ChatWindowComponent,
    ChatFooterComponent,
    ChatHeaderComponent,

  ],
})
export class ChatModule { }
