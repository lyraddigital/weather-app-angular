import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherPageComponent } from './weather-page/weather-page.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherHeaderComponent } from './weather-header/weather-header.component';
import { WeatherContentComponent } from './weather-content/weather-content.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { CurrentTemperatureComponent } from './current-temperature/current-temperature.component';
import { StatsComponent } from './stats/stats.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelinePeriodComponent } from './timeline-period/timeline-period.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';

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
  ],
  imports: [CommonModule, WeatherRoutingModule],
})
export class WeatherModule {}
