import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole;

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase) {
    this.angularFireAuth.authState.subscribe(authState=>{
      let userId = authState.uid;
      let userObservable = this.angularFireDatabase.object('users/'+ userId, {preserveSnapshot: true});
      userObservable.subscribe(snapshot=>{
        this.userRole = snapshot.val().role;
      })
    });
  }

  ngOnInit() {
  }

}
