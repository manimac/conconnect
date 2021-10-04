import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError, forkJoin } from 'rxjs';
import { service } from '../services/add-service/add-service.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

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

  constructor(private _http: HttpClient) {
   
  }
  Gateway: any;
  Role: any;
  UserName: any;
  Token: any;
  baseUrl = environment.baseUrl;

  header() {
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

  headerMultiForm() {
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
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'multipart/form-data',
      'Gateway': this.Gateway,
      'Role': this.Role,
      "UserName": this.UserName,
      "Token": this.Token
    });

    return headers
  }

  _categoryUrl = this.baseUrl + '/api/Master/Category'
  GetCategory() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._categoryUrl, options)
      .pipe(catchError(this.onCategoryErrorHandler));
  }
  onCategoryErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _servicePostUrl = this.baseUrl + '/api/Service/Service'
  postService(data: service, image: File) {
    this.getCred()
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', data.Title);
    formData.append('categoryId', JSON.stringify(data.categoryId));
    formData.append('url', data.serviceUrl);
    formData.append('zip', JSON.stringify(data.zip));
    formData.append('location', data.location);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('description', data.description);
    formData.append('postedByUserName', data.PostedByUserName);
    formData.append('logo', data.logo);
    formData.append('companyId', JSON.stringify(data.companyId));

    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });

    const options = { headers: this.headerMultiForm(), body: formData };
    return this._http.post<any>(this._servicePostUrl, formData, options)
      .pipe(catchError(this.onServicePostErrorHandler));
  }
  onServicePostErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _recentServiceUrl = this.baseUrl + '/api/Service/Service'
  GetRecentServiceList() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._recentServiceUrl, options)
      .pipe(catchError(this.recentServiceErrorHandler));
  }

  recentServiceErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  GetServiceDetailBySearch(categoryId: number, zip: number, city: string, state: string) {
    this.getCred()
    var _ServiceDetailBySearchUrl = `${this.baseUrl}/api/Service/ServicesBySearch?zip=${zip}&categoryId=${categoryId}&city=${city}&state=${state}`

    const options = {
      headers: this.header()
    };

    return this._http.get<any>(_ServiceDetailBySearchUrl, options)
      .pipe(catchError(this.getServicebDetailBySearchHandler));
  }
  getServicebDetailBySearchHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _notificationListUrl = this.baseUrl + '/api/Service/Notifications'
  GetNotificationList() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._notificationListUrl, options)
      .pipe(catchError(this.notificationServiceErrorHandler));
  }
  notificationServiceErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  ReadNotification(id: number) {
    this.getCred()
    const _notificationPutUrl = this.baseUrl + '/api/Service/Notifications?notificationId=' + id;
    const options = { headers: this.header() };
    return this._http.put<any>(_notificationPutUrl,'', options)
      .pipe(catchError(this.notificationPutServiceErrorHandler));
  }
  notificationPutServiceErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}

