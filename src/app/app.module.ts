import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import localeAr from "@angular/common/locales/ar";
import localeEs from "@angular/common/locales/es";
import { ErrorHandler, LOCALE_ID, NgModule, TRANSLATIONS } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { NgxExampleLibraryModule } from "@ismaestro/ngx-example-library";
import { I18n } from "@ngx-translate/i18n-polyfill";
import { NgxAuthFirebaseUIModule } from "ngx-auth-firebaseui";
import { NgxGalleryModule } from "ngx-gallery";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { APP_CONFIG, AppConfig } from "./configs/app.config";
import { CoreModule } from "./core/core.module";
import { SentryErrorHandler } from "./core/sentry.errorhandler";
import { FirebaseModule } from "./shared/modules/firebase.module";
import { SharedModule } from "./shared/shared.module";
declare const require;
registerLocaleData(localeEs, "es");
registerLocaleData(localeAr, "ar");

@NgModule({
  imports: [
    FirebaseModule,
    BrowserModule.withServerTransition({ appId: "UnitedScoial" }),
    HttpClientModule,

    NgxGalleryModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),

    NgxExampleLibraryModule.forRoot({
      config: {
        say: "hello",
      },
    }),

    CoreModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: ErrorHandler, useClass: SentryErrorHandler },

    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || "en";
        return require(`raw-loader!../i18n/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID],
    },
    I18n,
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}
