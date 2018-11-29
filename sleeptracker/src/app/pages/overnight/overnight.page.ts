import { Component, OnInit, ViewChild } from '@angular/core';
import { TimepickerComponent } from 'src/app/components/timepicker/timepicker.component';
import { ActivatedRoute } from '@angular/router';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { SleepService } from 'src/app/services/sleep.service';
import { SleepData } from 'src/app/data/sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';

@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  styleUrls: ['./overnight.page.scss'],
})
export class OvernightPage implements OnInit {
  private dataIndex: number;
  private sleepData: SleepData;
  error: string = undefined;

  previous: boolean;
  next: boolean;

  constructor(private sleepService: SleepService, private route: ActivatedRoute) {
    // using + operator to parse index string to number
    this.dataIndex = +this.route.snapshot.paramMap.get('index');
  }

  ngOnInit() {
    const dataLen: number = SleepService.AllOvernightData.length;
    if (this.dataIndex < dataLen && this.dataIndex >= 0) { // dataIndex valid?
      this.sleepData = SleepService.AllOvernightData[this.dataIndex];

      if (this.dataIndex === 0) {
        this.previous = false; // no previous data
      } else {
        this.previous = true;
      }

      if (this.dataIndex >= dataLen - 1) {
        this.next = false; // no next data
      } else {
        this.next = true;
      }
    } else { // dataIndex not valid
      this.error = 'Uh oh! No sleep data [' + this.dataIndex + '] found.\nThis wasn\'t supposed to happen...';
    }

    console.log('/' + this.dataIndex + ' - previous=' + this.previous + '; next=' + this.next);

  }

  get isOvernightData() {
    if (typeof(this.sleepData) === typeof(OvernightSleepData)) { return true; }
    return false;
  }

  get isSleepinessData() {
    if (typeof(this.sleepData) === typeof(StanfordSleepinessData)) { return true; }
    return false;
  }

}
