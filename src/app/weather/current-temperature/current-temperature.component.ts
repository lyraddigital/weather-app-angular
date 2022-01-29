import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-temperature',
  templateUrl: './current-temperature.component.html',
  styleUrls: ['./current-temperature.component.scss'],
})
export class CurrentTemperatureComponent {
  @Input() temp!: number;
  @Input() weatherId!: number;
}
