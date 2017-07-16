import { Component, OnInit } from '@angular/core';
<<<<<<< 5d3419e16858d91fa1bad6604a1b8e14f2fe157c
import {AngularFireDatabase} from "angularfire2/database";
import {ActivatedRoute} from "@angular/router";
=======
import {FormBuilder} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";
import {Router} from "@angular/router";
>>>>>>> Added implementation for student account page. Fixed typo in Recruiter account page
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
<<<<<<< 5d3419e16858d91fa1bad6604a1b8e14f2fe157c
  private subscribeToRoute;
  private studentProfile = false;

  constructor(private database: AngularFireDatabase, private angularFireAuth :AngularFireAuth,
              private activatedRoute: ActivatedRoute)  { }

  ngOnInit() {
    this.subscribeToRoute = this.activatedRoute.params.subscribe(params=> {
      if(params['id']){
        this.studentProfile=true;
        this.database.object('/users/' + params['id'], {preserveSnapshot: true}).subscribe(snapshot => {
          this.user = snapshot.val();
          this.gotData = true;
        })
      }
    });
    if(!this.studentProfile){
      this.angularFireAuth.authState.subscribe(authState => {
        this.userId = authState.uid;
        this.database.object('/users/' + this.userId, {preserveSnapshot: true}).subscribe(snapshot => {
          this.user = snapshot.val();
          this.gotData = true;
        })
      });
    }
=======

  constructor(private database: AngularFireDatabase, private angularFireAuth :AngularFireAuth)  { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(authState => {
      this.userId = authState.uid;
      this.database.object('/users/' + this.userId, {preserveSnapshot: true}).subscribe(snapshot => {
        this.user = snapshot.val();
        this.gotData = true;
      })
    });
>>>>>>> Added implementation for student account page. Fixed typo in Recruiter account page
  }

}
