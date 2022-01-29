import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ForecastDay } from './models/forecast-day';
import { Statistics } from './models/statistics';
import { TimelinePeriod } from './models/timeline-period';

@Injectable({
  providedIn: 'any',
})
export class WeatherService implements OnDestroy {
  private isLoading$ = new Subject<boolean>();
  private localTime$ = new ReplaySubject<Date | undefined>();
  private hasWeatherData$ = new ReplaySubject<boolean>();
  private currentWeatherData$ = new ReplaySubject<{
    weatherId: number;
    temp: number;
    statistics: Statistics;
  }>();
  private forecastDays$ = new ReplaySubject<Array<ForecastDay>>();
  private periods$ = new ReplaySubject<Array<TimelinePeriod>>();

  private weatherData: {
    weatherId: number;
    temp: number;
    statistics: Statistics;
  } = {
    weatherId: 1,
    temp: 6,
    statistics: {
      sunriseTime: new Date(),
      sunsetTime: new Date(),
      localTime: new Date(),
      highTemp: 9,
      lowTemp: 4,
      windSpeed: 3,
      rainPercentage: 87,
    },
  };

  private forecastDays: Array<ForecastDay> = [
    {
      date: new Date(),
      weatherId: 40,
      lowTemp: 19,
      highTemp: 26,
      rainPercentage: 71,
      windSpeed: 4,
    },
    {
      date: new Date(),
      weatherId: 40,
      lowTemp: 19,
      highTemp: 26,
      rainPercentage: 71,
      windSpeed: 4,
    },
    {
      date: new Date(),
      weatherId: 40,
      lowTemp: 19,
      highTemp: 26,
      rainPercentage: 71,
      windSpeed: 4,
    },
    {
      date: new Date(),
      weatherId: 40,
      lowTemp: 19,
      highTemp: 26,
      rainPercentage: 71,
      windSpeed: 4,
    },
    {
      date: new Date(),
      weatherId: 40,
      lowTemp: 19,
      highTemp: 26,
      rainPercentage: 71,
      windSpeed: 4,
    },
  ];

  private periods: Array<TimelinePeriod> = [
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
  ];

  constructor() {
    this.isLoading$.next(true);

    setTimeout(() => {
      this.isLoading$.next(false);
      this.localTime$.next(new Date());
      this.hasWeatherData$.next(true);
      this.currentWeatherData$.next(this.weatherData);
      this.forecastDays$.next(this.forecastDays);
      this.periods$.next(this.periods);

      setInterval(() => {
        this.isLoading$.next(true);

        setTimeout(() => {
          this.isLoading$.next(false);
          this.localTime$.next(new Date());
          this.hasWeatherData$.next(true);
          this.currentWeatherData$.next(this.weatherData);
          this.forecastDays$.next(this.forecastDays);
          this.periods$.next(this.periods);
        }, 5000);
      }, 30000);
    }, 5000);
  }

  public onCurrentWeather(): Observable<{
    weatherId: number;
    temp: number;
    statistics: Statistics;
  }> {
    return this.currentWeatherData$.asObservable();
  }

  public onHasWeatherData(): Observable<boolean> {
    return this.hasWeatherData$.asObservable();
  }

  public onWeatherLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public onLocalTimeChanged(): Observable<Date | undefined> {
    return this.localTime$;
  }

  public onForecastDaysChanged(): Observable<Array<ForecastDay>> {
    return this.forecastDays$.asObservable();
  }

  public onTimelinePeriodsChanged(): Observable<Array<TimelinePeriod>> {
    return this.periods$.asObservable();
  }

  ngOnDestroy(): void {
    this.isLoading$.complete();
  }
}
