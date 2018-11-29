import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TimepickerComponent } from 'src/app/components/timepicker/timepicker.component';
import { SleepinessPickerComponent } from 'src/app/components/sleepiness-picker/sleepiness-picker.component';
import { TabBarComponent } from 'src/app/components/tab-bar/tab-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    TabBarComponent,
    TimepickerComponent,
    SleepinessPickerComponent
  ]
})
export class HomePageModule {}
