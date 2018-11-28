import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerComponent } from '../components/timepicker/timepicker.component';
import { FormsModule } from '@angular/forms';
import { SleepinessPickerComponent } from '../components/sleepiness-picker/sleepiness-picker.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    SleepinessPickerComponent,
    TimepickerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    SleepinessPickerComponent,
    TimepickerComponent
  ]
})
export class PagesModule { }
