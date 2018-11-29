import * as shortid from 'shortid';

export class SleepData {
    public static AllTags: string[];
    public id: string;
    public loggedAt: Date;
    public tags: string[] = []; // user-provided tags

    constructor() {
        // Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
        this.id = shortid();
        this.loggedAt = new Date();
    }

    summaryString(): string {
        return 'Unknown sleep data';
    }

    dateString(): string {
        return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }

    date(): Date {
      return this.loggedAt;
    }
}
