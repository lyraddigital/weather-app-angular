import { Component } from '@angular/core';
import { ForecastDay } from '../models/forecast-day';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent {
  forecastDays: Array<ForecastDay> = [
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
}
