import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FeedService } from 'src/app/service/feed.service';
import { feed } from 'src/app/models/feedModel';
import { NgForm } from '@angular/forms';
import { SignupService } from '../../service/signup.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router, private feed: FeedService, private signUpService: SignupService) { }

  followedList: any[];
  searchStr: string='';
  SearchUsersubmitted = false;
  followSubmitted = false;
  followedTag = false;
  GetUsers: any;
  IsGetUser = false;

  titleSearch: any;

  deCryptData: any
  deCryptSign: any
  deCryptRole: any
  deCryptUser: any
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
  }

  isFollowedLoading:boolean= false
  tokenSuccess() {
    this.feed.GetFollowedConnections().subscribe(
      (data: any) => { this.followedList = data, console.log(this.followedList), this.isFollowedLoading=true },
      error => { console.log("Error following connections." + error) }
    );
    /*   this.toastr.error(error, "Error following connections.")*/
  }

  onExpireLogin() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);  
  }

  onLogout() {
    localStorage.removeItem('data');
    localStorage.removeItem('signin');
    localStorage.removeItem('role');
/*    localStorage.removeItem('imageData');*/
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    this.toastr.success("Logged out. Please click Login button if you want to use conconnect services. Thank you", "Logged Out !");
  }


  onUserSrchSubmit(form: NgForm) {

    if (this.searchStr.length > 2) {
      this.SearchUsersubmitted = true;
      this.feed.GetUsers(this.searchStr).subscribe(
        (data: any) => { this.GetUsers = data, console.log(this.GetUsers), this.IsGetUser = true,
          this.SearchUsersubmitted = false, this.userSerachBlock(data) },
        error => { console.log("Error Getting Users."+error) , this.IsGetUser = false,this.SearchUsersubmitted = false  }
      );
    }
    else {
      this.SearchUsersubmitted = false;    
    }   
  }
/*  this.toastr.error(error, "Error Getting Users.")*/
  userValues: any;
  userValueArray: any = [];
  userSerachBlock(data: any) {
    this.userValueArray = [];
    console.log(data);   
    let flag = false;
    Object.entries<feed>(data[0]).forEach(([key, value]) => {
      flag = false;
      Object.entries<feed>(data[1]).forEach(([key1, value1]) => {
        if (value.userName == value1.userName) {
          flag = true;
        }
      })

      if (!flag) {
        this.userValues = new feed(0, '', false, '', value.userName, value.name, value.image, false, '', '', '', '', false, '', false, '', '','', { userDetails: { photo: '', photoMimeType: '', firstName: '', lastName: '' } }, '', '', false);

        //this.userValues.userName = value.userName;
        //this.userValues.name = value.name;
        //this.userValues.image = value.image;
        //this.userValues.isFollow = false;

        this.userValueArray.push(this.userValues);
        flag = false;
      }
    });
    console.log(this.userValueArray);   
  }

  onFollow(data: any) {
    this.followSubmitted = true;
    Object.entries<feed>(this.userValueArray).forEach(([key, value]) =>{
      if (value.userName == data) {
        value.isFollow = true;  
      }  
    })

    this.feed.FollowUser(data).subscribe(
      (data: any) => {
        this.toastr.success("User followed."),
          this.followedTag = true,
          this.followSubmitted = false
      },
      error => {
     
          this.followSubmitted = false,
          this.followedTag = false
      }
    );
    console.log(data);
  }

  onProfile() {
    console.log(JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId));
    if (JSON.stringify(JSON.parse(this.deCryptData || '').userRole[0].roleId) == "1")
      this.router.navigate(['/boarding']);
    else
      this.router.navigate(['/rec-boarding']);
  }
}


//interface connectionsSearch {
//  userName: string,
//  name: string,
//  image: string,
//  isFollow: boolean
//}
