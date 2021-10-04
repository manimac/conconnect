import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError, forkJoin } from 'rxjs';
import { resume } from '../jobs/apply-job/apply-job.component';

@Injectable({
  providedIn: 'root'
})
export class JobService {

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

  _companyUrl = this.baseUrl + '/api/Job/Company'
  GetCompany() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._companyUrl, options)
      .pipe(catchError(this.onCompanyErrorHandler));
  }
  onCompanyErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _jobPostUrl = this.baseUrl + '/api/Job/Job'
  postJob(data: any) {
    this.getCred()
    const options = { headers: this.header(), body: data };
    return this._http.post<any>(this._jobPostUrl, data, options)
      .pipe(catchError(this.onJobPostErrorHandler));
  }
  onJobPostErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _recentJobUrl = this.baseUrl + '/api/Job/Job'
  GetRecentJobsList() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._recentJobUrl, options)
      .pipe(catchError(this.recentJobErrorHandler));
  }

  recentJobErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  GetJobDetailBySearch(title: string, zip: number, city: string, state: string) {
    this.getCred()
    var _jobDetailBySearchUrl = `${this.baseUrl}/api/Job/JobDetailBySearch?zip=${zip}&title=${title}&city=${city}&state=${state}`

    const options = {
      headers: this.header()
    };

    return this._http.get<any>(_jobDetailBySearchUrl, options)
      .pipe(catchError(this.getJobDetailBySearchHandler));
  }
  getJobDetailBySearchHandler(error: HttpErrorResponse) {
    return throwError(error);
  }


  _jobDetailUrl = this.baseUrl + '/api/Job/JobDetailById'
  GetJobDetailById(id: number) {
    this.getCred()
    const options = { headers: this.header(),body:id };
    return this._http.post<any>(this._jobDetailUrl,id, options)
      .pipe(catchError(this.jobDetailErrorHandler));
  }
  jobDetailErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _jobApplyUrl = this.baseUrl + '/api/Job/JobApply'
  jobApplyPost(data: resume) {
    this.getCred()
    const formData = new FormData();
    formData.append('resume', data.resume);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('description', data.description);
    formData.append('existingResume', data.existingResume);
    formData.append('isExistingResume', JSON.stringify(data.isExistingResume));
    formData.append('jobId',data.jobId);

    const options = { headers: this.headerMultiForm(), body: formData};
    return this._http.post<any>(this._jobApplyUrl, formData,options)
      .pipe(catchError(this.onCompanyErrorHandler));
  } 

}

interface GetJobDetailBySearch {
  title: string,
  zip: number,
  city: string,
  state:string
}
