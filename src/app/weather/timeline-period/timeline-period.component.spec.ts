import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePeriodComponent } from './timeline-period.component';

describe('TimelinePeriodComponent', () => {
  let component: TimelinePeriodComponent;
  let fixture: ComponentFixture<TimelinePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinePeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
