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
import { PhotoEditorComponent } from './components/Photo-Editor/Photo-Editor.component';
import { PhotoService } from './shared/Photo.service';
import { DropZoneDirective } from 'src/app/shared/directive/DropZone.directive';
import {FileSizeModule} from 'ngx-filesize';
import { NgxGalleryModule } from 'ngx-gallery';
import { DetailUserPageComponent } from './pages/detail-user-page/detail-user-page.component';
@NgModule({
    imports: [
         CommonModule,
        FormsModule,
        NgxGalleryModule,
        FileSizeModule,
        MaterialModule,
        RouterModule,
        UserRoutingModule,
        SharedModule,
        TimeagoModule.forRoot()],
        
    providers: [PostService, PhotoService],
    declarations: [EditUserPageComponent,DetailUserPageComponent, MemberCardComponent, PhotoEditorComponent,DropZoneDirective],
    entryComponents: [MemberCardComponent],
})
export class UsereModule { }
