import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JobService } from '../../service/job.service';
import { OnboardService } from '../../service/onboard.service';
import { ActivatedRoute } from '@angular/router';
import { SignupService } from '../../service/signup.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router, private jobService: JobService, private signUpService: SignupService, private _Activatedroute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any
  isConnect: boolean = false;

  ngOnInit() {

    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }

    if (this.deCryptData != null) {
      if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "2") {
        this.isConnect = true;
      }
      else {
        this.isConnect = false;
      }
    }

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

  onExpireLogin() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  _recentJobsList: any[]
  _jobDetail: any
  id: any = this._Activatedroute.snapshot.paramMap.get("id");
  isJobDetailLoaded: boolean = false;
  isLatestJobDetailLoaded: boolean = false;
  tokenSuccess() {

    this.jobService.GetRecentJobsList().subscribe(
      (data: any) => { this._recentJobsList = data, console.log(this._recentJobsList),this.isLatestJobDetailLoaded=true },
      error => { console.log("Error getting recent jobs" + error) });

    this.jobService.GetJobDetailById(this.id).subscribe(
      (data: any) => { this._jobDetail = data, console.log(this._jobDetail), this.isJobDetailLoaded = true},
      error => { console.log("Error getting job details" + error) });

  }

}
