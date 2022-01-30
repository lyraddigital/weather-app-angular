import { CurrentWeatherApiResponse } from './current-weather-api-response';
import { DailyForecastApiResponse } from './daily-forecast-api-response';
import { TimelinePeriodApiResponse } from './timeline-period-api-response';

export interface WeatherApiResponse {
  current?: CurrentWeatherApiResponse;
  daily?: Array<DailyForecastApiResponse | undefined>;
  hourly?: Array<TimelinePeriodApiResponse | undefined>;
  timezone?: string;
  isLoading?: boolean;
}
