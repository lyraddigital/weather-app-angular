import { Component } from '@angular/core';

import { WeatherLocation } from '../models/weather-location';

@Component({
  selector: 'app-weather-header',
  templateUrl: './weather-header.component.html',
  styleUrls: ['./weather-header.component.scss'],
})
export class WeatherHeaderComponent {
  location: WeatherLocation = {
    city: 'London',
    country: 'United Kingdom',
  };
  localTime: Date = new Date();
}
