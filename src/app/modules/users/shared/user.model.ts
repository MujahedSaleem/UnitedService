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
    gender: string;
    messages: Array<string>
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    lastActive: Date;
    isActive: boolean;
    created: Date;
    familyName:string;
    constructor(User: any = {}) {
        this.bio = User.bio || ' ';
        this.uid = User.uid;
        this.familyName = User.familyName;
        this.gender = User.gender || 'male';
        this.photoURL = User.photoURL || '/assets/images/user.png';
        this.posts = User.posts;
        this.city = User.city || ' ';
        this.intrest = User.intrest || ' ';
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
    
}
