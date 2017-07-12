import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {FormBuilder} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {ActivatedRoute} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-create-job-post',
  templateUrl: './create-job-post.component.html',
  styleUrls: ['./create-job-post.component.css']
})
export class CreateJobPostComponent implements OnInit, OnDestroy {
  private job;
  private subscribeToRoute;

  constructor(private activatedRoute: ActivatedRoute, private angularFireDatabase: AngularFireDatabase) {
  }

  ngOnInit() {
    this.subscribeToRoute = this.activatedRoute.params.subscribe(params => {
      this.angularFireDatabase.object('jobApplications/' + params['id'], {preserveSnapshot: true}).subscribe(snapshot => {
        this.job = snapshot.val();
      });
    });
    console.log(this.job);
  }

  ngOnDestroy(): void {
    this.subscribeToRoute.unsubscribe();
  }

}
