import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-landing-page2',
  templateUrl: './landing-page2.component.html',
  styleUrls: ['./landing-page2.component.css']
})
export class LandingPage2Component implements OnInit {

  constructor() { }

  ngAfterViewInit() {
    this.loadCarousel();
  }

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
      $(".menu-btn").removeClass("menu-opened");
    } else {
      $(".menu").addClass("open");
      $(".menu-btn").addClass("menu-opened");
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

}
