import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BoardingComponent } from './boarding/boarding.component';
import { ServicesComponent } from './services/services.component';
import { JobsComponent } from './jobs/jobs.component';
import { CoursesComponent } from './courses/courses.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseCategoryListingComponent } from './courses/course-category-listing/course-category-listing.component';
import { FeedComponent } from './feed/feed.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from "@angular/common";
import { SocialLoginComponent } from './social-login/social-login.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import { RecOnboardingComponent } from './rec-onboarding/rec-onboarding.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { UserSearchComponent } from './feed/user-search/user-search.component';

import { PathLocationStrategy, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { NgxImageCompressService } from 'ngx-image-compress';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DeactivateComponent } from './deactivate/deactivate.component';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { AddServiceComponent } from './services/add-service/add-service.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplyJobComponent } from './jobs/apply-job/apply-job.component';
import { LandingPage2Component } from './landing-page2/landing-page2.component';
import { RecruiterProfileComponent } from './recruiter-profile/recruiter-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LandingPageComponent,
    BoardingComponent,
    ServicesComponent,
    JobsComponent,
    CoursesComponent,
    JobDetailComponent,
    CourseDetailComponent,
    CourseCategoryListingComponent,
    FeedComponent,
    EmailVerifyComponent,
    SocialLoginComponent,
    RecOnboardingComponent,
    DateAgoPipe,
    UserSearchComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    ResetPasswordComponent,
    DeactivateComponent,
    AddJobComponent,
    AddServiceComponent,
    HeaderComponent,
    FooterComponent,
    ApplyJobComponent,
    LandingPage2Component,
    RecruiterProfileComponent,
    UserProfileComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    CommonModule,
    SocialLoginModule,
    NgxTwitterTimelineModule,
    InfiniteScrollModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
             // '673744342644-0pmckod8h8romh256d87sutv1fjc8431.apps.googleusercontent.com'
             // '182680292955-302rceetm6roh5v6cq7q49cm3f89sqlk.apps.googleusercontent.com'
              //'673030349859-bck1o4vnlr525sic5t9cbuvbdbfl9655.apps.googleusercontent.com'              
              '673030349859-bck1o4vnlr525sic5t9cbuvbdbfl9655.apps.googleusercontent.com'
            ) 
          }         
        ]
      } as SocialAuthServiceConfig,
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
