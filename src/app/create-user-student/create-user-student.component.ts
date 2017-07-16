import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user-student',
  templateUrl: './create-user-student.component.html',
  styleUrls: ['./create-user-student.component.css']
})
export class CreateUserStudentComponent implements OnInit {
  private createStudentForm: FormGroup;
  private createEducationForm: FormGroup;
  private createSkillForm: FormGroup;
  private createExperienceForm: FormGroup;
  private createAdditionalInfoForm: FormGroup
  private createProjectsForm: FormGroup;
  private formBuilder: FormBuilder;
  private angularFireAuth: AngularFireAuth;
  private anuglarFireDatabase: AngularFireDatabase;
  private addEducationBool = false;
  private addSkillBool = false;
  private addAdditionalInfoBool = false;
  private educationList =[];
  private skillList=[];
  private additionalInfoList=[];
  private addProjectsBool = false;
  private projectsList=[];
  private addExperienceBool = false;
  private experienceList =[];
  private re = /\//gi;

  degrees = [
    {value: 'HighSchool', viewValue: 'High School'},
    {value: 'Diploma', viewValue: 'Diploma'},
    {value: 'Bachelors', viewValue: 'Bachelors'},
    {value: 'Masters', viewValue: 'Masters'},
    {value: 'PhD', viewValue: 'PhD'},
  ];

  constructor(formBuilder: FormBuilder, angularFireAuth: AngularFireAuth, anuglarFireDatabase: AngularFireDatabase,
              private router:Router) {
    this.formBuilder = formBuilder;
    this.angularFireAuth = angularFireAuth;
    this.anuglarFireDatabase = anuglarFireDatabase;
    this.buildForm();
    this.educationForm();
    this.skillForm();
    this.experienceForm();
    this.projectForm();
    this.additionalInfoForm();
  }

  private addEducation(){
    this.addEducationBool=true;
  }

  private addNewEducation(){
    if(this.createEducationForm.controls['endDate'].value<this.createEducationForm.controls['startDate'].value){
      alert("End date must be after start date ")
    }else {
      if (this.createEducationForm.controls['currentlyEnrolled'].value){
        this.createEducationForm.controls['endDate'].setValue('present');
      }else {
        this.createEducationForm.controls['endDate'].setValue(new Date(this.createEducationForm.controls['endDate'].value)
          .toLocaleDateString())
      }
      this.createEducationForm.controls['startDate'].setValue(new Date(this.createEducationForm.controls['startDate'].value)
        .toLocaleDateString());
      this.educationList.push(this.createEducationForm.value);
      this.createEducationForm.reset();
      this.addEducationBool=false;
    }
  }

  private addSkill(){
    this.addSkillBool=true;
  }

  private addNewSkill() {
    this.skillList.push(this.createSkillForm.value);
    this.createSkillForm.reset();
    this.addSkillBool=false;
  }

  private addExperience(){
    this.addExperienceBool=true;
  }

  private addNewExperience(){
    if(this.createExperienceForm.controls['endDate'].value<this.createExperienceForm.controls['startDate'].value){
      alert("End date must be after start date ")
    }else {
      if (this.createExperienceForm.controls['currentlyEmployed'].value){
        this.createExperienceForm.controls['endDate'].setValue('present');
      }else {
        this.createExperienceForm.controls['endDate']
          .setValue(new Date(this.createExperienceForm.controls['endDate'].value).toLocaleDateString());
      }
      this.createExperienceForm.controls['startDate']
        .setValue(new Date(this.createExperienceForm.controls['startDate'].value).toLocaleDateString());
      this.experienceList.push(this.createExperienceForm.value);
      this.createExperienceForm.reset();
      this.addExperienceBool=false;
    }
  }

  private addAdditionalInfo(){
    this.addAdditionalInfoBool=true;
  }

  private addNewAdditionalInfo() {
    this.additionalInfoList.push(this.createAdditionalInfoForm.value);
    this.createAdditionalInfoForm.reset();
    this.addAdditionalInfoBool = false;
  }

  private addProject(){
    this.addProjectsBool=true;
  }

  private addNewProject() {
    this.projectsList.push(this.createProjectsForm.value);
    this.createProjectsForm.reset()
    this.addProjectsBool = false;
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
      'city': [null, Validators.required],
      'country': [null, Validators.required],
      'stateOrProvince': [null, Validators.required],
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
      'skillDescription': [null, Validators.required]
    });
  }

  private projectForm(){
    this.createProjectsForm = this.formBuilder.group({
      'projectName': [null, Validators.required],
      'projectDescription': [null, Validators.required],
    })
  }

  private additionalInfoForm(){
    this.createAdditionalInfoForm = this.formBuilder.group({
      'additionalName': [null, Validators.required],
      'additionalDescription': [null, Validators.required]
    });
  }

  private experienceForm(){
    this.createExperienceForm = this.formBuilder.group({
      'nameOfInst': [null, Validators.required],
      'jobTitle': [null, Validators.required],
      'jobDescription': '',
      'startDate': [null, Validators.required],
      'endDate': '',
      'currentlyEmployed': ''
    });
  }

  private saveInfo(){
    let uid;
    if (this.educationList.length==0){
      alert("Add at least one education")
    }else {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(this.createStudentForm.controls['email'].value,
        this.createStudentForm.controls['password'].value).then((user) => {
        uid = user.uid;
        this.anuglarFireDatabase.object('/users/' + uid).set({
          'firstName': this.createStudentForm.controls['firstName'].value,
          'lastName': this.createStudentForm.controls['lastName'].value,
          'email': this.createStudentForm.controls['email'].value,
          'profileHeadline': this.createStudentForm.controls['profileHeadline'].value,
          'profileIntroduction': this.createStudentForm.controls['profileIntroduction'].value,
          'careerInterest': this.createStudentForm.controls['careerInterest'].value,
          'city': this.createStudentForm.controls['city'].value,
          'country': this.createStudentForm.controls['country'].value,
          'stateOrProvince': this.createStudentForm.controls['stateOrProvince'].value,
          'educationList': this.educationList,
          'additionalInfoList': this.additionalInfoList,
          'experienceList': this.experienceList,
          'skillList': this.skillList,
          'projectsList': this.projectsList,
          'role': 'student'
        }).then((success) => {
          console.log(success)
        }).catch((error) => {
          console.log(error.message)
        });
      }).then((success) => {
        this.router.navigate([''])
        console.log(success)
      }).catch((error) => {
        console.log(error.message)
      });
    }
  }

  ngOnInit() {
  }

}
