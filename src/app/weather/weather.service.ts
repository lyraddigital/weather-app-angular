import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject, timer } from 'rxjs';

import { ForecastDay } from './models/forecast-day';
import { InjectionTokens } from './models/injection-tokens';
import { Statistics } from './models/statistics';
import { TimelinePeriod } from './models/timeline-period';
import { Constants } from './models/constants';
import { switchMap, tap } from 'rxjs/operators';
import {
  DailyForecastApiResponse,
  TimelinePeriodApiResponse,
  WeatherApiResponse,
} from './models/api';

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
  private currentLatitude = -37.8136276;
  private currentLongitude = 144.9630576;

  constructor(
    @Inject(InjectionTokens.WEATHER_API_KEY)
    private readonly weatherApiKey: string,
    @Inject(InjectionTokens.WEATHER_UPDATE_FREQUENCY_IN_MILLISECONDS)
    private readonly weatherUpdateFrequencyInMilliseconds: number,
    private readonly httpClient: HttpClient
  ) {
    timer(0, this.weatherUpdateFrequencyInMilliseconds)
      .pipe(
        tap(() => {
          this.isLoading$.next(true);
        }),
        switchMap(() => {
          return this.httpClient.get<WeatherApiResponse>(
            `${Constants.WEATHER_API_URL}?lat=${this.currentLatitude}&lon=${this.currentLongitude}&appid=${this.weatherApiKey}&units=metric`
          );
        })
      )
      .subscribe((response) => {
        this.publishNewWeatherData(response);
        this.isLoading$.next(false);
      });
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

  private publishNewWeatherData(response: WeatherApiResponse) {
    const localTimeInEpochSeconds = response?.current?.dt || 0;
    const localTime = new Date(localTimeInEpochSeconds * 1000);
    const sunriseTimeInEpochSeconds = response?.current?.sunrise || 0;
    const sunriseTime = new Date(sunriseTimeInEpochSeconds * 1000);
    const sunsetTimeInEpochSeconds = response?.current?.sunset || 0;
    const sunsetTime = new Date(sunsetTimeInEpochSeconds * 1000);
    const dailyTemperatures =
      response?.daily && response.daily.length > 0
        ? response.daily[0]?.temp
        : undefined;
    const weatherData = {
      weatherId: 1,
      temp: this.roundNumberOrZero(response?.current?.temp) || 0,
      statistics: {
        sunriseTime: sunriseTime,
        sunsetTime: sunsetTime,
        highTemp: this.roundNumberOrZero(dailyTemperatures?.max),
        lowTemp: this.roundNumberOrZero(dailyTemperatures?.min),
        windSpeed: this.roundNumberOrZero(response?.current?.wind_speed),
        rainPercentage: this.roundNumberOrZero(response?.current?.humidity),
      },
    };
    const forecastDays = (response?.daily || [])
      .map((d?: DailyForecastApiResponse) => ({
        date: new Date((d?.dt || 0) * 1000),
        weatherId:
          d?.weather && d.weather.length > 0 ? d.weather[0]?.id || 0 : 0,
        lowTemp: this.roundNumberOrZero(d?.temp?.min),
        highTemp: this.roundNumberOrZero(d?.temp?.max),
        rainPercentage: this.roundNumberOrZero(d?.humidity),
        windSpeed: this.roundNumberOrZero(d?.wind_speed),
      }))
      .slice(1, 6);

    const periods = (response?.hourly || [])
      .map((h?: TimelinePeriodApiResponse) => ({
        weatherId:
          h?.weather && h.weather.length > 0 ? h.weather[0]?.id || 0 : 0,
        temp: this.roundNumberOrZero(h?.temp),
        time: new Date((h?.dt || 0) * 1000),
      }))
      .filter((_: TimelinePeriod, i: number) => i % 3 === 0)
      .slice(1, 7);

    this.localTime$.next(localTime);
    this.hasWeatherData$.next(!!response);
    this.currentWeatherData$.next(weatherData);
    this.forecastDays$.next(forecastDays);
    this.periods$.next(periods);
  }

  private roundNumberOrZero(value: number | undefined): number {
    return Math.round(this.zeroIfUndefined(value));
  }

  private zeroIfUndefined(value?: number): number {
    return value || 0;
  }

  ngOnDestroy(): void {
    this.isLoading$.complete();
    this.localTime$.complete();
    this.hasWeatherData$.complete();
    this.currentWeatherData$.complete();
    this.forecastDays$.complete();
    this.periods$.complete();
  }
}
