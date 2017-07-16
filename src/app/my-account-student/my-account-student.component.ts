import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-my-account-student',
  templateUrl: './my-account-student.component.html',
  styleUrls: ['./my-account-student.component.css']
})
export class MyAccountStudentComponent implements OnInit {
  private gotData: boolean;
  private user: any;
  private userId: string;

  constructor(private database: AngularFireDatabase, private angularFireAuth :AngularFireAuth)  { }

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
