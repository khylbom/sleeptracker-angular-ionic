import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faGrin, faSmileBeam, faSmile, faMeh, faFrown, faFrownOpen, faTired, IconDefinition } from '@fortawesome/free-regular-svg-icons';

import { SleepService } from 'src/app/services/sleep.service';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private scaleIcons = [ undefined, faGrin, faSmileBeam, faSmile, faMeh, faFrown, faFrownOpen, faTired];
  sleepStart: Date;
  sleepEnd: Date;
  sleepinessValue = 1;
  sleepinessValueText: string;
  sleepinessValueIcon: IconDefinition;
  sleepinessValueColor: string;

  constructor(public sleepService: SleepService, private router: Router) { }

  ngOnInit() {
    this.updateSleepinessData();
  }

  logOvernightData() {
    // I don't know why we have to reinitialize, but won't work unless we do it this way
    this.sleepStart = new Date(this.sleepStart.toISOString());
    this.sleepEnd = new Date(this.sleepEnd.toISOString());

    // TODO: Something funky happens with the time zones. Input is 1 hour behind actual log entry
    this.sleepService.logOvernightData(new OvernightSleepData(this.sleepStart, this.sleepEnd));
    this.router.navigateByUrl('/history');
  }

  logSleepinessData() {
    this.sleepService.logSleepinessData(new StanfordSleepinessData(this.sleepinessValue));
    this.router.navigateByUrl('/history');
  }

  updateSleepinessData() {
    this.sleepinessValueText = StanfordSleepinessData.ScaleValues[this.sleepinessValue];
    this.sleepinessValueIcon = this.scaleIcons[this.sleepinessValue];
    this.sleepinessValueColor = StanfordSleepinessData.ScaleColors[this.sleepinessValue];
    console.log(this.sleepinessValueColor);
  }

  get scaleIconStyleString(): string {
    return 'color: ' + this.sleepinessValueColor + ';';
  }

}
