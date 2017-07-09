import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  private searchForm: FormGroup;
  private formBuilder: FormBuilder;
  private jobsList;
  private database: AngularFireDatabase;

  constructor(formBuilder: FormBuilder, database: AngularFireDatabase) {
    this.database = database;
    this.formBuilder = formBuilder;
    this.buildSearchForm();
    this.getJobsFromDatabase();
  }

  private buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      'search': [null, Validators.required],
      'location': ''
    });
  }

  ngOnInit() {
  }

  private getJobsFromDatabase() {
    this.jobsList = this.database.list('/jobApplications')

  }
}
