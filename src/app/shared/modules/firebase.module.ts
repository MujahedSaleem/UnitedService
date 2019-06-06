import { NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { FirestoreSettingsToken, AngularFirestore } from '@angular/fire/firestore';
import { FirebaseOptionsToken, AngularFireModule } from '@angular/fire';
import { BehaviorSubject } from 'rxjs';
const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};
@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,

  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    { provide: AngularFirestore, useValue: FirestoreStub },
    { provide: FirebaseOptionsToken, useValue: environment.firebase },
    { provide: FirestoreSettingsToken, useValue: {} },
  ]
})

export class FirebaseModule {
}
