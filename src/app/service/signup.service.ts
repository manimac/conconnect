import { Injectable} from '@angular/core';
import {OnInit} from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {signup} from '../models/signup';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { socialLoginModel } from '../models/socialloginModel';
import { environment } from 'src/environments/environment';
import { resetPassword } from '../reset-password/reset-password.component';

@Injectable({
  providedIn: 'root'
})
export class SignupService implements OnInit {

  baseUrl = environment.baseUrl;

  //_url = "https://5aj8ifz600.execute-api.us-east-1.amazonaws.com/Stage/api/User"
  //_loginurl = "https://5aj8ifz600.execute-api.us-east-1.amazonaws.com/Stage/api/Login"
  //_emailVerificationUrl = "https://5aj8ifz600.execute-api.us-east-1.amazonaws.com/Stage/api/User/Verifymail"

  _url = this.baseUrl+"/api/User"
  _loginurl = this.baseUrl +"/api/Login"
  _emailVerificationUrl = this.baseUrl +"/api/User/Verifymail"

  verifyKey = ""

  constructor(private _http: HttpClient) {
   
  }

Gateway: any;
Role: any;
UserName: any;
  Token: any;

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any

  getCred() {
    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }
  }

  ngOnInit() {    
  }

  enroll(signup :signup)
  {
   this. getCred()
    const headers = new HttpHeaders({
      
      // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // "Access-Control-Allow-Credentials": "true",
      // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      // 'Access-Control-Allow-Origin':  '*',

      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept':'application/json',
      'Gateway':'1',
      'Role':signup.Role,
      'Password':signup.Password
    });  

    // headers.append('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    // headers.append('Access-Control-Allow-Origin', '*');

    const options = { headers: headers,body:signup };    
    console.log(options);
    return this._http.post<any>(this._url,signup,options)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
      return throwError(error);
  }

  loginEnroll(signup: signup) {
    this.getCred()
    const headers = new HttpHeaders({   
      'Access-Control-Allow-Origin':'*',   
      'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers':'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
      "Access-Control-Allow-Credentials": "false",
      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept':'application/json',
      'Gateway':'1',
      'Role':signup.Role,
      'Password':signup.Password
    });  

    const options = { headers: headers, body: signup, withCredentials: false };    
    console.log(options);
    return this._http.post<any>(this._loginurl,signup,options)
    .pipe(catchError(this.loginErrorHandler));
  }
  loginErrorHandler(error:HttpErrorResponse){
    return throwError(error);
  }

  emailVerification(verify: any) {
    this.getCred()
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
      "Access-Control-Allow-Credentials": "true",
      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'application/json',
      'Gateway': '1',
      'Role':'1'
    });

    const options = { headers: headers, body: verify };
    console.log(options);
    return this._http.post<any>(this._emailVerificationUrl, JSON.stringify(options.body), options)
      .pipe(catchError(this.emailVerifyErrorHandler));
  }

  emailVerifyErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  loginGoogle(googleSignIn: socialLoginModel) {
    this.getCred()
    console.log("userDetails in service" + JSON.stringify(googleSignIn));
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
      "Access-Control-Allow-Credentials": "true",
      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'application/json',
      'Gateway': '2',
      'Role': googleSignIn.Role,
    });

    const options = { headers: headers, body: googleSignIn };
    console.log("google-login" + JSON.stringify(options));
    return this._http.post<any>(this._loginurl, googleSignIn, options)
      .pipe(catchError(this.googleLoginErrorHandler));
  }

  googleLoginErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  //--------------------------------reset password------------------------------
  _resetPasswordUrl = this.baseUrl + "/api/User/ResetPassword"

  passwordReset(resetPasswordModel: resetPassword) {
    this.getCred()
    resetPasswordModel.Gateway = Number(resetPasswordModel.Gateway);

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
      "Access-Control-Allow-Credentials": "false",
      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'application/json',
      'Gateway': '1',
      'Role': '1',
      'Password': resetPasswordModel.Password
    });

    const options = { headers: headers, body: resetPasswordModel, withCredentials: false };
    console.log(options);
    return this._http.post<any>(this._resetPasswordUrl, resetPasswordModel, options)
      .pipe(catchError(this.resetPasswordErrorHandler));
  }

  resetPasswordErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

 /* ----------------------------------------------verify code-------------------------------------------------------*/
  _verifyUrl = this.baseUrl + "/api/User/AccountVerify"
  verifyCode(verifyAccount: resetPassword) {
    this.getCred()

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
      "Access-Control-Allow-Credentials": "false",
      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'application/json',
      'Gateway': '1',
      'Role': '1',
      'Password': verifyAccount.Password
    });

    const options = { headers: headers, body: verifyAccount, withCredentials: false };
    console.log(options);
    return this._http.post<any>(this._verifyUrl, JSON.stringify(verifyAccount.UserName), options)
      .pipe(catchError(this.verifyCodeErrorHandler));
  }

  verifyCodeErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }


  //--------------------------------------------deactivate account-----------------------------------------------
  _deactivateUrl = this.baseUrl + "/api/User/Deactivate"

  deactivate() {
    this.getCred()
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
      "Access-Control-Allow-Credentials": "false",
      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'application/json',
      'Gateway': this.Gateway,
      'Role': this.Role,
      'UserName': this.UserName,
      'Token': this.Token
    });

    const options = { headers: headers, body: ""};
    console.log(options);
    return this._http.post<any>(this._deactivateUrl,"",options)
      .pipe(catchError(this.deactivateErrorHandler));
  }

  deactivateErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }


  /*  ---------------------------------------Token Expiration Check----------------------------------------*/
  _tokenUrl = this.baseUrl + "/api/User/Token"
  tokenCheck() {
    this.getCred()
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
      "Access-Control-Allow-Credentials": "false",
      'Content-Type': 'application/json',
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'application/json',
      'Gateway': this.Gateway,
      'Role': this.Role,
      'UserName': this.UserName,
      'Token': this.Token
    });

    const options = { headers: headers, body: "" };
    console.log(options);
    return this._http.post<any>(this._tokenUrl, "", options)
      .pipe(catchError(this.expireTokenErrorHandler));
  }

  expireTokenErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
