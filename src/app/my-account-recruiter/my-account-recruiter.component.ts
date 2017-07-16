import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-my-account-recruiter',
  templateUrl: './my-account-recruiter.component.html',
  styleUrls: ['./my-account-recruiter.component.css']
})
export class MyAccountRecruiterComponent implements OnInit {
  private userId;
  private user;
  private gotData;

  constructor(private formBuilder: FormBuilder,private database: AngularFireDatabase,
              private router: Router, private angularFireAuth :AngularFireAuth)  { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(authState => {
      this.userId = authState.uid;
      this.database.object('/users/' + this.userId, {preserveSnapshot: true}).subscribe(snapshot => {
        this.user = snapshot.val();
        this.gotData = true;
      })
    });
  }
}
