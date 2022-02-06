import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public roundNumberOrZero(value: number | undefined): number {
    return Math.round(this.zeroIfUndefined(value));
  }

  public zeroIfUndefined(value?: number): number {
    return value || 0;
  }

  public convertEpochSecondsToDate(epochSeconds?: number): Date {
    return new Date(this.zeroIfUndefined(epochSeconds) * 1000);
  }
}
