import { Component, Input } from '@angular/core';

import { ForecastDay } from '../models/forecast-day';

@Component({
  selector: 'app-forecast-day',
  templateUrl: './forecast-day.component.html',
  styleUrls: ['./forecast-day.component.scss'],
})
export class ForecastDayComponent {
  @Input() day?: ForecastDay;
}
