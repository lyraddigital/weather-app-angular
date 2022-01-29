import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WeatherService } from '../weather.service';
import { TimelinePeriod } from '../models/timeline-period';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, OnDestroy {
  periods?: Array<TimelinePeriod>;
  destroy$ = new Subject<any>();

  constructor(private readonly weatherService: WeatherService) {}

  public ngOnInit(): void {
    this.weatherService
      .onTimelinePeriodsChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((periods) => {
        this.periods = periods;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
