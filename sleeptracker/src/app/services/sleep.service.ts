import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { HttpClient } from '@angular/common/http';

const sample_overnight_data_url = 'assets/json/sample-overnight-data.min.json';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private static LoadSampleData = true;
  private static LoadDefaultData = false;
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  constructor(private http: HttpClient) {
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

  private addSampleData() {
    return new Promise<void>(resolve => {
      try {
        this.http.get(sample_overnight_data_url)
            .toPromise()
            .then(data => data as string[])
            .then(items => {
              items.forEach(element => {
                const sleepStart = new Date(element['sleepStart']);
                const sleepEnd = new Date(element['sleepEnd']);
                this.logOvernightData(new OvernightSleepData(sleepStart, sleepEnd));
              });
            });
      } catch (error) {
        console.log(error);
      }
      SleepService.LoadSampleData = false;
      resolve();
    });
  }

  public async getSampleData() {
    if (SleepService.LoadSampleData) {
      await this.addSampleData().then(() => {
        return SleepService.AllSleepData;
      });
    }
    return SleepService.AllSleepData;
  }
}
