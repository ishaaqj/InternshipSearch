import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {FormBuilder, Validators} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {ActivatedRoute} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-create-job-post',
  templateUrl: './create-job-post.component.html',
  styleUrls: ['./create-job-post.component.css']
})
export class CreateJobPostComponent implements OnInit, OnDestroy {
  private job;
  private createjobpostform;
  private salaryPaid = 'Hourly';
  private durationType = 'Week(s)';
  private subscribeToRoute;

  constructor(private activatedRoute: ActivatedRoute, private angularFireDatabase: AngularFireDatabase,
              private angularFireAuth: AngularFireAuth,private formBuilder: FormBuilder) {
    this.buildForm();
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

  private buildForm() {
    this.createjobpostform= this.formBuilder.group({
      'jobTitle': [null, Validators.required],
      'city': [null, Validators.required],
      'companyName': [null, Validators.required],
      'companyWebsite': [null, Validators.required],
      'country': [null, Validators.compose([Validators.required])],
      'datePosted': [null, Validators.required],
      'durationOfInternship': [null, Validators.compose([Validators.required,Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)])],
      'durationOfInternshipType': [null, Validators.required],
      'jobDescription': [null, Validators.required],
      'maxSalary': [null, Validators.compose([Validators.required,Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)])],
      'minSalary': [null, Validators.compose([Validators.required,Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)])],
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
  }

  private createpost(){
    let uid;
    this.angularFireAuth.authState.subscribe(user=>{
      uid = user.uid;
      // if (user != null){
        this.angularFireDatabase.list('/jobApplications').push({
          'jobTitle': this.createjobpostform.controls['jobTitle'].value,
          'city': this.createjobpostform.controls['city'].value,
          'companyName': this.createjobpostform.controls['companyName'].value,
          'companyWebsite': this.createjobpostform.controls['companyWebsite'].value,
          'country': this.createjobpostform.controls['country'].value,
          'datePosted': this.createjobpostform.controls['datePosted'].value,
          'durationOfInternship': this.createjobpostform.controls['durationOfInternship'].value +" "+ this.createjobpostform.controls['durationOfInternshipType'].value,
          'jobDescription': this.createjobpostform.controls['jobDescription'].value,
          'employerUID': uid,
          'maxSalary': this.createjobpostform.controls['maxSalary'].value,
          'minSalary': this.createjobpostform.controls['minSalary'].value,
          'preferredEducation': this.createjobpostform.controls['preferredEducation'].value,
          'preferredQualification': this.createjobpostform.controls['preferredQualification'].value,
          'providingRelocation': this.createjobpostform.controls['providingRelocation'].value,
          'salaryPaid': this.createjobpostform.controls['salaryPaid'].value,
          'securityClearanceRequired': this.createjobpostform.controls['securityClearanceRequired'].value,
          'sponsoringVisa': this.createjobpostform.controls['sponsoringVisa'].value,
          'startDate': this.createjobpostform.controls['startDate'].value,
          'stateOrProvince': this.createjobpostform.controls['stateOrProvince'].value,
          'additionalInfo': this.createjobpostform.controls['additionalInfo'].value,
        }).then(jobpost=>{
          console.log(jobpost.key);
          this.angularFireDatabase.object('/jobApplications/'+jobpost.key).set({
            'jobId': jobpost.uid
          }).catch(err=>console.log(err.message))
        }).catch(err=>console.log(err.message))
      // }

    })
  }

}
