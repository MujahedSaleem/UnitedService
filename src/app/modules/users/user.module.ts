import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StarRatingModule } from "angular-star-rating";
import { FileSizeModule } from "ngx-filesize";
import { NgxGalleryModule } from "ngx-gallery";
import { TimeagoModule } from "ngx-timeago";
import { DropZoneDirective } from "src/app/shared/directive/DropZone.directive";
import { MaterialModule } from "src/app/shared/modules/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PostService } from "../../core/services/Post.service";
import { MemberCardComponent } from "./components/member-Card/member-Card.component";
import { PhotoEditorComponent } from "./components/Photo-Editor/Photo-Editor.component";
import { DetailUserPageComponent } from "./pages/detail-user-page/detail-user-page.component";
import { EditUserPageComponent } from "./pages/edit-user-page/edit-user-page.component";
import { PhotoService } from "./shared/Photo.service";
import { UserRoutingModule } from "./user-routing.module";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StarRatingModule.forRoot(),
        NgxGalleryModule,
        FileSizeModule,
        MaterialModule,
        RouterModule,
        UserRoutingModule,
        SharedModule,
        TimeagoModule.forRoot()],

    providers: [PhotoService],
    declarations: [EditUserPageComponent, DetailUserPageComponent, MemberCardComponent, PhotoEditorComponent, DropZoneDirective],
    entryComponents: [MemberCardComponent],
    exports: [PhotoEditorComponent],
})
export class UsereModule { }
