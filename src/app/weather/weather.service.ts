import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Statistics } from './models/statistics';

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

  constructor() {
    this.isLoading$.next(true);

    setTimeout(() => {
      this.isLoading$.next(false);
      this.localTime$.next(new Date());
      this.hasWeatherData$.next(true);
      this.currentWeatherData$.next(this.weatherData);

      setInterval(() => {
        this.isLoading$.next(true);

        setTimeout(() => {
          this.isLoading$.next(false);
          this.localTime$.next(new Date());
          this.hasWeatherData$.next(true);
          this.currentWeatherData$.next(this.weatherData);
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

  ngOnDestroy(): void {
    this.isLoading$.complete();
  }
}
