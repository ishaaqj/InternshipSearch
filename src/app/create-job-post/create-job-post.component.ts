import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {MdDialogRef, MdDialog} from "@angular/material";

@Component({
  selector: 'app-create-job-post',
  templateUrl: './create-job-post.component.html',
  styleUrls: ['./create-job-post.component.css']
})
export class CreateJobPostComponent implements OnInit, OnDestroy {
  job;
  createjobpostform;
  salaryPaid = 'Hourly';
  durationType = 'Week(s)';
  private subscribeToRoute;
  updateForm;
  gotData;

  constructor(private activatedRoute: ActivatedRoute, private angularFireDatabase: AngularFireDatabase,
              private angularFireAuth: AngularFireAuth, private formBuilder: FormBuilder, private router: Router,
              private dialog: MdDialog) {

  }

  ngOnInit() {
    this.subscribeToRoute = this.activatedRoute.params.subscribe(params => {
      this.angularFireDatabase.object('jobApplications/' + params['id'], {preserveSnapshot: true}).subscribe(snapshot => {
        this.job = snapshot.val();
        if (this.job != null) {
          this.gotData=true;
          this.buildFilledForm();
          this.updateForm = true;
        }
      });
    });
    if (!this.job) {
      this.buildEmptyForm();
      this.updateForm = false;
    }
  }

  ngOnDestroy(): void {
    this.subscribeToRoute.unsubscribe();
  }

  private buildEmptyForm() {
    let companyName;
    let companyWebsite;
    this.angularFireAuth.authState.subscribe(user => {
      this.angularFireDatabase.object('/users/' + user.uid, {preserveSnapshot: true}).subscribe(snapshot=>{
        companyName = snapshot.val().companyName;
        companyWebsite = snapshot.val().companyWebsite;
        this.gotData = true;
        this.createjobpostform = this.formBuilder.group({
          'jobTitle': [null, Validators.required],
          'city': [null, Validators.required],
          'companyName': [companyName, Validators.required],
          'companyWebsite': [companyWebsite, Validators.required],
          'country': [null, Validators.compose([Validators.required])],
          'durationOfInternship': [null, Validators.compose([Validators.required, Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)])],
          'durationOfInternshipType': [null, Validators.required],
          'jobDescription': [null, Validators.required],
          'maxSalary': [null, Validators.compose([Validators.required, Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)])],
          'minSalary': [null, Validators.compose([Validators.required, Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)])],
          'preferredEducation': [null, Validators.required],
          'preferredQualification': [null, Validators.required],
          'providingRelocation': '',
          'salaryPaid': [null, Validators.required],
          'securityClearanceRequired': '',
          'sponsoringVisa': '',
          'startDate': [null, Validators.required],
          'stateOrProvince': [null, Validators.required],
          'additionalInfo': ''
        });
      })
    });

  }

  private buildFilledForm() {
    this.createjobpostform = this.formBuilder.group({
      'jobTitle': [this.job.jobTitle, Validators.required],
      'city': [this.job.city, Validators.required],
      'companyName': [this.job.companyName, Validators.required],
      'companyWebsite': [this.job.companyWebsite, Validators.required],
      'country': [this.job.country, Validators.required],
      'durationOfInternship': [this.job.durationOfInternship.split(' ')[0], Validators.required],
      'durationOfInternshipType': [this.job.durationOfInternship.split(' ')[1], Validators.required],
      'jobDescription': [this.job.jobDescription, Validators.required],
      'maxSalary': [this.job.maxSalary, Validators.required],
      'minSalary': [this.job.minSalary, Validators.required],
      'preferredEducation': [this.job.preferredEducation, Validators.required],
      'preferredQualification': [this.job.preferredQualifications, Validators.required],
      'providingRelocation': [this.job.providingRelocation, Validators.required],
      'salaryPaid': [this.job.salaryPaid, Validators.required],
      'securityClearanceRequired': [this.job.securityClearanceRequired, Validators.required],
      'sponsoringVisa': [this.job.sponsoringVisa, Validators.required],
      'startDate': [(new Date(this.job.startDate)).toLocaleDateString(), Validators.required],
      'stateOrProvince': [this.job.stateOrProvince, Validators.required],
      'additionalInfo': [this.job.additionalInfo],
    });
  }

  createpost() {
    if (this.createjobpostform.controls['maxSalary'].value<this.createjobpostform.controls['minSalary'].value){
      alert("Max salary should not be less than Min Salary")
    }else if(new Date(this.createjobpostform.controls['startDate'].value)<(new Date)){
      alert("Start date should be in future");
    }else {
      let uid;
      this.angularFireAuth.authState.subscribe(user => {
        uid = user.uid;
        console.log("start" + this.createjobpostform.controls['startDate'].value);
        this.angularFireDatabase.list('/jobApplications').push({
          'jobTitle': this.createjobpostform.controls['jobTitle'].value,
          'city': this.createjobpostform.controls['city'].value,
          'companyName': this.createjobpostform.controls['companyName'].value,
          'companyWebsite': this.createjobpostform.controls['companyWebsite'].value,
          'country': this.createjobpostform.controls['country'].value,
          'datePosted': (new Date()).toLocaleDateString(),
          'durationOfInternship': this.createjobpostform.controls['durationOfInternship'].value + " " + this.createjobpostform.controls['durationOfInternshipType'].value,
          'jobDescription': this.createjobpostform.controls['jobDescription'].value,
          'employerUID': uid,
          'maxSalary': this.createjobpostform.controls['maxSalary'].value,
          'minSalary': this.createjobpostform.controls['minSalary'].value,
          'preferredEducation': this.createjobpostform.controls['preferredEducation'].value,
          'preferredQualifications': this.createjobpostform.controls['preferredQualification'].value,
          'providingRelocation': this.createjobpostform.controls['providingRelocation'].value,
          'salaryPaid': this.createjobpostform.controls['salaryPaid'].value,
          'securityClearanceRequired': this.createjobpostform.controls['securityClearanceRequired'].value,
          'sponsoringVisa': this.createjobpostform.controls['sponsoringVisa'].value,
          'startDate': this.createjobpostform.controls['startDate'].value.toLocaleDateString(),
          'stateOrProvince': this.createjobpostform.controls['stateOrProvince'].value,
          'additionalInfo': this.createjobpostform.controls['additionalInfo'].value
        }).then(jobpost => {
          this.angularFireDatabase.object('/jobApplications/' + jobpost.key).update({
            'jobId': jobpost.key
          }).catch(err => console.log(err.message));
          this.router.navigate(['job-post', jobpost.key])
        }).catch(err => console.log(err.message))
      })
    }
  }

  updatepost() {
    let dialogRef = this.dialog.open(UpdateDialogBox);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        if (this.createjobpostform.controls['maxSalary'].value < this.createjobpostform.controls['minSalary'].value) {
          alert("Max salary should not be less than Min Salary")
        }else if(new Date(this.createjobpostform.controls['startDate'].value)<(new Date)){
          alert("Start date should be in future");
        } else {
          this.angularFireDatabase.object('/jobApplications/' + this.job.jobId).update({
            'jobTitle': this.createjobpostform.controls['jobTitle'].value,
            'city': this.createjobpostform.controls['city'].value,
            'companyName': this.createjobpostform.controls['companyName'].value,
            'companyWebsite': this.createjobpostform.controls['companyWebsite'].value,
            'country': this.createjobpostform.controls['country'].value,
            'durationOfInternship': this.createjobpostform.controls['durationOfInternship'].value + " " + this.createjobpostform.controls['durationOfInternshipType'].value,
            'jobDescription': this.createjobpostform.controls['jobDescription'].value,
            'maxSalary': this.createjobpostform.controls['maxSalary'].value,
            'minSalary': this.createjobpostform.controls['minSalary'].value,
            'preferredEducation': this.createjobpostform.controls['preferredEducation'].value,
            'preferredQualifications': this.createjobpostform.controls['preferredQualification'].value,
            'providingRelocation': this.createjobpostform.controls['providingRelocation'].value,
            'salaryPaid': this.createjobpostform.controls['salaryPaid'].value,
            'securityClearanceRequired': this.createjobpostform.controls['securityClearanceRequired'].value,
            'sponsoringVisa': this.createjobpostform.controls['sponsoringVisa'].value,
            'startDate': (new Date(this.createjobpostform.controls['startDate'].value)).toLocaleDateString(),
            'stateOrProvince': this.createjobpostform.controls['stateOrProvince'].value,
            'additionalInfo': this.createjobpostform.controls['additionalInfo'].value,
          }).then(success => {
            console.log(success);
            this.router.navigate(['job-post', this.job.jobId])
          }).catch(err => console.log(err.message))
        }
      }
    });
  }

  deletepost(){
    let dialogRef = this.dialog.open(DeletePostDialogBox);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.angularFireDatabase.object('/jobApplications/' + this.job.jobId).remove();
      }
    });
  }

}

@Component({
  selector: 'update-dialog-box',
  templateUrl: 'update-dialog-box.html',
})
export class UpdateDialogBox {
  constructor(public dialogRef: MdDialogRef<UpdateDialogBox>) {}
}

@Component({
  selector: 'delete-dialog-box',
  templateUrl: 'update-dialog-box.html',
})
export class DeletePostDialogBox {
  constructor(public dialogRef: MdDialogRef<DeletePostDialogBox>) {}
}
