import { WeatherDetailsApiResponse } from './weather-details-api-response';

export interface TimelinePeriodApiResponse {
  temp?: number;
  dt?: number;
  weather?: Array<WeatherDetailsApiResponse>;
}
