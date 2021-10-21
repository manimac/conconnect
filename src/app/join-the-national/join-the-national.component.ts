import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {joinTheNational} from '../models/joinTheNational';
import { NgForm } from '@angular/forms';
import { JoinTheNationalService } from '../service/join-the-national.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-join-the-national',
  templateUrl: './join-the-national.component.html',
  styleUrls: ['./join-the-national.component.css']
})
export class JoinTheNationalComponent implements OnInit {

  joinTheNationalModel = new joinTheNational('', '', '', '', '');
  constructor(private router: Router, private location: Location, private joinTheNationService: JoinTheNationalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    $(window).on("scroll", function () {
      console.log("in");
      if($(window).scrollTop() < 100) {
        $("header").removeClass("scrolled");
      } else {
        $("header").addClass("scrolled");
      }
    });
  }
  menuToggle() {
    if($(".menu").hasClass("open")) {
      $(".menu").removeClass("open");      
      $(".menu-btn").removeClass("menu-open");
    } else {
      $(".menu").addClass("open");
      $(".menu-btn").addClass("menu-open");
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

  signupBtnClick() {
    this.location.replaceState('/');
    return this.router.navigateByUrl('/signup');
  }

  loginBtnClick() {
    this.location.replaceState('/');
    return this.router.navigateByUrl('/login');
  }

  onSubmit() {
    let params = {
      "FirstName": this.joinTheNationalModel.FirstName,
      "LastName": this.joinTheNationalModel.LastName,
      "EmailId": this.joinTheNationalModel.EmailId,
      "PhoneNumber": this.joinTheNationalModel.PhoneNumber,
      "CompanyName": this.joinTheNationalModel.CompanyName,
    }
    this.joinTheNationService.postNationalReEntry(params).subscribe(
      (data: any) => {
        this.toastr.success("Thanks for your interest in joining our National Reentry Round Table. Please provide below details and our team will reach out to you for next steps.", "Success !");
      },
      error => {
        console.log(error)
      }   
    );  
  }

}
