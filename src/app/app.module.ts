import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {Approutes} from "./app.routing";
import {AppMaterialModule} from "./CustomMaterialModule";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {env} from "./app.env";
import {AngularFireDatabaseModule} from "angularfire2/database";
import { HomeComponent } from './home/home.component';
import { HomeStudentComponent } from './home-student/home-student.component';
import { HomeRecruiterComponent } from './home-recruiter/home-recruiter.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUserRecruiterComponent } from './create-user-recruiter/create-user-recruiter.component';
import { CreateUserStudentComponent } from './create-user-student/create-user-student.component';
import {AuthGuardService} from "./login/auth-guard.service";
import { JobPostComponent } from './job-post/job-post.component';
import {MdDatepickerIntl, MdNativeDateModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeStudentComponent,
    HomeRecruiterComponent,
    CreateUserComponent,
    CreateUserRecruiterComponent,
    CreateUserStudentComponent,
    JobPostComponent
  ],
  imports: [
    BrowserModule,
    Approutes,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(env.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
