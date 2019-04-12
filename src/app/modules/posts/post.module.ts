import { NgModule } from '@angular/core';
import { PostDetailPageComponent } from './pages/post-detail-page/post-detail-page.component';
import { PostService } from './shared/Post.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { HeroLoadingComponent } from 'src/app/shared/components/hero-loading/hero-loading.component';
import { PostCreatePageComponent } from './pages/post-create-page/post-create-page.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HotkeyModule } from 'angular2-hotkeys';
import { CommonModule } from '@angular/common';
import { KeyboardShortcutsModule }     from 'ng-keyboard-shortcuts';
@NgModule({
    imports: [
        HotkeyModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        KeyboardShortcutsModule,
        PostRoutingModule],
    declarations: [
        PostDetailPageComponent,
        PostCreatePageComponent,
        ],

    providers: [PostService],
})
export class PostModule { }
