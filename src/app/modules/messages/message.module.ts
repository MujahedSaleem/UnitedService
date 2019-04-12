import { NgModule } from '@angular/core';

import { MessagesUtilsService } from './shared/messages-utils.service';
import { MessageRouteModule } from './message-routing.module';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,FormsModule,MessageRouteModule, MaterialModule],
    exports: [MaterialModule],
    declarations: [MessagePageComponent],
    providers: [MessagesUtilsService],
})
export class MessageModule { }
