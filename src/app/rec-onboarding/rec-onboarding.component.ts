import { Component, OnInit } from '@angular/core';
import { userDetail } from '../models/userDetail';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Observable, Subscriber, forkJoin } from 'rxjs';
import { OnboardService } from '../service/onboard.service';
import { Gender } from '../models/Gender';
import { address } from '../models/address';
import { skillModel } from '../models/skillModel';
import { questionAnswer, questionnaire } from '../models/questionnaire';
import { questionary, questionaryModel } from '../interface/questionary';
import { company } from '../models/company';
import { user } from '../models/user';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-rec-onboarding',
  templateUrl: './rec-onboarding.component.html',
  styleUrls: ['./rec-onboarding.component.css']
})
export class RecOnboardingComponent implements OnInit {

  industryHasError = false;
  resumeHasError = false;

  constructor(private router: Router, private toastr: ToastrService, private onboardService: OnboardService, private imageCompress: NgxImageCompressService, private signUpService: SignupService) {

  }

  ProfileImage: any;
  onboardModel: any;
  companyLogo: any;
  userAddress: any;
  stateList!: Gender
  questionnaire: any = [];
  UserQuestionnaireData: any;
  getQuestionnaire: any;
  company = new company(null, '', '', '', '', '', null, 0, '', null);
  GetUserCompanyRoles: any
  GetCompanyDetails: any;

  _user = new user('', '', '', null, null, '', '', 0, '', '', '', '', '', '', '', '', '');

  qAnsers = new questionAnswer('', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '','','');


  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any
  ngOnInit() {

    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }

    //user data copy from data object to user object and store it in local storage
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

        //if (this._user.profilePic != null) {
        //  if (this._user.profilePic.charAt(4) == ':') {
        //    this._user.profilePic = JSON.parse(localStorage.getItem('data') || '').userDetails.photo;
        //  }
        //  else {
        //    this._user.profilePic = 'data:' + this._user.photoMimeType + ';base64,' + this._user.profilePic;
        //  }
        //}

        localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));
      }
      else {
        this._user.firstName = JSON.parse(this.deCryptUser || '').firstName;
        this._user.lastName = JSON.parse(this.deCryptUser || '').lastName;
        this._user.email = JSON.parse(this.deCryptUser || '').email;
        this._user.gender = JSON.parse(this.deCryptUser || '').gender;
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
        //if (this._user.profilePic != null) {
        //  if (this._user.profilePic.charAt(4) == ':') {
        //    this._user.profilePic = JSON.parse(localStorage.getItem('user') || '').profilePic;
        //  }
        //  else {
        //    this._user.profilePic = 'data:' + this._user.photoMimeType + ';base64,' + this._user.profilePic;
        //  }
        //}
        localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));
      }

    }
    if (this.deCryptData != undefined)
      this.userAddress = new address(JSON.parse(this.deCryptData || '').address.addressLine2, JSON.parse(this.deCryptData || '').address.addressLine1, JSON.parse(this.deCryptData || '').address.city, JSON.parse(this.deCryptData || '').address.state, JSON.parse(this.deCryptData || '').address.country, JSON.parse(this.deCryptData || '').address.zip);
    else
      this.userAddress = new address('', '', '', '', '', '');


    //if (localStorage.getItem('data') != undefined)
    //  this.ProfileImage = JSON.parse(localStorage.getItem('data') || '').userDetails.photo;

    //if (localStorage.getItem('data') != undefined) {
    //  if (localStorage.getItem('imageData') != null) {
    //    this.ProfileImage = JSON.parse(localStorage.getItem('imageData') || '');
    //  }
    //  else {
    //    if (JSON.parse(localStorage.getItem('data') || '').userDetails.photo == null) {
    //      this.ProfileImage = "https://conconnect-feed-assets.s3.amazonaws.com/Img/default-profile.png"

    //      this._user.profilePic = this.ProfileImage;
    //  /*    console.log(this.ProfileImage);*/
    //    }
    //    else {
    //      this.ProfileImage = JSON.parse(localStorage.getItem('data') || '').userDetails.photo;
    //      //if (this.ProfileImage.charAt(4) == ':') {
    //      //  this.ProfileImage = JSON.parse(localStorage.getItem('data') || '').userDetails.photo;
    //      //}
    //      //else {
    //      //  this.ProfileImage = 'data:' + JSON.parse(localStorage.getItem('data') || '').userDetails.photoMimeType + ';base64,' + JSON.parse(localStorage.getItem('data') || '').userDetails.photo;
    //      //}

    //    }
    //  }
    //}

    if (this.deCryptData != undefined)
      this.onboardModel = new userDetail(JSON.parse(this.deCryptData || '').userDetails.firstName || '', JSON.parse(this.deCryptData || '').userDetails.lastName || '', JSON.parse(this.deCryptData || '').userName, JSON.parse(this.deCryptData || '').userDetails.gender, JSON.parse(this.deCryptData || '').userDetails.ethnicity, JSON.parse(this.deCryptData || '').userDetails.bio)
    else
      this.onboardModel = new userDetail('', '', '', 0, 0, '')

    //this.signUpService.tokenCheck().subscribe(
    //  (data: any) => {
    //    if (data == 'fail') {
    //      this.toastr.error("Session time expired. Please login"), this.onExpireLogin()
    //    }
    //    else { this.tokenSuccess() }
    //  },
    //  error => { console.log("Token Expire Error" + error) });
    this.tokenSuccess()
  }


  tokenSuccess() {
    this.onboardService.GetUserQuestionnaire().subscribe(val => { console.log(val), this.questBlock(val) },
      error => { console.log("Error questionnaire Details" + error) });
    /*this.toastr.error(error, "Error questionnaire Details")*/

    this.onboardService.GetUserCompanyRoles().subscribe(
      (data: any) => { this.GetUserCompanyRoles = data },
      error => { console.log("Error GetUserCompanyRole Details" + error) });
    /* this.toastr.error(error, "Error GetUserCompanyRole Details")*/

    this.onboardService.GetCompanyDetails().subscribe(
      (data: any) => {
        if (data != null || data != undefined) {
          this.GetCompanyDetails = data,
            this.company.Id = data.id,
            this.company.Logo = data.logo
          this.company.CompanyName = data.companyName,
            this.company.Email = data.email,
            this.company.UserName = data.userName,
            this.company.industry = data.industry,
            this.company.Phone = data.phone,
            this.company.Size = data.size,
            this.company.UserCompanyRole = data.userCompanyRole,
            this.company.About = data.about
        }
        console.log(this.company)
      },
      error => { console.log(error) });
    this.onboardService.GetStateList('US').subscribe(
      (data: any) => { this.stateList = data },
      error => { console.log("Error state Details" + error) });

  }

  /*this.toastr.error(error, "Error GetCompanyDetails Details")*/
  questdatavalues: any;
  questBlock(data: any) {
    //console.log(data);
    //let flag = false;

    //Object.entries(data[1]).forEach(([key, value]) => {
    //  flag = true;
    //  let answer;  
    //  Object.entries<questionaryModel>(data[0]).forEach(([key1, value1]) => {
    //    if (Number(key) === value1.questionId) {
    //      flag = false;
    //      answer = value1.answer;          
    //    }
    //  })
    //  if (!flag) {
    //    this.questdatavalues = new questionnaire(key, value, answer);
    //    answer = '';       
    //    flag = true;
    //  }
    //  else {
    //    this.questdatavalues = new questionnaire(key, value, '');
    //  }
    //  this.questionnaire.push(this.questdatavalues);
    //});
    //console.log(this.questionnaire);

    Object.entries<questionaryModel>(data[0]).forEach(([key1, value1]) => {

      if (value1.questionId == 2) {
        this.qAnsers.qA2 = value1.answer
      }
      if (value1.questionId == 3) {
        this.qAnsers.qA3 = value1.answer
      }
      if (value1.questionId == 4) {
        this.qAnsers.qA4 = value1.answer
      }
      if (value1.questionId == 5) {
        this.qAnsers.qA5 = value1.answer
      }
      if (value1.questionId == 6) {
        this.qAnsers.qA6 = value1.answer
      }
      if (value1.questionId == 7) {
        this.qAnsers.qA7 = value1.answer
      }
    })
  }



  onExpireLogin() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  //logout start

  onLogout() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    /*    localStorage.removeItem('imageData');*/
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    this.toastr.success("Logged out. Please click Login button if you want to use conconnect services. Thank you", "Logged Out !");
  }

  //logout end

  validateIndustryHasError(value: any) {
    if (value === '0') {
      this.industryHasError = true;
    }
    else {
      this.industryHasError = false;
    }
  }

  countryHasError = false;
  stateHasError = false;
  validateCountryHasError(value: any) {

    if (value === 'default') {
      this.countryHasError = true;
    }
    else {
      this.countryHasError = false;
    }
  }

  validateStateHasError(value: any) {
    if (value === 'default') {
      this.stateHasError = true;
    }
    else {
      this.stateHasError = false;
    }
  }

  //Profile photo block start
  imageUpload = '';
  defaultImageFlag = false;
  saveImageFlag = false;
  defaultImageFlag_logo = false;
  saveImageFlag_logo = false;
  saveImageSubmitted = false;


  myimage: Observable<any> | undefined;
  imageBase64String = '';
  resumeBase64String = '';

  imageBase() {
    this.myimage.subscribe(val => this.imageBase64String = val);
    return this.imageBase64String;
  }

  saveImage() {
    this._user.profilePic = this.compressResultImage;

    localStorage.removeItem('user');
    localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));

    this.saveImageSubmitted = true;
    this.saveImageFlag = false;

    return this.onboardService.onboard(this.FinalFeedImage).subscribe(
      data => {
        this.toastr.success("Image updated"), this.saveImageFlag = false, this.saveImageFlag = false, this.FinalFeedImage = "", this.saveImageSubmitted = false,
          this.userRefresh()
      },
      error => { console.log('Error Image Upload' + error.error), this.saveImageFlag = false, console.log(error), this.saveImageSubmitted = false });
  }
  /* this.toastr.error(error.error, 'Error Image Upload')*/

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
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file);

    if (file.size < 5000000) {
      if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {

        if (file.size < 1000000) {

          this.defaultImageFlag = true;

          this.saveImageFlag = true;

          this.FinalFeedImage = file;


          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (_event) => {
            this.compressResultImage = reader.result;
          }

          console.log("less than 1 md");
        }
        else {
          /*    this.convertToBase64(file);*/
          this.defaultImageFlag = true;
          this.saveImageFlag = true;

          /*   this.myimage.subscribe(val => this.imageBase64String = val);*/

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
      this.toastr.error('Please upload image less than 5mb.');
    }
  }

  fileC_logo: any;
  localUrl_logo: any;
  localCompressedURl_logo: any;
  sizeOfOriginalImage_logo: number;
  sizeOFCompressedImage_logo: number;

  FinalFeedImage_logo: any;
  selectFile_logo(event: any) {
    var fileName: any;
    this.fileC_logo = event.target.files[0];
    fileName = this.fileC_logo['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl_logo = event.target.result;
        this.compressFile_logo(this.localUrl_logo, fileName)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  compressResultImage_logo: any;
  imgResultBeforeCompress_logo: string;
  imgResultAfterCompress_logo: string;
  compressFile_logo(image: any, fileName: any) {
    var orientation = -1;
    this.sizeOfOriginalImage_logo = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage_logo);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress_logo = result;
        this.localCompressedURl_logo = result;
        this.sizeOFCompressedImage_logo = this.imageCompress.byteCount(result) / (1024 * 1024)
        console.warn('Size in bytes after compression:', this.sizeOFCompressedImage_logo);
        // create file from byte
        const imageName = fileName;
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob_logo(this.imgResultAfterCompress_logo.split(',')[1]);
        console.log(imageBlob);
        //imageFile created below is the new compressed file which can be send to API in form data
        const imageFile = new File([imageBlob], imageName, { type: this.fileC_logo['type'] });
        this.FinalFeedImage_logo = imageFile;
        this.compressResultImage_logo = result;
        console.log(this.compressResultImage_logo);
        console.log(imageFile);
      });
  }
  dataURItoBlob_logo(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: this.fileC_logo['type'] });
    return blob;
  }

  onCompanyLogo($event: any) {
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file);

    if (file.size < 5000000) {
      if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {

        if (file.size < 1000000) {

          this.defaultImageFlag_logo = true;

          this.saveImageFlag_logo = true;

          this.FinalFeedImage_logo = file;


          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (_event) => {
            this.compressResultImage_logo = reader.result;
          }

          console.log("less than 1 md");
        }
        else {
          this.defaultImageFlag_logo = true;
          this.saveImageFlag_logo = true;

          var fileName: any;
          this.fileC_logo = $event.target.files[0];
          fileName = this.fileC_logo['name'];
          if ($event.target.files && $event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.localUrl_logo = event.target.result;
              this.compressFile_logo(this.localUrl_logo, fileName)
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
      this.toastr.error('Please upload image less than 5mb.');
    }
  }

  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
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
  //Profile photo block end

  //user detail block start

  submitted = false;

  onSubmit(form: NgForm) {

    this.onboardModel.firstName = this._user.firstName;
    this.onboardModel.lastName = this._user.lastName;
    this.onboardModel.userName = this._user.email;
    this.onboardModel.gender = this._user.gender;
    this.onboardModel.ethnicity = this._user.ethnicity;
    this.onboardModel.bio = this._user.bio;
    this.onboardModel.phone = this._user.phone;

    console.log(this._user);

    localStorage.removeItem('user');
    localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));

    this.submitted = true;
    console.log(this.onboardModel);
    return this.onboardService.enroll(this.onboardModel).subscribe(
      data => this.successResult(data, form),
      error => this.errorResult(error.error, form));
  }
  successResult(data: any, form: NgForm) {
    this.toastr.success("User Details Updated.");
    this.submitted = false;
    this.userRefresh();
  }
  errorResult(error: any, form: NgForm) {
    console.log(error);
    this.submitted = false;
  }

  locationSubmitted = false;
  onUserAddressSubmit(form: NgForm) {
    this.userAddress.addressLine2 = this._user.street;
    this.userAddress.addressLine1 = this._user.flat;
    this.userAddress.city = this._user.city;
    this.userAddress.zip = this._user.zip;
    this.userAddress.state = this._user.state;
    this.userAddress.country = this._user.country;

    localStorage.removeItem('user');
    localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));

    console.log(this.userAddress);
    this.locationSubmitted = true;
    /*this.userAddress.zip = JSON.stringify(this.userAddress.zip);*/
    return this.onboardService.userAddress(this.userAddress).subscribe(
      data => this.userAddressSuccessResult(data, form),
      error => this.userAddresserrorResult(error.error, form));
  }
  userAddressSuccessResult(data: any, form: NgForm) {
    this.toastr.success("User Address Updated.");
    this.locationSubmitted = false;
    this.userRefresh();
  }
  userAddresserrorResult(error: any, form: NgForm) {

    console.log(error);
    this.locationSubmitted = false;
  }
  /*this.toastr.error(error, 'User Details Update Failed');*/
  //user detail block end


  //questionnaire block start
  questionnarySubmitted = false;

  onQuestionnaireSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.questionnaire);

    this.questionnarySubmitted = true;
    return this.onboardService.userQuestionnaire(this.qAnsers).subscribe(
      data => this.userQuestSuccessResult(data, form),
      error => this.userQuesterrorResult(error.error, form));
  }

  userQuestSuccessResult(data: any, form: NgForm) {
    this.toastr.success("User Questionnaire Updated.");
    this.questionnarySubmitted = false;
  }
  userQuesterrorResult(error: any, form: NgForm) {

    console.log(error);
    this.questionnarySubmitted = false;
  }
  /*   this.toastr.error(error, 'User Questionnaire Update Failed');*/

  //questionnaire block end


  //company details start
  companyDetailsSubmitted = false;
  onCompanySubmit(form: NgForm) {
    this.companyDetailsSubmitted = true;
    console.log(form.value);
    this.company.UserName = this.onboardModel.userName;
    this.company.UserCompanyRole = Number(this.company.UserCompanyRole);
    this.company.Size = Number(this.company.Size);
    this.company.Logo = this.FinalFeedImage_logo;

    console.log(this.company);

    return this.onboardService.postCompanyDetails(this.company, this.FinalFeedImage_logo).subscribe(
      data => {
        this.toastr.success("User Company Details Updated."),
          this.companyDetailsSubmitted = false,
          this.userRefresh()
      },
      error => {

        console.log("companydetails error" + error.error),
          this.questionnarySubmitted = false
      });
  }
  /*    this.toastr.error(error, 'User Company Details Update Failed'),*/
  //company details end


  //existing user refresh
  userRefresh() {
    //this.onboardService.loginEnroll().subscribe(
    //  (data: any) => {
    //   console.log("existing user success"),
    //      localStorage.removeItem('data');
    //    localStorage.setItem('data', JSON.stringify(data));
    //  },
    //  error => {  console.log("Existing user detail error"+error)});
  }
  //this.toastr.error(error, "Existing user detail error"),
  //end existing user refresh

  onProfile() {
    console.log(JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId));
    if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "1")
      this.router.navigate(['/boarding']);
    else
      this.router.navigate(['/rec-boarding']);
  }


  onLogoChange(event: any) {

  }


}
