import { Statistics } from './statistics';

export interface CurrentWeather {
  weatherId: number;
  temp: number;
  statistics: Statistics;
}
