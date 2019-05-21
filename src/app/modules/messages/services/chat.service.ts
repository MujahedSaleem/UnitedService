import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, Action, DocumentSnapshot, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ChatMessage } from '../model/chat-message';
import { Message } from '../../users/shared/message.model';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { User } from '../../users/shared/user.model';
import { TSMap } from 'typescript-map';
import { ChatUser } from '../model/chat-user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  public userdata: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private chatsCollection: AngularFirestoreCollection<ChatMessage>;
  private chatsContainerCollection: AngularFirestoreDocument<any>;
  CUrrentUser: User;
  sederId: string;
  constructor(private db: AngularFirestore, private userService: UserUtilsService) {
    this.sederId = JSON.parse(localStorage.getItem('user')).uid;

  }

  setName(name) {
    this.userdata.next(name);
  }

  getUserName(): Observable<any> {
    return this.userdata.asObservable();
  }
  deleteMessage(reciverId) {
    this.userService.userdata.subscribe(x => {
      let user: User = x;
      let a;
      if (user.chats.delete(reciverId)) {
        ;
        this.userService.updateUser(user);
      }
    });
  }

  getAllChatMessages(reciverId: string): Observable<ChatMessage[]> {
    let x: User = this.userService.userdata.value;


    if (x.chats instanceof Map) {
    } else {
      x.chats = this.objectToMap(x.chats);

    }
    if (!x.chats) {
      return of(null);

    }
    if (x.chats.size > 0) {
      let key: Map<string, string>;

      if (x.chats.has(reciverId.trim().toString())) {
        const docRef = this.db.doc(`chats/${x.chats.get(reciverId.trim())}`).collection<ChatMessage>('messages');
        return docRef.valueChanges();
      }
    } else {
      return of(null);
    }
  }
  updateMessages(reciverID, senderId, value) {
    let x: User = this.userService.userdata.value;
    this.db.collection('chats').doc(x.chats.get(reciverID)).collection('messages').ref
      .where('reciverId', '==', senderId).where('isRead', '==', false)
      .onSnapshot((data => {
        data.forEach(z => {
          this.db.doc(`chats/${x.chats.get(reciverID.trim())}/messages/${z.id}`).update(value);

        });
      }));

  }
  getMessages(type: string): Observable<any[]> {
    let users = [];
    const current_user: User = this.userService.userdata.value;
    if (current_user.chats === null || current_user.chats === undefined) {
      return of(undefined);
    }
    current_user.chats.forEach((x, y) => {
      switch (type) {
        case 'Unread':
          this.chatsCollection = this.db.collection(`chats`).doc(x).collection('messages');
          this.chatsCollection.ref.where('isRead', '==', false)
            .onSnapshot(chat => {
              let m = [];
              chat.forEach(doc => {
                const x: string = doc.data().senderId;
                if (m.indexOf(x) === -1 && x != current_user.uid) {
                  m.push(x);
                  this.userService.getUser(x).subscribe(d => {
                    users.push(d);
                  })
                }
              });
            });

          break;
        case 'Inbox':
          this.chatsCollection = this.db.collection(`chats`).doc(x).collection('messages');
          this.chatsCollection.ref.where('reciverId', '==', current_user.uid)
            .onSnapshot(chat => {
              let m = [];
              chat.forEach(doc => {
                const x: string = doc.data().senderId;
                if (m.indexOf(x) === -1 && x != current_user.uid) {
                  m.push(x);
                  this.userService.getUser(x).subscribe(d => {
                    users.push(d);
                  })
                }
              });
            });

          break;
        case 'Outbox':
          this.chatsCollection = this.db.collection(`chats`).doc(x).collection('messages');
          this.chatsCollection.ref.where('senderId', '==', current_user.uid)
            .onSnapshot(chat => {
              let m = [];
              chat.forEach(doc => {
                const x: string = doc.data().reciverId;
                if (m.indexOf(x) === -1 && x != current_user.uid) {
                  m.push(x);
                  this.userService.getUser(x).subscribe(d => {
                    users.push(d);
                  })
                }
              });
            });
          break;
        default:
          break;
      }


    });
    return of(users);
  }

  private mapToObject(map: Map<string, string>) {
    let obj = {};
    map.forEach((x, y) => {
      obj[y] = x;
    });
    return obj;
  }
  private objectToMap(obj) {
    if (!obj) {
      return  new Map<string,string>();
    }
    if (obj instanceof Map) {
      return obj;
    }
    let x = new Map<string, string>();
    Object.keys(obj).forEach(key => {
      x.set(key, obj[key]);
    });
    return x;
  }
  sendMessage(chatMessage: ChatMessage) {
    let user: User = this.userService.userdata.value;
   
    if (user.chats instanceof Map) {
    } else {
      user.chats = this.objectToMap(user.chats);
    }

    let reciver: User;
    this.userService.getUserPromise(chatMessage.reciverId).then((usera: User) => {
      reciver = usera;

      if (!user.chats.get(chatMessage.reciverId)) {

        this.db.collection(`chats`).add({ sederId: chatMessage.senderId, reciverId: chatMessage.reciverId }).then(data => {
          user.chats.set(chatMessage.reciverId, data.id);
          reciver.chats.set(chatMessage.senderId, data.id);
        }).finally(() => {
          this.chatsCollection = this.db.collection(`chats`).doc(`${user.chats.get(chatMessage.reciverId)}`).collection('messages');
          this.chatsCollection.add(chatMessage);
          user.chats = this.mapToObject(user.chats);
          reciver.chats = this.mapToObject(reciver.chats);
          this.userService.updateUser(user);
          this.userService.updateUser(reciver);
        });


      } else {
        this.chatsCollection = this.db.collection(`chats`).doc(`${user.chats.get(chatMessage.reciverId)}`).collection('messages');
        this.chatsCollection.add(chatMessage).then(data => {
          user.messages.push(data.id);
        });
        user.chats = this.mapToObject(user.chats);

        this.userService.updateUser(user);

      }
    });
  }

}
class x {
  sa: Map<string, string>;
  constructor(x: any = {}) {
    this.sa = x;
  }
}