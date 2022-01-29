import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendlyDatePipe } from './pipes/date/friendly-date.pipe';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [FriendlyDatePipe, LoaderComponent],
  imports: [CommonModule],
  exports: [FriendlyDatePipe, LoaderComponent],
})
export class SharedModule {}
