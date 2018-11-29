import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
    private sleepStart: Date;
    private sleepEnd: Date;

    constructor(sleepStart: Date, sleepEnd: Date) {
        super();
        this.sleepStart = sleepStart;
        this.sleepEnd = sleepEnd;
    }

    summaryString(): string {
        const sleepStart_ms = this.sleepStart.getTime();
        const sleepEnd_ms = this.sleepEnd.getTime();

        // Calculate the difference in milliseconds
        const difference_ms = sleepEnd_ms - sleepStart_ms;

        // Convert to hours and minutes
        return Math.floor(difference_ms / (1000 * 60 * 60)) + ' hours, ' + Math.floor(difference_ms / (1000 * 60) % 60) + ' minutes.';
    }

    dateString(): string {
        return this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }

    date(): Date {
      return this.sleepStart;
    }

    shortDate(): string {
      return this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'});
    }

    sleepStartString(): string {
      return this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric',
                                                           hour: 'numeric', minute: 'numeric'});
    }

    sleepStartTime(): string {
      return this.sleepStart.toLocaleDateString('en-US', { weekday: 'long'}) +
        ' ' + this.sleepStart.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
    }

    sleepEndTime(): string {
      return this.sleepEnd.toLocaleDateString('en-US', { weekday: 'long'}) +
        ' ' + this.sleepEnd.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
    }
}
