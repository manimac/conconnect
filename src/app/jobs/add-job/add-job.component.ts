import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,FormArray,Validators} from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JobService } from '../../service/job.service';
import { company } from '../../models/company';
import { OnboardService } from '../../service/onboard.service';
import { Gender } from '../../models/Gender';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  newJob: FormGroup
  company = new company(0, '', '', '', '', '', null, 0, '',null);
  isCompanyAttach: boolean
  skills!: Gender;
  stateList!: Gender

  constructor(private fb: FormBuilder, private signUpService: SignupService, private toastr: ToastrService, private router: Router, private jobService: JobService, private onboardService: OnboardService) { }

  addJobSubmitted: boolean = false;
  isAddJobComponentLoaded: boolean = false;


  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any
  experienceDropdown:any
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

    this.newJob = this.fb.group({
      jobTitle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      companyName: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ]),
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    /*  location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],*/
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      state: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]]
    })

    this.experienceDropdown = Array(50).fill(0).map((x, i) => i + 1);
  }

  onExpireLogin() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  tokenSuccess() {
    this.onboardService.GetSkills().subscribe(
      (data: any) => { this.skills = data },
      error => { console.log("Error skill Details" + error) });

    this.onboardService.GetStateList('US').subscribe(
      (data: any) => { this.stateList = data },
      error => { console.log("Error state Details" + error) });

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

          this.newJob.patchValue({
            companyName: this.company.CompanyName          
          });
          this.newJob.get('companyName').disable();
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

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skill: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
    })
  }
  addSkill(): void {
    (<FormArray>this.newJob.get('skills')).push(this.addSkillFormGroup())
  }
  getControls() {
    return (this.newJob.get('skills') as FormArray).controls;
  }
 
  getLength() {
    return (this.newJob.get('skills') as FormArray).length;
  }

  removeSkillButtonClick(skillIndex:number): void {
    (<FormArray>this.newJob.get('skills')).removeAt(skillIndex)
  }

  UserName:string

  onSubmit() {
    this.addJobSubmitted = true;
    if (this.deCryptData != undefined) {
      this.UserName = JSON.parse(this.deCryptData || '').userName
    }
    console.log(this.newJob.value);
    
    let skill = new Map<string, number>();
    let dict: any = {};
    for (let entry of this.newJob.value.skills) {
      console.log(entry.skill, entry.experience);
      skill.set(entry.skill, Number(entry.experience));
      dict[entry.skill] = Number(entry.experience);
    }
 
    let jobPostDetails: job= {
      Title: this.newJob.value.jobTitle,
      companyId: Number(this.company.Id),
      jobType: this.newJob.value.jobType,
      skill: dict,
      zip: Number(this.newJob.value.zip),
      location: null,
      city: this.newJob.value.city,
      state: this.newJob.value.state,
      description: this.newJob.value.description,
      PostedByUserName: this.UserName
    }     
    console.log(jobPostDetails)
      this.jobService.postJob(jobPostDetails).subscribe(
        (data: any) => { this.toastr.success("Job posted."), this.addJobSubmitted = false, this.router.navigate(['/jobs'])},
        error => { console.log(error) });   
  }
}

export interface job {
  Title: string,
  companyId: number,
  jobType: string,
  skill:skill[],
  zip: number,
  location: string,
  city: string,
  state: string,
  description: string,
  PostedByUserName:string
}

export interface skill {
  skill: string,
  experience:number
}
