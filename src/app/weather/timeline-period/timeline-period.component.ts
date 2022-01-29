import { Component, Input } from '@angular/core';

import { TimelinePeriod } from '../models/timeline-period';

@Component({
  selector: 'app-timeline-period',
  templateUrl: './timeline-period.component.html',
  styleUrls: ['./timeline-period.component.scss'],
})
export class TimelinePeriodComponent {
  @Input() period?: TimelinePeriod;
}
