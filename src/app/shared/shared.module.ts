import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { NgxExampleLibraryModule } from '@ismaestro/ngx-example-library';
import { HeroLoadingComponent } from './components/hero-loading/hero-loading.component';
import { NgxScrollToFirstInvalidModule } from '@ismaestro/ngx-scroll-to-first-invalid';
import { LoadingPlaceholderComponent } from './components/loading-placeholder/loading-placeholder.component';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { PostCardComponent } from './components/post-card/post-card.component';
import { TimeagoModule } from 'ngx-timeago';
import { CommentComponent } from '../modules/posts/components/comment/comment.component';
import { MatIconModule } from '@angular/material';
import { DropZoneDirective } from './directive/DropZone.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    NgxExampleLibraryModule,
    NgxScrollToFirstInvalidModule,
    TimeagoModule.forChild(),
    MatIconModule,
  ],
  declarations: [
    HomePageComponent,
    CommentComponent,
    Error404PageComponent,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    LoadingPlaceholderComponent,
    PostCardComponent

  ],
  exports: [
    CommonModule,
    PostCardComponent,
    MaterialModule,
    FlexLayoutModule,
    NgxExampleLibraryModule,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    NgxScrollToFirstInvalidModule,
    LoadingPlaceholderComponent,
    FormsModule
  ],
})

export class SharedModule {
}
