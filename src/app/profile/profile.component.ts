import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { profileService } from '../service/profile';
import { user } from '../models/user';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  _user: any;
  userShow = false;
  constructor(public profile: profileService, private route: ActivatedRoute) { }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.getUserProfile(name);
      }
    });
  }

  menuToggle() {
    if($(".menu").hasClass("open")) {
      $(".menu").removeClass("open");
    } else {
      $(".menu").addClass("open");
    }      
  }
  loadCarousel() {
    var activitiesCarousel = $("#activitiesCarousel").owlCarousel({
      loop: true, 
      margin: 20, 
      nav: true, 
      dots: false, 
      smartSpeed: 500, 
      autoplay: true, 
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        767: {
          items: 2.5
        },
        1200: {
          items: 3.25
        }
      }
    });

    $(".activity .controls-block .right").click(function () {
      console.log("in");
      activitiesCarousel.trigger('next.owl.carousel', [300]);
    });
    $('.activity .controls-block .left').click(function () {
      activitiesCarousel.trigger('prev.owl.carousel', [300]);
    });
  }

  getUserProfile(Name: any) {    
    this.profile.GetUserProfile(Name).subscribe(
      (data: any) => {
        if(data && Array.isArray(data) && (data.length>0)){
          this._user = data[0];
          this.userShow = true;
          setTimeout(()=>{
            this.loadCarousel();
          })          
        }
      },
      error => { console.log(error) }
    );
  }

  isRecruiter(){
    return (this._user.role == 2) ? true: false
  }

  isUser(){
    return (this._user.role == 1) ? true: false
  }

}
