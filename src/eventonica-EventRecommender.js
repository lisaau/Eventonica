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

    saveUserEvent(personObject, eventObject){
        // checks user's name and compares it with the names in this.user. not as robust since people can have the same name but it works for now
        for (let person of this.users) {
            // if the user already exists in this.users
            if (person.userName === personObject.userName) {
                person.personalEvents.push(eventObject);
            } else {
                return "Please add this user first before saving an event."
            }
        }
    }

    deleteUser(name) {
    // Deletes a User from the system
        this.users = this.users.filter(user => user.userName !== name);
    }
   
    deleteEvent(title) {
    // Deletes the Event from the system by the name of the event
        this.events = this.events.filter(event => event.eventName !== title);
        // return this.users;
    }

    findEventsByDate(dateObject){
    // Returns all events on a given date in this.events
        let eventsOnGivenDate = [];
        // iterate over this.events and check the date
        for (let event of this.events) {
            let eventDate = event.date;
            if (dateObject.getTime() === eventDate.getTime()) {
                eventsOnGivenDate.push(event);
            }
        }

        return eventsOnGivenDate;
    }
    
    findEventsbyCategory(category){
    // Returns all events in a given category
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

module.exports = { EventRecommender, User, Event}