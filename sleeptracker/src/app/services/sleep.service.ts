import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private static LoadDefaultData = true;
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  constructor() {
    if (SleepService.LoadDefaultData) {
      this.addDefaultData();
      SleepService.LoadDefaultData = false;
    }
  }

  private addDefaultData() {
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 01:03:00'), new Date('November 12, 2018 09:25:00')));
    this.logSleepinessData(new StanfordSleepinessData(4, new Date('November 12, 2018 14:38:00')));
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 23:11:00'), new Date('November 13, 2018 08:03:00')));
  }

  public logOvernightData(data) {
    SleepService.AllSleepData.push(data);
    SleepService.AllOvernightData.push(data);
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
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

  public sort(all = true, overnight = true, sleepiness = true) {
    if (all) {
      SleepService.AllSleepData = SleepService.AllSleepData.sort(this.sortByDate).reverse();
    }
    if (overnight || all) {
      SleepService.AllOvernightData = SleepService.AllOvernightData.sort(this.sortByDate).reverse();
    }
    if (sleepiness || all) {
      SleepService.AllSleepinessData = SleepService.AllSleepinessData.sort(this.sortByDate).reverse();
    }
  }

  private sortSleepData(arr: SleepData[]) {
   arr.sort((a, b) => {
      const diff_ms = a.loggedAt.getMilliseconds() - b.loggedAt.getMilliseconds();
      if (diff_ms < 0) { return -1; }
      if (diff_ms > 0) { return 1; }
      return 0;
    });
  }

  private sortByDate(a: SleepData, b: SleepData) {
    const diff_ms = a.date().getMilliseconds() - b.date().getMilliseconds();
    if (diff_ms < 0) { return -1; } // a is more recent
    if (diff_ms > 0) { return 1; }  // b is more recent
    return 0; // dates the same
  }
}
