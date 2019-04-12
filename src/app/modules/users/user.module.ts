import { NgModule } from '@angular/core';
import { PostService } from '../posts/shared/Post.service';
import { MemberCardComponent } from './components/member-Card/member-Card.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeagoModule } from 'ngx-timeago';



@NgModule({
    imports: [ CommonModule, FormsModule,MaterialModule, RouterModule, UserRoutingModule,SharedModule,TimeagoModule.forRoot()],
    providers: [PostService],
    declarations: [EditUserPageComponent, MemberCardComponent],
    entryComponents: [MemberCardComponent],
})
export class UsereModule { }
