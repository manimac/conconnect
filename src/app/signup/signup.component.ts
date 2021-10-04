import { Component, OnInit } from '@angular/core';
import {signup} from '../models/signup';
import {SignupService} from '../service/signup.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { socialLoginModel } from '../models/socialloginModel';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  errorMessage = '';
  role = '';
  spinner = false;
 
  submitted = false;
  default_image ="https://conconnect-objects.s3.amazonaws.com/images/profile/default-image.png"
  
  signUpModel = new signup('', '', '', '', '', '11111111111', 'IN', this.default_image, 'image/png', '1', '','');

  loginModel = new signup('', '', '', this.signUpModel.UserName, this.signUpModel.Password, '11111111111', 'IN', this.default_image, 'image/png', this.signUpModel.Role, '','');

  fieldTextType: boolean; fieldTextType1: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  constructor(private reqService: SignupService, private toastr: ToastrService, private router: Router, private authService: SocialAuthService) { }

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any
  ngOnInit() {
    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    this.signUpModel.UserName = form.value.UserName;
    this.signUpModel.Password = form.value.Password;
    this.signUpModel.Role = form.value.Role;

    return this.reqService.enroll(this.signUpModel).subscribe(
      data => this.successResult(data, form),
      error => {console.log(error), this.errorResult(error.error, form) });

    //console.log(this.loginModel);
    //console.log(form.value);
  }
  errorResult(error: any, form: NgForm) {
    this.toastr.error(error);
    this.submitted = false; 
    //form.resetForm();
    form.controls['FirstName'].reset();
    form.controls['LastName'].reset();
    form.controls['UserName'].reset();
    form.controls['Password'].reset();
    form.controls['Phone'].reset();
    if (this.signUpModel.Role=='2')
    form.controls['CompanyName'].reset();  
  }

  successResult(data: any, form: NgForm) {
    this.toastr.success("User added successfully. Please activate user by clicking activate code sent by registered mail and login", 'User registration success'),
      this.submitted = false;

    this.loginModel.UserName = this.signUpModel.UserName;
    this.loginModel.Password = this.signUpModel.Password;
    this.loginModel.Role = this.signUpModel.Role;

    //this.router.navigate(['/signup']);

    //form.controls['FirstName'].reset();
    //form.controls['LastName'].reset();
    //form.controls['UserName'].reset();
    //form.controls['Password'].reset();
    //if (this.signUpModel.Role == '2')
    //  form.controls['CompanyName'].reset();

    console.log("after signup: " + this.loginModel)
    return this.reqService.loginEnroll(this.loginModel).subscribe(
      data => { this.successLoginBlock(data) },
      error => this.errorloginResult(error.error, form));
    //this.errorMessage = error.error);
  }

  //roleLogin = new roleLogin('');

  successLoginBlock(data: any) {
    //this.roleLogin = data1;
    this.role = this.signUpModel.Role;
    if (this.role == "1") {
      this.toastr.success("Login success", 'Successfully loggedIn');
      this.router.navigate(['/boarding'], { state: { data } });
      localStorage.setItem('data', window.btoa(JSON.stringify(data)));
      localStorage.setItem('signin', window.btoa(JSON.stringify(this.signUpModel)));
    }
    else {
      this.toastr.success("Login success", 'Successfully loggedIn');
      this.router.navigate(['/rec-boarding'], { state: { data } });
      localStorage.setItem('data', window.btoa(JSON.stringify(data)));
      localStorage.setItem('signin', window.btoa(JSON.stringify(this.signUpModel)));
    }


  }
  errorloginResult(error: any, form: NgForm) {
    this.toastr.error(error, 'Authentication failed');

    this.submitted = false;
    //form.resetForm();    
  }

  signInWithGoogle(): void {
    this.spinner = true;
    this.role = this.signUpModel.Role;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      const userDetails = new socialLoginModel(user.email, user.authToken, 2, this.role);
      return this.reqService.loginGoogle(userDetails).subscribe(
        data => { this.toastr.success("Login success", 'Successfully loggedIn'), localStorage.setItem('data', window.btoa(JSON.stringify(data))), localStorage.setItem('signin', window.btoa(JSON.stringify(this.signUpModel))), this.navigation(this.role)},
        error => this.errorGoogleResult(error.error));
    });
  }

  errorGoogleResult(error: any) {
    this.spinner = false;
    this.toastr.error(error, 'Authentication failed');
  }

  navigation(val: any) {
    if (JSON.parse(window.atob(localStorage.getItem('data')) || '').password == "N") {
      if (this.role == "1") {
        this.router.navigate(['/boarding'], {});
      }
      else {
        this.router.navigate(['/rec-boarding'], {});
      }
    }
    else {
      this.router.navigate(['/feed'], {});
    }
  }

  signOut(): void {
    this.authService.signOut();
  }

  redirect_uri: any;
  baseUrl: any;
  onLinkedinSubmit() {
    console.log(this.signUpModel.Role);

    localStorage.setItem('role', window.btoa(JSON.stringify(this.signUpModel.Role)));
    
    this.baseUrl = window.location.origin;
    this.redirect_uri = encodeURI(this.baseUrl + '/linkedin');
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=78jxj3ixy50ep9&redirect_uri=${this.redirect_uri}`;
  }
}
