import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountRecruiterComponent } from './my-account-recruiter.component';

describe('MyAccountRecruiterComponent', () => {
  let component: MyAccountRecruiterComponent;
  let fixture: ComponentFixture<MyAccountRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
