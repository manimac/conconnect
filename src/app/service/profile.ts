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

export class profileService implements OnInit {

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

  //Get Users start
  _userGetUrl = this.baseUrl +'/api/user/profile'
  GetUser() {  
    this.getCred()
    const options = { headers: this.headers() };
    return forkJoin([
      this._http.get<any>(this._userGetUrl, options)
        .pipe(catchError(this.onErrorGetUserHandler))
    ]);

  }
  onErrorGetUserHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _userGetProfileUrl = this.baseUrl +'/api/user/profile/'
  GetUserProfile(Name: any) {  
    this.getCred()
    const options = { headers: this.headers() };
    return forkJoin([
      this._http.get<any>(this._userGetProfileUrl + Name, options)
        .pipe(catchError(this.onErrorGetUserProfileHandler))
    ]);

  }
  onErrorGetUserProfileHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //get Users end


  // GetUsers(data: any) {
  //   this.getCred()
  //   let _getUsersUrl = `${this.baseUrl}/api/User/?name=${data}`;
  
  //   const options = { headers: this.headers() };

  //   return forkJoin([
  //      this._http.get<feed>(_getUsersUrl, options)
  //     .pipe(catchError(this.onErrorGetUsersHandler)),
  //       this._http.get<feed>(this._followedConnectionUrl, options)
  //     .pipe(catchError(this.onErrorFollowedHandler))
  //   ]);
  // }
  // onErrorGetUsersHandler(error: HttpErrorResponse) {
  //   return throwError(error);
  // }

}
