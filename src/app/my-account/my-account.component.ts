import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userRole;
  gotData;

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase) {
    this.angularFireAuth.authState.subscribe(authState=>{
      let userId = authState.uid;
      let userObservable = this.angularFireDatabase.object('users/'+ userId, {preserveSnapshot: true});
      userObservable.subscribe(snapshot=>{
        this.userRole = snapshot.val().role;
        this.gotData = true;
      })
    });
  }

  ngOnInit() {
  }

}
