import { Injectable } from '@angular/core';

import { WeatherType } from './models/weather-type';
import { WeatherIdMessages } from './models/weather-id-messages';

@Injectable({
  providedIn: 'root',
})
export class WeatherIconService {
  private weatherIdTypeMatrix: { [weatherId: number]: WeatherType } = {
    200: WeatherType.Thunderstorm,
    201: WeatherType.Thunderstorm,
    202: WeatherType.Thunderstorm,
    210: WeatherType.Thunderstorm,
    211: WeatherType.Thunderstorm,
    212: WeatherType.Thunderstorm,
    221: WeatherType.Thunderstorm,
    230: WeatherType.Thunderstorm,
    231: WeatherType.Thunderstorm,
    232: WeatherType.Thunderstorm,
    300: WeatherType.Drizzle,
    301: WeatherType.Drizzle,
    302: WeatherType.Drizzle,
    310: WeatherType.Drizzle,
    311: WeatherType.Drizzle,
    312: WeatherType.Drizzle,
    313: WeatherType.Drizzle,
    314: WeatherType.Drizzle,
    321: WeatherType.Drizzle,
    500: WeatherType.Rain,
    501: WeatherType.Rain,
    502: WeatherType.Rain,
    503: WeatherType.Rain,
    504: WeatherType.Rain,
    511: WeatherType.Rain,
    520: WeatherType.Shower,
    521: WeatherType.Shower,
    522: WeatherType.Shower,
    531: WeatherType.Shower,
    600: WeatherType.Snow,
    601: WeatherType.Snow,
    602: WeatherType.Snow,
    611: WeatherType.Snow,
    612: WeatherType.Snow,
    613: WeatherType.Snow,
    615: WeatherType.Snow,
    616: WeatherType.Snow,
    620: WeatherType.Snow,
    621: WeatherType.Snow,
    622: WeatherType.Snow,
    701: WeatherType.Atmospheric,
    711: WeatherType.Atmospheric,
    721: WeatherType.Atmospheric,
    731: WeatherType.Atmospheric,
    741: WeatherType.Atmospheric,
    751: WeatherType.Atmospheric,
    761: WeatherType.Atmospheric,
    762: WeatherType.Atmospheric,
    771: WeatherType.Atmospheric,
    781: WeatherType.Atmospheric,
    800: WeatherType.Clear,
    801: WeatherType.Clouds,
    802: WeatherType.Clouds,
    803: WeatherType.Clouds,
    804: WeatherType.Clouds,
  };

  private weatherIdMessageMatrix: { [weatherId: number]: string } = {
    200: WeatherIdMessages.ThunderstormWithRain,
    201: WeatherIdMessages.ThunderstormWithRain,
    202: WeatherIdMessages.ThunderstormWithRain,
    210: WeatherIdMessages.LightThunderstorm,
    211: WeatherIdMessages.Thunderstorm,
    212: WeatherIdMessages.StrongThunderstorm,
    221: WeatherIdMessages.StrongThunderstorm,
    230: WeatherIdMessages.ThunderstormWithDrizzle,
    231: WeatherIdMessages.ThunderstormWithDrizzle,
    232: WeatherIdMessages.ThunderstormWithDrizzle,
    300: WeatherIdMessages.LightDrizzle,
    301: WeatherIdMessages.Drizzle,
    302: WeatherIdMessages.HeavyDrizzle,
    310: WeatherIdMessages.LightDrizzle,
    311: WeatherIdMessages.Drizzle,
    312: WeatherIdMessages.HeavyDrizzle,
    313: WeatherIdMessages.ShoweringAndDrizzle,
    314: WeatherIdMessages.ShoweringAndDrizzle,
    321: WeatherIdMessages.ShoweringAndDrizzle,
    500: WeatherIdMessages.LightRain,
    501: WeatherIdMessages.Rain,
    502: WeatherIdMessages.HeavyRain,
    503: WeatherIdMessages.HeavyRain,
    504: WeatherIdMessages.HeavyRain,
    511: WeatherIdMessages.FreezingRain,
    520: WeatherIdMessages.LightRain,
    521: WeatherIdMessages.Rain,
    522: WeatherIdMessages.HeavyRain,
    531: WeatherIdMessages.HeavyRain,
    600: WeatherIdMessages.LightSnow,
    601: WeatherIdMessages.Snow,
    602: WeatherIdMessages.HeavySnow,
    611: WeatherIdMessages.Sleet,
    612: WeatherIdMessages.SleetAndShowers,
    613: WeatherIdMessages.SleetAndShowers,
    615: WeatherIdMessages.RainAndSnow,
    616: WeatherIdMessages.RainAndSnow,
    620: WeatherIdMessages.ShowersAndSnow,
    621: WeatherIdMessages.ShowersAndSnow,
    622: WeatherIdMessages.ShowersAndSnow,
    701: WeatherIdMessages.Misty,
    711: WeatherIdMessages.Smokey,
    721: WeatherIdMessages.Hazey,
    731: WeatherIdMessages.Dusty,
    741: WeatherIdMessages.Foggy,
    751: WeatherIdMessages.Sandy,
    761: WeatherIdMessages.Dusty,
    762: WeatherIdMessages.VolcanicAsh,
    771: WeatherIdMessages.Windy,
    781: WeatherIdMessages.Tornado,
    800: WeatherIdMessages.Clear,
    801: WeatherIdMessages.FewClouds,
    802: WeatherIdMessages.ScatteredClouds,
    803: WeatherIdMessages.Cloudy,
    804: WeatherIdMessages.Overcast,
  };

  private weatherIconUrlMatrix: { [weatherIconUrlKey: string]: string } = {
    [`${WeatherType.Clear}-${false}`]: '/assets/images/icons/weather/clear.svg',
    [`${WeatherType.Clear}-${true}`]:
      '/assets/images/icons/weather/clear-night.svg',
    [`${WeatherType.Clouds}-${false}`]:
      '/assets/images/icons/weather/cloudy.svg',
    [`${WeatherType.Clouds}-${true}`]:
      '/assets/images/icons/weather/cloudy-night.svg',
    [`${WeatherType.Drizzle}-${false}`]:
      '/assets/images/icons/weather/drizzle.svg',
    [`${WeatherType.Drizzle}-${true}`]:
      '/assets/images/icons/weather/drizzle.svg',
    [`${WeatherType.Rain}-${false}`]: '/assets/images/icons/weather/rain.svg',
    [`${WeatherType.Rain}-${true}`]: '/assets/images/icons/weather/rain.svg',
    [`${WeatherType.Shower}-${false}`]:
      '/assets/images/icons/weather/shower.svg',
    [`${WeatherType.Shower}-${true}`]:
      '/assets/images/icons/weather/shower.svg',
    [`${WeatherType.Snow}-${false}`]: '/assets/images/icons/weather/snow.svg',
    [`${WeatherType.Snow}-${true}`]: '/assets/images/icons/weather/snow.svg',
    [`${WeatherType.Thunderstorm}-${false}`]:
      '/assets/images/icons/weather/thunder-storm.svg',
    [`${WeatherType.Thunderstorm}-${true}`]:
      '/assets/images/icons/weather/thunder-storm.svg',
  };

  public getWeatherIconUrl(
    weatherId: number | undefined,
    isNightTime: boolean = false
  ): string {
    const weatherType = this.getWeatherType(weatherId);
    const weatherKey = `${weatherType}-${isNightTime}`;

    return this.weatherIconUrlMatrix[weatherKey];
  }

  public getWeatherDescription(weatherId?: number): string | undefined {
    return weatherId ? this.weatherIdMessageMatrix[weatherId] : undefined;
  }

  private getWeatherType(weatherId?: number): WeatherType | undefined {
    return weatherId ? this.weatherIdTypeMatrix[weatherId] : undefined;
  }
}
