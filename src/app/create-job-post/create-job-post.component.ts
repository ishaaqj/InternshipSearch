import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {FormBuilder} from "@angular/forms";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-create-job-post',
  templateUrl: './create-job-post.component.html',
  styleUrls: ['./create-job-post.component.css']
})
export class CreateJobPostComponent implements OnInit {
  private job;
  constructor(private appComponent: AppComponent) {
    this.job = appComponent.getJobPostToOpen();
  }

  ngOnInit() {
  }

}
