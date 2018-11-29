import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OvernightPage } from './overnight.page';
import { SleepinessPickerComponent } from 'src/app/components/sleepiness-picker/sleepiness-picker.component';
import { TabBarComponent } from 'src/app/components/tab-bar/tab-bar.component';
import { TimepickerComponent } from 'src/app/components/timepicker/timepicker.component';

const routes: Routes = [
  {
    path: '',
    component: OvernightPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OvernightPage,
    SleepinessPickerComponent,
    TabBarComponent,
    TimepickerComponent
  ]
})
export class OvernightPageModule {}
