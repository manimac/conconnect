import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { PlatformLocation } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


//@HostListener('window:popstate', ['$event'])
//onPopState(event) {
//  console.log('Back button pressed');
//  //Here you can handle your modal
//}

  //@ViewChild('modal1') modal: ElementRef;

  //constructor(
  //  private platformLocation: PlatformLocation,
  //  private modalService: NgbModal
  //) {
    
  //}

  constructor(private location: Location, private location2: PlatformLocation, private router: Router) {
   
  }
  //ngAfterViewInit() {
  //  this.loadMap();
  //}

  //ngAfterViewInit() {
  ////  this.platformLocation.onPopState(() => this.modalService.dismissAll());
  //// simulate a navigation history adding consecutive hashs
  //window.location.hash = 'hash1';
  //window.location.hash = 'hash2';
  //window.location.hash = 'hash3';

  //  //this.location2.onPopState(() => {
  //  //  console.log(this.modal);
  //  //  if (typeof $ !== 'undefined') {  
  //  //      $(this.modal.nativeElement).modal('hide');
  //  //  }    
  //  //});

  //  //// when location change...
  //  //this.location.subscribe(location => {
  //  //  alert(window.location);
  //  //  if (typeof $ !== 'undefined') {       
  //  //      $(this.modal.nativeElement).modal('hide');    
  //  //}
  //  //});

  //  /*    location.reload();*/
  //}
 

  title = 'conconnect';

}


