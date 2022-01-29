import { Component } from '@angular/core';
import { TimelinePeriod } from '../models/timeline-period';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  periods: Array<TimelinePeriod> = [
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
    {
      weatherId: 1,
      temp: 3,
      time: new Date(),
    },
  ];
}
