import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private formBuilder: FormBuilder;
  private angularFireAuth: AngularFireAuth;
  private router: Router;


  constructor(formBuilder: FormBuilder, angularFireAuth: AngularFireAuth, router: Router) {
    this.formBuilder = formBuilder;
    this.angularFireAuth = angularFireAuth;
    this.router = router;
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
      'password': [null, Validators.required]
    });
    // for use in registration forms for password field Validators.compose([Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  }

  private login(){
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value).then(
      _ => {
        this.router.navigate(['']);
      }
    ).catch(
      (err) => {
        alert(err.message);
      }
    )
  }

  public logout(){
    this.angularFireAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
