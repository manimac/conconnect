import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router, private location:Location) { }

  ngOnInit(): void {
  }

  signupBtnClick(){
    this.location.replaceState('/'); 
      return this.router.navigateByUrl('/signup');
  }

loginBtnClick(){
  this.location.replaceState('/'); 
  return this.router.navigateByUrl('/login');
}

}
