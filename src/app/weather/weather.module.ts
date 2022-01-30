import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { InjectionTokens } from './models/injection-tokens';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { WeatherHeaderComponent } from './weather-header/weather-header.component';
import { WeatherContentComponent } from './weather-content/weather-content.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { CurrentTemperatureComponent } from './current-temperature/current-temperature.component';
import { StatsComponent } from './stats/stats.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelinePeriodComponent } from './timeline-period/timeline-period.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastDayComponent } from './forecast-day/forecast-day.component';
import { WeatherService } from './weather.service';

@NgModule({
  declarations: [
    WeatherPageComponent,
    WeatherHeaderComponent,
    WeatherContentComponent,
    CurrentWeatherComponent,
    CurrentTemperatureComponent,
    StatsComponent,
    TimelineComponent,
    TimelinePeriodComponent,
    WeatherIconComponent,
    ForecastComponent,
    ForecastDayComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [WeatherService],
})
export class WeatherModule {
  public static withApiKey(
    apiKey: string,
    refreshRateInMilliseconds: number
  ): ModuleWithProviders<WeatherModule> {
    return {
      ngModule: WeatherModule,
      providers: [
        { provide: InjectionTokens.WEATHER_API_KEY, useValue: apiKey },
        {
          provide: InjectionTokens.WEATHER_UPDATE_FREQUENCY_IN_MILLISECONDS,
          useValue: refreshRateInMilliseconds,
        },
      ],
    };
  }
}
