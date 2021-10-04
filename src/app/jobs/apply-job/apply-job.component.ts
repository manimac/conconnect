import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../service/signup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JobService } from '../../service/job.service';
import { OnboardService } from '../../service/onboard.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  applyJob: FormGroup
  constructor(private fb: FormBuilder, private signUpService: SignupService, private toastr: ToastrService, private router: Router, private jobService: JobService, private onboardService: OnboardService, private _Activatedroute: ActivatedRoute) { }

  applyJobSubmitted: boolean = false;

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

    this.applyJob = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: [''],
      resume: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      isChecked:['']
    })
  }

  onExpireLogin() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  resumeGet:any
  tokenSuccess() {
    this.onboardService.GetResume().subscribe(
      (data: any) => { this.resumeGet = data,console.log(data) },
      error => { console.log("Error resume Details" + error) });
  }

  isChecked:boolean = false;
  checkValue(event: any) {
    console.log(event);
    this.isChecked = !this.isChecked;

    if (this.isChecked) {
      this.applyJob.get('resume').disable();
    }
    else {
      this.applyJob.get('resume').enable();
    }
   
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

  UserName: string
  resumeFile: File
  id:string
  onSubmit() {
    this.applyJobSubmitted = true;
    if (this.deCryptData != undefined) {
      this.UserName = JSON.parse(this.deCryptData || '').userName
    }
    console.log(this.applyJob.value);
    if (!this.isChecked) {
      this.resumeFile = this.resumePath
    }
    else {
      this.resumeFile=null
    }
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    let jobApplyPostDetails: resume = {
      phone: this.applyJob.value.phone,
      email: this.applyJob.value.email,
      description: this.applyJob.value.description,
      UserName: this.UserName,
      existingResume: this.resumeGet,
      resume: this.resumeFile,
      isExistingResume: this.isChecked,
      jobId: this.id
    }

    console.log(jobApplyPostDetails)
    this.jobService.jobApplyPost(jobApplyPostDetails).subscribe(
      (data: any) => { this.toastr.success("Job Applied."), this.applyJobSubmitted = false, this.router.navigate(['/jobs']) },
      error => { console.log(error) });

  }
}

export interface resume {
  phone: string,
  email: string,
  description:string,  
  UserName: string,
  resume: File,
  existingResume: string,
  isExistingResume: boolean,
  jobId:string

}
