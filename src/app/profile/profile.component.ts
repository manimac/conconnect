import { Component, OnInit, AfterViewInit } from '@angular/core';
import { profileService } from '../service/profile';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  userShow = false;
  constructor(public profile: profileService) {
    this.getUser();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.loadCarousel();
  }

  getUser() {
    this.profile.GetUser().subscribe(
      (data: any) => {
        console.log(data);
        this.user = data, this.userShow = true;
      },
      error => { console.log(error) }
    );
  }

  menuToggle() {
    // if($(".menu").hasClass("open")) {
    //   $(".menu").removeClass("open");
    // } else {
    //   $(".menu").addClass("open");
    // }      
  }

  loadCarousel() {
    if ($('.item').length) {
      $('.item').owlCarousel({
        loop: true, margin: 30, nav: true, smartSpeed: 500, autoplay: 5000, navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'], responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          700: {
            items: 2
          },
          800: {
            items: 2
          },
          1024: {
            items: 3
          },
          1200: {
            items: 3
          }
        }
      });
    }
  }

}
