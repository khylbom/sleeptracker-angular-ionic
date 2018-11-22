import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(public sleepService: SleepService) {

    }

    ngOnInit() {
        console.log(this.allSleepData);
    }

    /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
    get allSleepData() {
        return SleepService.AllSleepData;
    }
}
