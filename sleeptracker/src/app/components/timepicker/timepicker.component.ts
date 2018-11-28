import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Datetime } from '@ionic/angular';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {
  @Input() label = 'Date';
  @Input() show = true;
  // @Input() minDate: Date;
  // @Input() maxDate: Date;
  @Input() displayFormat = 'DDD MMM D, YYYY H:mm A';
  @Input() pickerFormat = this.displayFormat;
  @Input() initValue = new Date();
  @Input() minDate: string = undefined;
  date: Date;

  picker: Datetime;

  constructor() { }

  ngOnInit() {

  }

}
