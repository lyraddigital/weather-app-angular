import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WeatherService } from '../weather.service';
import { ForecastDay } from '../models/forecast-day';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<any>();
  forecastDays?: Array<ForecastDay>;

  constructor(private readonly weatherService: WeatherService) {}

  public ngOnInit(): void {
    this.weatherService
      .onForecastDaysChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((forecastDays) => {
        this.forecastDays = forecastDays;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
