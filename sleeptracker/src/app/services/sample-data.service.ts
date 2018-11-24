import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from './sleep.service';

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {
  public static OvernightData: OvernightSleepData[] = [];
  private static ArrayData: string[];
  private static LoadSampleData = true;
  private static DataUrl = 'assets/json/sample-data.min.json';

  constructor(private http: HttpClient) { }

  private async loadSampleData(): Promise<string[]> {
    try {
      const data = await this.http.get(SampleDataService.DataUrl).toPromise();
      console.log('asyncLoadSampleData: ' + data);
      return data as string[];
    } catch (error) {
      console.log(error);
    }
  }

  private async getOvernightData(): Promise<OvernightSleepData[]> {
    try {
      const data = await this.loadSampleData();
      console.log('getOvernightData: ' + data);
      return new Promise<OvernightSleepData[]>(resolve => {
        const overnightData: OvernightSleepData[] = [];
        data.forEach(item => {
          overnightData.push(this.parseOvernightSleepData(item));
        });
        console.log('returning ' + overnightData.length + ' overnight sleep data');
        resolve(overnightData);
      });
    } catch (error) { console.log(error); }
  }

  async logSampleData(sleepService: SleepService) {
    const data = await this.getOvernightData();
    return new Promise<void>(resolve => {
      data.forEach(item => {
        sleepService.logOvernightData(item);
      });
      resolve();
    });
  }

  private parseOvernightSleepData(item: string) {
    const date: number[] = item['date'].split('.');
    const time: number[] = item['sleepStart'].split(':');
    const sleepStart: Date = new Date(date[2], date[1], date[0], time[0], time[1]);
    const duration: number = item['sleepDuration'];
    return new OvernightSleepData(sleepStart, this.getSleepEnd(sleepStart, duration));
  }

  private getSleepEnd(sleepStart: Date, duration: number): Date {
    const sleepEnd: Date = new Date(sleepStart);
    const hours: number = Math.round(duration);
    const minutes: number = (duration - hours) * 60;
    sleepEnd.setHours(sleepStart.getHours() + hours, sleepStart.getMinutes() + minutes);
    return sleepEnd;
  }

}
