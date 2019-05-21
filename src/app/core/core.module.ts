import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';
import { AuthGuard } from './guard/auth.guard';
import { UserUtilsService } from './services/user-utils.service';
import { AgmCoreModule } from '@agm/core'; 
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
   
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [UserAuthService, AuthGuard, UserUtilsService]

})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
