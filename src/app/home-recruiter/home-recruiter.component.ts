import {
  ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {DataSource} from "@angular/cdk";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {MdSort} from "@angular/material";
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import "rxjs/add/observable/forkJoin";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-home-recruiter',
  templateUrl: './home-recruiter.component.html',
  styleUrls: ['./home-recruiter.component.css']
})
export class HomeRecruiterComponent implements OnInit {
  private searchForm: FormGroup;
  private filterForm: FormGroup;
  private userId;
  private jobsList;

  constructor(private formBuilder: FormBuilder,private database: AngularFireDatabase,
              private router: Router, private angularFireAuth :AngularFireAuth) {
    this.buildSearchForm();
    this.buildFilterForm();
  }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(authState=>{
      this.userId = authState.uid;
      this.jobsList = this.database.list('/jobApplications', {
        query: {
          orderByChild: 'employerUID',
          equalTo: this.userId
        }
      }) as FirebaseListObservable<any[]>;
    });
  }

  private buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      'search': '',
      'location': ''
    });
  }

  private buildFilterForm() {
    this.filterForm = this.formBuilder.group({
      'minSalary': '',
      'maxSalary': '',
      'companyName': '',
      'datePosted': '',
      'dateStarts': ''
    });
  }

  private filterResult(){
    this.search();
    let companyName = this.filterForm.controls['companyName'].value.toLocaleLowerCase();
    let minSalary = this.filterForm.controls['minSalary'].value;
    let maxSalary = this.filterForm.controls['maxSalary'].value;
    let datePosted = this.filterForm.controls['datePosted'].value;
    let dateStarts = this.filterForm.controls['dateStarts'].value;
    this.jobsList = this.jobsList.map(_jobs => _jobs.filter(job => job.companyName.toLocaleLowerCase().indexOf(companyName) != -1)) as FirebaseListObservable<any[]>
    this.jobsList = this.jobsList.map(_jobs => _jobs.filter(job => job.minSalary - minSalary + 1)) as FirebaseListObservable<any[]>;
    this.jobsList = this.jobsList.map(_jobs => _jobs.filter(job => maxSalary - job.maxSalary + 1)) as FirebaseListObservable<any[]>;
    if(this.filterForm.controls['datePosted'].value != '') {
      this.jobsList = this.jobsList.map(_jobs => _jobs.filter(job => (new Date(job.datePosted)) >= (new Date(datePosted)))) as FirebaseListObservable<any[]>;
    }
    if(this.filterForm.controls['dateStarts'].value != '') {
      this.jobsList = this.jobsList.map(_jobs => _jobs.filter(job => (new Date(job.startDate)) >= (new Date(dateStarts)))) as FirebaseListObservable<any[]>;
    }
  }

  private search(){
    let location = this.searchForm.controls['location'].value.toLocaleLowerCase();
    let keyword = this.searchForm.controls['search'].value.toLocaleLowerCase();
      this.jobsList = this.jobsList = this.database.list('/jobApplications', {
        query: {
          orderByChild: 'employerUID',
          equalTo: this.userId
        }
      }).map(_jobs => _jobs.filter(job => ((job.city.toLocaleLowerCase()+', '+job.stateOrProvince.toLocaleLowerCase()+', '+job.country.toLocaleLowerCase()).indexOf(location) != -1))) as FirebaseListObservable<any[]>;
      this.jobsList = this.jobsList.map(_jobs => _jobs.filter(job => (job.jobTitle.toLocaleLowerCase().indexOf(keyword) != -1) || (job.companyName.toLocaleLowerCase().indexOf(keyword) != -1))) as FirebaseListObservable<any[]>
  }

  private sortByJobId(){
    this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.jobId > b.jobId)) as FirebaseListObservable<any[]>;
  }

  private sortByJobStartDate(){
    this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> (new Date(a.startDate)> (new Date(b.startDate))))) as FirebaseListObservable<any[]>;
  }

  private sortByJobLocation(){
    this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.city > b.city)) as FirebaseListObservable<any[]>;
  }

  private sortByJobTitle(){
    this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.jobTitle > b.jobTitle)) as FirebaseListObservable<any[]>;
  }

  private sortByCompanyName(){
    console.log(1);
    this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.companyName > b.companyName)) as FirebaseListObservable<any[]>;
  }
}
