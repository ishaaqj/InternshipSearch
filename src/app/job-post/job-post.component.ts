import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {AngularFireDatabase} from "angularfire2/database";
import {Router} from "@angular/router";
import {MdDialog, MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  private job;

  constructor(private appComponent: AppComponent, private angularFireDatabase: AngularFireDatabase
    , private router: Router, public dialog: MdDialog) {
    this.job = appComponent.getJobPostToOpen();
  }

  ngOnInit() {
  }

  private deleteJob(){
    let dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes'){
        const jobObservable = this.angularFireDatabase.object('jobApplications/' + this.job.key);
        jobObservable.remove();
        this.router.navigate(['']);
      }
    });
  }

  private editJob(){
    this.appComponent.setJobPostToOpen(this.job);
    this.router.navigate(['/create-job-post']);
  }

}

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: 'dialog-result-example-dialog.html',
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}
