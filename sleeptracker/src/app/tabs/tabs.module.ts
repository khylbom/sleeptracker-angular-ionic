import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';

import { HomePageModule } from '../pages/home/home.module';
import { HistoryPageModule } from '../pages/history/history.module';
import { OvernightPageModule } from '../pages/overnight/overnight.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    HistoryPageModule,
    OvernightPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
