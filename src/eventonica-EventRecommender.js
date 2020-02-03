var moment = require('moment');
moment().format();

class EventRecommender {
    constructor() {
    // All main properties should go here.
    
        this.events = [];
        this.users = [];
    
    }

    addEvent(eventName, date, category) {
    // Adds a new Event to the System
        this.events.push(new Event(eventName, date, category));
    }

    addUser(userName) {
    // Adds a new User to the System
        this.users.push(new User(userName));
    }

    // saveUserEvent(user, event){
    // // Allow users to save events to a personal Events array.
    //     // access user's personal events in this.user (user's name or User object?)
    //     function isEquivalent(user1, user2) {
    //         let user1Property = Object.getOwnPropertyNames(user1);
    //         let user2Property = Object.getOwnPropertyNames(user2);
    //         if (user1Property.length !== user2Property.length) {
    //             return false
    //         };
    //         for (let i = 0; i < user1Property.length; i++) {
    //             let propName = user1Property[i];
    //             if (user1[propName] !== user2[propName]) {
    //                 return false;
    //             }
    //         }
    //         return true
    //     }
        
    //     let correctUser = this.user.filter(userToCheck => isEquivalent(userToCheck, user));
    //     // push the event to user's personalEvents array
    //     correctUser.personalEvents.push(event);
    // }

    saveUserEvent(personName, event){
        // checks user's name and compares it with the names in this.user. not as robust since people can have the same name but it works for now
        for (let person of this.users) {
            console.log(person);
            console.log(person.userName);
            console.log(person.personalEvents)
            if (person.userName === personName) {
                person.personalEvents.push(event);
                console.log(person.personalEvents[0])
            }
        }
    }

    deleteUser(name) {
    // Deletes a User from the system
        this.users = this.users.filter(user => user.userName !== name);
    }
   
    deleteEvent(eventName) {
    // Deletes the Event from the system by the name of the event
        this.users = this.users.filter(user => user.eventName !== name);
    }

    findEventsByDate(dateObject){
    // Returns all events on a given date in this.events
        let eventsOnGivenDate = [];
        // iterate over this.events and check the date
        for (let event of this.events) {
            let eventDate = event.date;
            if (dateObject.getTime() === eventDate.getTime()) {
                eventsOnGivenDate.push(event)
            }
        }

        return eventsOnGivenDate;
    }
    
    findEventsbyCategory(category){
    // Returns all events in a given category
        console.log(`The following events are in the ${category} category:`);
        return this.events.filter(event => event.category === category);
    }
}

class Event {
    constructor(eventName, date, category) {
        this.eventName = eventName;
        this.date = date; // expect date object in input
        this.category = category;
    }

    getFormattedDate() {
        return moment(this.date).format('YYYY-MM-DD');
    }
}

class User {
    constructor(userName) {
        this.userName = userName;
        this.personalEvents = [];
    }
}


// const event1 = new Event("Event 1", new Date(2020, 03, 03), "Concert"); 
// const event2 = new Event("Event 2", new Date(2020, 04, 17), "Sport");
const event3 = new Event("Event 3", new Date(2020, 05, 25), "Art and Theater");

// const user1 = new User("Lisa");
// const user2 = new User("Bob");
// const user3 = new User("Person3");

const eventRec = new EventRecommender();
// eventRec.addEvent(event1);
eventRec.addEvent("Event 1", new Date(2020, 01, 03), "Concert");
eventRec.addEvent("Event 2", new Date(2020, 02, 03), "Concert");
eventRec.addEvent("Event 3", new Date(2020, 04, 03), "Sport");
eventRec.addEvent("Event 4", new Date(2020, 05, 03), "Art and Theater");
eventRec.addUser("Lisa");
// console.log(eventRec);
// eventRec.deleteUser("Lisa");
// console.log(eventRec);
eventRec.addUser("Bob");
// console.log(eventRec.findEventsbyCategory("Concert"));
// console.log(eventRec);
// console.log(typeof eventRec.events[0].date);
// console.log(eventRec);
eventRec.saveUserEvent("Lisa", event3)
// console.log(eventRec);
// console.log(eventRec.users[0]);
console.log(eventRec.findEventsByDate(new Date(2020, 02, 03)));

module.exports = { EventRecommender, User, Event}