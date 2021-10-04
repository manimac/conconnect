import { Component, OnInit } from '@angular/core';
import { signup } from '../models/signup';
import { SignupService } from '../service/signup.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  submitted = false;
  errorMessage = '';
  successData = '';
  role = '';
  spinner = false;
  verify = false;

  fieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  resetPasswordModel = new resetPassword('', '', null);

  constructor(private reqService: SignupService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() { 

  }
  onVerifyCode() {
    console.log("send verification code");
    this.submitted = true;
    return this.reqService.verifyCode(this.resetPasswordModel).subscribe(
      data => {
        this.verify = true,
          this.submitted = false;
        this.toastr.success("Email sent, please check you inbox, promotions or spam folder")
      },
      error => {this.toastr.error('User not found. Please enter proper user detail.'),console.log(error)});
  }

  onForgotPassword(form: NgForm) {
    console.log("forgotPassword");
    this.submitted = true;
    return this.reqService.passwordReset(this.resetPasswordModel).subscribe(
      data => { this.successLoginBlock(data) },
      error => this.errorResult(error.error));
  }

  successLoginBlock(data: any) {    
    this.toastr.success("Password updated");
    this.router.navigate(['/login'], { state: { data } });
  }

  errorResult(error: any) {
    this.toastr.error('User not found. Please enter proper user detail.');
    console.log(error);
    this.submitted = false; 
  }

}

export class resetPassword{
  constructor(
    public UserName: string,
    public Password: string,
    public Gateway: number  
  ) { }  
}
