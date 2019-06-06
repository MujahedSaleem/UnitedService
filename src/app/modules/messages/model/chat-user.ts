export class ChatUser {
    public displayName: string;
    public photoURL: string;
    public uid: string;
    constructor(Chatuser: any = { }) {
        this.displayName = Chatuser.displayName;
        this.photoURL = Chatuser.photoURL;
        this.uid = Chatuser.uid;

    }
}
