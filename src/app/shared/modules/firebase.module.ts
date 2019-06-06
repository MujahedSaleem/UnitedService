import { NgModule } from "@angular/core";
import { AngularFireModule, FirebaseOptionsToken } from "@angular/fire";
import { AngularFirestore, FirestoreSettingsToken } from "@angular/fire/firestore";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";
const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: "bar" }),
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
  ],
})

export class FirebaseModule {
}
