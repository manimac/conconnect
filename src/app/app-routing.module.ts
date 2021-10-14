import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BoardingComponent } from './boarding/boarding.component';
import { ServicesComponent } from './services/services.component';
import { CoursesComponent } from './courses/courses.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseCategoryListingComponent } from './courses/course-category-listing/course-category-listing.component';
import { FeedComponent } from './feed/feed.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { AuthGuard } from './auth/auth.guard';
import { SocialLoginComponent } from './social-login/social-login.component';
import { RecOnboardingComponent } from './rec-onboarding/rec-onboarding.component';
import { UserSearchComponent } from './feed/user-search/user-search.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DeactivateComponent } from './deactivate/deactivate.component';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { AddServiceComponent } from './services/add-service/add-service.component';
import { ApplyJobComponent } from './jobs/apply-job/apply-job.component';
import { LandingPage2Component } from './landing-page2/landing-page2.component';
import { ProfileComponent } from './profile/profile.component';
import { JoinTheNationalComponent } from './join-the-national/join-the-national.component';
import { AdvertiseWithUsComponent } from './advertise-with-us/advertise-with-us.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'boarding', component: BoardingComponent, canActivate: [AuthGuard] },
  { path: 'rec-boarding', component: RecOnboardingComponent, canActivate: [AuthGuard]},
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'addservice', component: AddServiceComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: 'job-detail/:id', component: JobDetailComponent, canActivate: [AuthGuard] },
  { path: 'jobApply/:id', component: ApplyJobComponent, canActivate: [AuthGuard] },
  { path: 'addjob', component: AddJobComponent, canActivate: [AuthGuard] },
  { path: 'course-detail', component: CourseDetailComponent, canActivate: [AuthGuard]},
  { path: 'course-category-listing', component: CourseCategoryListingComponent, canActivate: [AuthGuard]},
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  { path: 'confirm', component: EmailVerifyComponent },
  { path: 'home', component: LandingPage2Component },
  { path: 'linkedin', component: SocialLoginComponent },
  { path: 'connections', component: UserSearchComponent, canActivate: [AuthGuard] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'passwordreset', component: ResetPasswordComponent },
  { path: 'deactivate', component: DeactivateComponent, canActivate: [AuthGuard] },
  { path: 'landing-page', component: LandingPage2Component },
  { path: 'user/:name', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'join-the-national-reentry-round-table', component: JoinTheNationalComponent },
  { path: 'advertise-with-us', component: AdvertiseWithUsComponent },
  { path: '', component: LandingPage2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
