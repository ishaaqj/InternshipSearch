import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-my-account-student',
  templateUrl: './my-account-student.component.html',
  styleUrls: ['./my-account-student.component.css']
})
export class MyAccountStudentComponent implements OnInit {
  gotData: boolean;
  user: any;
  private userId: string;
  private subscribeToRoute;
  studentProfile = false;

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
  }

}
