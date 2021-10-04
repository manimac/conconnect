import { Component, OnInit } from '@angular/core';
import { signup } from '../models/signup';
import { SignupService } from '../service/signup.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { socialLoginModel } from '../models/socialloginModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  errorMessage = '';
  successData = '';
  role = '';
  spinner = false;

  fieldTextType: boolean;

  toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

  signUpModel = new signup('', '', '', '', '', '', '', '', '', '1', '','');
  constructor(private reqService: SignupService, private router: Router, private toastr: ToastrService, private authService: SocialAuthService) { }


  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any

  ngOnInit() {
    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }

    console.log(window.location.origin);
    if (localStorage.getItem('data') != null) {
      if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "1") {
        this.router.navigate(['/feed']);
      }
      else {
        this.router.navigate(['/feed']);
      }

    }
  }

  onSubmit(form: NgForm) {
    console.log("login");
    this.submitted = true;
    //console.log(this.signUpModel);
    return this.reqService.loginEnroll(this.signUpModel).subscribe(
      data => { this.successLoginBlock(data) },
      error => this.errorResult(error.error, form)); 
        //this.errorMessage = error.error);
  }

  //roleLogin = new roleLogin('');

  successLoginBlock(data: any) {
    //this.roleLogin = data1;
    this.role = this.signUpModel.Role;
    if (this.role == "1") {
      this.toastr.success("Login success", 'Successfully loggedIn');
      this.router.navigate(['/feed'], { state: { data } });
      localStorage.setItem('data', window.btoa(JSON.stringify(data)));
      localStorage.setItem('signin', window.btoa(JSON.stringify(this.signUpModel)));
    }
    else {
      this.toastr.success("Login success", 'Successfully loggedIn');
      this.router.navigate(['/feed'], { state: { data } });
      localStorage.setItem('data', window.btoa(JSON.stringify(data)));
      localStorage.setItem('signin', window.btoa(JSON.stringify(this.signUpModel)));
    }
    

  }
  errorResult(error: any, form: NgForm) {
   this.toastr.error(error, 'Authentication failed');

    this.submitted = false;    
    //form.resetForm();    
  }

  signInWithGoogle(): void {
    this.spinner = true;
    this.role = this.signUpModel.Role;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      const userDetails = new socialLoginModel(user.email, user.authToken, 2, this.role);
      console.log("userDetails:" + JSON.stringify(userDetails));
      return this.reqService.loginGoogle(userDetails).subscribe(
        data => { this.googleLoginBlock(data) },
        error => this.errorGoogleResult(error));
    });
  }

  googleLoginBlock(data: any) {
    this.role = this.signUpModel.Role;
    this.toastr.success("Login success");
    localStorage.setItem('data', window.btoa(JSON.stringify(data)));
    localStorage.setItem('signin', window.btoa(JSON.stringify(this.signUpModel)))

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

  errorGoogleResult(error: any) {
    this.spinner = false;
    console.log(JSON.stringify(error));
    this.toastr.error('Please select proper role', 'Authentication failed');
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
    //this.baseUrl = "https://conconnect.com";
    this.redirect_uri = encodeURI(this.baseUrl + '/linkedin');
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=77qsmmh3e36x2n&redirect_uri=${this.redirect_uri}`;
  }
/*  window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=78jxj3ixy50ep9&redirect_uri=${this.redirect_uri}`;*/


}
