import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private sleepService: SleepService) {
    this.getSampleData();
  }

  ngOnInit() { }

  /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
  get allSleepData() {
    return SleepService.AllSleepData;
  }

  async getSampleData() {
    return await this.sleepService.getSampleData();
  }

}
