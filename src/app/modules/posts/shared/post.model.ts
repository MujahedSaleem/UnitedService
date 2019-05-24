export class Post {
  id: string;
  uid: string;
  description: string;
  name: string;
  closed: boolean;
  avatarUrl: string;
  avatarThumbnailUrl: string;
  price: number;
  date:Date;
  title:string;
  photos:string[];
  location: string;
  comment: Array<string> ;

  constructor(post: any = {}) {
    this.id = post.id;
    this.photos=post.photos;
    this.uid = post.uid;
    this.title =post.title;
    this.name = post.name ;
    this.closed = post.closed || false;
    this.avatarUrl = post.avatarUrl || '';
    this.avatarThumbnailUrl = post.avatarThumbnailUrl || '../../../../../../../assets/images/user.png';
    this.price = post.price || 0;
    this.description = post.description || '';
    this.date =  post.date ||post.date.toDate();
    this.location = post.location;
    if(post.comment){
    this.comment =new Array<string>();
    // new Map(Object.entries(post.comment)) 
    }
  }
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
