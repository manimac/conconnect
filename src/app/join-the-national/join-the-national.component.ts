import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-join-the-national',
  templateUrl: './join-the-national.component.html',
  styleUrls: ['./join-the-national.component.css']
})
export class JoinTheNationalComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }

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

}
