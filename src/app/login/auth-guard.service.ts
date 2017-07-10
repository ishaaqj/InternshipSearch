///<reference path="../../../node_modules/@angular/router/src/interfaces.d.ts"/>
import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.angularFireAuth.authState.take(1)
      .map(authState => !!authState)
      .do(auth => !auth ? this.router.navigate(['/login']) : true);
  }

}
