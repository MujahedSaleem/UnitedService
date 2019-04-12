export class Post {
  id: string;
  uid: string;
  description: string;
  name: string;
  closed: boolean;
  avatarUrl: string;
  avatarThumbnailUrl: string;
  price: number;
  tags: string[];
  date:Date;
  title:string;
  location: string;
  comment: Map<string, string> ;

  constructor(post: any = {}) {
    this.id = post.id;
    this.uid = post.uid;
    this.title =post.title;
    this.name = post.name ;
    this.closed = post.closed || false;
    this.avatarUrl = post.avatarUrl || '';
    this.avatarThumbnailUrl = post.avatarThumbnailUrl || '../../../../assets/images/user.png';
    this.price = post.price || 0;
    this.tags = post.tags || {};
    this.description = post.description || '';
    this.date = post.date || Date.now();
    this.location = post.location;
    if(post.comment){
    this.comment = new Map(Object.entries(post.comment)) ;
    }
  }
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
