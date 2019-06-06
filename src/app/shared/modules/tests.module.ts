import {NgModule, TRANSLATIONS, TRANSLATIONS_FORMAT} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {ProgressBarService} from "../../core/services/progress-bar.service";
import {FirebaseModule} from "./firebase.module";
import {MaterialModule} from "./material.module";

declare const require;

@NgModule({
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterTestingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FirebaseModule,
  ],
  providers: [
    {provide: TRANSLATIONS, useValue: require(`raw-loader!./../../../i18n/messages.en.xlf`)},
    {provide: TRANSLATIONS_FORMAT, useValue: "xlf"},
    I18n,
    ProgressBarService,
  ],
})

export class TestsModule {
}
