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
  private jobsList;
  private searchForm;
  private filterForm;

  constructor(private formBuilder: FormBuilder,private database: AngularFireDatabase,
              private router: Router, private angularFireAuth :AngularFireAuth) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(authState=>{
      this.userId = authState.uid;
      this.database.list('/jobsAppliedTo/'+this.userId).subscribe(items=>{
        this.jobsList=items;
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

  private filterResult(){
    this.search();
    console.log(1)
    let companyName = this.filterForm.controls['companyName'].value.toLocaleLowerCase();
    let minSalary = this.filterForm.controls['minSalary'].value;
    let maxSalary = this.filterForm.controls['maxSalary'].value;
    let datePosted = this.filterForm.controls['datePosted'].value;
    let dateStarts = this.filterForm.controls['dateStarts'].value;
    this.jobsList = this.jobsList.filter(job => job.companyName.toLocaleLowerCase().indexOf(companyName) != -1)
    this.jobsList = this.jobsList.filter(job => job.minSalary - minSalary + 1)
    this.jobsList = this.jobsList.filter(job => maxSalary - job.maxSalary + 1)
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

  private search(){
    let location = this.searchForm.controls['location'].value.toLocaleLowerCase();
    let keyword = this.searchForm.controls['search'].value.toLocaleLowerCase();
    this.database.list('/jobsAppliedTo/'+this.userId).subscribe(items=>{
      this.jobsList=items;
      this.jobsList = this.jobsList.filter(job => ((job.city.toLocaleLowerCase()+', '+job.stateOrProvince.toLocaleLowerCase()+', '+job.country.toLocaleLowerCase()).indexOf(location) != -1));
      this.jobsList = this.jobsList.filter(job => (job.jobTitle.toLocaleLowerCase().indexOf(keyword) != -1) || (job.companyName.toLocaleLowerCase().indexOf(keyword) != -1));
    })
  }

  private sortByJobId(){
    this.jobsList = this.jobsList.sort((a,b)=> a.jobId > b.jobId);
  }

  private sortByJobStartDate(){
    this.jobsList = this.jobsList.sort((a,b)=> a.startDate > b.startDate);
  }

  private sortByJobLocation(){
    this.jobsList = this.jobsList.sort((a,b)=> a.city > b.city);
  }

  private sortByJobTitle(){
    this.jobsList = this.jobsList.sort((a,b)=> a.jobTitle > b.jobTitle);
  }

  private sortByCompanyName(){
    this.jobsList = this.jobsList.sort((a,b)=> a.companyName > b.companyName);
  }

}
