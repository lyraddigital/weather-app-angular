import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendlyDatePipe } from './pipes/date/friendly-date.pipe';

@NgModule({
  declarations: [FriendlyDatePipe],
  imports: [CommonModule],
  exports: [FriendlyDatePipe],
})
export class SharedModule {}
