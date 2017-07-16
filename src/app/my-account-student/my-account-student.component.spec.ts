import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountStudentComponent } from './my-account-student.component';

describe('MyAccountStudentComponent', () => {
  let component: MyAccountStudentComponent;
  let fixture: ComponentFixture<MyAccountStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
