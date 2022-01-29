import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Statistics } from '../models/statistics';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  weatherId!: number;
  temp!: number;
  statistics?: Statistics;
  destroy$ = new Subject<any>();

  constructor(private readonly weatherService: WeatherService) {}

  public ngOnInit(): void {
    this.weatherService
      .onCurrentWeather()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ weatherId, temp, statistics }) => {
        this.weatherId = weatherId;
        this.temp = temp;
        this.statistics = statistics;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
