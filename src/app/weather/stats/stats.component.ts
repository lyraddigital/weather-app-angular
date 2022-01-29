import { Component, Input } from '@angular/core';

import { Statistics } from '../models/statistics';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @Input() statistics?: Statistics;
}
