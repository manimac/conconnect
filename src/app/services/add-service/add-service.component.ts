import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JobService } from '../../service/job.service';
import { company } from '../../models/company';
import { OnboardService } from '../../service/onboard.service';
import { Gender } from '../../models/Gender';
import { ServiceService } from '../../service/service.service';
import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  newService: FormGroup
  stateList!: Gender
  categoryList: any
  company = new company(0, '', '', '', '', '', null, 0, '', null);
  isCompanyAttach: boolean


  constructor(private fb: FormBuilder, private signUpService: SignupService, private toastr: ToastrService, private router: Router, private jobService: JobService, private onboardService: OnboardService, private onService: ServiceService, private imageCompress: NgxImageCompressService) { }

  addServiceSubmitted: boolean = false;

  addJobSubmitted: boolean = false;
  isAddJobComponentLoaded: boolean = false;

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any
  ngOnInit() {
    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }
    //this.signUpService.tokenCheck().subscribe(
    //  (data: any) => {
    //    if (data == 'fail') {
    //      this.toastr.error("Session time expired. Please login"), this.onExpireLogin()
    //    }
    //    else { this.tokenSuccess() }
    //  },
    //  error => { console.log("Token Expire Error" + error) });
    this.tokenSuccess()

    this.newService = this.fb.group({
      serviceTitle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      companyName: ['', [Validators.required]],
      categoryType: ['', [Validators.required]],
      serviceUrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
     /* location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],*/
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      state: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      logo: [''],
    })
  }

  onExpireLogin() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  tokenSuccess() {
    this.onboardService.GetStateList('US').subscribe(
      (data: any) => { this.stateList = data },
      error => { console.log("Error state Details" + error) });

    this.onService.GetCategory().subscribe(
      (data: any) => { this.categoryList = data },
      error => { console.log("Error category Details" + error) });

    this.jobService.GetCompany().subscribe(
      (data: any) => {
        if (data.id != 0) {
            this.company.Id = data.id,
            this.company.CompanyName = data.companyName,
            this.company.Email = data.email,
            this.company.UserName = data.userName,
            this.company.industry = data.industry,
            this.company.Phone = data.phone,
            this.company.Size = data.size,
            this.company.UserCompanyRole = data.userCompanyRole,
            this.company.About = data.about,
            this.isCompanyAttach = true

          this.newService.patchValue({
            companyName: this.company.CompanyName
          });
          this.newService.get('companyName').disable();
          this.isAddJobComponentLoaded = true;
        }
        else {
          this.isCompanyAttach = false
          this.isAddJobComponentLoaded = true;
        }
        console.log(this.company)
      },
      error => { console.log(error) });
  }

  UserName:string
  onSubmit() {
    this.addServiceSubmitted = true;
    if (this.deCryptData != undefined) {
      this.UserName = JSON.parse(this.deCryptData || '').userName
    }
    console.log(this.newService.value);

  
    let servicePostDetails: service = {
      Title: this.newService.value.serviceTitle,
       companyId: Number(this.company.Id),
      categoryId: Number(this.newService.value.categoryType),
      serviceUrl: this.newService.value.serviceUrl,
      zip: Number(this.newService.value.zip),
      location: null,
      city: this.newService.value.city,
      state: this.newService.value.state,
      description: this.newService.value.description,
      PostedByUserName: this.UserName,
      logo: this.FinalFeedImage_logo
    }
    console.log(servicePostDetails)
    this.onService.postService(servicePostDetails, this.FinalFeedImage_logo).subscribe(
      (data: any) => { this.toastr.success("Service posted."), this.addServiceSubmitted = false, this.router.navigate(['/services']) },
      error => { console.log(error) });
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
  defaultImageFlag_logo = false;
  saveImageFlag_logo = false;
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
}

export interface service {
  Title: string,
  companyId:number,
  categoryId: number,
  serviceUrl:string,
  zip: number,
  location: string,
  city: string,
  state: string,
  description: string,
  PostedByUserName: string,
  logo:string
}

