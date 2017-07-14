import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {CreateUserRecruiterComponent} from "./create-user-recruiter/create-user-recruiter.component";
import {CreateUserStudentComponent} from "./create-user-student/create-user-student.component";
import {AuthGuardService} from "./login/auth-guard.service";
import {JobPostComponent} from "./job-post/job-post.component";
import {CreateJobPostComponent} from "./create-job-post/create-job-post.component";
import {JobsAppliedToComponent} from "./jobs-applied-to/jobs-applied-to.component";
/**
 * Created by ishaaq on 7/6/2017.
 */

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'create-user-recruiter', component: CreateUserRecruiterComponent},
  {path: 'create-user-student', component: CreateUserStudentComponent},
  {path: 'job-post/:id', component: JobPostComponent, canActivate: [AuthGuardService]},
  {path: 'create-job-post', component: CreateJobPostComponent, canActivate: [AuthGuardService]},
  {path: 'edit-job-post/:id', component: CreateJobPostComponent, canActivate: [AuthGuardService]},
  {path: 'jobs-applied-to', component: JobsAppliedToComponent, canActivate: [AuthGuardService]}

];

export const Approutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
