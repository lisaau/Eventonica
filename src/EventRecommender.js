if (!moment) {
    var moment = require('moment');
    moment().format();   
}

class EventRecommender {
    constructor() {
    // All main properties should go here.
        this.events = [];
        this.users = [];
    }

    addEvent(eventName, date, category, eventID, description) {
    // Adds a new Event to the System
        this.events.push(new Event(eventName, date, category, eventID, description));
    }

    addUser(userName, userID) {
    // Adds a new User to the System
        this.users.push(new User(userName, userID));
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

    deleteUser(userID) {
    // Deletes a User from the system based on userID
        this.users = this.users.filter(user => user.userID !== userID);
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
    
    findEventsByCategory(category){
    // Returns all events in a given category
        return this.events.filter(event => {
            let formattedCatgegory = event.category.toLowerCase();
            return formattedCatgegory === category.toLowerCase();
        });
    }
}

class Event {
    constructor(eventName, date, category, eventID, description) {
        this.eventName = eventName;
        this.date = date; // expect date object in input
        this.category = category;
        this.eventID = eventID;
        this.description = description;
    }

    getFormattedDate() {
        return moment(this.date).format('MMM Do YYYY');
    }
}

class User {
    constructor(userName, userID) {
        this.userName = userName;
        this.userID = userID;
        this.personalEvents = [];
    }
}

if (typeof module != 'undefined'){
    module.exports = { EventRecommender, User,  Event} 
}
