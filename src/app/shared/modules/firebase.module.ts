import {NgModule} from '@angular/core';
import {AngularFireModule, FirebaseOptionsToken} from '@angular/fire';
import {environment} from '../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'angularexampleapp'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,


  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
})

export class FirebaseModule {
}
