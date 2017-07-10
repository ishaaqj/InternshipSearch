import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {CreateUserRecruiterComponent} from "./create-user-recruiter/create-user-recruiter.component";
import {CreateUserStudentComponent} from "./create-user-student/create-user-student.component";
/**
 * Created by ishaaq on 7/6/2017.
 */

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'create-user-recruiter', component: CreateUserRecruiterComponent},
  {path: 'create-user-student', component: CreateUserStudentComponent}
];

export const Approutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
