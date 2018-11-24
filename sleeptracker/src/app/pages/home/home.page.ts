import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { SampleDataService } from '../../services/sample-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private sleepService: SleepService) { }

  ngOnInit() {
    this.sleepService.addSampleData();
    console.log(this.allSleepData);
  }

  /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
  get allSleepData() {
    return SleepService.AllSleepData;
  }

}
