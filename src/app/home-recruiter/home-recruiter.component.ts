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
  searchForm: FormGroup;
  filterForm: FormGroup;
  private userId;
  jobsList;
  sortByJobDateAsc = true;
  private sortByJobIdAsc = true;
  private sortByJobTitleAsc = true;
  private sortByCompanyNameAsc = true;
  private sortByJobLocationAsc = true;

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

  filterResult(){
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

  search(){
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

  sortByJobId(){
    if(this.sortByJobIdAsc){
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.jobId > b.jobId)) as FirebaseListObservable<any[]>;
    }else {
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.jobId < b.jobId)) as FirebaseListObservable<any[]>;
    }
    this.sortByJobIdAsc=!this.sortByJobIdAsc;
    this.sortByJobDateAsc = true;
    this.sortByCompanyNameAsc=true;
    this.sortByJobLocationAsc=true;
    this.sortByJobTitleAsc=true
  }

  sortByJobStartDate(){
    if(this.sortByJobDateAsc){
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> (new Date(a.startDate)> (new Date(b.startDate))))) as FirebaseListObservable<any[]>;
    }else {
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> (new Date(a.startDate)< (new Date(b.startDate))))) as FirebaseListObservable<any[]>;
    }
    this.sortByJobDateAsc=!this.sortByJobDateAsc;
    this.sortByJobIdAsc=true;
    this.sortByCompanyNameAsc=true;
    this.sortByJobLocationAsc=true;
    this.sortByJobTitleAsc=true
  }

  sortByJobLocation(){
    if(this.sortByJobLocationAsc){
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.city > b.city || a.stateOrProvince > b.stateOrProvince || a.country > b.country)) as FirebaseListObservable<any[]>;
    }else {
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.city < b.city || a.stateOrProvince < b.stateOrProvince || a.country < b.country)) as FirebaseListObservable<any[]>;
    }
    this.sortByJobLocationAsc=!this.sortByJobLocationAsc;
    this.sortByJobIdAsc=true;
    this.sortByCompanyNameAsc=true;
    this.sortByJobDateAsc=true;
    this.sortByJobTitleAsc=true
  }

  sortByJobTitle(){
    if(this.sortByJobTitleAsc){
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.jobTitle > b.jobTitle)) as FirebaseListObservable<any[]>;
    }else {
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.jobTitle < b.jobTitle)) as FirebaseListObservable<any[]>;
    }
    this.sortByJobTitleAsc=!this.sortByJobTitleAsc;
    this.sortByJobIdAsc=true;
    this.sortByCompanyNameAsc=true;
    this.sortByJobLocationAsc=true;
    this.sortByJobDateAsc=true
  }

  sortByCompanyName(){
    if(this.sortByCompanyNameAsc){
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.companyName > b.companyName)) as FirebaseListObservable<any[]>;
    }else {
      this.jobsList = this.jobsList.map(jobs=> jobs.sort((a,b)=> a.companyName < b.companyName)) as FirebaseListObservable<any[]>;
    }
    this.sortByCompanyNameAsc=!this.sortByCompanyNameAsc;
    this.sortByJobIdAsc=true;
    this.sortByJobTitleAsc=true;
    this.sortByJobLocationAsc=true;
    this.sortByJobDateAsc=true
  }
}
