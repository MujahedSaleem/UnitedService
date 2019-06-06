import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { NgxExampleLibraryModule } from "@ismaestro/ngx-example-library";
import { NgxScrollToFirstInvalidModule } from "@ismaestro/ngx-scroll-to-first-invalid";
import { I18n } from "@ngx-translate/i18n-polyfill";
import { StarRatingModule } from "angular-star-rating";
import { NgxAuthFirebaseUIModule } from "ngx-auth-firebaseui";
import { TimeagoModule } from "ngx-timeago";
import { environment } from "src/environments/environment";
import { CommentComponent } from "../modules/posts/components/comment/comment.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { HeroCardComponent, PhotoDialog } from "./components/hero-card/hero-card.component";
import { HeroLoadingComponent } from "./components/hero-loading/hero-loading.component";
import { LoadingPlaceholderComponent } from "./components/loading-placeholder/loading-placeholder.component";
import { FinishDialog, PostCardComponent } from "./components/post-card/post-card.component";
import { ReviewCardComponent } from "./components/review-card/review-card.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { MaterialModule } from "./modules/material.module";
import { Error404PageComponent } from "./pages/error404-page/error404-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),

    MaterialModule,
    StarRatingModule.forRoot(),
        FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    NgxExampleLibraryModule,
    NgxScrollToFirstInvalidModule,
    TimeagoModule.forChild(),
    MatIconModule,
  ],
  entryComponents: [PhotoDialog, FinishDialog],

  declarations: [
    HomePageComponent,
    CommentComponent,
    Error404PageComponent,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    PhotoDialog,
    FinishDialog,
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    LoadingPlaceholderComponent,
    PostCardComponent,
    ReviewCardComponent,

  ],
  exports: [
    CommonModule,
    PostCardComponent,
    ReviewCardComponent,
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
    FormsModule,
    NgxAuthFirebaseUIModule,
  ],
})

export class SharedModule {
}
