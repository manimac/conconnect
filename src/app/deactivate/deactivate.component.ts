import { Component, OnInit } from '@angular/core';
import { SignupService } from '../service/signup.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.css']
})
export class DeactivateComponent implements OnInit {

  constructor(private reqService: SignupService, private router: Router, private toastr: ToastrService) { }

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
  spinner = false;
  submitted = false;

  noDeactivate() {
    if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "1") {
      this.router.navigate(['/boarding']);
    }
    else {
      this.router.navigate(['/rec-boarding']);
    }
  }

  Deactivate() {
    this.submitted = true;
    return this.reqService.deactivate().subscribe(
      data => { this.successLoginBlock(data) },
      error => this.errorResult(error.error));
  }

  successLoginBlock(data: any) {
    this.toastr.success("Account Deactivated");

    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  errorResult(error: any) {
    this.toastr.error('Account not deactivated.');
    console.log(error);
    this.submitted = false;
  }
}
