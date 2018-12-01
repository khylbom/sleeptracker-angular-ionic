import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/app/services/sleep.service';
import { SleepData } from 'src/app/data/sleep-data';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  private static AllSleepDataSorted: SleepData[] = [];

  constructor(private sleepService: SleepService) { }

  ngOnInit() {
    // HistoryPage.AllSleepDataSorted = SleepService.AllSleepData.slice().reverse();
  }

  // use slice() to make a copy of the array and leave original unmodified
  get allSleepData() {
    return SleepService.AllSleepData.slice().reverse();
  }

}
