import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-landing-page2',
  templateUrl: './landing-page2.component.html',
  styleUrls: ['./landing-page2.component.css']
})
export class LandingPage2Component implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngAfterViewInit() {
    this.loadCarousel();
  }

  ngOnInit(): void {

    $(window).on("scroll", function () {
      if ($(window).scrollTop() < 100) {
        $("header").removeClass("scrolled");
      } else {
        $("header").addClass("scrolled");
      }
    });

    $("[data-toggle='tooltip']").tooltip({trigger: "click"});
  }
  menuToggle() {
    if ($(".menu").hasClass("open")) {
      $(".menu").removeClass("open");
      $(".menu-btn").removeClass("menu-open");
    } else {
      $(".menu").addClass("open");
      $(".menu-btn").addClass("menu-open");
    }      
  }

  subMenuToggle(e: any) {
    if($(e.target).hasClass("open")) {
      $(e.target).removeClass("open");
      $(e.target).siblings(".sub-menu").removeClass("open");
    } else {
      $(e.target).addClass("open");
      $(e.target).siblings(".sub-menu").addClass("open");
    }
  }

  loadCarousel() {
    if ($('.carousel-item').length) {
      $("#testimonialCarousel").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: false,
        smartSpeed: 500,
        autoplay: true,
        navText: ['<img src="../../assets/img/landing/testimonial-arrow-left.png" alt="Prev Icon">', '<img src="../../assets/img/landing/testimonial-arrow-right.png" alt="Next Icon">'],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          800: {
            items: 1
          },
          1024: {
            items: 1
          },
          1200: {
            items: 1
          }
        }
      });
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

  navigateToSection(section: HTMLElement) {
    section.scrollIntoView();
  }
}
