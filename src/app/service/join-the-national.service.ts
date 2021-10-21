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

export class JoinTheNationalService implements OnInit {

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
      // 'Gateway': this.Gateway,
      // 'Role': this.Role,
      // "UserName": this.UserName,
      // "Token": this.Token
    });

    return headers
  }

  _nationalReEntryUrl = `${this.baseUrl}/api/user/nationalreentry`;
  postNationalReEntry(data: any) {
    this.getCred()
   
    const options = {
      headers: this.headers(), body: data
    };
    return this._http.post<any>(this._nationalReEntryUrl, data, options)
      .pipe(catchError(this.onErrorNationalReEntry));
  }
  onErrorNationalReEntry(error: HttpErrorResponse) {
    return throwError(error);
  }

}
