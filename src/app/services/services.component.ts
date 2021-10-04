import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JobService } from '../service/job.service';
import { SignupService } from '../service/signup.service';
import { Gender } from '../models/Gender';
import { OnboardService } from '../service/onboard.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router, private serviceService: ServiceService, private signUpService: SignupService, private onboardService: OnboardService) { }

  CategorySearch: any = null;
  zipSearch: any = null;
  citySearch: any = "";
  stateSearch: any = "";

  isConnect: boolean = false;
  isRecentServicesLoaded: boolean = false;

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any
  isPHeightS=true;

  ngOnInit() {

    if (localStorage.getItem('data') != undefined) { this.deCryptData = window.atob(localStorage.getItem('data')) }
    if (localStorage.getItem('signin') != undefined) { this.deCryptSign = window.atob(localStorage.getItem('signin')) }
    if (localStorage.getItem('role') != undefined) { this.deCryptRole = window.atob(localStorage.getItem('role')) }
    if (localStorage.getItem('user') != undefined) { this.deCryptUser = window.atob(localStorage.getItem('user')) }

    if (localStorage.getItem('data') != null) {
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

  _recentServiceList: any[]
  _noDataFound: boolean = false
  categoryList: any
  stateList: Gender
  tokenSuccess() {
    this.serviceService.GetRecentServiceList().subscribe(
      (data: any) => {
        this._recentServiceList = data,
          console.log(this._recentServiceList),
          this.isRecentServicesLoaded = true,
          this._noDataFound = false,

          Object.entries<RecentService>(this._recentServiceList).forEach(([keyComments, valueComments]) => {
            valueComments.last_index = 150;
            valueComments.firstCount = 150;
            valueComments.counter = 150;
            valueComments.showTxt = "Show More"

            if (valueComments.description != undefined && valueComments.description != null) {
              valueComments.last_index = (valueComments.description.substring(0, 150)).lastIndexOf(' ');
              if (valueComments.last_index > 150)
                valueComments.last_index = 150;
              valueComments.counter = valueComments.last_index;
            }
          })
      },
      error => { console.log("Error getting recent services" + error) });

    this.serviceService.GetCategory().subscribe(
      (data: any) => { this.categoryList = data },
      error => { console.log("Error category Details" + error) });

    this.onboardService.GetStateList('US').subscribe(
      (data: any) => { this.stateList = data },
      error => { console.log("Error state Details" + error) });
  }

  toggleServiceDescription(comId: number) {
    this.isPHeightS = false;
    console.log("inside comment show more")
    Object.entries<RecentService>(this._recentServiceList).forEach(([comKey, comVal]) => {
      if (comVal.counter < 151) {
        if (comVal.id == comId) {
          comVal.counter = comVal.description.length;
          comVal.showTxt = "Show less";
        }
      }
      else {
        comVal.counter = comVal.last_index;
        comVal.showTxt = "Show More"
        this.isPHeightS = true;
      }
    })
  }

  jobsSearchBtnSubmitted = false
  onSearch() {
    this.jobsSearchBtnSubmitted = true
    this.isRecentServicesLoaded = false
    console.log(this.CategorySearch)
    console.log(this.zipSearch)
    console.log(this.citySearch)
    console.log(this.stateSearch)

    this.zipSearch = Number(this.zipSearch);
    this.CategorySearch = Number(this.CategorySearch);

    this.serviceService.GetServiceDetailBySearch(this.CategorySearch, this.zipSearch, this.citySearch, this.stateSearch).subscribe(
      (data: any) => {
        this._recentServiceList = data, console.log(this._recentServiceList), this.isRecentServicesLoaded = true, this.dataNotFound(), this.jobsSearchBtnSubmitted = false,
          Object.entries<RecentService>(this._recentServiceList).forEach(([keyComments, valueComments]) => {
            valueComments.last_index = 150;
            valueComments.firstCount = 150;
            valueComments.counter = 150;
            valueComments.showTxt = "Show More"

            if (valueComments.description != undefined && valueComments.description != null) {
              valueComments.last_index = (valueComments.description.substring(0, 150)).lastIndexOf(' ');
              if (valueComments.last_index > 150)
                valueComments.last_index = 150;
              valueComments.counter = valueComments.last_index;
            }
          })
      },
      error => { console.log("Error Search Details" + error) });
  }

  dataNotFound() {
    if (this._recentServiceList.length == 0) {
      this._noDataFound = true
    }
    else {
      this._noDataFound = false
    }
  }
}

export class RecentService {
  constructor(
    public id: number,
    public logo: string,
    public title: string,
    public description: string,
    public dateCreatedOn: any,
    public url:string,
    public last_index: number = 150,
    public firstCount: number = 150,
    public counter: number = 150,
    public showTxt: string = "Show More"
  ) { }
}
