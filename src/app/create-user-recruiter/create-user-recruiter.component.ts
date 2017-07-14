import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-user-recruiter',
  templateUrl: './create-user-recruiter.component.html',
  styleUrls: ['./create-user-recruiter.component.css']
})
export class CreateUserRecruiterComponent implements OnInit {
  private createRecruiterForm: FormGroup;
  private formBuilder: FormBuilder;
  private angularFireAuth: AngularFireAuth;
  private user;
  private subscribeToRoute;
  private gotData;
  private updateForm;
  private userId;

  constructor(formBuilder: FormBuilder, angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.formBuilder = formBuilder;
    this.angularFireAuth = angularFireAuth;
  }

  ngOnInit() {
    this.subscribeToRoute = this.activatedRoute.params.subscribe(params => {
      this.angularFireDatabase.object('users/' + params['id'], {preserveSnapshot: true}).subscribe(snapshot => {
        this.user = snapshot.val();
        this.userId = params['id'];
        if (this.user != null) {
          this.gotData = true;
          this.buildFilledForm();
          this.updateForm = true;
        }
      });
    });
    if (!this.user) {
      this.buildEmptyForm();
      this.updateForm = false;
    }
  }

  private buildEmptyForm() {
    this.createRecruiterForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'password': [null, Validators.compose([Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])],
      'companyName': [null, Validators.required],
      'companyWebsite': [null, Validators.required]
    });
    this.gotData=true;
  }

  private createRecruiter() {
    let uid;
    this.angularFireAuth.auth.createUserWithEmailAndPassword(this.createRecruiterForm.controls['email'].value,
      this.createRecruiterForm.controls['password'].value).then((user) => {
      uid = user.uid;
      this.angularFireDatabase.object('/users/' + uid).set({
        'firstName': this.createRecruiterForm.controls['firstName'].value,
        'lastName': this.createRecruiterForm.controls['lastName'].value,
        'email': this.createRecruiterForm.controls['email'].value,
        'companyName': this.createRecruiterForm.controls['companyName'].value,
        'companyWebsite': this.createRecruiterForm.controls['companyWebsite'].value,
        'role': 'recruiter'
      }).then((success) => {
        console.log(success)
      }).catch((error) => {
        console.log(error.message)
      });
    }).then((success) => {
      this.router.navigate([''])
    }).catch((error) => {
      console.log(error.message)
    });
  }

  private buildFilledForm() {
    console.log(23)
    this.createRecruiterForm = this.formBuilder.group({
      'firstName': [this.user.firstName, Validators.required],
      'lastName': [this.user.lastName, Validators.required],
      'email': [this.user.email, Validators.compose([Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'companyName': [this.user.companyName, Validators.required],
      'companyWebsite': [this.user.companyWebsite, Validators.required],
    });
  }

  private updateAccount() {
    this.angularFireDatabase.object('/users/' + this.userId).update({
      'firstName': this.createRecruiterForm.controls['firstName'].value,
      'lastName': this.createRecruiterForm.controls['lastName'].value,
      'email': this.createRecruiterForm.controls['email'].value,
      'companyName': this.createRecruiterForm.controls['companyName'].value,
      'companyWebsite': this.createRecruiterForm.controls['companyWebsite'].value,

    }).then(success => {
      console.log(success);
      this.router.navigate(['my-account'])
    }).catch(err => console.log(err.message))
  }
}
