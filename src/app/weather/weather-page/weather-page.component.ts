import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WeatherService } from '../weather.service';

@Component({
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss'],
})
export class WeatherPageComponent implements OnInit, OnDestroy {
  isLoading = true;
  firstLoad = true;
  destroy$ = new Subject<any>();

  constructor(private weatherService: WeatherService) {}

  public ngOnInit(): void {
    this.weatherService
      .onWeatherLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.firstLoad = false;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
