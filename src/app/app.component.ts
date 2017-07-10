import { Component } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginComponent]
})
export class AppComponent {
  showNavBar: boolean = true;
  private job;
  constructor(private loginComponent: LoginComponent, private router: Router,
              private angularFireAuth: AngularFireAuth){
    this.angularFireAuth.authState.subscribe((authState)=>{
      this.showNavBar=(authState != null)
    })
  }

  private logout(){
    this.loginComponent.logout();
    this.router.navigate(['/login']);
  }

  setJobPostToOpen(job){
    this.job = job;
  }

  getJobPostToOpen(){
    return this.job;
  }
}
