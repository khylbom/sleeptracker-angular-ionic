--Readme document for Katelyn Hylbom, khylbom@uci.edu, 66004992--

1. How long, in hours, did it take you to complete this assignment?
    At least 50 focused, dedicated work hours.


2. What online resources did you consult when completing this assignment? (list specific URLs)
    Ionic 4 docs, Angular docs (Angular 7), w3schools.com, stackoverflow.com
    https://devdactic.com/10-ionic-problems/


3. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
    None.


4. Is there anything special we need to know in order to run your code?
    I was having some problems, and found it was actually easier to start a blank Ionic project from scratch,
    so there might be some differences from that. The biggest thing might be that my project dependencies use
    Angular 7, and the starter files were using Angular 6. I'm not sure how that might effect things, but
    everything should be saved in package-lock.json.


--Aim for no more than a few sentences for each of the following questions.--


5. Did you design your app with a particular type of user in mind? If so, whom? Did you design your app specifically for iOS or Android, or both?
    Both, but as an iPhone user myself, I was probable designing more with iOS users in mind. However, I focused on 
    the functionality for A4 and much less the actual design. I just wanted everything to work! I tried SOOOO many
    things that definitely did NOT work! Or things that seemed to almost work, but then turned out to be much more
    complicated than I ever thought - i.e., my attempt at good modularized programming design by creating my own custom
    components for various UI elements... did NOT work ultimately :( and I just implemented ionic components at the 
    page level.


6. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
    A person can use a date picker to scroll and set the times they went to bed and woke up in the morning.
    I chose to implement this method of logging first because having this capability will be desired for any log
    editing. However, this is not the only way I intend to let users log data. For A5, I hope to use native timer and/or
    alarms functionality to allow a person to 'start sleeping' (e.g. by pressing a button on main app page) that would
    log the time now as the sleep start time. The user can then press (and hold) a similar button to 'wake up' or 'stop
    sleeping', which will record that time as the sleep end time. Alternatively, a user could specify the time they wish
    to wake up, and if the app's sleep timer is not stopped manually before then, the native alarm will be used to wake the
    user, and the alarm time (or time the alarm is actually stopped, not snoozed) is recorded as the sleep end time.


7. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
    A person can open the app and use the slider on the main app page (home) to select a sleepiness scale value.
    The value will be logged when the user taps the 'Save' button. The save button redirects the user to the history page,
    which provides them with feedback/confirmation that their log entry was saved, and lets them see the new log entry in
    their history. For A5, I want to separate the two types of logging, and create a better main app page, with the logging
    and editing functionalities implemented in modals or some other way.


8. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
    Data can be viewed in list format for a quick summary view. Each log in the list can be tapped to show a more detailed
    view for that log entry. I chose to support viewing the logged data in this way because it's really hard! And while I
    would love to rig up some very cool graphs and charts in Vega-Lite or D3, I need to first implement the most basic
    view that displays the information.


9. Did you add any "extra" features, such as other data to log or changes to the styling of the app? If so, what did you add? How do these add to the experience of the app?
    I added a large quantity of sample overnight data (can be configured in SleepService to load the sample data or not).
    I found the dataset published online of an individual's personal sleep log, which was available as a csv containing
    the date, the time they went to bed, the time they woke up, the duration of the sleep, and some subjective values that
    seemed to be on a scale of 1-5 for 'how quickly to fall asleep,' 'how easy to wake up,' and 'feeling afterward.' I
    wrote a simple python script that read the csv file, and parsed the sleep start and sleep end times as datetime ISO
    strings from the date, time they went to bed, and sleep duration fields. The time they woke up could not be used, as
    only one date was provided, and often the date the person woke up was the next morning! So I had to take the date and
    time they went to sleep, add the sleep duration (in hours), and convert back to a date. I wrote all these values to
    a JSON file formatted as:
    [{
      'sleepStart': 'some ISO string',
      'sleepEnd': 'another ISO string'
     },
     { ... }, ...]
    
    Then I configured SleepService to use an http GET request to get the data as a JSON object from the local URL of the
    sample data JSON file. SleepService then logged each of the entries as a new overnight sleep. I had to deal with async
    functions and Promises, and I'm pretty certain the way I managed to get it to work is probably NOT the way you're 
    supposed to do it. But I managed to force the SleepService constructor to call AND wait for the async functions to
    finish before actually returning the constructed SleepService object.
    
    I am hoping that the dataset will be sufficiently large (contains 166 entries) to produce some nice visualizations 
    and trends... time permitting, of course.
