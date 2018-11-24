import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
    protected sleepStart: Date;
    protected sleepEnd: Date;

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
        return 'Night of ' + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }
}
