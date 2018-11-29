import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {
  @Input() label = 'Date';
  @Input() show = true;
  @Input() displayFormat = 'DDD MMM D, YYYY H:mm A';
  @Input() pickerFormat = this.displayFormat;
  // @Input() minDate: string = undefined;
  date: Date;

  constructor() { }

  ngOnInit() {

  }

}
