import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {CreateUserRecruiterComponent} from "./create-user-recruiter/create-user-recruiter.component";
import {CreateUserStudentComponent} from "./create-user-student/create-user-student.component";
import {AuthGuardService} from "./login/auth-guard.service";
/**
 * Created by ishaaq on 7/6/2017.
 */

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuardService]},
  {path: 'create-user-recruiter', component: CreateUserRecruiterComponent, canActivate: [AuthGuardService]},
  {path: 'create-user-student', component: CreateUserStudentComponent, canActivate: [AuthGuardService]}
];

export const Approutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
