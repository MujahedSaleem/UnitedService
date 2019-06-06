import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HotkeyModule } from "angular2-hotkeys";
import { KeyboardShortcutsModule } from "ng-keyboard-shortcuts";
import { HeroLoadingComponent } from "src/app/shared/components/hero-loading/hero-loading.component";
import { SharedModule } from "src/app/shared/shared.module";
import { PostService } from "../../core/services/Post.service";
import { PhotoEditorComponent } from "../users/components/Photo-Editor/Photo-Editor.component";
import { UsereModule } from "../users/user.module";
import { PostCreatePageComponent } from "./pages/post-create-page/post-create-page.component";
import { PostDetailPageComponent } from "./pages/post-detail-page/post-detail-page.component";
import { PostRoutingModule } from "./post-routing.module";
@NgModule({
    imports: [
        PostRoutingModule,
        HotkeyModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        UsereModule,
        SharedModule,
        KeyboardShortcutsModule,
        ],
    declarations: [
        PostDetailPageComponent,
        PostCreatePageComponent,
    ],

    providers: [PostService],
})
export class PostModule { }
