import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FeedService } from '../service/feed.service';
import { Observable, Subscriber } from 'rxjs';
import { Base64Service } from '../service/base64.service';
import { feed, feedPostModel, feedCommentModel, feedLikeModel } from '../models/feedModel';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { user } from '../models/user';
import { SignupService } from '../service/signup.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { PlatformLocation } from '@angular/common';

declare const $: any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: any;
  feeds: any;
  likes: any;

  profileImage: any;
  firstName: any;
  lastName: any;
  userName: any;
  userBio: any;

  feedPostModel: any;
  createdDate: number;
  previousFeedData: any;
  nextFeedSubmitted = false;
  previousFeedSubmitted = false;
  feedShow = false;
  userProfileType: any

  @ViewChild('postImageClear') postImageClear: ElementRef;
  @ViewChild('commentFeed') commentFeed: ElementRef;
  @ViewChild('startPosting') startPosting: ElementRef;
  @ViewChild('modal1') modal: ElementRef;

  constructor(private location: PlatformLocation,private toastr: ToastrService, private router: Router, public feed: FeedService, private _base: Base64Service, private modalService: NgbModal, private imageCompress: NgxImageCompressService, private signUpService: SignupService, private sanitizer: DomSanitizer) {
    //this.router.events.subscribe((event: Event) => {
    //  $(".modal").modal('hide');
    //});
  }


  _user = new user('', '', '', null, null, '', '', 0, '', '', '', '', '', '', '', '','');
  isConnect: boolean = false

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any

  ngOnInit() {

    this.location.onPopState(() => $('#commentsPopUpModel').modal('hide'));

    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }

    if (this.deCryptData != null) {
      if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "2") {
        this.isConnect = true;
      }
      else {
        this.isConnect = false;
      }
    }

    if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "1") {
      this.userProfileType = "/boarding";
    }
    else {
      this.userProfileType = '/rec-boarding';
    }



    //-------------------------------user data copy from data object to user object and store it in local storage--------------------------------------------------------
    if (this.deCryptData != undefined) {
      if (this.deCryptUser == undefined) {
        this._user.firstName = JSON.parse(this.deCryptData || '').userDetails.firstName;
        this._user.lastName = JSON.parse(this.deCryptData || '').userDetails.lastName;
        this._user.email = JSON.parse(this.deCryptData || '').userName;
        this._user.gender = JSON.parse(this.deCryptData || '').userDetails.gender;
        this._user.ethnicity = JSON.parse(this.deCryptData || '').userDetails.ethnicity;
        this._user.bio = JSON.parse(this.deCryptData || '').userDetails.bio;
        this._user.street = JSON.parse(this.deCryptData || '').address.addressLine2;
        this._user.flat = JSON.parse(this.deCryptData || '').address.addressLine1;
        this._user.city = JSON.parse(this.deCryptData || '').address.city;
        this._user.zip = JSON.parse(this.deCryptData || '').address.zip;
        this._user.state = JSON.parse(this.deCryptData || '').address.state;
        this._user.country = JSON.parse(this.deCryptData || '').address.country;
        this._user.profilePic = JSON.parse(this.deCryptData || '').userDetails.photo;
        this._user.photoMimeType = JSON.parse(this.deCryptData || '').userDetails.photoMimeType;
        this._user.phone = JSON.parse(this.deCryptData || '').userDetails.phone;

        localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));
      }
      else {
        this._user.firstName = JSON.parse(this.deCryptUser || '').firstName;
        this._user.lastName = JSON.parse(this.deCryptUser || '').lastName;
        this._user.email = JSON.parse(this.deCryptUser || '').email;
        this._user.gender = JSON.parse(this.deCryptUser|| '').gender;
        this._user.ethnicity = JSON.parse(this.deCryptUser || '').ethnicity;
        this._user.bio = JSON.parse(this.deCryptUser || '').bio;
        this._user.street = JSON.parse(this.deCryptUser || '').street;
        this._user.flat = JSON.parse(this.deCryptUser || '').flat;
        this._user.city = JSON.parse(this.deCryptUser || '').city;
        this._user.zip = JSON.parse(this.deCryptUser || '').zip;
        this._user.state = JSON.parse(this.deCryptUser || '').state;
        this._user.country = JSON.parse(this.deCryptUser || '').country;
        this._user.profilePic = JSON.parse(this.deCryptUser || '').profilePic;
        this._user.photoMimeType = JSON.parse(this.deCryptUser || '').photoMimeType;
        this._user.phone = JSON.parse(this.deCryptUser || '').phone;

        localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));
      }

    }
    this.feedPostModel = new feedPostModel('', '', 1, null,null);

    if (this.deCryptUser != undefined) {
      this.profileImage = JSON.parse(this.deCryptUser || '').profilePic;
      this.firstName = JSON.parse(this.deCryptUser || '').firstName;
      this.lastName = JSON.parse(this.deCryptUser || '').lastName;
      this.userBio = JSON.parse(this.deCryptUser || '').bio;
    }
    else {
      this.profileImage = JSON.parse(this.deCryptData || '').userDetails.photo;
      this.firstName = JSON.parse(this.deCryptData || '').userDetails.firstName;
      this.lastName = JSON.parse(this.deCryptData || '').userDetails.lastName;
      this.userBio = JSON.parse(this.deCryptData || '').userDetails.bio;
    }

    //this.signUpService.tokenCheck().subscribe(
    //  (data: any) => {
    //    if (data == 'fail') { this.toastr.error("Session time expired. Please login"), this.onExpireLogin() }
    //    else{ this.tokenSuccess()}
    //  },
    //  error => { console.log("Token Expire Error" + error) });
    this.tokenSuccess()
  }

  tokenSuccess() {
    this.feed.GetFeeds().subscribe(
      (data: any) => { this.feeds = data, this.feedBlock(this.feeds), this.feedShow = true; },
      error => { console.log(error) }
    );
  };

  //last_index = 150;
  //firstCount = 150;
  //counter = 150;
  //showTxt = "Show More"

  toggleSkil(id: number) {
    Object.entries<feed>(this.feedData[0]).forEach(([key1, value1]) => {
      if (value1.counter < 151) {
        if (value1.id == id) {
          value1.counter = value1.textdescription.length;
          value1.showTxt = "Show less";
        }
      }
      else {
        value1.counter = value1.last_index;
        value1.showTxt = "Show More"
      }
    })
  }


  //last_index_c = 150;
  //firstCount_c = 150;
  //counter_c = 150;
  //showTxt_c = "Show More" 
  toggleSkil_c(id: number, comId: number) {
    console.log("inside comment show more")  
      Object.entries<feed>(this.feedData[0]).forEach(([key1, value1]) => {
        if (value1.id == id) {
          Object.entries<feedCommentModel>(value1.comments).forEach(([comKey, comVal]) => {
            if (comVal.counter < 151) {
              if (comVal.id == comId) {
                comVal.counter = comVal.description.length;
                comVal.showTxt = "Show less";
              }
            }
            else {
              comVal.counter = comVal.last_index;
              comVal.showTxt = "Show More"
            }
          })         
        }
      })
  }


  mimetype = false;
  previousFeedFlag = true;
  feedData: any = [];
  mySubString = "";
  mySubString1 = "";

  getAllFeedsAfterRefresh() {
    console.log("Feed refresh started");
    this.feed.GetFeeds().subscribe(
      (data: any) => { this.feeds = data, this.feedBlock(this.feeds), this.feedShow = true; },
      error => { console.log(error.error) }
    );
    console.log("Feed refresh end");
  }

  feedLastId: number;
  feedBlock(feed: any) {

    var feedLastIdFlag = true;

    Object.entries<feed>(feed[0]).forEach(([key1, value1]) => {
      value1.last_index = 150;
      value1.firstCount = 150;
      value1.counter = 150;
      value1.showTxt = "Show More"

      if (feedLastIdFlag) {
        this.feedLastId = value1.id;
        feedLastIdFlag = false;
      }

      let feedDescriptionDataModel1: any = [];
      value1.isLikeShow = false;
      value1.isFollow = false;
      value1.answer = "";
      value1.commentLoader = false;

      if (value1.likes != undefined && value1.likes != null) {
        Object.entries<feedLikeModel>(value1.likes).forEach(([key3, value3]) => {
          value3.isLikeShow = false;
          console.log((JSON.stringify(JSON.parse(this.deCryptData || '').gateway) + ':' + JSON.parse(this.deCryptData || '').userName));
          if (value3.userName == (JSON.stringify(JSON.parse(this.deCryptData || '').gateway) + ':' + JSON.parse(this.deCryptData || '').userName)) {
            value3.isLikeShow = true;
          }

          if (value3.isLikeShow) {
            value1.isLikeShow = true;
          }
        })
      }

      Object.entries<feed>(feed[1]).forEach(([key2, value2]) => {

        let str1 = value2.userName;
        let str = value1.userName;     

        if (value1.isFollow == false) {
          if (str == JSON.stringify(JSON.parse(this.deCryptData || '').gateway) + ':' + JSON.parse(this.deCryptData || '').userName) {
            value1.isFollow = true;
          }
          else if (str == str1) {
            value1.isFollow = true;
          } else {
            value1.isFollow = false;
          }
        }
      });

/*      console.log(feed);*/
      value1.Photo = value1.userNameNavigation.userDetails.photo;
      value1.PhotoMimeType = value1.userNameNavigation.userDetails.photoMimeType;
      if (value1.Photo != null) {

        if (value1.Photo.charAt(4) != ':') {
          value1.Photo = 'data:' + value1.PhotoMimeType + ';base64,' + value1.Photo;
        }
      }

      value1.imageDescription = value1.image;
      value1.isShow = true;
      this.createdDate = value1.id;
      value1.name = value1.name;
      value1.textdescription = value1.description;
      if (value1.video != null) {
        value1.video = value1.video;
        value1.isVideo = true;
      }
     

      if (value1.textdescription != null) {
       value1.last_index = (value1.textdescription.substring(0, 150)).lastIndexOf(' ');
        if (value1.last_index > 150)
         value1.last_index = 150;
        value1.counter = value1.last_index;
      }

      if (value1.comments != undefined && value1.comments != null) {
        Object.entries<feedCommentModel>(value1.comments).forEach(([keyComments, valueComments]) => {
          valueComments.last_index = 150;
          valueComments.firstCount = 150;
          valueComments.counter = 150;
          valueComments.showTxt = "Show More"

          if (valueComments.description != undefined && valueComments.description!=null) {
            valueComments.last_index = (valueComments.description.substring(0, 150)).lastIndexOf(' ');
            if (valueComments.last_index > 150)
              valueComments.last_index = 150;
            valueComments.counter = valueComments.last_index;
          }  
        })
      }

    })
    this.feedData.push(feed[0]);
    console.log(this.feedData);
  }


  onExpireLogin() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


  onLogout() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    this.toastr.success("Logged out. Please click Login button if you want to use conconnect services. Thank you", "Logged Out !");
  }

  //base64 start

  result: Observable<any> | undefined;
  base64String: any
  file!: any;
  feedSubmitted = false;

  videoString: any;
  feedImageShow = false;
  feedVideoShow = false;

  resumeBase() {
    this.result.subscribe(val => { this.base64String = val });
    return this.base64String;
  }

  getBase64Data() {
    this.videoString = this.base64String;
    console.log(this.videoString);

    let mimeType2 = this.base64String.match(/[^:/]\w+(?=;|,)/);

    if (mimeType2 != null) {
      let mime = mimeType2.input;
      if (mime != undefined) {

        this.mySubString1 = mime.substring(
          mime.lastIndexOf(":") + 1,
          mime.indexOf("/")
        );
        if (mime.charAt(1) == ':')
          mime = mime.substring1(2);
        console.log(this.mySubString1);
      }
    }

    console.log(this.mySubString1);
    if (this.mySubString1 == "image") {
      this.feedImageShow = true;
      this.feedVideoShow = false;
      this.feedType = 2;
      console.log(this.feedImageShow);
      console.log(this.feedVideoShow);
    }
    else if (this.mySubString1 == "video") {
      this.feedImageShow = false;
      this.feedVideoShow = true;
      console.log(this.feedImageShow);
      console.log(this.feedVideoShow);
    }
  }

  fileC: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;

  FinalFeedImage: any;
  selectFile(event: any) {
    var fileName: any;
    this.fileC = event.target.files[0];
    fileName = this.fileC['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.compressFile(this.localUrl, fileName)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  compressResultImage: any;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  compressFile(image: any, fileName: any) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
        console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
        // create file from byte
        const imageName = fileName;
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
        console.log(imageBlob);
        //imageFile created below is the new compressed file which can be send to API in form data
        const imageFile = new File([imageBlob], imageName, { type: this.fileC['type'] });
        this.FinalFeedImage = imageFile;
        this.compressResultImage = result;

        console.log(this.compressResultImage);
        this.feedImageShow = true;        
        console.log(imageFile);
      });
  }
  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: this.fileC['type'] });
    return blob;
  }


  onChange($event: any) {
    this.file = ($event.target as HTMLInputElement).files[0];
    console.log(this.file);
    if (this.file.size < 10000000) {
      if (this.file.type == 'image/png' || this.file.type == 'image/jpg' || this.file.type == 'image/jpeg') {

        if (this.file.size < 1000000) {
          this.FinalFeedImage = this.file;

          var reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = (_event) => {
            this.compressResultImage = reader.result;
          }
          this.feedImageShow = true;     
          console.log("less than 1mb");
        }
        else {
          var fileName: any;
          this.fileC = $event.target.files[0];
          fileName = this.fileC['name'];
          if ($event.target.files && $event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.localUrl = event.target.result;
              this.compressFile(this.localUrl, fileName)
            }
            reader.readAsDataURL($event.target.files[0]);
          }
        }
      }
      else {
        this.toastr.error('Please upload image as supported formates png & jpg.');
      }
    }
    else {
      this.toastr.error('Please upload image less than 10mb.');
    }
  }

  videoPreview: any;
  videoPath: any = '';
  onVideoChange($event: any) {   
    const file1 = ($event.target as HTMLInputElement).files[0];
    console.log(file1);
    if (file1.size < 5000000) {
      if (file1.type == 'video/mp4') {
        this.videoPath = file1;

        const file = $event.target.files && $event.target.files[0];
        if (file) {
          var reader = new FileReader();
          reader.readAsDataURL(file);        
          reader.onload = ($event) => {
            this.videoPreview = (<FileReader>$event.target).result;
          }         
          this.feedVideoShow = true;
          this.feedVideoShowForNew = true;
        }
      }
      else {
        this.toastr.error('Please upload video as mp4 formate');
      }
    }
    else {
      this.toastr.error('Please upload video less than 5mb.');
    }
  }

  convertToBase64(file: File) {
    this.result = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    this.result.subscribe(val => {
      this.base64String = val,
        this.getBase64Data();
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  //base64 end


  //feed post start
  feedTest: any;
  feedType: number = 1;

  feedDescriptionDataModel: any = [];
  feedVideoShowForNew = false;
  feedSubmit(form: NgForm) {
    this.feedSubmitted = true;
    

    if (this.feedTest != undefined) {
      this.userName = JSON.parse(this.deCryptData || '').userName;
      this.feedPostModel.UserName = this.userName;
      this.feedPostModel.Description = this.feedTest;
    }
    if (this.FinalFeedImage != undefined || this.FinalFeedImage != null) {
      this.userName = JSON.parse(this.deCryptData || '').userName;
      this.feedPostModel.image = this.FinalFeedImage;
      this.feedPostModel.UserName = this.userName;
    }
    if (this.videoPath != undefined || this.videoPath != null) {
      this.userName = JSON.parse(this.deCryptData || '').userName;
      this.feedPostModel.video = this.videoPath;
      this.feedPostModel.UserName = this.userName;     
    }

    //const newFeed = {
    //  id: 0,
    //  description: "",
    //  createdDate: "",
    //  userName: "",
    //  textdescription: "",
    //  imageDescription: "",
    //  video:"",
    //  commentLoader: false,
    //  answer: "",
    //  display: true,
    //  isShow: false,
    //  userNameNavigation: { userDetails: { firstName: "", lastName: "", photo: "", photoMimeType: "" } },
    //  likes: <any>[],
    //  comments: <any>[],
    //  isVideo: this.feedVideoShowForNew
    //}
    //newFeed.id = this.feedLastId + 1;
    //this.feedLastId = newFeed.id;
    //newFeed.description = this.feedPostModel.Description;
    //newFeed.createdDate = "just now";
    //newFeed.userName = this.userName;
    //newFeed.textdescription = this.feedTest;
    //newFeed.imageDescription = this.compressResultImage;
    //newFeed.video = this.videoPath;
    //newFeed.answer = "";
    //newFeed.commentLoader = false;
    //newFeed.userNameNavigation.userDetails.firstName = JSON.parse(localStorage.getItem('user') || '').firstName;
    //newFeed.userNameNavigation.userDetails.lastName = JSON.parse(localStorage.getItem('user') || '').lastName;
    //newFeed.userNameNavigation.userDetails.photo = JSON.parse(localStorage.getItem('user') || '').profilePic;
    //newFeed.userNameNavigation.userDetails.photoMimeType = JSON.parse(localStorage.getItem('user') || '').photoMimeType;  

    //this.feedData[0].splice(0, 0, newFeed);
    //console.log(this.feedData);

    console.log(FormData);
    console.log(this.feedPostModel);
    this.feed.PostFeeds(this.feedPostModel).subscribe(
      (data: feed) => {
        this.feedAddResult(data),
          this.feedData[0].splice(0, 0, data);
          console.log("feed posted success."), this.feedTest = "", this.feedImageShow = false, this.feedVideoShow = false, this.FinalFeedImage = "",this.videoPath="", this.base64String = "", this.postImageClear.nativeElement.value = "", this.feedSubmitted = false,
          this.feedDescriptionClear(),
          this.feedVideoShowForNew = false
      },
      error => { console.log(error.error), this.feedSubmitted = false }
    );
  }

  feedAddResult(data: feed) {
    data.textdescription = data.description;
      data.imageDescription = data.image;
      data.isShow = true;
          if (data.video != null) {
      data.isVideo = true
    }
    return data;
  }

  feedDescriptionClear() {
    while (this.feedDescriptionDataModel.length > 0) {
      this.feedDescriptionDataModel.pop();
    }
  }
  //feed post end

  //next feed start

  onScrollDown() {
    console.log('scrolled down!!');
    this.getNextFeeds()
  }

  onScrollUp() {
    console.log('scrolled up!!');
    this.getPreviousFeeds();
  }
   isNextFeedLoaded : boolean = false;
  getNextFeeds() {

  
    this.nextFeedSubmitted = true
    this.previousFeedFlag = true;
    console.log(this.createdDate);
    if (this.createdDate != null || this.createdDate != undefined) {
      this.isNextFeedLoaded = true;
      //var date = new Date(this.createdDate);
      //var day = date.getDate();       // yields date
      //var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
      //var year = date.getFullYear();  // yields year
      //var hour = date.getHours();     // yields hours 
      //var minute = date.getMinutes(); // yields minutes
      //var second = date.getSeconds(); // yields seconds

      //// After this construct a string with the above results as below
      //let time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;

      //console.log(date);
      this.feed.GetNextFeeds(this.createdDate).subscribe(
        (data: any) => { this.feeds = data, console.log(this.feeds), this.feedBlock(this.feeds), this.nextFeedSubmitted = false, this.isNextFeedLoaded = false },
        error => { this.nextFeedSubmitted = false }
      );
    }  
  }
  //next feed end

  //previous feed start
  getPreviousFeeds() {
    this.previousFeedFlag = true;
    this.previousFeedSubmitted = true
    console.log(this.previousFeedData);

    if (this.previousFeedData != undefined || this.previousFeedData != null ) {
      this.feed.GetNextFeeds(this.previousFeedData).subscribe(
        (data: any) => { this.feeds = data, console.log(this.feeds), this.feedBlock(this.feeds), this.previousFeedSubmitted = false },
        error => { this.previousFeedSubmitted = false }
      );
    }
  }
  //this.toastr.error(error.error, "Error feed Details"),
  //previous feed end


  //like post start
  likeSubmit = false;
  OnLikeSumit(likeType: any, feedId: any, userName: any) {

    this.likeSubmit = true;
    console.log("LikeType: " + likeType);
    console.log("FeedId: " + feedId);
    console.log("UserName: " + userName);

    let str = userName;
    if (str.charAt(1) == ':')
      str = str.substring(2);
    console.log(str);

    const newLike = {
      userName: "",
      feedId: 0,
      id: 0,
      likeType: 1,
      isLikeShow: true,
      createdDate: ""
    }
    newLike.feedId = feedId;
    newLike.likeType = 1;
    newLike.createdDate = "just now";
    newLike.userName = userName;

    Object.entries<feed>(this.feedData[0]).forEach(([key2, value2]) => {
      if (value2.id == newLike.feedId) {
        value2.isLikeShow = true;
        this.feedData[0][key2].likes.push(newLike);
      }
    })

    this.feed.postLike({
      "UserName": JSON.parse(this.deCryptData || '').userName,
      "LikeType": likeType,
      "FeedId": feedId
    }).subscribe(
      (data: any) => { console.log("like success"), this.likeSubmit = true },
      error => { console.log(error), this.likeSubmit = false }
    );
  }
  //like post end

  likeDeleteSubmitted = false;
  //like delete start
  likeDelete(feedId: any, userName: any) {
    this.likeSubmit = false;
    this.likeDeleteSubmitted = true;

    Object.entries<feed>(this.feedData[0]).forEach(([key2, value2]) => {
      if (value2.id == feedId) {
        value2.isLikeShow = false;
        this.feedData[0][key2].likes.pop();
      }
    })

    let str = userName;
    if (str.charAt(1) == ':')
      str = str.substring(2);

    console.log(this.comment);
    this.feed.deleteLike({
      "UserName": JSON.parse(this.deCryptData || '').userName,
      "FeedId": feedId
    }).subscribe(
      (data: any) => { console.log("unlike done"), this.likeDeleteSubmitted = false, this.likeSubmit = false },
      error => { console.log(error), this.likeSubmit = true, this.likeDeleteSubmitted = true; }
    );
  }
  //like delete end

  comment = '';
  onCommentSubmitted = false;
  //comment post start
  onCommentSubmit(feedId: any, userName: any, comment: any) {
    this.onCommentSubmitted = true;
    let str = userName;
    if (str.charAt(1) == ':') {
      str = str.substring(2);
    }
    console.log(str);
    console.log(comment);
    console.log(feedId);

    const newComment = {
      id: 0,
      feedId: feedId,
      createdDate: "",
      description: "",
      userName: "",
      userNameNavigation: {
        userDetails: {
          firstName: "",
          lastName: "",
          photo:""
        }
      }
    }
    newComment.description = comment;
    newComment.userName = userName;
    newComment.createdDate = "just now"
    newComment.userNameNavigation.userDetails.firstName = JSON.parse(this.deCryptData || '').userDetails.firstName;
    newComment.userNameNavigation.userDetails.lastName = JSON.parse(this.deCryptData || '').userDetails.lastName;
    newComment.userNameNavigation.userDetails.photo = this.profileImage;


    Object.entries<feed>(this.feedData[0]).forEach(([key2, value2]) => {
      value2.answer = "";
      if (value2.id == feedId) {
        value2.commentLoader = true;
        this.feedData[0][key2].comments.splice(0, 0, newComment);
      }
    })
    this.feed.postComment({
      "UserName": JSON.parse(this.deCryptData || '').userName,
      "FeedId": feedId,
      "Description": comment
    }).subscribe(
      (data: any) => {
        console.log("comment success."), this.onCommentSubmitted = false
      },
      error => { console.log(error), this.onCommentSubmitted = false }
    );
  }
  //comment post end

  //onEditCommentSubmit start
  onEditCommentSubmit(feedId: any, userName: any, comId: any) {
    let str = userName;
    if (str.charAt(1) == ':')
      str = str.substring(2);
    console.log(str);
    console.log(this.comment);

    this.feed.putComment({
      "Id": comId,
      "UserName": JSON.parse(this.deCryptData || '').userName,
      "FeedId": feedId,
      "Description": this.comment
    }).subscribe(
      (data: any) => { console.log("update comment success") },
      error => { console.log(error) }
    );
  }
  //onEditCommentSubmit end

  editModelData = new feedCommentModel(0, '', 0, '');
  open(description: any, feedId: any, userName: any, commentId: any) {
    let str = userName;
    if (str.charAt(1) == ':')
      str = str.substring(2);

    this.editModelData.description = description;
    this.editModelData.FeedId = feedId;
    this.editModelData.id = commentId;
    this.editModelData.UserName = str
  }

  likeOpen(feedId: any, userName: any) {
    let str = userName;
    if (str.charAt(1) == ':')
      str = str.substring(2);
    this.editModelData.UserName = str;
    this.editModelData.FeedId = feedId;
  }

/*  feedTempFollowFlag = false;*/
  onFollow(data: any) {

    Object.entries<feed>(this.feedData[0]).forEach(([key2, value2]) => {      
      if (value2.userName == data) {
        value2.isFollow = true;
        console.log(data);
      }
    })

/*    this.feedTempFollowFlag = true;*/
    this.feed.FollowUser(data).subscribe(
      (data: any) => {
        console.log("user followed successfully.")
      },
      error => {
        console.log(error)
      }   
    );  
  }
  //postImageClear: string;  /* this.feedTempFollowFlag = false;*/

  imageClose() {
    this.feedImageShow = false;
    this.base64String = "";
    this.FinalFeedImage = "";
    this.compressResultImage = "";
  }

  videoClose() {
    this.feedVideoShow = false;
    this.base64String = "";
    this.videoPath = "";
    this.feedVideoShowForNew = false;
  }

  isClassOneActive = true;
  seeMore() {
    this.isClassOneActive = false;
  }

  onProfile() {
    console.log(JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId));
    if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "1")
      this.router.navigate(['/boarding']);
    else
      this.router.navigate(['/rec-boarding']);
  }

  commnetClickFlag = false;
  commentClick() {
    this.commnetClickFlag = true;
    console.log(this.commnetClickFlag)
  }
  unCommentClick() {
    this.commnetClickFlag = false;
    console.log(this.commnetClickFlag)
  }

  onDeleteFeed(id: number, userName: string) {
    const FeedId = id;
    var FeedUserName = JSON.stringify(JSON.parse(this.deCryptData || '').gateway) + ':' + JSON.parse(this.deCryptData || '').userName;
    if (userName == FeedUserName) {
      console.log("same user");

      this.feed.deleteFeed({ "id": id, "userName": JSON.parse(this.deCryptData || '').userName}).subscribe(
        (data: any) => {
          console.log("deleted feed"),
            Object.entries<feed>(this.feedData[0]).forEach(([key2, value2]) => {
              value2.answer = "";
              if (value2.id == FeedId) {               
                this.feedData[0].splice(key2, 1);
              }
            })
        },
        error => { console.log(error.error) }
      );
    }
    else {
      console.log("different user");
      this.toastr.error("You have not a permission to delete this post.");
    }
  }

  loadMoreLikes: any
  isLoadMoreLikes: boolean = false;
  loadMoreLike(id: number) {
    this.isLoadMoreLikes = false;
    console.log("feedId for like:" + id);
    this.feed.loadMoreLikes(id).subscribe(
      (data: any) => {
        this.loadMoreLikes = data, this.isLoadMoreLikes=true
      },
      error => { console.log(error.error)}
    );
  }

  loadMoreCommentsList: any=[]
  isLoadMoreComments: boolean=false
  loadMoreComments(id: number) {


    this.isLoadMoreComments = false
    this.feed.loadMoreComments(id).subscribe(
      (data: feedCommentModel) => {
        this.loadMoreCommentsList = data, this.isLoadMoreComments = true, this.loadMoreCommnetsSuccess(data)
      },
      error => { console.log(error.error) }
    );
  }

  loadMoreCommnetsSuccess(data: feedCommentModel) {
    Object.entries<feedCommentModel>(this.loadMoreCommentsList).forEach(([keyComments, valueComments]) => {
      valueComments.last_index = 150;
      valueComments.firstCount = 150;
      valueComments.counter = 150;
      valueComments.showTxt = "Show More"

      if (valueComments.description != undefined && valueComments.description != null) {
        valueComments.last_index = (valueComments.description.substring(0, 150)).lastIndexOf(' ');
        if (valueComments.last_index > 150)
          valueComments.last_index = 150;
        valueComments.counter = valueComments.last_index;
      }
    })

  }

  toggleSkil_c_p(id: number, comId: number) {
    console.log("inside comment show more")
    Object.entries<feedCommentModel>(this.loadMoreCommentsList).forEach(([comKey, comVal]) => {
      if (comVal.counter < 151) {
        if (comVal.id == comId) {
          comVal.counter = comVal.description.length;
          comVal.showTxt = "Show less";
        }
      }
      else {
        comVal.counter = comVal.last_index;
        comVal.showTxt = "Show More"
      }
    })
  }
  currentPlayingVideo: HTMLVideoElement;
  onPlayingVideo(event:any) {
    event.preventDefault();
    // play the first video that is chosen by the user
    if (this.currentPlayingVideo === undefined) {
      this.currentPlayingVideo = event.target;
      this.currentPlayingVideo.play();
    } else {
      // if the user plays a new video, pause the last one and play the new one
      if (event.target !== this.currentPlayingVideo) {
        this.currentPlayingVideo.pause();
        this.currentPlayingVideo = event.target;
        this.currentPlayingVideo.play();
      }
    }
  }
}
