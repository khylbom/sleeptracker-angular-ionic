import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../../data/overnight-sleep-data';

@Component({
  selector: 'app-edit-overnight-data',
  templateUrl: './edit-overnight-data.component.html',
  styleUrls: ['./edit-overnight-data.component.scss']
})
export class EditOvernightDataComponent implements OnInit {
  private overnightData: OvernightSleepData = undefined;
  private sleepStart: Date;
  private sleepEnd: Date;

  constructor(overnightData?: OvernightSleepData) { }

  ngOnInit() {
  }

}
