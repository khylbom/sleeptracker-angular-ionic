import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {
  @Input() label = 'Date';
  @Input() show = true;
  @Input() icon = 'calendar';
  @Input() displayFormat = 'DDD MMM D, YYYY H:mm A';
  @Input() pickerFormat = this.displayFormat;
  @Input() initDate = new Date();
  @Input() minDate: string = undefined;
  @Input() placeholder = 'Tap to select a date';

  date: Date;

  constructor() { }

  ngOnInit() {
  }

}
