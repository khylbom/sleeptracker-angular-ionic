import { Injectable } from '@angular/core';
import { SleepService } from './sleep.service';
import { HttpClient } from '@angular/common/http';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import shortid = require('shortid');

const sample_data_url = 'assets/json/sample-overnight-data.min.json';
const user_data_url = 'assets/json/user-data.min.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static IsLoaded = false;

  constructor(private http: HttpClient, private sleepService: SleepService) {
    if (!DataService.IsLoaded) {
      DataService.IsLoaded = this.load(sample_data_url);
    }
  }

  // janky force constructor to wait for data to be loaded and logged
  private load(url): boolean {
    const promise = new Promise<boolean>(async (resolve, reject) => {
      await this.loadDataFromUrl(url)
        .then(() => {
          resolve(true);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
    return true;
  }

  private loadDataFromUrl(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get(url)
        .toPromise()
        .then(res => res as string[])
        .then(arr => {
          arr.forEach(item => {
            const sleepStart = new Date(item['sleepStart']);
            const sleepEnd = new Date(item['sleepEnd']);
            this.sleepService.logOvernightData(new OvernightSleepData(sleepStart, sleepEnd));
          });
        })
        .then(() => {
          console.log('loaded ' + SleepService.AllSleepData.length + ' from ' + url);
          resolve(true);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }

  get json(): string {
    return JSON.stringify(SleepService.AllSleepData);
  }
}
