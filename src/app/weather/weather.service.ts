import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject, Subject, timer } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { UtilityService } from '../core/utility.service';
import { ForecastDay } from './models/forecast-day';
import { InjectionTokens } from './models/injection-tokens';
import { TimelinePeriod } from './models/timeline-period';
import { Constants } from './models/constants';
import { CurrentWeather } from './models/current-weather';
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
  private currentWeatherData$ = new ReplaySubject<CurrentWeather>();
  private forecastDays$ = new ReplaySubject<Array<ForecastDay>>();
  private periods$ = new ReplaySubject<Array<TimelinePeriod>>();
  private currentLatitude = -37.8136276;
  private currentLongitude = 144.9630576;

  constructor(
    @Inject(InjectionTokens.WEATHER_API_KEY)
    private readonly weatherApiKey: string,
    @Inject(InjectionTokens.WEATHER_UPDATE_FREQUENCY_IN_MILLISECONDS)
    private readonly weatherUpdateFrequencyInMilliseconds: number,
    private readonly httpClient: HttpClient,
    private readonly utilityService: UtilityService
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
        }),
        catchError(() => {
          return of(undefined);
        })
      )
      .subscribe({
        next: (response) => {
          this.publishNewWeatherData(response);
          this.isLoading$.next(false);
        },
      });
  }

  public onCurrentWeather(): Observable<CurrentWeather> {
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

  private publishNewWeatherData(response?: WeatherApiResponse) {
    const weatherId =
      response?.current?.weather && response?.current?.weather.length > 0
        ? response?.current?.weather[0].id
        : 0;
    const localTimeInEpochSeconds = response?.current?.dt || 0;
    const localTime = this.utilityService.convertEpochSecondsToDate(
      localTimeInEpochSeconds
    );
    const sunriseTimeInEpochSeconds = response?.current?.sunrise || 0;
    const sunriseTime = this.utilityService.convertEpochSecondsToDate(
      sunriseTimeInEpochSeconds
    );
    const sunsetTimeInEpochSeconds = response?.current?.sunset || 0;
    const sunsetTime = this.utilityService.convertEpochSecondsToDate(
      sunsetTimeInEpochSeconds
    );
    const dailyTemperatures =
      response?.daily && response.daily.length > 0
        ? response.daily[0]?.temp
        : undefined;
    const weatherData = {
      weatherId,
      temp: this.utilityService.roundNumberOrZero(response?.current?.temp) || 0,
      statistics: {
        sunriseTime: sunriseTime,
        sunsetTime: sunsetTime,
        highTemp: this.utilityService.roundNumberOrZero(dailyTemperatures?.max),
        lowTemp: this.utilityService.roundNumberOrZero(dailyTemperatures?.min),
        windSpeed: this.utilityService.roundNumberOrZero(
          response?.current?.wind_speed
        ),
        rainPercentage: this.utilityService.roundNumberOrZero(
          response?.current?.humidity
        ),
      },
    };
    const forecastDays = (response?.daily || [])
      .map((d?: DailyForecastApiResponse) => ({
        date: this.utilityService.convertEpochSecondsToDate(d?.dt),
        weatherId:
          d?.weather && d.weather.length > 0 ? d.weather[0]?.id || 0 : 0,
        lowTemp: this.utilityService.roundNumberOrZero(d?.temp?.min),
        highTemp: this.utilityService.roundNumberOrZero(d?.temp?.max),
        rainPercentage: this.utilityService.roundNumberOrZero(d?.humidity),
        windSpeed: this.utilityService.roundNumberOrZero(d?.wind_speed),
      }))
      .slice(1, 6);

    const periods = (response?.hourly || [])
      .map((h?: TimelinePeriodApiResponse) => ({
        weatherId:
          h?.weather && h.weather.length > 0 ? h.weather[0]?.id || 0 : 0,
        temp: this.utilityService.roundNumberOrZero(h?.temp),
        time: this.utilityService.convertEpochSecondsToDate(h?.dt),
      }))
      .filter((_: TimelinePeriod, i: number) => i % 3 === 0)
      .slice(1, 7);

    this.localTime$.next(localTime);
    this.hasWeatherData$.next(!!response);
    this.currentWeatherData$.next(weatherData);
    this.forecastDays$.next(forecastDays);
    this.periods$.next(periods);
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
