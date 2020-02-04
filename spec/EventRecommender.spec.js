const { EventRecommender, User, Event } = require('../src/EventRecommender.js'); // Update with your class names and file name
let er; 

describe("EventRecommender", () => {
  
    beforeEach(() => {
      er = new EventRecommender();
      er.addEvent("Event 1", new Date(2020, 01, 03), "Concert");
      er.addEvent("Event 2", new Date(2020, 02, 03), "Concert");
      er.addEvent("Event 3", new Date(2020, 04, 03), "Sport");
      er.addEvent("Event 4", new Date(2020, 05, 03), "Art and Theater");
    });
  
    describe("addEvent", () => {
      it("adds a new Event to the system", () => {
        er.addEvent("New Event's Name");
        expect(er.events.length).toEqual(5);
        expect(er.events[er.events.length - 1].eventName).toEqual("New Event's Name"); 
      });
    });
  
    describe("addUser", () => {
      it("adds a new User to the system", () => {
        er.addUser("User's Name");
        expect(er.users.length).toEqual(1);
      });
    });
  
    describe("saveUserEvent", () => {
      it("adds an event to a user's personal event array", () => {
        er.addUser("UserName"); // passing in a string to create a User object
        er.addEvent("EventObject"); // pass in a string to create Event object
        er.saveUserEvent(new User("UserName"), new Event("EventObject")); // arguments are User and Event objects
        expect(er.users[er.users.length - 1].personalEvents.length).toEqual(1);

        // should receive error message if the User has not been added
        expect(er.saveUserEvent(new User("UserName2"), new Event("EventObject"))).toEqual('Please add this user first before saving an event.');
      });
    });
  
    describe("deleteUser", () => {
      it("removes a User from the system", () => {
        er.addUser("User's Name", 12345);
        er.deleteUser(12345);
        expect(er.users.length).toEqual(0);
      });
    });
  
    describe("deleteEvent", () => {
      it("removes the event from the system", () => {
        er.addEvent("Event's Name");
        er.deleteEvent("Event's Name");
        expect(er.events.length).toEqual(4);
      });
    });


    describe("findEventsByCategory", () => {
      it("returns array of events with the specified category", () => {
        // check that the result is an array
        expect(Array.isArray(er.findEventsByCategory("Concert"))).toBe(true);

        // has the correct length
        expect(er.findEventsByCategory("Concert").length).toEqual(2);

        // check that each event in the resulting array is of the specified category
        for (let event of er.findEventsByCategory("Concert")) {
          expect(event.category).toEqual("Concert");
        }
      });
    });

    describe("findEventsByDate", () => {
      it("returns array of events with the specified date", () => {

        // check that the result is an array
        expect(Array.isArray(er.findEventsByDate(new Date(2020, 02, 03)))).toBe(true);

        expect(er.findEventsByDate(new Date(2020, 02, 03)).length).toEqual(1);

        // check that each event in the resulting array is of the specified category
        for (let event of er.findEventsByDate(new Date(2020, 02, 03))) {
          expect(event.date).toEqual(new Date(2020, 02, 03));
          expect(event.eventName).toEqual("Event 2");
        }
      })
    });

    describe("getFormattedDate", () => {
      it("should check that the date is formatted correctly", () => {
        expect(er.events[0].getFormattedDate()).toEqual('2020-02-03');
      })
    })
});