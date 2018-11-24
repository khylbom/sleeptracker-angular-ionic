import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { SleepData } from '../../data/sleep-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private sleepService: SleepService) {
    this.getSampleData();
  }

  ngOnInit() {
    console.log('HomePage has allSleepData: ' + this.allSleepData);
  }

  /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
  get allSleepData() {
    return SleepService.AllSleepData;
  }

  async getSampleData() {
    return await this.sleepService.getSampleData();
  }

}
