import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesUtilsService {

constructor() { }
saveMessage(messageText) {
  // TODO 7: Push a new message to Firebase.
}
loadMessages() {
  // TODO 8: Load and listens for new messages.
}
saveImageMessage(file) {
  // TODO 9: Posts a new image as a message.
}
saveMessagingDeviceToken() {
  // TODO 10: Save the device token in the realtime datastore
}
requestNotificationsPermissions() {
  // TODO 11: Request permissions to send notifications.
}

}
