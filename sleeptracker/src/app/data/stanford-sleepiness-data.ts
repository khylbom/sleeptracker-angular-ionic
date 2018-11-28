/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from './sleep-data';

export class StanfordSleepinessData extends SleepData {
    public static ScaleValues = [undefined, // Sleepiness scale starts at 1
    'Feeling active, vital, alert, or wide awake', // 1 fa-grin
    'Functioning at high levels, but not at peak; able to concentrate', // 2 fa-smile-beam
    'Awake, but relaxed; responsive but not fully alert', // 3 fa-smile
    'Somewhat foggy, let down', // 4 fa-meh
    'Foggy; losing interest in remaining awake; slowed down', // 5 fa-frown
    'Sleepy, woozy, fighting sleep; prefer to lie down', // 6 fa-frown-open
    'No longer fighting sleep, sleep onset soon; having dream-like thoughts']; // 7 fa-tired

    public static ScaleIcons = [undefined,
    ]
    private loggedValue: number;

    constructor(loggedValue: number, loggedAt: Date = new Date()) {
        super();
        this.loggedValue = loggedValue;
        this.loggedAt = loggedAt;
    }

    summaryString(): string {
        return this.loggedValue + ': ' + StanfordSleepinessData.ScaleValues[this.loggedValue];
    }
}
