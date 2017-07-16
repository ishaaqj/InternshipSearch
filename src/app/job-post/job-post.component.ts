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
  private gotData;
  private showDeleteButton;
  private userId;

  constructor(private angularFireDatabase: AngularFireDatabase
    , private router: Router, private dialog: MdDialog, private activatedRoute: ActivatedRoute
    , private angularFireAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.subscribeToRoute = this.activatedRoute.params.subscribe(params=>{
      this.angularFireAuth.authState.subscribe(authState => {
        if (authState != null) {
          let userObservable = this.angularFireDatabase.object('users/' + authState.uid, {preserveSnapshot: true});
          userObservable.subscribe(snapshot => {
            this.userRole = snapshot.val().role;
          });
          this.angularFireDatabase.object('jobApplications/' + params['id'], {preserveSnapshot: true}).subscribe(snapshot => {
            this.job = snapshot.val();
            this.userId = authState.uid;
            this.gotData = true;
            this.angularFireDatabase.object('/jobsAppliedTo/' + authState.uid + '/' + this.job.jobId).subscribe(item => {
              if (item.jobId==this.job.jobId) {
                this.showDeleteButton = true;
              }
            });
            this.job.datePosted = this.job.datePosted.slice(0,10);
            this.job.startDate = this.job.startDate.slice(0,10);
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
        }
      });
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

  private deleteApplication(){
    let dialogRef = this.dialog.open(DeleteDialogBox);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes'){
        this.angularFireDatabase.object('/jobsAppliedTo/' + this.userId + '/' + this.job.jobId).remove()
          .then(success=>console.log(success))
          .catch(error=>console.log(error.message));
        this.angularFireDatabase.object('/studentsApplied/'+this.job.employerUID+'/'+this.job.jobId+'/'+this.userId).remove()
          .then(success=>console.log(success))
          .catch(error=>console.log(error.message));;
        this.showDeleteButton=false;
        this.router.navigate(['jobs-applied-to']);
      }
    });
  }

  private applyToJob(){
    this.angularFireAuth.authState.subscribe(authState => {
      if (authState != null) {
        this.angularFireDatabase.object('/jobsAppliedTo/'+authState.uid+'/'+this.job.jobId).update({
          'jobTitle': this.job.jobTitle,
          'city': this.job.city,
          'companyName': this.job.companyName,
          'companyWebsite': this.job.companyWebsite,
          'country': this.job.country,
          'durationOfInternship': this.job.durationOfInternship.split(' ')[0],
          'durationOfInternshipType': this.job.durationOfInternship.split(' ')[1],
          'jobDescription': this.job.jobDescription,
          'maxSalary': this.job.maxSalary,
          'minSalary': this.job.minSalary,
          'preferredEducation': this.job.preferredEducation,
          'preferredQualification': this.job.preferredQualifications,
          'providingRelocation': this.job.providingRelocation,
          'salaryPaid': this.job.salaryPaid,
          'securityClearanceRequired': this.job.securityClearanceRequired,
          'sponsoringVisa': this.job.sponsoringVisa,
          'startDate': this.job.startDate,
          'stateOrProvince': this.job.stateOrProvince,
          'additionalInfo': this.job.additionalInfo,
          'studentUID': authState.uid,
          'jobId': this.job.jobId,
          'datePosted': this.job.datePosted
        });
        this.angularFireDatabase.object('/users/'+authState.uid, {preserveSnapshot: true}).subscribe(snapshot=>{
          this.angularFireDatabase.object('/studentsApplied/'+this.job.employerUID+'/'+this.job.jobId+'/'+authState.uid).set({
            'city': snapshot.val().city,
            'country': snapshot.val().country,
            'firstName': snapshot.val().firstName,
            'lastName': snapshot.val().lastName,
            'stateOrProvince': snapshot.val().stateOrProvince
          })
        });
      }
    });
    alert("Applyng to job successful")
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

@Component({
  selector: 'delete-dialog-box',
  templateUrl: 'delete-dialog-box.html',
})
export class DeleteDialogBox {
  constructor(public dialogRef: MdDialogRef<DeleteDialogBox>) {}
}
