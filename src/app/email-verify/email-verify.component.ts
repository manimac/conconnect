import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})

export class EmailVerifyComponent implements OnInit {
  errorMessage = '';
  statusCode = false;
  firstParam = '';
  IsShow = false;

  constructor(private route: ActivatedRoute, private reqService: SignupService, private toastr: ToastrService,private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.firstParam = params['verify'];     
    });
  }

 // firstParam:string = "c2FuYXBhdGhpLmNoaWx1a3VuYWlkdUBnbWFpbC5jb206WXpsalltWXpOalpsWm1JMk5UUTRPVGM1T1Roak5tTmhPVFprWXpZMU5ERXhaREU0WWprMU1qRXpPV1ptWkdSa05tSTBNakV5TVdFek5qVm1ZelUwTlRJMk16STFZemN3WTJGaU9HTmlNemMzWVRrME9UWmtOMlUwTTJKa1ptUTU=";

  ngOnInit() {

    return this.reqService.emailVerification(this.firstParam).subscribe(
      data =>this.successBlock(),       
      error =>this.errorBlock(error.error)) 
  }

  successBlock() {
    this.IsShow = true;
    this.toastr.success("Email validation successfully", 'Email Verification');
    this.statusCode = true;
  }
  errorBlock(error: any) {
    this.IsShow = true;
    this.toastr.error(error, 'Email Verification Error');
    this.statusCode = false;
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

}
