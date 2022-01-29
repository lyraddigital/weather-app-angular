import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WeatherLocation } from '../models/weather-location';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-header',
  templateUrl: './weather-header.component.html',
  styleUrls: ['./weather-header.component.scss'],
})
export class WeatherHeaderComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<any>();
  location: WeatherLocation = {
    city: 'London',
    country: 'United Kingdom',
  };
  localTime?: Date;

  constructor(private readonly weatherService: WeatherService) {}

  public ngOnInit(): void {
    this.weatherService
      .onLocalTimeChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((localTime) => {
        this.localTime = localTime;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
