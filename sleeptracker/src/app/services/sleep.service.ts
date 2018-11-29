import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

const sample_data_url = 'assets/json/sample_overnight_data.min.json';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private static LoadSampleData = true;
  private static LoadDefaultData = true;
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  constructor(private http: HttpClient) {
    if (SleepService.LoadSampleData) {
      if (this.addSampleData(sample_data_url)) {
        SleepService.LoadSampleData = false;
        SleepService.LoadDefaultData = false;
      } else {
        console.warn('Sleep service could not load sample data');
      }
    }
    if (SleepService.LoadDefaultData) {
      this.addDefaultData();
      SleepService.LoadDefaultData = false;
    }
    // sort all the data once, then just maintain sorted order
    this.sortAll();
  }

  private addDefaultData() {
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 01:03:00'), new Date('November 12, 2018 09:25:00')));
    this.logSleepinessData(new StanfordSleepinessData(4, new Date('November 12, 2018 14:38:00')));
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 23:11:00'), new Date('November 13, 2018 08:03:00')));
  }

  public logOvernightData(sleepData: OvernightSleepData) {
    // this.addMaintainSort(sleepData, SleepService.AllSleepData);
    // this.addMaintainSort(sleepData, SleepService.AllOvernightData);
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    // this.addMaintainSort(sleepData, SleepService.AllSleepData);
    // this.addMaintainSort(sleepData, SleepService.AllSleepinessData);
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
  }

  // janky method to force constructor to wait for async data processing
  private addSampleData(url: string): boolean {
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

  // load sleep data as json, then parse and log
  private loadDataFromUrl(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get(url)
        .toPromise()
        .then(res => res as string[])
        .then(arr => {
          arr.forEach(item => {
            const sleepStart = new Date(item['sleepStart']);
            const sleepEnd = new Date(item['sleepEnd']);
            this.logOvernightData(new OvernightSleepData(sleepStart, sleepEnd));
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

  public find(id: string): OvernightSleepData | StanfordSleepinessData | undefined {
    let found: OvernightSleepData | StanfordSleepinessData;
    found = SleepService.AllOvernightData.find(data => data.id === id);
    if (found === undefined) {
      found = SleepService.AllSleepinessData.find(data => data.id === id);
    }
    return found;
  }

  public forDate(date: Date) {
    const entries: SleepData[] = [];
    SleepService.AllSleepData.forEach(item => {
      const found = SleepService.AllSleepData.find(entry => {
        if (date.getFullYear() === entry.date().getFullYear()
            && date.getMonth() === entry.date().getMonth()
            && date.getDate() === entry.date().getDate()) {
              return true;
        }
        return false;
      });
      if (found) {
        entries.push(found);
      }
    });
  }

  private loggedOnSameDay(a: SleepData, b: SleepData): boolean {
    const date1 = a.date();
    const date2 = b.date();
    return (date1.getFullYear() === date2.getFullYear()
            && date1.getMonth() === date2.getMonth()
            && date1.getDate() === date2.getDate());
  }

  // maintain the arrays in sorted order beginning with most recent logs
  private sortAll() {
    SleepService.AllSleepData = SleepService.AllSleepData.sort(this.sortByDate);
    SleepService.AllOvernightData = SleepService.AllOvernightData.sort(this.sortByDate);
    SleepService.AllSleepinessData = SleepService.AllSleepinessData.sort(this.sortByDate);
  }

  private sortByDate(a: SleepData, b: SleepData) {
    const diff_ms = a.date().getMilliseconds() - b.date().getMilliseconds();
    if (diff_ms < 0) { return -1; } // a is more recent
    if (diff_ms > 0) { return 1; }  // b is more recent
    return 0; // dates the same
  }

  private addMaintainSort(sleepData: SleepData, arr: SleepData[]) {
    let index = 0;
    while (index < arr.length) {
      // go through data array until we find the first entry older than this
      if (this.sortByDate(arr[index], sleepData) < 0) {
        index++;
      } else {
        if (index === 0) { // first element was older
          arr.unshift(sleepData); // insert at start of array
          return;
        }

        const arrHead = arr.slice(0, index - 1); // more recent elements
        const arrTail = arr.slice(index, arr.length - 1); // older elements
        arr = arrHead.concat(sleepData, arrTail);
      }
    }
  }
}
