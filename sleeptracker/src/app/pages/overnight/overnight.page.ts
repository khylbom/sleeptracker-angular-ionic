import { Component, OnInit, ViewChild } from '@angular/core';
import { TimepickerComponent } from 'src/app/components/timepicker/timepicker.component';
import { ActivatedRoute } from '@angular/router';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  styleUrls: ['./overnight.page.scss'],
})
export class OvernightPage implements OnInit {

  constructor(private sleepService: SleepService) { }

  ngOnInit() {
  }

  get overnightData(): OvernightSleepData {
    return SleepService.AllOvernightData[0];
  }

}
