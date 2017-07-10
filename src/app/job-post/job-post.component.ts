import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  private job;
  constructor(private appComponent: AppComponent) {
    this.job = appComponent.getJobPostToOpen();
    console.log(this.job.companyName)
  }

  ngOnInit() {
  }

}
