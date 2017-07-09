import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {Approutes} from "./app.routing";
import {AppMaterialModule} from "./MyOwnCustomMaterialModule";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireAuthModule, AngularFireAuthProvider} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {env} from "./app.env";
import {AngularFireDatabaseModule} from "angularfire2/database";
import { HomeComponent } from './home/home.component';
import { HomeStudentComponent } from './home-student/home-student.component';
import { HomeRecruiterComponent } from './home-recruiter/home-recruiter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeStudentComponent,
    HomeRecruiterComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
