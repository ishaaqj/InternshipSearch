import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.css']
})
export class SearchJobsComponent implements OnInit {
  private subscribeToRoute;
  private jobsList;
  private gotData;
  private searchForm: FormGroup;
  private filterForm: FormGroup;
  private keyword;
  private location;
  private sortByJobDateAsc = true;
  private sortByJobIdAsc = true;
  private sortByJobTitleAsc = true;
  private sortByCompanyNameAsc = true;
  private sortByJobLocationAsc = true;

  constructor(private activatedRoute: ActivatedRoute, private database: AngularFireDatabase,
              private formBuilder: FormBuilder, private angularFireAuth :AngularFireAuth) {
    this.buildFilterForm();
  }

  ngOnInit() {
    this.subscribeToRoute = this.activatedRoute.params.subscribe(params=>{
      this.keyword = params['id'];
      this.location = params['id2'];
      this.jobsList = this.database.list('/jobApplications');
      if (this.keyword!='empty'){
        this.jobsList = this.jobsList.map(_jobs => _jobs.filter(job => (job.jobTitle.toLocaleLowerCase().indexOf(this.keyword) != -1) || (job.companyName.toLocaleLowerCase().indexOf(this.keyword) != -1))) as FirebaseListObservable<any[]>
      }else {
        this.keyword = '';
      }
      if (this.location!='empty'){
        this.jobsList = this.jobsList.map(_jobs => _jobs.filter(job => ((job.city.toLocaleLowerCase()+', '+job.stateOrProvince.toLocaleLowerCase()+', '+job.country.toLocaleLowerCase()).indexOf(this.location) != -1))) as FirebaseListObservable<any[]>;
      } else {
        this.location='';
      }
      this.buildSearchForm();
      this.gotData=true;
    })
  }

  private buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      'search': this.keyword,
      'location': this.location
    });
  }

  private search(){
    let location = this.searchForm.controls['location'].value.toLocaleLowerCase();
    let keyword = this.searchForm.controls['search'].value.toLocaleLowerCase();
    this.jobsList = this.jobsList = this.database.list('/jobApplications').map(_jobs => _jobs.filter(job => ((job.city.toLocaleLowerCase()+', '+job.stateOrProvince.toLocaleLowerCase()+', '+job.country.toLocaleLowerCase()).indexOf(location) != -1))) as FirebaseListObservable<any[]>;
    this.jobsList = this.jobsList.map(_jobs => _jobs.filter(job => (job.jobTitle.toLocaleLowerCase().indexOf(keyword) != -1) || (job.companyName.toLocaleLowerCase().indexOf(keyword) != -1))) as FirebaseListObservable<any[]>
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

  private sortByJobId(){
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

  private sortByJobStartDate(){
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

  private sortByJobLocation(){
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

  private sortByJobTitle(){
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

  private sortByCompanyName(){
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
