import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({ name: 'friendlyDate' })
export class FriendlyDatePipe implements PipeTransform {
  public transform(date: Date): string {
    const day = date.getDate();
    const dayName = formatDate(date, 'EEEE', 'en-AU');
    const monthName = formatDate(date, 'LLLL', 'en-AU');
    let dayString = day.toString();

    if (day === 1 || day === 21 || day === 31) {
      dayString += 'st';
    } else if (day === 2 || day === 22) {
      dayString += 'nd';
    } else if (day === 3 || day === 23) {
      dayString += 'rd';
    } else {
      dayString += 'th';
    }

    return `${dayName} ${dayString} ${monthName}`;
  }
}
