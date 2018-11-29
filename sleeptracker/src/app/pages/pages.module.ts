import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerComponent } from '../components/timepicker/timepicker.component';
import { FormsModule } from '@angular/forms';
import { SleepinessPickerComponent } from '../components/sleepiness-picker/sleepiness-picker.component';
import { IonicModule } from '@ionic/angular';
import { TabBarComponent } from '../components/tab-bar/tab-bar.component';

@NgModule({
  declarations: [
    SleepinessPickerComponent,
    TabBarComponent,
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
    TabBarComponent,
    TimepickerComponent
  ]
})
export class PagesModule { }
