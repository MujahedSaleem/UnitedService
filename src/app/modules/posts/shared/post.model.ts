export class Post {
  public id: string;
  public uid: string;
  public code: string;
  public rate: number;
  public description: string;
  public name: string;
  public closed: boolean;
  public price: number;
  public date: Date;
  public rateContent: string;
  public title: string;
  public photos: string[];
  public location: string;
  public comment: string[];

  constructor(post: any = {}) {
    this.id = post.id;
    this.photos = post.photos;
    this.uid = post.uid;
    this.rateContent = post.rateContent;
    this.code = post.code;
    this.rate = post.rate;
    this.title = post.title;
    this.name = post.name;
    this.closed = post.closed || false;
    this.price = post.price || 0;
    this.description = post.description || "";
    this.date = post.date;
    this.location = post.location;
    if (post.comment) {
      this.comment = new Array<string>();
      // new Map(Object.entries(post.comment))
    }
  }

  public deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
