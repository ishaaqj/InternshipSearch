import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserRecruiterComponent } from './create-user-recruiter.component';

describe('CreateUserRecruiterComponent', () => {
  let component: CreateUserRecruiterComponent;
  let fixture: ComponentFixture<CreateUserRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
