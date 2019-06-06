import { NgModule, Optional, SkipSelf } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { NotifierModule } from "angular-notifier";
import { AuthGuard } from "./guard/auth.guard";
import { MessageService } from "./services/Message.service";
import { PostService } from "./services/Post.service";
import { UserAuthService } from "./services/user-auth.service";
import { UserUtilsService } from "./services/user-utils.service";
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    NotifierModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,

  ],
  providers: [PostService, MessageService, UserAuthService, AuthGuard, UserUtilsService],

})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
