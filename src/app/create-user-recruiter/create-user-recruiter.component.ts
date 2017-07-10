import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-create-user-recruiter',
  templateUrl: './create-user-recruiter.component.html',
  styleUrls: ['./create-user-recruiter.component.css']
})
export class CreateUserRecruiterComponent implements OnInit {
  private createRecruiterForm: FormGroup;
  private formBuilder: FormBuilder;
  private angularFireAuth: AngularFireAuth;
  private anuglarFireDatabase: AngularFireDatabase;

  constructor(formBuilder: FormBuilder, angularFireAuth: AngularFireAuth, anuglarFireDatabase: AngularFireDatabase) {
    this.formBuilder = formBuilder;
    this.angularFireAuth = angularFireAuth;
    this.anuglarFireDatabase = anuglarFireDatabase;
    this.buildForm();
  }

  private buildForm() {
    this.createRecruiterForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
      'password': [null, Validators.compose([Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])],
      'companyName': [null, Validators.required],
      'companyWebsite': [null, Validators.required]
    });
  }

  private createRecruiter(){
    let uid;
    this.angularFireAuth.auth.createUserWithEmailAndPassword(this.createRecruiterForm.controls['email'].value,
      this.createRecruiterForm.controls['password'].value).then((user) =>{
      uid = user.uid;
      this.anuglarFireDatabase.object('/users/'+uid).set({
          'firstName': this.createRecruiterForm.controls['firstName'].value,
          'lastName': this.createRecruiterForm.controls['lastName'].value,
          'email': this.createRecruiterForm.controls['email'].value,
          'companyName': this.createRecruiterForm.controls['companyName'].value,
          'companyWebsite': this.createRecruiterForm.controls['companyWebsite'].value,
          'role': 'recruiter'
      }).then((success)=>{
        console.log(success)
      }).catch((error)=>{
        console.log(error.message)
      });
    }).then((success)=>{
      console.log(success)
    }).catch((error)=>{
      console.log(error.message)
    });
  }

  ngOnInit(){
  }
}
