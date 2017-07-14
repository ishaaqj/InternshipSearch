import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAppliedToComponent } from './jobs-applied-to.component';

describe('JobsAppliedToComponent', () => {
  let component: JobsAppliedToComponent;
  let fixture: ComponentFixture<JobsAppliedToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsAppliedToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsAppliedToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
