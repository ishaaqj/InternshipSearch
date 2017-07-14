import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {AngularFireDatabase} from "angularfire2/database";
import {ActivatedRoute, Router} from "@angular/router";
import {MdDialog, MdDialogRef} from "@angular/material";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit, OnDestroy {
  private job;
  private subscribeToRoute;
  private userRole;

  constructor(private appComponent: AppComponent, private angularFireDatabase: AngularFireDatabase
    , private router: Router, private dialog: MdDialog, private activatedRoute: ActivatedRoute
    , private angularFireAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.subscribeToRoute = this.activatedRoute.params.subscribe(params=>{
      this.angularFireDatabase.object('jobApplications/' + params['id'], {preserveSnapshot: true}).subscribe(snapshot => {
        this.job = snapshot.val();
        this.job.startDate=this.job.startDate.slice(0,10);
        this.job.datePosted=this.job.datePosted.slice(0,10);
        if (this.job.sponsoringVisa='true'){
          this.job.sponsoringVisa ='Yes'
        }else {
          this.job.sponsoringVisa ='No'
        }
        if (this.job.providingRelocation='true'){
          this.job.providingRelocation ='Yes'
        }else {
          this.job.providingRelocation ='No'
        }
        if (this.job.securityClearanceRequired='true'){
          this.job.securityClearanceRequired ='Yes'
        }else {
          this.job.securityClearanceRequired ='No'
        }
      });
    });
    this.angularFireAuth.authState.subscribe(authState => {
      if (authState != null) {
        let userObservable = this.angularFireDatabase.object('users/' + authState.uid, {preserveSnapshot: true});
        userObservable.subscribe(snapshot => {
          this.userRole = snapshot.val().role;
        })
      }
    });
  }

  private deleteJob(){
    let dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes'){
        const jobObservable = this.angularFireDatabase.object('jobApplications/' + this.job.jobId);
        jobObservable.remove();
        this.router.navigate(['']);
      }
    });
  }

  private editJob(){
    // this.appComponent.setJobPostToOpen(this.job);
    this.router.navigate(['/create-job-post']);
  }

  ngOnDestroy(){
    this.subscribeToRoute.unsubscribe();
  }

}

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: 'dialog-result-example-dialog.html',
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}
