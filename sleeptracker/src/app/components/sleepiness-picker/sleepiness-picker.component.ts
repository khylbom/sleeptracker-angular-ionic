import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleepiness-picker',
  templateUrl: './sleepiness-picker.component.html',
  styleUrls: ['./sleepiness-picker.component.scss']
})
export class SleepinessPickerComponent implements OnInit {
  value = 1;
  scaleValue: string;

  constructor() { }

  ngOnInit() {
    this.updateScaleValue();
  }

  updateScaleValue() {
    this.scaleValue = StanfordSleepinessData.ScaleValues[this.value];
  }

}
