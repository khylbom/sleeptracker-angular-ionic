import { Component, OnInit } from '@angular/core';
import { SleepService } from 'src/app/services/sleep.service';
import { Router } from '@angular/router';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  sleepStart: Date;
  sleepEnd: Date;
  sleepinessScore: number;

  constructor(private sleepService: SleepService, private router: Router) { }

  ngOnInit() {
  }

  onOvernightSave() {
    if (!this.sleepStart || !this.sleepEnd) {
      console.log('Error: sleep start and end required');
      return;
    }
    this.sleepService.logOvernightData(new OvernightSleepData(this.sleepStart, this.sleepEnd));
  }

  onSaveSleepiness() {
    if (!this.sleepinessScore) {
      console.log('Error: no sleepiness score');
      return;
    }
    this.sleepService.logSleepinessData(new StanfordSleepinessData(this.sleepinessScore));
    this.router.navigateByUrl('/history');
  }

  onCancel() {
    console.log('Cancel clicked');
  }

  onAdd() {
    console.log('Add clicked');
  }


}
