import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { socialLoginModel } from '../models/socialloginModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {

  baseUrl1 = environment.baseUrl;

  //baseUrl1 = 'https://testapi.conconnect.com';

  constructor(private _http: HttpClient) { }
  _linkedInUrl: any;
  _linkedInDataUrl: any;
  baseUrl: any;
  redirect_uri: any;
  linkedInUrl = 'https://www.linkedin.com';
  tokenLinkedInUrl = 'https://api.linkedin.com';
  getAccessToken(code: any) {
    this.baseUrl = window.location.origin;
   // this.baseUrl = "https://conconnect.com";
    this.redirect_uri = encodeURI(this.baseUrl + '/linkedin');
    /*    this._linkedInUrl = `oauth/v2/accessToken?grant_type=authorization_code&code=${code}&client_id=78jxj3ixy50ep9&client_secret=0lLyiBwidEXlBgeA&redirect_uri=${this.redirect_uri}`*/

    this._linkedInUrl = `oauth/v2/accessToken?grant_type=authorization_code&code=${code}&client_id=77qsmmh3e36x2n&client_secret=XH3TzD6VWsZm9uyx&redirect_uri=${this.redirect_uri}`
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',     
    });
    /*    ${ this.redirect_uri }*/
/*    & redirect_uri=${ this.redirect_uri }*/
    const options = { headers: headers, body: '', withCredentials: true}; /*, withCredentials: false*/
    console.log(options);
    return this._http.post<any>(this._linkedInUrl, options)
      .pipe(catchError(this.errorLinkedinHandler));
  }

  errorLinkedinHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  getLinkedinData(token:any) {
    this._linkedInDataUrl = `v2/me`
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const options = { headers: headers, body: ''};
    console.log(options);
    return this._http.get<any>(this._linkedInDataUrl, options)
      .pipe(catchError(this.errorLinkedinDataHandler));
  }
  errorLinkedinDataHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _loginurl = this.baseUrl1+"/api/Login"
  loginLinkedIn(userData: socialLoginModel) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
      "Access-Control-Allow-Credentials": "true",
      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'application/json',
      'Gateway': '3',
      'Role': userData.Role,      
    });

    const options = { headers: headers, body: userData };
    console.log(options);
    return this._http.post<any>(this._loginurl, userData, options)
      .pipe(catchError(this.loginErrorHandler));
  }
  loginErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
