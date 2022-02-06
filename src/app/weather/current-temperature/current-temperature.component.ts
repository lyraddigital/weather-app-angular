import { Component, Input } from '@angular/core';

import { WeatherIconService } from '../weather-icon.service';

@Component({
  selector: 'app-current-temperature',
  templateUrl: './current-temperature.component.html',
  styleUrls: ['./current-temperature.component.scss'],
})
export class CurrentTemperatureComponent {
  @Input() temp!: number;
  @Input() weatherId!: number;

  constructor(private readonly weatherIconService: WeatherIconService) {}

  getCurrentWeatherDescription() {
    return this.weatherIconService.getWeatherDescription(this.weatherId);
  }
}
