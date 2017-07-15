import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-create-user-student',
  templateUrl: './create-user-student.component.html',
  styleUrls: ['./create-user-student.component.css']
})
export class CreateUserStudentComponent implements OnInit {
  private createStudentForm: FormGroup;
  private formBuilder: FormBuilder;
  private angularFireAuth: AngularFireAuth;
  private anuglarFireDatabase: AngularFireDatabase;
  private currentlyEmployedBool=false;

  degrees = [
    {value: 'highschool', viewValue: 'Highschool'},
    {value: 'diploma', viewValue: 'Diploma'},
    {value: 'bachelors', viewValue: 'Bachelors'},
    {value: 'masters', viewValue: 'Masters'},
    {value: 'phd', viewValue: 'PhD'},
  ];

  constructor(formBuilder: FormBuilder, angularFireAuth: AngularFireAuth, anuglarFireDatabase: AngularFireDatabase) {
    this.formBuilder = formBuilder;
    this.angularFireAuth = angularFireAuth;
    this.anuglarFireDatabase = anuglarFireDatabase;
    this.buildForm();
  }

  private currentlyEmployedClicked() {
    if(this.createStudentForm.controls['currentlyEmployed'].value){
      this.currentlyEmployedBool=true;
    }else {
      this.currentlyEmployedBool=false;
    }
  }

  private buildForm() {
    this.createStudentForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'password': [null, Validators.compose([Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])],
      'profileHeadline': [null, Validators.required],
      'profileIntroduction': [null, Validators.required],
      'careerInterest': [null, Validators.required],
      'nameOfInst': [null, Validators.required],
      'degree': [null, Validators.required],
      'programOfStudy': [null, Validators.required],
      'startDate': [null, Validators.required],
      'endDate': [null, Validators.required],
      'nameOfCompany': [null, Validators.required],
      'jobTitle': [null, Validators.required],
      'startDateWork': [null, Validators.required],
      'endDateWork': [null, Validators.required],
      'jobDescription': [null, Validators.required],
      'skillName': [null, Validators.required],
      'skillDescription': [null, Validators.required],
      'projectName': [null, Validators.required],
      'projectDescription': [null, Validators.required],
      'additionalTitle': [null, Validators.required],
      'additionalDescription': [null, Validators.required],
      'currentlyEnrolled': [null, Validators.required],
      'currentlyEmployed': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

}
