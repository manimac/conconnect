export class feed {
  constructor(
    public id:number,
    public description: string,
    public isShow: boolean=false,
    public createdDate: any,
    public userName: string,
    public name: string,
    public image: string,
    public isVideo: boolean,
    public Photo: string,
    public PhotoMimeType: string,
    public FirstName: string,
    public LastName: string,
    public isFollow: boolean,
    public likes: any = [],    
    public isLikeShow: boolean,
    public textdescription: string,
    public imageDescription: string,
    public video:string,
    public userNameNavigation: {
      userDetails: {
        photo: string,
        photoMimeType: string,
        firstName: string,
        lastName:string
      }
    },
    public comments:any=[],
    public answer: string,
    public commentLoader: boolean,
    public last_index:number=150,
    public firstCount:number = 150,
    public counter:number = 150,
    public showTxt:string = "Show More"
  ) { }
}

export class feedPostModel {
  constructor(
    public UserName: string,
    public Description: string,
    public PostType: number,
    public image: File,
    public video:File
  ) { }
}

export class feedCommentModel {
  constructor(    
    public id: number,
    public description: string,
    public FeedId: number,
    public UserName: string,
    public last_index: number = 150,
    public firstCount: number = 150,
    public counter: number = 150,
    public showTxt: string = "Show More"
  ) { }
}

export class feedLikeModel {
  constructor( 
    public isLikeShow:boolean,
    public feedId: number,
    public userName: string,
    public likeType: number,
    public feed:string,
  ) { }
}
