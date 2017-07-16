import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAppliedComponent } from './students-applied.component';

describe('StudentsAppliedComponent', () => {
  let component: StudentsAppliedComponent;
  let fixture: ComponentFixture<StudentsAppliedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsAppliedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
