import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  searchForm: FormGroup;
  private formBuilder: FormBuilder;
  jobsList;
  private database: AngularFireDatabase;

  constructor(formBuilder: FormBuilder, database: AngularFireDatabase, private appComponent: AppComponent,
              private router: Router) {
    this.database = database;
    this.formBuilder = formBuilder;
    this.buildSearchForm();
    this.getJobsFromDatabase();
  }

  private buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      'search': '',
      'location': ''
    });
  }

  ngOnInit() {
  }

  search(){
    let location = (this.searchForm.controls['location'].value.toLocaleLowerCase()=='')?'empty':this.searchForm.controls['location'].value.toLocaleLowerCase();
    let keyword = (this.searchForm.controls['search'].value.toLocaleLowerCase()=='')?'empty':this.searchForm.controls['search'].value.toLocaleLowerCase();
    this.router.navigate(['/search-jobs',keyword, location])
  }

  getJobsFromDatabase() {
    this.jobsList = this.database.list('/jobApplications')
  }

}
