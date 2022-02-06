import { Component, Input } from '@angular/core';
import { WeatherIconService } from '../weather-icon.service';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss'],
})
export class WeatherIconComponent {
  @Input() weatherId?: number;
  @Input() isNightTime?: boolean;

  constructor(private readonly weatherIconService: WeatherIconService) {}

  weatherIconUrl(): string {
    return this.weatherIconService.getWeatherIconUrl(
      this.weatherId,
      this.isNightTime
    );
  }
}
