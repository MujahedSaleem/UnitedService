export class Post {
  id: string;
  uid: string;
  code: string;
  rate : number;
  description: string;
  name: string;
  closed: boolean;
  price: number;
  date: Date;
  rateContent:string;
  title: string;
  photos: string[];
  location: string;
  comment: Array<string>;

  constructor(post: any = {}) {
    this.id = post.id;
    this.photos = post.photos;
    this.uid = post.uid;
    this.rateContent=post.rateContent;
    this.code = post.code;
    this.rate = post.rate;
    this.title = post.title;
    this.name = post.name;
    this.closed = post.closed || false;
    this.price = post.price || 0;
    this.description = post.description || '';
    this.date = post.date;
    this.location = post.location;
    if (post.comment) {
      this.comment = new Array<string>();
      // new Map(Object.entries(post.comment)) 
    }
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
