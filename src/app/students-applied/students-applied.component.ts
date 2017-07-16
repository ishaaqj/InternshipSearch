import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-students-applied',
  templateUrl: './students-applied.component.html',
  styleUrls: ['./students-applied.component.css']
})
export class StudentsAppliedComponent implements OnInit, OnDestroy {
  private userId;
  private studentsList;
  private searchForm;
  private filterForm;
  private subscribeToRoute;
  private jobTitle;
  private jobId;
  private gotData;
  private sortByNameAsc = true;
  private sortByDegreeAsc = true;
  private sortByUniversityAsc = true;
  private sortByLocationAsc

  constructor(private formBuilder: FormBuilder,private database: AngularFireDatabase,
              private router: Router, private angularFireAuth :AngularFireAuth,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscribeToRoute = this.activatedRoute.params.subscribe(params=> {
      this.angularFireAuth.authState.subscribe(authState=>{
        this.userId = authState.uid;
        this.database.list('/studentsApplied/'+this.userId+'/'+params['id']).subscribe(items=>{
          this.studentsList=items;
        });
        this.database.object('/jobApplications/'+params['id'],{preserveSnapshot: true}).subscribe(snapshot=>{
          this.jobTitle=snapshot.val().jobTitle;
          this.jobId=snapshot.val().jobId;
        });
        this.gotData=true;
      });
    });
    this.buildSearchForm();
    this.buildFilterForm();
  }

  private buildFilterForm() {
    this.filterForm = this.formBuilder.group({
      'degree': '',
      'university': ''
    });
  }

  private filterResult() {
    this.search();
    let degree = this.filterForm.controls['degree'].value.toLocaleLowerCase();
    let university = this.filterForm.controls['university'].value.toLocaleLowerCase();
    this.studentsList = this.studentsList.filter(student => student.degree.toLocaleLowerCase().indexOf(degree) != -1)
    this.studentsList = this.studentsList.filter(student => student.university.toLocaleLowerCase().indexOf(university) != -1)
  }

  private buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      'search': '',
      'location': ''
    });
  }
  private search(){
    let keyword = this.searchForm.controls['search'].value.toLocaleLowerCase();
    let location = this.searchForm.controls['location'].value.toLocaleLowerCase();
    this.database.list('/studentsApplied/'+this.userId+'/'+this.jobId).subscribe(items=>{
      this.studentsList=items;
      this.studentsList = this.studentsList.filter(student => ((student.city.toLocaleLowerCase()+', '+student.stateOrProvince.toLocaleLowerCase()+', '+student.country.toLocaleLowerCase()).indexOf(location) != -1));
      this.studentsList = this.studentsList.filter(student => ((student.firstName.toLocaleLowerCase() + " " + student.lastName.toLocaleLowerCase()).indexOf(keyword) != -1));
    })
  }

  ngOnDestroy(){
    this.subscribeToRoute.unsubscribe()
  }
  private sortByName(){
    if(this.sortByNameAsc) {
      this.studentsList = this.studentsList.sort((a, b) => a.firstName > b.firstName);
    }else{
      this.studentsList = this.studentsList.sort((a, b) => a.firstName < b.firstName);
    }
    this.sortByNameAsc=!this.sortByNameAsc;
    this.sortByDegreeAsc=true;
    this.sortByUniversityAsc=true;
    this.sortByLocationAsc=true;
  }

  private sortByDegree() {
    if (this.sortByDegreeAsc) {
      this.studentsList = this.studentsList.sort((a, b) => a.degree > b.degree);
    }else{
      this.studentsList = this.studentsList.sort((a, b) => a.degree < b.degree);
    }
    this.sortByDegreeAsc=!this.sortByDegreeAsc;
    this.sortByNameAsc=true;
    this.sortByLocationAsc=true;
    this.sortByUniversityAsc=true;
  }

  private sortByUniversity(){
    if(this.sortByUniversityAsc) {
      this.studentsList = this.studentsList.sort((a, b) => a.university > b.university);
    }else {
      this.studentsList = this.studentsList.sort((a, b) => a.university < b.university);
    }
    this.sortByUniversityAsc=!this.sortByUniversityAsc;
    this.sortByNameAsc=true;
    this.sortByDegreeAsc=true;
    this.sortByLocationAsc=true;
  }

  private sortByLocation(){
    if(this.sortByLocationAsc){
    this.studentsList = this.studentsList.sort((a,b)=> a.city > b.city);
  }else{
      this.studentsList = this.studentsList.sort((a,b)=> a.city < b.city);
    }
    this.sortByLocationAsc=!this.sortByLocationAsc;
    this.sortByNameAsc=true;
    this.sortByDegreeAsc;
    this.sortByUniversityAsc;

  }
}
