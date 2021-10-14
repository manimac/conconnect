import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from '../service/signup.service';
import { ServiceService } from '../service/service.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private signUpService: SignupService, private serviceService: ServiceService) { }

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any

  ngOnInit() {
    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }

    this.signUpService.tokenCheck().subscribe(
      (data: any) => {
        if (data == 'fail') {
          this.toastr.error("Session time expired. Please login"), this.onExpireLogin()
        }
        else { this.tokenSuccess() }
      },
      error => { console.log("Token Expire Error" + error) });

  }

  _notificationList: any = []
  count: any;
  isCountZero: boolean = false
  tokenSuccess() {
    this.serviceService.GetNotificationList().subscribe(
      (data: any) => {
        this._notificationList = data,
          this.count = this._notificationList.length,
          this.countCheck(),
          console.log(this._notificationList)
      },
      error => { console.log("Error getting notification list" + error) });
  }

  countCheck() {
    if (this.count == 0) this.isCountZero = true
  }

  onLogout() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    this.toastr.success("Logged out. Please click Login button if you want to use conconnect services. Thank you", "Logged Out !");
  }

  onExpireLogin() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }



  onProfile() {
    console.log(JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId));
    if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "1")
      this.router.navigate(['/boarding']);
    else
      this.router.navigate(['/rec-boarding']);
  }
  notifRead(id: number, notificationData: any) {
    console.log(id);

    Object.entries<notification>(this._notificationList).forEach(([key, value]) => {
      console.log(value);
      if (value.id == id) {
        this._notificationList.splice(key, 1);
        this.count = this._notificationList.length;
        this.countCheck();
      }
    })

    this.serviceService.ReadNotification(id).subscribe(
      (data: any) => {
        console.log("updated the notification.")
        this.redirectPage(notificationData);
      },
      error => { console.log("Error update notification" + error) });

  }

  redirectPage(data: any){
    if(data.notificationId == 4){
      this.router.navigate(['/user/' + data.pageIdentifier]);
    }
    else if(data.notificationId == 6){
      this.router.navigate(['/job-detail/' + data.pageIdentifier]);
    }
    else if(data.notificationId == 9){
      this.router.navigate(['/jobApply/' + data.pageIdentifier]);
    }
  }

  menuToggle() {
    if($(".menu").hasClass("open")) {
      $(".menu").removeClass("open");
    } else {
      $(".menu").addClass("open");
    }      
  }

  subMenuToggle(e: any) {
    console.log($(e.target).siblings(".sub-menu"));
    if($(e.target).hasClass("open")) {
      $(e.target).removeClass("open");
      $(e.target).siblings(".sub-menu").removeClass("open");
    } else {
      $(e.target).addClass("open");
      $(e.target).siblings(".sub-menu").addClass("open");
    }
  }
}

interface notification {
  id: number,
  notificationId: number,
  description: string,
  dateCreatedOn: Date,
  status: boolean
}
