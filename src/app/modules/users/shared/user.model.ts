export class User {
    uid: string;
    bio: string;
    displayName: string;
    photoURL: string;
    posts: Array<string> = new Array<string>();
    city: string;
    intrest: string[];
    reviews: string[];
    age: number;
    chat: string[];
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    lastActive: Date;
    isActive: boolean;
    created: Date;
    constructor(User: any = {}) {
        this.bio = User.bio || ' ';
        this.uid = User.uid;
        this.photoURL = User.photoURL || '';
        this.posts =  User.posts;
        this.city = User.city || ' ';
        this.intrest = User.intrest || ' ';
        this.chat = User.chat;
        this.displayName = User.displayName;
        this.email = User.email;
        this.age = User.age;
        this.lastActive = User.lastActive;
        this.isActive = User.isActive ||false;
        this.created = User.created;
    }
}
