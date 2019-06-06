import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { AngularFirestore } from "angularfire2/firestore";
import { BehaviorSubject } from "rxjs";
import { mergeMapTo } from "rxjs/operators";
import { take } from "rxjs/operators";

@Injectable()
export class MessageService {

  public currentMessage = new BehaviorSubject(null);

  constructor(
    private db: AngularFirestore,

    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      },
    );
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  public updateToken(userId, token) {
    // we can change this function to request our backend service
    this.db.collection("PrivateUserData").doc(userId).set({ messagingTokens: token });

  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  // requestPermission(userId) {
  //   this.angularFireMessaging.requestToken.subscribe(
  //     (token) => {
  //       this.updateToken(userId, token);
  //     },
  //     (err) => {
  //       console.error('Unable to get permission to notify.', err);
  //     }
  //   );
  // }

  /**
   * hook method when new notification received in foreground
   */
  public receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      });
  }
}
