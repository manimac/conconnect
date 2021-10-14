import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, forkJoin } from 'rxjs';
import { userDetail } from '../models/userDetail';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Gender } from '../models/Gender';
import { address } from '../models/address';
import { skillModel } from '../models/skillModel';
import { questionary } from '../interface/questionary';
import { questionAnswer, questionnaire } from '../models/questionnaire';
import { company } from '../models/company';
import { environment } from 'src/environments/environment';
import { signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {
  
  }
  getCred() {
    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }
  }

  Gateway: any;
  Role: any;
  UserName: any;
  Token: any;

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any

  ngOnInit() {

  }

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

  multiHeader() {
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
      /*  'Content-Type': 'application/json',*/
      'Authorization': "Basic aGVsbG86d29ybGQ=",
      'accept': 'multipart/form-data',
      'Gateway': this.Gateway,
      'Role': this.Role,
      "UserName": this.UserName,
      "Token": this.Token
    });
    return headers
  }


  //resume region start
  _resumeUrl = this.baseUrl+"/api/User/Resume"
  userResume(userResume: File) {
    this.getCred()
    const formData = new FormData();
    formData.append('userResume', userResume);

    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });
 
    console.log(userResume);
    const options = { headers: this.multiHeader(), body: formData };
    return this._http.put<any>(this._resumeUrl, formData, options)
      .pipe(catchError(this.onboardErrorHandler));
  }
  //resume region end

  //picture region start
  _url = this.baseUrl + '/api/User/Picture';
  onboard(onboard: File) {
    this.getCred()
    const formData = new FormData();
    formData.append('pictureFile', onboard);

    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });
      
    const options = { headers: this.multiHeader(), body: formData };
    console.log(formData);
    console.log(options)
    return this._http.put<any>(this._url, formData, options)
      .pipe(catchError(this.onboardErrorHandler));
  }
  onboardErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  //picture region end


  //resume get region start
  _resumeGetUrl = this.baseUrl+'/api/User/Resume'
  GetResume() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._resumeGetUrl, options)
      .pipe(catchError(this.onResumeErrorHandler));
  }
  onResumeErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //resume get region end

  //gender region start

  _genderUrl = this.baseUrl+'/api/Master/Gender'
  GetGender() {   
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._genderUrl, options)
      .pipe(catchError(this.onGenderErrorHandler));
  }
  onGenderErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //gender region end


  //enthnicity region start
  _ethnicityUrl = this.baseUrl+'/api/Master/Ethnicity'
  GetEthnicity() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._ethnicityUrl, options)
      .pipe(catchError(this.onEthnicityErrorHandler));
  }
  onEthnicityErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  //ethnicity region end

  //skill region start
  _skillUrl = this.baseUrl+'/api/Master/Skill'
  GetSkills() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._skillUrl, options)
      .pipe(catchError(this.onSkillErrorHandler));
  }
  onSkillErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _skillGetUrl = this.baseUrl+'/api/User/Skills'
  GetSkillData() {   
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._skillGetUrl, options)
      .pipe(catchError(this.onSkillGetErrorHandler));
  }
  onSkillGetErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //skill region end

  //user detail region start
  _enrollUrl = this.baseUrl+'/api/User/Details';
  enroll(onboard: userDetail) {
    this.getCred()
    const options = { headers: this.header(), body: onboard };
    console.log(onboard);
    console.log(options)
    return this._http.put<any>(this._enrollUrl, onboard, options)
      .pipe(catchError(this.onEnrollErrorHandler));
  }
  onEnrollErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //user detail region end


  //user address region start

  _addressUrl = this.baseUrl+'/api/User/Address';
  userAddress(userAddress: address) {   
    this.getCred()
    const options = { headers: this.header(), body: userAddress };

    return this._http.put<any>(this._addressUrl, userAddress, options)
      .pipe(catchError(this.onUserAddressErrorHandler));
  }

  onUserAddressErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //user address region end

  //user skill region start
  _skillPostUrl = this.baseUrl+'/api/User/Skills';
  userSkill(userSkill: any) {
    this.getCred()
    const options = { headers: this.header(), body: userSkill };

    return this._http.put<any>(this._skillPostUrl, userSkill, options)
      .pipe(catchError(this.onUserSkillErrorHandler));
  }

  onUserSkillErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //user skill region end

  //user questionnaire region start
  _quesitonnaireGetUrl = this.baseUrl+'/api/Master/Questionnaire';
  //GetQuestionnaire() {
  //  if (localStorage.getItem('data') != undefined) {  
  //    this.Gateway = JSON.stringify(JSON.parse(localStorage.getItem('data') || '').gateway)
  //    this.Role = JSON.stringify(JSON.parse(localStorage.getItem('data') || '').userRole[0].roleId)
  //    this.UserName = JSON.parse(localStorage.getItem('data') || '').userName
  //    this.Token = JSON.parse(localStorage.getItem('data') || '').token
  //  }
  //  const headers = new HttpHeaders({
  //    'Access-Control-Allow-Origin': '*',
  //    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
  //    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type,Role,Password,Gateway',
  //    "Access-Control-Allow-Credentials": "true",
  //    'Content-Type': 'application/json',
  //    'Authorization': "Basic aGVsbG86d29ybGQ=",
  //    'accept': 'application/json',
  //    'Gateway': this.Gateway,
  //    'Role': this.Role,
  //    "UserName": this.UserName,
  //    "Token": this.Token
  //  });

  //  const options = { headers: headers };
  //  return this._http.get<any>(this._quesitonnaireGetUrl, options)
  //    .pipe(catchError(this.onUsereQuestionnaireErrorHandler));
  //}
  //onQuestionnaireErrorHandler(error: HttpErrorResponse) {
  //  return throwError(error);
  //}

  _quesitonnaireUserGetUrl = this.baseUrl+'/api/User/Questionnaire';
  result1: any;
  GetUserQuestionnaire() {
    this.getCred()
    const options = { headers: this.header() };

    return forkJoin([
      this._http.get<any>(this._quesitonnaireUserGetUrl, options)
        .pipe(catchError(this.onUsereQuestionnaireErrorHandler)),
      this._http.get<any>(this._quesitonnaireGetUrl, options)
        .pipe(catchError(this.onUsereQuestionnaireErrorHandler))
    ]);
    // .subscribe<any>(allResults => { this.result1 = allResults });

    //const result1= this._http.get<any>(this._quesitonnaireUserGetUrl, options)
    //  .pipe(catchError(this.onUsereQuestionnaireErrorHandler));

    //const result2 = this._http.get<any>(this._quesitonnaireGetUrl, options)
    //  .pipe(catchError(this.onUsereQuestionnaireErrorHandler));

    //const result = { result1: result1, result2: result2 };
    //return result;
  }
  onUsereQuestionnaireErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  onQuestionnaireErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //user questionnaire region end


  //user questionnaire post region start
  _quesitonnairePostUrl = this.baseUrl+'/api/User/Questionnaire';
  finalQuestionnaireArray: any = [];
  finalQuestionnaire!: {
    "UserName": string;
    "QuestionID": number;
    "Answer": string;
  };

  userQuestionnaire(data: questionAnswer) {
    this.getCred()
    if (data.qA2 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 2,
        "Answer": data.qA2
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }
    if (data.qA3 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 3,
        "Answer": data.qA3
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }
    if (data.qA4 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 4,
        "Answer": data.qA4
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }
    if (data.qA5 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 5,
        "Answer": data.qA5
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }
    if (data.qA6 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 6,
        "Answer": data.qA6
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }
    if (data.qA7 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 7,
        "Answer": data.qA7
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }

    if (data.qA8 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 8,
        "Answer": data.qA8
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }

    if (data.qA9 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 9,
        "Answer": data.qA9
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }
    if (data.qA11 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 11,
        "Answer": data.qA11
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }

    if (data.isqA12 != '') {
      if (data.isqA12 != 'No') {
        if (data.isqA12 != '') {
          this.finalQuestionnaire = {
            "UserName": this.UserName,
            "QuestionID": 12,
            "Answer": data.qA12
          }
          this.finalQuestionnaireArray.push(this.finalQuestionnaire);
        }
        else {
          this.finalQuestionnaire = {
            "UserName": this.UserName,
            "QuestionID": 12,
            "Answer": 'No'
          }
          this.finalQuestionnaireArray.push(this.finalQuestionnaire);
        }
      }
      else {
        this.finalQuestionnaire = {
          "UserName": this.UserName,
          "QuestionID": 12,
          "Answer": 'No'
        }
        this.finalQuestionnaireArray.push(this.finalQuestionnaire);
      }
    }


    if (data.qA13 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 13,
        "Answer": data.qA13
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }
    if (data.qA14 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 14,
        "Answer": data.qA14
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }
    if (data.qA15 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 15,
        "Answer": data.qA15
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }
    if (data.qA16 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 16,
        "Answer": data.qA16
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }

    if (data.isqA17A != '') {
      if (data.isqA17A != 'No') {

        if (data.isqA17B != '') {
          if (data.isqA17B != 'No') {
            if (data.qA17 != '') {
              this.finalQuestionnaire = {
                "UserName": this.UserName,
                "QuestionID": 17,
                "Answer": data.qA17
              }
              this.finalQuestionnaireArray.push(this.finalQuestionnaire);
            }
            else {
              this.finalQuestionnaire = {
                "UserName": this.UserName,
                "QuestionID": 17,
                "Answer": 'No'
              }
              this.finalQuestionnaireArray.push(this.finalQuestionnaire);
            }
          }
          else {
            this.finalQuestionnaire = {
              "UserName": this.UserName,
              "QuestionID": 17,
              "Answer": 'No'
            }
            this.finalQuestionnaireArray.push(this.finalQuestionnaire);
          }
        }
        else {
          this.finalQuestionnaire = {
            "UserName": this.UserName,
            "QuestionID": 17,
            "Answer": 'No'
          }
          this.finalQuestionnaireArray.push(this.finalQuestionnaire);
        }      
      }
      else{
        this.finalQuestionnaire = {
          "UserName": this.UserName,
          "QuestionID": 17,
          "Answer": 'No'
        }
        this.finalQuestionnaireArray.push(this.finalQuestionnaire);
      }   
    }
 

    if (data.qA18 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 18,
        "Answer": data.qA18
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }

    if (data.qA19 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 19,
        "Answer": data.qA19
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }


    if (data.qA20 != '') {
      this.finalQuestionnaire = {
        "UserName": this.UserName,
        "QuestionID": 20,
        "Answer": data.qA20
      }
      this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    }



    //Object.entries<questionnaire>(data).forEach(([key, value]) => {
    //  if (value['Answer'] != '') {
    //    console.log(key, value['Answer']);
    //    this.finalQuestionnaire = {
    //      "UserName": this.UserName,
    //      "QuestionID": Number(value.QuestionID),
    //      "Answer": value["Answer"]
    //    }
    //    this.finalQuestionnaireArray.push(this.finalQuestionnaire);
    //  }
    //});
    
    const options = { headers: this.header() };
    return this._http.put<any>(this._quesitonnairePostUrl, JSON.stringify(this.finalQuestionnaireArray), options)
      .pipe(catchError(this.onQuestionnairePostErrorHandler));
  }
  onQuestionnairePostErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //user questionnaire post region end

 // GetUserCompanyRoles start
  _companayRoleUrl = this.baseUrl+'/api/Master/CompanyRole';
  GetUserCompanyRoles() {
    this.getCred()
    const options = { headers: this.header()};  
    return this._http.get<any>(this._companayRoleUrl, options)
      .pipe(catchError(this.onUserCompnayRoleErrorHandler));
  }

  onUserCompnayRoleErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  // GetUserCompanyRoles end

  // GetCompanyDetails start
  _companayDetailUrl = this.baseUrl+'/api/Job/Company';
  GetCompanyDetails() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<company>(this._companayDetailUrl, options)
      .pipe(catchError(this.onUserCompnayDetailErrorHandler));
  }

  onUserCompnayDetailErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  _companayDetailPostUrl = this.baseUrl + '/api/Job/Company';
  postCompanyDetails(data: company, image: File) {
    this.getCred()
    const formData = new FormData();
    formData.append('image', image);
    formData.append('companyName', data.CompanyName);
    formData.append('id', JSON.stringify(data.Id));
    formData.append('logo', data.Logo);
    formData.append('email', data.Email);
    formData.append('userName', data.UserName);
    formData.append('industry', data.industry);
    formData.append('phone', data.Phone);
    formData.append('size', JSON.stringify(data.Size));
    formData.append('userCompanyRole', JSON.stringify(data.UserCompanyRole));
    formData.append('about', data.About);

    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });

    const options = { headers: this.multiHeader(), body: formData };
    return this._http.post<any>(this._companayDetailPostUrl, formData, options)
      .pipe(catchError(this.onUserCompnayPostErrorHandler));
  }

  onUserCompnayPostErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  // GetCompanyDetails end


  //get country list
  
  _countryListUrl = this.baseUrl + '/api/Master/Country'
  GetCountryList() {
    this.getCred()
    const options = { headers: this.header() };
    return this._http.get<any>(this._countryListUrl, options)
      .pipe(catchError(this.onCountryListErrorHandler));
  }
  onCountryListErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  //end country list

  //get state list 
  GetStateList(value: string) {
    this.getCred()
   const _stateListUrl = this.baseUrl + `/api/Master/State?countryCode=${value}`;
   
    const options = { headers: this.header(),countryCode:value };
    return this._http.get<any>(_stateListUrl, options)
      .pipe(catchError(this.onSateListErrorHandler));
  }
  onSateListErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //end state list


  //get existing user details

   signup:any
  _loginurl = this.baseUrl + "/api/Login"
  loginEnroll() {
    this.getCred()
    if (JSON.parse(this.deCryptSign) != null || JSON.parse(this.deCryptSign) != undefined) {
      this.signup = new signup('', '', '', JSON.parse(this.deCryptSign).UserName, JSON.parse(this.deCryptSign).Password, '', '', '', '', JSON.parse(this.deCryptSign).Role, '','');
    }
    //this.signup.Role = JSON.parse(localStorage.getItem('signin')).Role;
    //this.signup.Password = JSON.parse(localStorage.getItem('signin')).Password;
    //this.signup.UserName = JSON.parse(localStorage.getItem('signin')).UserName;
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
      'Password': this.signup.Password
    });

    const options = { headers: headers, body: this.signup, withCredentials: false };
    console.log(options);
    return this._http.post<any>(this._loginurl, this.signup, options)
      .pipe(catchError(this.loginErrorHandler));
  }
  loginErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  //end existing user details
}
