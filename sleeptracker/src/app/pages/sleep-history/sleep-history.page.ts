import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { OvernightSleepData } from '../../data/overnight-sleep-data';

@Component({
  selector: 'app-sleep-history',
  templateUrl: './sleep-history.page.html',
  styleUrls: ['./sleep-history.page.scss'],
})
export class SleepHistoryPage implements OnInit {

  constructor(public sleepService: SleepService) { }

  ngOnInit() {
  }

  /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
  get allSleepData() {
    return SleepService.AllSleepData;
  }

  get allOvernightSleepData() {
    return SleepService.AllOvernightData;
  }

}
