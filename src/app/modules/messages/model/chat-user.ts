export class ChatUser {
    displayName: string;
    photoURL: string;
    uid: string;
    constructor(Chatuser: any = { }) {
        this.displayName= Chatuser.displayName;
        this.photoURL= Chatuser.photoURL;
        this.uid= Chatuser.uid;

    }
}