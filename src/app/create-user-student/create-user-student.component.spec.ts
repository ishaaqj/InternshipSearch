import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserStudentComponent } from './create-user-student.component';

describe('CreateUserStudentComponent', () => {
  let component: CreateUserStudentComponent;
  let fixture: ComponentFixture<CreateUserStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
