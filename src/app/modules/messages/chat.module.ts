import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebcamDialog } from './chat-header/chat-header.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { WebCamModule } from 'ack-angular-webcam';

import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

import { SentimentComponent } from './sentiment/sentiment.component';


import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { VideocallComponent } from './videocall/videocall.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MessageRoutingModule } from './message-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatDialogModule } from '@angular/material';
import { ChatService } from './services/chat.service';
import { environment } from 'src/environments/environment';
import { ChatappComponent } from './chatapp/chatapp.component';
import { FirebaseModule } from 'src/app/shared/modules/firebase.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsModule } from 'ngx-foundation';
import { ActiveService } from './services/active.service';
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SharedModule,
  ],
  entryComponents: [WebcamDialog],
  declarations: [
    WebcamDialog,
    ChatWindowComponent,
    ChatFooterComponent,
    ChatHeaderComponent,
    ChatappComponent,
    VideocallComponent,
    SentimentComponent,
    ChatMainComponent
  ],
  providers: [
    ChatService,
    ActiveService,
    AngularFirestore,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [
    ChatWindowComponent,
    ChatFooterComponent,
    ChatHeaderComponent,

  ]
})
export class ChatModule { }