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
    return SleepService.AllSleepData.sort((a, b) => {
      const diff_ms = a.loggedAt.getMilliseconds() - b.loggedAt.getMilliseconds();
      if (diff_ms < 0) { return -1; }
      if (diff_ms > 0) { return 1; }
      return 0;
    });
  }

}
