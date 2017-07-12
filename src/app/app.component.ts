import { Component } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginComponent, HomeComponent]
})
export class AppComponent {
  private showAccountButton: boolean;
  static job;
  private userRole = '';

  constructor(private loginComponent: LoginComponent, private router: Router,
              private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase) {
    this.angularFireAuth.authState.subscribe(authState => {
      this.showAccountButton = authState != null;
      if (authState != null) {
        let userId = authState.uid;
        let userObservable = this.angularFireDatabase.object('users/' + userId, {preserveSnapshot: true});
        userObservable.subscribe(snapshot => {
          this.userRole = snapshot.val().role;
        })
      }
    });
  }

  private logout() {
    this.loginComponent.logout();
    this.userRole='';
    this.router.navigate(['/login']);
  }
}
