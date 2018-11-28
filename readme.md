<img align="right" width="100" height="100" src="src/assets/icon/favicon.png">

a4-sleeptracker-ionic
=====================

> Katelyn Hylbom,
> khylbom@uci.edu,
> 66004992

<!-- toc -->

- [Online Resources](#online-resources)
  - [Using FontAwesome 5 in Angular and Ionic](#using-fontawesome-5-in-angular-and-ionic)
    - [Installation](#installation)
    - [Usage](#usage)

### How long, in hours, did it take you to complete this assignment?
This assignment took me approximately 50 hours of focused, dedicated work time.

## Online Resources

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


 


