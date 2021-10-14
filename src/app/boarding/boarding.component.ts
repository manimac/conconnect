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
import { DomSanitizer } from '@angular/platform-browser';
import { user } from '../models/user';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SignupService } from '../service/signup.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.component.html',
  styleUrls: ['./boarding.component.css']
})
export class BoardingComponent implements OnInit {

  industryHasError = false;
  resumeHasError = false;
  quest1HasError = false;
  quest3HasError = false;
  newJob: FormGroup

  constructor(private router: Router, private toastr: ToastrService, private onboardService: OnboardService, private sanitizer: DomSanitizer, private imageCompress: NgxImageCompressService, private signUpService: SignupService, private fb: FormBuilder) {
   
  }

  gender!: Gender;
  enthnicity!: Gender;
  resumeGet: any;
  skills!: Gender;
  countryList!: Gender;
  stateList!: Gender

  getSkillData: any;
  skillObject = new skillModel('',0);

  ProfileImage: any;
  userResumeModel: any;
  onboardModel: any;
  userAddress: any;
  questionnaire: any = [];
  UserQuestionnaireData: any;
  getQuestionnaire: any;
  experienceDropdown: any;

  _user = new user('', '', '', '','', '', '', 0, '', '', '', '', '', '', '', '','');
  qAnsers = new questionAnswer('', '', '', '', '', '',
    '', '', '', '', '', '', '','','','','','','','','');


  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any

  ngOnInit() {

    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }


    this.newJob = this.fb.group({
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    })

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
        this._user.profilePic = JSON.parse(this.deCryptUser|| '').profilePic;
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




   /* this.toastr.error(error, "Error questionnaire Details")*/
    //
      //.subscribe(
      // { data: any } => { this.UserQuestionnaireData = JSON.parse(JSON.stringify(data))},
      //error => { this.toastr.error(error, "Error questionnaire Details") });

    //const second = this.onboardService.GetQuestionnaire().subscribe(
    //  (data: any) => { this.getQuestionnaire = data },
    //  error => { this.toastr.error(error, "Error questionnaire Details") });

   // if (localStorage.getItem('data') != undefined) {  
   //   if (localStorage.getItem('imageData') != null) {
   //     this.ProfileImage = JSON.parse(localStorage.getItem('imageData') || '');
   //   }
   //   else {     
   //     if (JSON.parse(localStorage.getItem('data') || '').userDetails.photo == null)
   //     {
   //       this.ProfileImage = "https://conconnect-feed-assets.s3.amazonaws.com/Img/default-profile.png";
   //       this._user.profilePic = this.ProfileImage;
   ///*       console.log(this.ProfileImage);*/
   //     }
   //     else
   //     {
   //       this.ProfileImage = JSON.parse(localStorage.getItem('data') || '').userDetails.photo;
   //       //if (this.ProfileImage.charAt(4) == ':') {
   //       //  this.ProfileImage = JSON.parse(localStorage.getItem('data') || '').userDetails.photo;
   //       //}          
   //       //else {
   //       //  this.ProfileImage = 'data:' + JSON.parse(localStorage.getItem('data') || '').userDetails.photoMimeType + ';base64,' + JSON.parse(localStorage.getItem('data') || '').userDetails.photo;
   //       //}
    
   //       }
   //   }
   // }
     

    if (this.deCryptData != undefined)
      this.userResumeModel = JSON.parse(this.deCryptData || '').userResume;

    if (this.deCryptData != undefined)
      this.onboardModel = new userDetail(JSON.parse(this.deCryptData || '').userDetails.firstName || '', JSON.parse(this.deCryptData || '').userDetails.lastName || '', JSON.parse(this.deCryptData || '').userName, JSON.parse(this.deCryptData || '').userDetails.gender, JSON.parse(this.deCryptData || '').userDetails.ethnicity, JSON.parse(this.deCryptData || '').userDetails.bio)
    else
      this.onboardModel = new userDetail('', '', '', 0, 0,'')

    if (this.deCryptData != undefined)
      this.userAddress = new address(JSON.parse(this.deCryptData || '').address.addressLine2, JSON.parse(this.deCryptData || '').address.addressLine1, JSON.parse(this.deCryptData || '').address.city, JSON.parse(this.deCryptData || '').address.state, JSON.parse(this.deCryptData || '').address.country, JSON.parse(this.deCryptData || '').address.zip);
    else
      this.userAddress = new address('', '', '', '', '', '');

    //this.signUpService.tokenCheck().subscribe(
    //  (data: any) => {
    //    if (data == 'fail') {
    //      this.toastr.error("Session time expired. Please login"), this.onExpireLogin()
    //    }
    //    else { this.tokenSuccess() }
    //  },
    //  error => { console.log("Token Expire Error" + error) });
    this.tokenSuccess()
  
    this.experienceDropdown = Array(50).fill(0).map((x, i) => i + 1);
  }





  addSkillFormGroup(): FormGroup { 
      return this.fb.group({
        skill: ['', [Validators.required]],
        experience: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      })
  }

  addSkillFormGroupData(skill:any,exp:any): FormGroup {
    return this.fb.group({
      skill: [skill, [Validators.required]],
      experience: [exp, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
    })
  }
 
  addSkill(): void {
    (<FormArray>this.newJob.get('skills')).push(this.addSkillFormGroup())
  }

  removeSkill(): void {
    (<FormArray>this.newJob.get('skills')).removeAt(0)
  }

  getControls() {
    return (this.newJob.get('skills') as FormArray).controls;
  }

  getLength() {
    return (this.newJob.get('skills') as FormArray).length;
  }

  removeSkillButtonClick(skillIndex: number): void {
    (<FormArray>this.newJob.get('skills')).removeAt(skillIndex)
  }

  tokenSuccess() {

    this.onboardService.GetUserQuestionnaire().subscribe(val => { this.questBlock(val) },
      error => { console.log("Error questionnaire Details" + error) });

    this.onboardService.GetGender().subscribe(
      (data: any) => { this.gender = data },
      error => { console.log("Error Gender Details" + error) });
    /*  this.toastr.error(error, "Error Gender Details")*/

    this.onboardService.GetEthnicity().subscribe(
      (data: any) => { this.enthnicity = data },
      error => { console.log("Error Ethnicity Details" + error) });
    /* this.toastr.error(error, "Error Ethnicity Details")*/

    this.onboardService.GetResume().subscribe(
      (data: any) => { this.resumeGet = this.sanitizer.bypassSecurityTrustUrl(data) },
      error => { console.log("Error resume Details" + error) });
    /*  this.toastr.error(error, "Error resume Details")*/

    this.onboardService.GetSkills().subscribe(
      (data: any) => { this.skills = data },
      error => { console.log("Error skill Details" + error) });
    /*this.toastr.error(error, "Error skill Details")*/

    this.onboardService.GetCountryList().subscribe(
      (data: any) => { this.countryList = data },
      error => { console.log("Error country Details" + error) });
    /*    this.toastr.error(error, "Error country Details")*/

    this.onboardService.GetStateList('US').subscribe(
      (data: any) => { this.stateList = data },
      error => { console.log("Error state Details" + error) });
    /*   this.toastr.error(error, "Error state Details")*/
 
    this.onboardService.GetSkillData().subscribe(
      (data: any) => {
        this.getSkillData = data,
          /*      console.log(this.getSkillData),*/

          this.checkGetSkillData(data);

          Object.entries(this.getSkillData).forEach(([key, value]) => {         
           
            (<FormArray>this.newJob.get('skills')).push(this.addSkillFormGroupData(key, value));

            this.skillObject.skill = key;
            this.skillObject.experience = Number(value) 

            this._user.experienceOnSkill = key;
            this._user.experience = Number(value);

            localStorage.removeItem('user');
            localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));

            /*   console.log(this.skillObject);*/
          })
      },
      error => { console.log("Error skill Details" + error) });
   /* this.toastr.error(error, "Error skill Details")*/
  }

  checkGetSkillData(data: any) {
    if (Object.keys(data).length !== 0) {
      this.removeSkill();
    }
  }

  questdatavalues: any;

  questBlock(data:any) {     
    //let flag = false;

    //Object.entries(data[1]).forEach(([key, value]) => {
     
    //  flag = true;
    //  let answer;
    //  Object.entries<questionaryModel>(data[0]).forEach(([key1, value1]) => {

    //    console.log("key" + key1 + "value" + JSON.stringify(value1));

    //    if (Number(key) === value1.questionId) {
    //      flag = false;
    //      answer = value1.answer
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

    Object.entries<questionaryModel>(data[0]).forEach(([key1, value1]) => {

      if (value1.questionId == 8) {
        this.qAnsers.qA8 = value1.answer
      }
      if (value1.questionId == 9) {
        this.qAnsers.qA9 = value1.answer
      }
      if (value1.questionId == 11) {
        this.qAnsers.qA11 = value1.answer
      }
      if (value1.questionId == 12) {
        if (value1.answer == 'No') {
          this.qAnsers.isqA12 = 'No'
          this.isViolentCrime = false
          this.qAnsers.qA12 = ''
        }
        else {
          this.qAnsers.qA12 = value1.answer
          this.qAnsers.isqA12 = 'Yes'
          this.isViolentCrime = true
        }       
      }
      if (value1.questionId == 13) {
        this.qAnsers.qA13 = value1.answer
      }
      if (value1.questionId == 14) {
        this.qAnsers.qA14 = value1.answer
      }
      if (value1.questionId == 15) {
        this.qAnsers.qA15 = value1.answer
      }
      if (value1.questionId == 16) {
        this.qAnsers.qA16 = value1.answer
      }

      if (value1.questionId == 17) {
        if (value1.answer == 'No') {
          this.qAnsers.isqA17A = 'No'
          this.qAnsers.isqA17B = ''
          this.isMentalHealth = false
          this.isDrugAbuse = false
          this.qAnsers.qA17 = ''
        }
        else {
          this.qAnsers.isqA17A = 'Yes'
          this.qAnsers.isqA17B = 'Yes'
          this.isMentalHealth = true
          this.isDrugAbuse = true
          this.qAnsers.qA17 = value1.answer
        }
      }


      if (value1.questionId == 18) {
        this.qAnsers.qA18 = value1.answer
      }
      if (value1.questionId == 19) {
        this.qAnsers.qA19 = value1.answer
      }

      if (value1.questionId == 20) {
        this.qAnsers.qA20 = value1.answer
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

  validatequest1HasError(value: any) {
    if (value === 'default') {
      this.quest1HasError = true;
    }
    else {
      this.quest1HasError = false;
    }
  }

  validatequest3HasError(value: any) {
    if (value === 'default') {
      this.quest3HasError = true;
    }
    else {
      this.quest3HasError = false;
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
      error => { console.log('Error Image Upload'+error.error) , this.saveImageFlag = false, console.log(error), this.saveImageSubmitted = false });
  }
  /*  this.toastr.error(error.error, 'Error Image Upload')*/
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
            this.compressResultImage  = reader.result;
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

  //resume region start

  resumeSubmitted = false;
  myResume: Observable<any> | undefined;

  resumeBase() {
    this.myResume.subscribe(val => this.resumeBase64String = val);
    return this.imageBase64String;
  }

  resumePath: any = '';
  onResumeChange($event: any) {
    const file1 = ($event.target as HTMLInputElement).files[0];
    console.log(file1);
    if (file1.size < 5000000) {
      if (file1.type == 'application/pdf' || file1.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file1.type == 'application/docx' || file1.type == 'application/doc') {
        this.resumePath = file1;
        console.log(this.resumePath);
        //this.convertToBase65(file1);

        //this.myResume.subscribe(val => this.resumeBase64String = val);
      }
      else {
        this.toastr.error('Please upload resume as supported formats pdf & doc.');
      }
    }
    else {
      this.toastr.error('Please upload application less than 5mb.');
    }  
    
  }
  convertToBase65(file: File) {
    this.myResume = new Observable((subscriber: Subscriber<any>) => {
      this.readFile1(file, subscriber);
    });
  }

  readFile1(file: File, subscriber: Subscriber<any>) {
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
  onUserResumeUpload(form: NgForm) {
    this.resumeBase;
    this.resumeSubmitted = true;
  /*  console.log(this.resumeBase64String);*/

    return this.onboardService.userResume(this.resumePath).subscribe(
      data => { this.toastr.success("Resume Updated"), this.resumeSubmitted = false, this.userRefresh();},
      error => {  console.log(error), this.resumeSubmitted = false });
  }
/*  this.toastr.error(error.error, 'Error Resume Upload'),*/
  downloadPdf(base64String: any, fileName: string) {
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }
 
  onClickDownloadPdf() {
    let base64String: any = this.sanitizer.bypassSecurityTrustHtml(this.resumeGet || '');
   
    this.downloadPdf(this.sanitizer.bypassSecurityTrustUrl(base64String), "sample");
  }
  //resume region end


  //user detail block start
  genderHasError = false;
  ethnicityHasError = false;

  submitted = false;

  validateGender(value: any) {
    if (value === '0') {
      this.genderHasError = true;
    }
    else {
      this.genderHasError = false;
    }
  }

  validateEthnicityHasError(value: any) {
    if (value === '0') {
      this.ethnicityHasError = true;
    }
    else {
      this.ethnicityHasError = false;
    }
  }

  onSubmit(form: NgForm) {

    this.submitted = true;

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

    this.onboardModel.gender = Number(this.onboardModel.gender);
    this.onboardModel.ethnicity = Number(this.onboardModel.ethnicity);

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
/*  this.toastr.error(error, 'User Details Update Failed');*/
  //user detail block end

  //location block start

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
/*      this.toastr.error(error, 'User Address Update Failed');*/
  //location block end


  //skill block start

  skillSubmitted = false;
  skillModel = new skillModel('0', 0);

  onUserSkillSubmit() {

    this.skillModel.skill = this._user.experienceOnSkill;
    this.skillModel.experience = Number(this._user.experience);

    localStorage.removeItem('user');
    localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));

    this.skillSubmitted = true;
    console.log(this.skillModel);

    let skill = new Map<string, number>();
    let dict: any = {};
    for (let entry of this.newJob.value.skills) {
      console.log(entry.skill, entry.experience);
      skill.set(entry.skill, Number(entry.experience));
      dict[entry.skill] = Number(entry.experience);
    }

    return this.onboardService.userSkill(dict).subscribe(
      data => this.userSkillSuccessResult(data),
      error => this.userSkillerrorResult(error.error));
  }

  userSkillSuccessResult(data: any) {
    this.toastr.success("User Skill Updated.");
    this.skillSubmitted = false;
    this.userRefresh();
  }
  userSkillerrorResult(error: any) {
 
    console.log(error);
    this.skillSubmitted = false;
  }
  /*   this.toastr.error(error, 'User Skill Update Failed');*/
  //skill block end

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
    this.userRefresh();
  }
  userQuesterrorResult(error: any, form: NgForm) {
    
    console.log(error);
    this.questionnarySubmitted = false;
  }
 /* this.toastr.error(error, 'User Questionnaire Update Failed');*/
  //questionnaire block end

  //existing user refresh

  userRefresh() {
    //this.onboardService.loginEnroll().subscribe(
    //  (data: any) => {
    //     console.log("existing user success"),
    //      localStorage.removeItem('data');
    //      localStorage.setItem('data', JSON.stringify(data));
    //      },
    //  error => { console.log("Existing user detail error" + error)});
  }

  onProfile() {
    console.log(JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId));
    if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "1")
      this.router.navigate(['/boarding']);
    else
      this.router.navigate(['/rec-boarding']);
  }

  //end existing user refresh


  /*  -----------------------------------questionnaire logic------------------------------------*/
  isViolentCrime: boolean
  onViolentCrime(isYes:any) {
    if (isYes == 'Yes') {
      this.isViolentCrime = true;
    }
    else {
      this.isViolentCrime = false;
    }
  }

  isMentalHealth: boolean
  onMentalHealth(isYes:any) {
    if (isYes == 'Yes') {
      this.isMentalHealth = true;
    }
    else {
      this.isMentalHealth = false;
    }
  }

  isDrugAbuse:boolean
  onDrugAbuse(isYes:any) {
    if (isYes == 'Yes') {
      this.isDrugAbuse = true;
    }
    else {
      this.isDrugAbuse = false;
    }
  }


}
