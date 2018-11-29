<img align="right" width="100" height="100" src="sleeptracker/src/assets/icon/favicon.png">

a4-sleeptracker-ionic
=====================

> Katelyn Hylbom,
> khylbom@uci.edu,
> 66004992

<!-- toc -->
- [Design Considerations](#design-considerations)
  - [Target Platform and Audience](#target-platform-and-audience)
  - [Features and Functionality](#features-and-functionality)
    - [Logging Overnight Data](#logging-overnight-data)
    - [Logging Sleepiness During the Day](#logging-sleepiness-during-the-day)
    - [Viewing Logged Data](#viewing-logged-data)
    - ["Extra" Features](#%22extra%22-features)
- [Online Resources](#online-resources)
  - [10 Common Ionic Problems & Error Messages (And How to Fix Them)](#10-common-ionic-problems--error-messages-and-how-to-fix-them)
  - [Using FontAwesome 5 in Angular and Ionic](#using-fontawesome-5-in-angular-and-ionic)
    - [Installation](#installation)
    - [Usage](#usage)

#### 1. How long, in hours, did it take you to complete this assignment?
This assignment took me approximately 50 hours of focused, dedicated work time.

#### 2. What online resources did you consult when completing this assignment?
See [Online Resources](#online-resources) section below.

#### 3. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
I neither consulted and discussed with any other classmates or other individuals. I muddled through this all by my lonesome.

#### 4. Is there anything special we need to know in order to run your code?
At some point I diverged away from the original sample code, and started my own blank Ionic project:
```sh
$ ionic start a4-sleeptracker-ionic blank --type=angular --cordova
```
From there, I used `ionic g` to generate the components, modules and pages I needed, including recreating the ones provided to us in the sample code.

As a result, I ended up with an Ionic 4 / Angular 7 project (instead of Angular 6). This should all be reflected in the dependencies provided in `sleeptracker/package.json`.

I am not sure how this might change how would need to run the code, but I thought it was worth mentioning in case you run into minor difficulties and are wondering why on earth I managed to end up with an Angular 7 project.

#### 5. Did you design your app with a particular type of user in mind? If so, whom? Did you design your app specifically for iOS or Android, or both?
See [Target Platform and Audience](#target-platform-and-audience) section below.

## Design Considerations

### Target Platform and Audience
I designed for both Android and iOS, but as an iPhone user myself, I was probably designing more with iOS users in mind.

However, for A4, I focused almost entirely on the functionality for and much less the actual design, at least from an implementation perspective. I have worked out designs with sketches and mockups, but most of this work is not yet evident in the app as is.

### Features and Functionality

#### Logging Overnight Data
Overnight data can be logged by selecting what time you went to bed and what time 
you woke up using scrolling date pickers. The data is logged when the user taps
the "Save" button beneath the date pickers.

I chose to implement this method of logging first because having this capability
will be desired for any log editing, and the goal for A4 was to get an MPV
(minimum viable product) ready for submission and feedback.

**A5 Wishlist - Overnight Logging:**
- Use native timer and/or alarms to allow a person to record and log overnight sleep
data by simply tapping a single button to 'start sleeping' and then again to 
'stop sleeping' or 'wake up' (long tap-and-hold, or slide up/down to avoid 
accidentally interrupting the timer and log data).
- Allow users to specify a bedtime and/or set an alarm to wake up at a certain time,
and integrate native notifications and sounds/alarms to do things like remind 
the user that it's time for bed in XX minutes.
- If using the sleep timer + in-app alarm to wake up, the data will be automatically
logged from the time the user activates the sleep timer to the time the user 
turns off the alarm. This very easy method of logging will hopefully make it easier
for users to log their sleeps both quicker and more often.

#### Logging Sleepiness During the Day
A person can open the app and use the a horizontal range slider to select a sleepiness
scale value. The scale value text (+ emoji and color) is updated as the user slides to input their sleepiness data.

*A5 Wishlist - Sleepiness Logger*
- Separate log views for overnight and sleepiness data.
- User can select the time they wish to log the sleepiness score for, rather than
using the current time as the time for the new log entry.
- Editing functionalities implemented as modals or using some other responsive
design views.

Tapping a "Save" button redirects the user to the History page, which displays the
data
The data is logged when the user taps the "Save" button beneath
the sleepiness scale range slider. 
The value will be logged when the user taps the 'Save' button. The save button redirects the user to the history page,
which provides them with feedback/confirmation that their log entry was saved, and lets them see the new log entry in
their history. For A5, I want to separate the two types of logging, and create a better main app page, with the logging
and editing functionalities implemented in modals or some other way.

#### Viewing Logged Data
A person can view their log history in list format (sorted with most recent log
entries at the top). Tapping on a log item opens a more detailed view for the log,
and the ability to edit the log data.

The History page can be viewed by tapping a tab at the bottom of the app view.
Additionally, after a user taps a "Save" button to log a new data entry, they
are redicted to the History page. This is a simple way to provide them with 
instand feedback and confirmation that their log entry was saved, and allows
them to review the new logged data, as well as see it in the context of their other
recent data.

I chose to support viewing the logged data in this way because this is really hard!
While I would love to rig up some very awesome full-color graphs and charts in
Vega-Lite or D3, this first simple implementation was required to simply present
the data and make it available.

#### "Extra" Features
I added a large quantity of sample overnight data (can be configured in SleepService to load the sample data or not). I found the opensource dataset published online of an individual's personal sleep log, which was available as a csv containing the date, the time they went to bed, the time they woke up, the duration of the sleep, and some subjective values that seemed to be on a scale of 1-5 for 'how quickly to fall asleep,' 'how easy to wake up,' and 'feeling afterward.'

I wrote a simple python script that read the csv file, and parsed the sleep start and sleep end times as datetime ISO strings from the date, time they went to bed, and sleep duration fields. The time they woke up could not be used, as only a single date was provided, and often the date the person woke up was the next morning! So I had to take the date and time they went to sleep, add the sleep duration (in hours), and convert back to a date. I wrote all these values to
a JSON file:
```json
[{
  "sleepStart": "YYYY-MM-DD HH:mm",
  "sleepEnd": "YYYY-MM-DD HH:mm"
}, {...}, ...]
```

I configured `SleepService` to use an http `GET` request to load the data from
the local URL for the sample data as a JSON object. SleepService then logs each of the entries as a new overnight sleep. The implementation required working with
asynchronous functions and Promises, and I'm pretty certain the way I managed to get it to work is probably NOT the way you're supposed to do it and likely is a
very BAD way to do it. But I managed to force the SleepService constructor to call AND wait for the async functions to finish before actually returning the constructed SleepService object.

I am hoping that the dataset will be sufficiently large (contains 166 entries) to produce some nice visualizations and trends... time permitting, of course.

## Online Resources

### 10 Common Ionic Problems & Error Messages (And How to Fix Them)
Article from https://devdactic.com on January 16, 2018 by Simon
> https://devdactic.com/10-ionic-problems/

This article didn't always help me fix everything, but at least it gave me validation and reassurance that at least
the errors and problems I kept running into were fairly normal!

### Using FontAwesome 5 in Angular and Ionic

**Official Angular Font Awesome component:** [API docs](https://www.npmjs.com/package/@fortawesome/angular-fontawesome), [GitHub project](https://github.com/FortAwesome/angular-fontawesome)

> [angular-fontawesome](https://fontawesome.com/how-to-use/on-the-web/using-with/angular)
  
#### Installation

  ```sh
  $ npm install --save @fortawesome/fontawesome-svg-core
  $ npm install --save @fortawesome/free-regular-svg-icons
  $ npm install --save @fortawesome/angular-fontawesome
  ```
#### Usage

**First, use** `<fa-icon>` **in template:**

`src/app/app.component.html`
```html
<div style="text-align:center">
  <fa-icon [icon]="faSmile"></fa-icon>
</div>
```

**Then asign the** `faSmile` **member:**

`src/app/app.component.ts`
```ts
import { Component } from '@angular/core';
import { faSmile } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  faSmile = faSmile;
}
```

**Lastly, import the component:**

`src/app/app.module.ts`
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


 


