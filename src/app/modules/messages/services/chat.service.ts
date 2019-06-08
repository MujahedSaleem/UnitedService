import { Injectable } from "@angular/core";
import { Action, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from "@angular/fire/firestore";
import { BehaviorSubject, from, interval, Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { AppConfig } from "src/app/configs/app.config";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { TSMap } from "typescript-map";
import { Message } from "../../users/shared/message.model";
import { User } from "../../users/shared/user.model";
import { ChatMessage } from "../model/chat-message";
import { ChatUser } from "../model/chat-user";

@Injectable({
  providedIn: "root",
})

export class ChatService {
  public userdata: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public CUrrentUser: User;
  public sederId: string;
  private chatsCollection: AngularFirestoreCollection<ChatMessage>;
  private chatsContainerCollection: AngularFirestoreDocument<any>;
  constructor(private db: AngularFirestore, private auth: UserAuthService,
    private userService: UserUtilsService) {
    this.sederId = JSON.parse(localStorage.getItem("user")).uid;
  }

  public setName(name) {
    this.userdata.next(name);
  }

  public getUserName(): Observable<any> {
    return this.userdata.asObservable();
  }
  public async deleteMessage(reciverId) {
    const x = await this.db.doc(`users/${this.auth.currentUser.value.uid}`).collection("chats").
      ref.where("uid", "==", reciverId).get();
    if (!x.empty) {
      this.db.doc(`users/${this.auth.currentUser.value.uid}/chats/${x.docs[0].id}`).delete();
    }

  }
  public getRoomId(uid, rid) {

    return this.db.doc(`users/${uid}`).collection("chats", (ref) => ref.where("uid", "==", rid)).get();

  }
  public doUserHaveMessage(uid, rid) {
    return this.db.doc(`users/${uid}`).collection("chats", (ref) => ref.where("uid", "==", rid)).snapshotChanges();

  }
  public async getAllChatMessages(uid: string, rid):
    Promise<Observable<{
      messages: ChatMessage[];
      room: string;
    }>> {
    const data = await this.db.doc(`users/${uid}`).collection("chats", (ref) => ref.where("uid", "==", rid)).ref.get();
    if (!data.empty) {
      const roomId = data.docs[0].data().room;
      return this.db.doc(`chats/${roomId}`).collection<ChatMessage>("messages", ref => ref.orderBy('message_date')).snapshotChanges().pipe(
        map((data) => {
          const m: ChatMessage[] = new Array<ChatMessage>();
          if (data.length !== 0) {
            data.forEach((item) => {
              m.push(item.payload.doc.data());
            });
            return { messages: m, room: roomId };
          }
          return null;
        }),
      );
    }
  }
  public updateMessages(senderId, value, roomId) {
    this.db.doc(`chats/${roomId}`).collection("messages").ref
      .where("reciverId", "==", senderId).where("isRead", "==", false)
      .onSnapshot(((data) => {
        data.forEach((z) => {
          this.db.doc(`chats/${roomId}/messages/${z.id}`).update(value);

        });
      }));

  }
  public getMessages(type: string): Observable<any[]> {
    const users = [];
    const current_user: User = this.auth.currentUser.value;

    this.db.doc(`users/${current_user.uid}`).collection("chats").snapshotChanges().subscribe((data) => {
      if (data.length !== 0) {

        data.forEach((x, y) => {

          switch (type) {
            case "Unread":
              this.chatsCollection = this.db.doc(`chats/${x.payload.doc.data().room}`).collection("messages");
              this.chatsCollection.ref.where("isRead", "==", false).where("reciverId", "==", current_user.uid)
                .onSnapshot((chat) => {

                  const m = [];
                  chat.docs.forEach((doc) => {
                    const x: string = doc.data().senderId;
                    if (m.indexOf(x) === -1) {
                      m.push(x);
                      this.userService.getUser(x).subscribe((d) => {
                        users.push(d);
                      });
                    }
                  });
                });

              break;
            case "Inbox":
              this.chatsCollection = this.db.collection(`chats`).doc(x.payload.doc.data().room).collection("messages");
              this.chatsCollection.ref.where("reciverId", "==", current_user.uid)
                .onSnapshot((chat) => {
                  const m = [];
                  chat.forEach((doc) => {
                    const x: string = doc.data().senderId;
                    if (m.indexOf(x) === -1 && x != current_user.uid) {
                      m.push(x);
                      this.userService.getUser(x).subscribe((d) => {
                        users.push(d);
                      });
                    }
                  });
                });

              break;
            case "Outbox":
              this.chatsCollection = this.db.collection(`chats`).doc(x.payload.doc.data().room).collection("messages");
              this.chatsCollection.ref.where("senderId", "==", current_user.uid)
                .onSnapshot((chat) => {
                  const m = [];
                  chat.forEach((doc) => {
                    const x: string = doc.data().reciverId;
                    if (m.indexOf(x) === -1 && x != current_user.uid) {
                      m.push(x);
                      this.userService.getUser(x).subscribe((d) => {
                        users.push(d);
                      });
                    }
                  });
                });
              break;
            default:
              break;
          }

        });
      }
    });

    return of(users);
  }

  public sendMessage(chatMessage: ChatMessage) {

    this.db.doc(`users/${chatMessage.senderId}`).collection("chats").
      ref.where("uid", "==", chatMessage.reciverId).onSnapshot((data) => {
        if (data.empty) {

          this.db.collection(`chats`).add(
            { sederId: chatMessage.senderId, reciverId: chatMessage.reciverId })
            .then((data) => {

              this.db.doc(`users/${chatMessage.senderId}`).collection("chats").add({ uid: chatMessage.reciverId, room: data.id });
              this.db.doc(`users/${chatMessage.reciverId}`).collection("chats").add({ uid: chatMessage.senderId, room: data.id });
              return data.id;
            }).then((id) => {
              this.chatsCollection = this.db.collection(`chats`).doc(`${id}`).collection("messages");
              this.chatsCollection.add(chatMessage);
            });

        } else {
          this.chatsCollection = this.db.collection(`chats`).doc(`${data.docs[0].data().room}`).collection("messages");
          this.chatsCollection.add(chatMessage);

        }
      });

  }

}
