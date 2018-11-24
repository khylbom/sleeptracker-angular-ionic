import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';

@Component({
  selector: 'app-sleep-history',
  templateUrl: './sleep-history.page.html',
  styleUrls: ['./sleep-history.page.scss'],
})
export class SleepHistoryPage implements OnInit {

  constructor(private sleepService: SleepService) { }

  ngOnInit() {
    this.getSampleData();
  }

  /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
  get allSleepData() {
    return SleepService.AllSleepData;
  }

  get allOvernightSleepData() {
    return SleepService.AllOvernightData;
  }

  async getSampleData() {
    return await this.sleepService.getSampleData();
  }

}
