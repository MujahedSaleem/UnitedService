import { TSMap } from "typescript-map"
export class User {
    uid: string;
    bio: string;
    displayName: string;
    photoURL: string;
    photos: string[];
    disabled: boolean;
    posts: Array<string> = new Array<string>();
    city: string;
    intrest: string[];
    reviews: string[];
    age: number;
    numOfReciver: number;
    numberOfRoom: number;
    chats: any;
    gender: string;
    messages: Array<string>
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    lastActive: Date;
    isActive: boolean;
    created: Date;
    constructor(User: any = {}) {
        this.bio = User.bio || ' ';
        this.uid = User.uid;
        this.gender = User.gender || 'male';
        this.photoURL = User.photoURL || '';
        this.posts = User.posts;
        this.city = User.city || ' ';
        this.intrest = User.intrest || ' ';
        this.chats = this.objectToMap(User.chats);
        this.displayName = User.displayName;
        this.email = User.email;
        this.age = User.age;
        this.lastActive = User.lastActive;
        this.isActive = User.isActive || false;
        this.created = User.created;
        this.disabled = User.disabled || false;
        this.photos = User.photos;
        this.messages = User.messages || new Array<string>();
        this.numOfReciver = User.numOfReciver || 0;
    }
    private objectToMap(obj) {
        if(!obj){
            return new Map<string,string>();

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
}
