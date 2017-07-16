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
  private createEducationForm: FormGroup;
  private createSkillForm: FormGroup;
  private formBuilder: FormBuilder;
  private angularFireAuth: AngularFireAuth;
  private anuglarFireDatabase: AngularFireDatabase;
  private addEducationBool = false;
  private addSkillBool = false;
  private educationList =[];
  private skillList=[];

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
    this.educationForm();
    this.skillForm();
  }

  private addEducation(){
    this.addEducationBool=true;
  }
  private addNewEducation(){
    if (this.createEducationForm.controls['currentlyEnrolled'].value){
      this.createEducationForm.controls['endDate'].setValue('present');
    }
    this.educationList.push(this.createEducationForm.value);
    alert("Education Info added. If you would like to add another education value, please press the button again")
    this.createEducationForm.reset()
  }

  private addSkill(){
    this.addSkillBool=true;
  }

  private addNewSkill(){
    this.skillList.push(this.createSkillForm.value);
    alert("Education Info added. If you would like to add another education value, please press the button again")
    this.createSkillForm.reset()
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

    });
  }

  private educationForm(){
    this.createEducationForm = this.formBuilder.group({
      'nameOfInst': [null, Validators.required],
      'degree': [null, Validators.required],
      'programOfStudy': [null, Validators.required],
      'startDate': [null, Validators.required],
      'endDate': [null],
      'currentlyEnrolled': [null]
    });
  }
  private skillForm(){
    this.createSkillForm = this.formBuilder.group({
      'skillName': [null, Validators.required],
      'skillDescription': [null, Validators.required],
    })
  }

  ngOnInit() {
  }

}
