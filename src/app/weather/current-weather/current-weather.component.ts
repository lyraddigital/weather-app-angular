import { Component } from '@angular/core';

import { Statistics } from '../models/statistics';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent {
  weatherId = 1;
  temp = 6;
  statistics: Statistics = {
    sunriseTime: new Date(),
    sunsetTime: new Date(),
    localTime: new Date(),
    highTemp: 8,
    lowTemp: 4,
    windSpeed: 3,
    rainPercentage: 87,
  };
}
