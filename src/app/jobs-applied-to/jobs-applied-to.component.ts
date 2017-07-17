import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {FormBuilder} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-jobs-applied-to',
  templateUrl: './jobs-applied-to.component.html',
  styleUrls: ['./jobs-applied-to.component.css']
})
export class JobsAppliedToComponent implements OnInit {
  private userId;
  jobsList;
  searchForm;
  filterForm;
  private sortByJobDateAsc = true;
  private sortByJobIdAsc = true;
  private sortByJobTitleAsc = true;
  private sortByCompanyNameAsc = true;
  private sortByJobLocationAsc = true;
  gotData: boolean;

  constructor(private formBuilder: FormBuilder,private database: AngularFireDatabase,
              private angularFireAuth :AngularFireAuth) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(authState=>{
      this.userId = authState.uid;
      this.database.list('/jobsAppliedTo/'+this.userId).subscribe(items=>{
        this.jobsList=items;
        this.gotData=true;
      });
    });
    this.buildSearchForm();
    this.buildFilterForm();
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
    console.log(1)
    let companyName = this.filterForm.controls['companyName'].value.toLocaleLowerCase();
    let minSalary = this.filterForm.controls['minSalary'].value;
    let maxSalary = this.filterForm.controls['maxSalary'].value;
    let datePosted = this.filterForm.controls['datePosted'].value;
    let dateStarts = this.filterForm.controls['dateStarts'].value;
    this.jobsList = this.jobsList.filter(job => job.companyName.toLocaleLowerCase().indexOf(companyName) != -1)
    this.jobsList = this.jobsList.filter(job => job.minSalary - minSalary + 1);
    this.jobsList = this.jobsList.filter(job => maxSalary - job.maxSalary + 1);
    if(this.filterForm.controls['datePosted'].value != '') {
      this.jobsList = this.jobsList.filter(job => (new Date(job.datePosted)) >= (new Date(datePosted)))
    }
    if(this.filterForm.controls['dateStarts'].value != '') {
      this.jobsList = this.jobsList.filter(job => (new Date(job.startDate)) >= (new Date(dateStarts)))
    }
  }

  private buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      'search': '',
      'location': ''
    });
  }

  search(){
    let location = this.searchForm.controls['location'].value.toLocaleLowerCase();
    let keyword = this.searchForm.controls['search'].value.toLocaleLowerCase();
    this.database.list('/jobsAppliedTo/'+this.userId).subscribe(items=>{
      this.jobsList=items;
      this.jobsList = this.jobsList.filter(job => ((job.city.toLocaleLowerCase()+', '+job.stateOrProvince.toLocaleLowerCase()+', '+job.country.toLocaleLowerCase()).indexOf(location) != -1));
      this.jobsList = this.jobsList.filter(job => (job.jobTitle.toLocaleLowerCase().indexOf(keyword) != -1) || (job.companyName.toLocaleLowerCase().indexOf(keyword) != -1));
    })
  }

  sortByJobId(){
    if(this.sortByJobIdAsc){
      this.jobsList = this.jobsList.sort((a,b)=> a.jobId > b.jobId)
    }else {
      this.jobsList = this.jobsList.sort((a,b)=> a.jobId < b.jobId)
    }
    this.sortByJobIdAsc=!this.sortByJobIdAsc;
    this.sortByJobDateAsc = true;
    this.sortByCompanyNameAsc=true;
    this.sortByJobLocationAsc=true;
    this.sortByJobTitleAsc=true
  }

  sortByJobStartDate(){
    if(this.sortByJobDateAsc){
      this.jobsList = this.jobsList.sort((a,b)=> (new Date(a.startDate)> (new Date(b.startDate))));
    }else {
      this.jobsList = this.jobsList.sort((a,b)=> (new Date(a.startDate)< (new Date(b.startDate))));
    }
    this.sortByJobDateAsc=!this.sortByJobDateAsc;
    this.sortByJobIdAsc=true;
    this.sortByCompanyNameAsc=true;
    this.sortByJobLocationAsc=true;
    this.sortByJobTitleAsc=true
  }

  sortByJobLocation(){
    if(this.sortByJobLocationAsc){
      this.jobsList = this.jobsList.sort((a,b)=> a.city > b.city || a.stateOrProvince > b.stateOrProvince || a.country > b.country)
    }else {
      this.jobsList = this.jobsList.sort((a,b)=> a.city < b.city || a.stateOrProvince < b.stateOrProvince || a.country < b.country)
    }
    this.sortByJobLocationAsc=!this.sortByJobLocationAsc;
    this.sortByJobIdAsc=true;
    this.sortByCompanyNameAsc=true;
    this.sortByJobDateAsc=true;
    this.sortByJobTitleAsc=true
  }

  sortByJobTitle(){
    if(this.sortByJobTitleAsc){
      this.jobsList = this.jobsList.sort((a,b)=> a.jobTitle > b.jobTitle);
    }else {
      this.jobsList = this.jobsList.sort((a,b)=> a.jobTitle < b.jobTitle);
    }
    this.sortByJobTitleAsc=!this.sortByJobTitleAsc;
    this.sortByJobIdAsc=true;
    this.sortByCompanyNameAsc=true;
    this.sortByJobLocationAsc=true;
    this.sortByJobDateAsc=true
  }

  sortByCompanyName(){
    if(this.sortByCompanyNameAsc){
      this.jobsList = this.jobsList.sort((a,b)=> a.companyName > b.companyName)
    }else {
      this.jobsList = this.jobsList.sort((a,b)=> a.companyName < b.companyName)
    }
    this.sortByCompanyNameAsc=!this.sortByCompanyNameAsc;
    this.sortByJobIdAsc=true;
    this.sortByJobTitleAsc=true;
    this.sortByJobLocationAsc=true;
    this.sortByJobDateAsc=true
  }

}
