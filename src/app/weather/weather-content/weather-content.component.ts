import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-content',
  templateUrl: './weather-content.component.html',
  styleUrls: ['./weather-content.component.scss'],
})
export class WeatherContentComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<any>();
  hasWeatherData = false;

  constructor(private readonly weatherService: WeatherService) {}

  public ngOnInit(): void {
    this.weatherService
      .onHasWeatherData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasWeatherData) => {
        this.hasWeatherData = hasWeatherData;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
