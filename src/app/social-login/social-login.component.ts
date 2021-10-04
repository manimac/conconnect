import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkedinService } from '../service/linkedin.service';
import { ToastrService } from 'ngx-toastr';
import { socialLoginModel } from '../models/socialloginModel';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private reqService: LinkedinService, private toastr: ToastrService, private router: Router) { }

  code = '';
  role = '';
  userDetails: any;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.code = params.code;      
        console.log(this.code);
        this.role = JSON.parse(localStorage.getItem('role') || '1');
      }
    );

      this.reqService.getAccessToken(this.code).subscribe(
      data => this.successLinkedinResult(data),
      error => this.errorLinkedinResult(error));
  }
  successLinkedinResult(data1:any) {
    this.toastr.success("successfully generated token");
    console.log("Token:" + JSON.parse(JSON.stringify(data1)).access_token);

    this.reqService.getLinkedinData(JSON.parse(JSON.stringify(data1)).access_token).subscribe(
      data => this.successLinkedinData(data, JSON.parse(JSON.stringify(data1)).access_token),
      error => this.errorLinkedinData(error.error));
  }

  errorLinkedinResult(error: any) {
    console.log(error);
  this.toastr.error(error,'error generating token');
  }

  successLinkedinData(data:any,token:string) {
    this.toastr.success('Successfully get the data. Please wait few mins to loggedin.');
    console.log(token);
    console.log(JSON.parse(JSON.stringify(data)));

    this.userDetails = new socialLoginModel(JSON.parse(JSON.stringify(data)).localizedFirstName, token, 3, this.role);
    return this.reqService.loginLinkedIn(this.userDetails).subscribe(
      data => { this.linkedLoginBlock(data, this.userDetails) },
      error => this.errorLinkedIndataResult(error.error));
  }

  linkedLoginBlock(data: any,singin:any) {
    if (this.role == "1") {
      this.toastr.success("Login Success", 'Successfully LoggedIn');
      this.router.navigate(['/feed'], { state: { data } });
      localStorage.setItem('data', window.btoa(JSON.stringify(data)));
      localStorage.setItem('signin', window.btoa(JSON.stringify(singin)));
    }
    else {
      this.toastr.success("Login Success", 'Successfully LoggedIn');
      this.router.navigate(['/feed'], { state: { data } });
      localStorage.setItem('data', window.btoa(JSON.stringify(data)));
      localStorage.setItem('signin', window.btoa(JSON.stringify(singin)));
    }   
  }

  errorLinkedinData(error:any) {
    this.toastr.error(error, 'error getting data');
  }
  errorLinkedIndataResult(error: any) {
    this.toastr.error(error, 'linkedin error authentication');
  }
}
