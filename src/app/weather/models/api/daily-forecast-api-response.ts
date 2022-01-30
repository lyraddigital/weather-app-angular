import { DailyForecastMinMaxApiResponse } from './daily-forecast-min-max-api-response';
import { WeatherDetailsApiResponse } from './weather-details-api-response';

export interface DailyForecastApiResponse {
  dt?: number;
  humidity?: number;
  wind_speed?: number;
  weather?: Array<WeatherDetailsApiResponse>;
  temp?: DailyForecastMinMaxApiResponse;
}
