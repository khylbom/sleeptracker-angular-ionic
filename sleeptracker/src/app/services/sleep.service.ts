import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { HttpClient } from '@angular/common/http';

const sample_data_url = 'assets/json/sample-overnight-data.min.json';

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
    if (SleepService.LoadSampleData) {
      SleepService.LoadSampleData = this.addSavedData(sample_data_url);
    } else if (SleepService.LoadDefaultData) {
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

  public editOvernightSleepData(sleepStart: Date, sleepEnd: Date, id?: string) {
    if (id) {
      this.removeData(id);
    }
    this.logOvernightData(new OvernightSleepData(sleepStart, sleepEnd));
  }

  public editSleepinessData(loggedValue: number, loggedAt?: Date, id?: string) {
    if (id) {
      this.removeData(id);
    }
    this.logSleepinessData(new StanfordSleepinessData(loggedValue, loggedAt));
  }

  // -------------------------- * helper functions * --------------------------

  // return the index of the data item by id in the data array
  findDataIndex(id: string, data: SleepData[]) {
    return data.findIndex(item => item.id === id);
  }

  // delete the data item at index from the data array
  deleteDataItem(index: number, data: SleepData[]) {
    try {
      delete data[index];
    } catch (error) {
      console.error(error);
    }
  }

  // remove the data item by id from SleepService and return the deleted item
  removeData(id: string): SleepData {
    let index = this.findDataIndex(id, SleepService.AllSleepData);
    if (index < 0) {
      console.log('error removing data');
      return undefined;
    }
    const item = SleepService.AllSleepData[index];
    this.deleteDataItem(index, SleepService.AllSleepData);
    if (typeof(item) === typeof(OvernightSleepData)) {
      index = this.findDataIndex(id, SleepService.AllOvernightData);
      this.deleteDataItem(index, SleepService.AllOvernightData);
    } else if (typeof(item) === typeof(StanfordSleepinessData)) {
      index = this.findDataIndex(id, SleepService.AllSleepinessData);
      this.deleteDataItem(index, SleepService.AllSleepinessData);
    } else {
      console.log('error deleting data: could not determine type of data');
    }
    return item;
  }

  // janky force constructor to wait for data to be loaded and logged
  private addSavedData(url): boolean {
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

  get json(): string {
    return JSON.stringify(SleepService.AllSleepData);
  }

  // private addSampleData(): Promise<boolean> {
  //   return new Promise<boolean>((resolve, reject) => {
  //     try {
  //       this.http.get(sample_overnight_data_url)
  //           .toPromise()
  //           .then(data => data as string[])
  //           .then(items => {
  //             items.forEach(element => {
  //               const sleepStart = new Date(element['sleepStart']);
  //               const sleepEnd = new Date(element['sleepEnd']);
  //               this.logOvernightData(new OvernightSleepData(sleepStart, sleepEnd));
  //             });
  //           });
  //     } catch (error) {
  //       console.log(error);
  //       reject(error);
  //     }
  //     SleepService.LoadSampleData = false;
  //     resolve(true);
  //   });
  // }

  // public async getSampleData() {
  //   if (SleepService.LoadSampleData) {
  //     await this.addSampleData().then(() => {
  //       return SleepService.AllSleepData;
  //     });
  //   }
  //   return SleepService.AllSleepData;
  // }
}
