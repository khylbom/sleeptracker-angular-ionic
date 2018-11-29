import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(private sleepService: SleepService) { }

  ngOnInit() {
  }

  get allSleepData() {
    return this.sleepService.allSleepDataSorted;
  }

}
