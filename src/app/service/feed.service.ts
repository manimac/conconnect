import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, forkJoin } from 'rxjs';
import { feed, feedPostModel } from '../models/feedModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FeedService implements OnInit {

  Gateway: any;
  Role: any;
  UserName: any;
  Token: any;

  baseUrl = environment.baseUrl;

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any

  constructor(private _http: HttpClient) {
   
  }
  ngOnInit() {   
  }

  getCred() {
    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }
  }

  headers() {
    if (this.deCryptData != undefined) {
      this.Gateway = JSON.stringify(JSON.parse(this.deCryptData || '').gateway)
      this.Role = JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId)
      this.UserName = JSON.parse(this.deCryptData || '').userName
      this.Token = JSON.parse(this.deCryptData || '').token
    }

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
      "Access-Control-Allow-Credentials": "true",
      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'application/json',
      'Gateway': this.Gateway,
      'Role': this.Role,
      "UserName": this.UserName,
      "Token": this.Token
    });

    return headers
  }

  multiHeaders() {
    if (this.deCryptData != undefined) {
      this.Gateway = JSON.stringify(JSON.parse(this.deCryptData || '').gateway)
      this.Role = JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId)
      this.UserName = JSON.parse(this.deCryptData || '').userName
      this.Token = JSON.parse(this.deCryptData || '').token
    }

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
      "Access-Control-Allow-Credentials": "true",
      /*'Content-Type': 'multipart/form-data',*/
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'multipart/form-data',
      'Gateway': this.Gateway,
      'Role': this.Role,
      "UserName": this.UserName,
      "Token": this.Token
    });
    return headers
  }

  //Get posts start
  _postGetUrl = this.baseUrl +'/api/Master/Posts'
  GetPosts() {   
    this.getCred()
    const options = { headers: this.headers() };
    return this._http.get<any>(this._postGetUrl, options)
      .pipe(catchError(this.onErrorPostsHandler));
  }
  onErrorPostsHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  //Get posts end

  //Get feeds start
  _feedGetUrl = this.baseUrl +'/api/feeds?type=1'
  _followedConnectionAllUrl = this.baseUrl+'/api/feeds/Follow?followers=0';
  GetFeeds() {  
    this.getCred()
    const options = { headers: this.headers() };
    //return this._http.get<any>(this._feedGetUrl, options)
    //  .pipe(catchError(this.onErrorFeedsHandler));
    console.log("feed details:" + options)
    return forkJoin([
      this._http.get<any>(this._feedGetUrl, options)
        .pipe(catchError(this.onErrorFeedsHandler)),
      this._http.get<feed>(this._followedConnectionAllUrl, options)
      .pipe(catchError(this.onErrorFollowedHandler))
    ]);

  }
  onErrorFeedsHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //get feeds end

  //post feed start
  _feedPostUrl = this.baseUrl+'/api/feeds'
  PostFeeds(data: feedPostModel) {
    this.getCred()
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('description', data.Description);
    formData.append('PostType', JSON.stringify(data.PostType));
    formData.append('UserName', data.UserName);
    formData.append('video', data.video);

    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });

    console.log(JSON.stringify(formData));   

    const options = { headers: this.multiHeaders(), body: formData };
    return this._http.post<any>(this._feedPostUrl, formData, options)
      .pipe(catchError(this.onErrorFeedsPostHandler));
  }
  onErrorFeedsPostHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //post feed end

  /*  --------------------------------------------delete feeds---------------------------------------------  */
  _feedPutUrl = this.baseUrl + '/api/feeds'
  deleteFeed(data:any) {     
    this.getCred()
    const options = { headers: this.headers(), body: data };
    return this._http.put<any>(this._feedPutUrl, data, options)
      .pipe(catchError(this.onErrorDeleteFeedsPostHandler));
  }
  onErrorDeleteFeedsPostHandler(error: HttpErrorResponse) {
    return throwError(error);
  }


  //Get Next Feeds start
  GetNextFeeds(data: number) {
    this.getCred()
    let _feedGetNextUrl = `${this.baseUrl}/api/feeds?start=${data}&type=1`;   

    const options = { headers: this.headers() };
    //return this._http.get<any>(_feedGetNextUrl, options)
    //  .pipe(catchError(this.onErrorFeedsNextHandler));
    return forkJoin([
      this._http.get<any>(_feedGetNextUrl, options)
        .pipe(catchError(this.onErrorFeedsNextHandler)),
      this._http.get<feed>(this._followedConnectionAllUrl, options)
        .pipe(catchError(this.onErrorFollowedHandler))
    ]);
  }
  onErrorFeedsNextHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //Get Next Feeds end

  //get GetFollowedConnections start
  _followedConnectionUrl = `${this.baseUrl}/api/feeds/Follow?followers=0`;
  GetFollowedConnections() {
    this.getCred()
   
    const options = { headers: this.headers() };
    return this._http.get<feed>(this._followedConnectionUrl, options)
      .pipe(catchError(this.onErrorFollowedHandler));
  }
  onErrorFollowedHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //get GetFollowedConnections end

  // get GetUsers start
  GetUsers(data: any) {
    this.getCred()
    let _getUsersUrl = `${this.baseUrl}/api/User/?name=${data}`;
  
    const options = { headers: this.headers() };

    return forkJoin([
       this._http.get<feed>(_getUsersUrl, options)
      .pipe(catchError(this.onErrorGetUsersHandler)),
        this._http.get<feed>(this._followedConnectionUrl, options)
      .pipe(catchError(this.onErrorFollowedHandler))
    ]);
  }
  onErrorGetUsersHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  // get GetUsers end

  //get FollowUser start
  _followedUserConnectionUrl = `${this.baseUrl}/api/feeds/Follow`;
  FollowUser(data: any) {
    this.getCred()
   
    const options = {
      headers: this.headers(), body: { "UserName": data }
    };
    return this._http.post<any>(this._followedUserConnectionUrl, { "UserName": data }, options)
      .pipe(catchError(this.onErrorUserFollowedHandler));
  }
  onErrorUserFollowedHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //get FollowUser end

  //get master like start
  _likeMasterUrl = `${this.baseUrl}/api/Master/Likes`;
  GetLikes() {
    this.getCred()
    const options = { headers: this.headers() };
    return this._http.get<any>(this._likeMasterUrl, options)
      .pipe(catchError(this.onErrorLikeHandler));
  }
  onErrorLikeHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //get master like end

  //postLike start
  _postLikeUrl = `${this.baseUrl}/api/Feeds/Likes`;
  postLike(data: any) {
    this.getCred()

    const options = {
      headers: this.headers(), body: data
    };
    return this._http.post<any>(this._postLikeUrl, data, options)
      .pipe(catchError(this.onErrorPostLikeHandler));
  }
  onErrorPostLikeHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //postLike end

  //delete like start
  _deleteLikeUrl = `${this.baseUrl}/api/Feeds/Likes`;
  deleteLike(data:any) {
    this.getCred()
    const options = {
      headers: this.headers(), body: data
    };
    return this._http.delete<any>(this._deleteLikeUrl, options)
      .pipe(catchError(this.onErrorDeleteLikeHandler));
  }
  onErrorDeleteLikeHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //delete like end

  //postComment start
  _postCommentUrl = `${this.baseUrl}/api/Feeds/Comments`;
  postComment(data:any) {
    this.getCred()
    const options = {
      headers: this.headers(), body: data
    };
    return this._http.post<any>(this._postCommentUrl, data, options)
      .pipe(catchError(this.onErrorPostCommentHandler));
  }
  onErrorPostCommentHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //postComment end

  //putComment start
  _putCommentUrl = `${this.baseUrl}/api/Feeds/Comments`;
  putComment(data:any) {
    this.getCred()
    const options = {
      headers: this.headers(), body: data
    };
    return this._http.put<any>(this._putCommentUrl, data, options)
      .pipe(catchError(this.onErrorPutCommentHandler));
  }
  onErrorPutCommentHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //putComment end


  loadMoreLikes(feedId: number) {
    this.getCred()
    let _loadMoreLikesUrl = `${this.baseUrl}/api/Feeds/Likes?feedId=${feedId}`;
    const options = {
      headers: this.headers()
    };
    return this._http.get<any>(_loadMoreLikesUrl, options)
      .pipe(catchError(this.loadMoreLikesHandler));
  }
  loadMoreLikesHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  loadMoreComments(feedId: number) {
    this.getCred()
    let _loadMoreLikesUrl = `${this.baseUrl}/api/Feeds/Comments?feedId=${feedId}`;
    const options = {
      headers: this.headers()
    };
    return this._http.get<any>(_loadMoreLikesUrl, options)
      .pipe(catchError(this.loadMoreCommentsHandler));
  }
  loadMoreCommentsHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
