import { TSMap } from "typescript-map";
export class User {
    public uid: string;
    public bio: string;
    public displayName: string;
    public photoURL: string;
    public photos: string[];
    public disabled: boolean;
    public posts: string[] = new Array<string>();
    public city: string;
    public intrest: string[];
    public reviews: string[];
    public age: number;
    public rate: number;
    public numOfReciver: number;
    public numberOfRoom: number;
    public gender: string;
    public messages: string[];
    public email: string;
    public emailVerified: boolean;
    public phoneNumber: string;
    public lastActive: Date;
    public isActive: boolean;
    public created: Date;
    public familyName: string;
    constructor(User: any = {}) {
        this.bio = User.bio || " ";
        this.uid = User.uid;
        this.familyName = User.familyName;
        this.gender = User.gender || "male";
        this.photoURL = User.photoURL || "/assets/images/user.png";
        this.posts = User.posts;
        this.city = User.city || " ";
        this.intrest = User.intrest || " ";
        this.displayName = User.displayName;
        this.email = User.email;
        this.rate = User.rate;
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
