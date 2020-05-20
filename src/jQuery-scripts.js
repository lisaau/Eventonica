$(document).ready( () => {
    // Pre-populate with data
    const eventRecommender = new EventRecommender();
    eventRecommender.addUser("Lisa", 12345);
    eventRecommender.addUser("Kim", 12346);
    eventRecommender.addEvent("Lunar New Year Food Festival", new Date(2020, 01, 03), "Food and Drink", 11111, "The Biggest Lunar New Year Food Festival in San Francisco!");
    eventRecommender.addEvent("Incredible Art Gallery Exhibit", new Date(2020, 01, 21), "Art and Theater", 22222, "There will be multiple exhibits of Harry Potter, Disney, Marvel, DC Comics, Star Wars, Anime and parody art on display featuring a variety of artists and available to purchase at affordable pricing.");
    eventRecommender.addEvent("Developer Week", new Date(2020, 01, 12), "Tech", 33333, "Our conferences, tracks, technical workshops and events throughout the week invite you to get lessons, best practices -- and advanced knowledge");
    eventRecommender.addEvent("2020 Levi's Presidio 10 ", new Date(2020, 03, 19), "Sport", 44444, "A fun, family-oriented race in the Presidio of San Francisco.");
    eventRecommender.saveUserEvent(12346, 22222)
    eventRecommender.saveUserEvent(12346, 11111)
    eventRecommender.saveUserEvent(12345, 11111)

    const eventRecommenderUsers = [];
    for (let user of eventRecommender.users) {
        eventRecommenderUsers.push(user);
    }
    const eventRecommenderEvents = [];
    for (let event of eventRecommender.events) {
        eventRecommenderEvents.push(event);
    }


    // ----- USERS ----- //
    // Display all users when app is loaded
    function displayUsers() {
        let displayUserText = '';
        for (let user of eventRecommender.users) {
            displayUserText += `<li>${user.userName}, ID: ${user.userID}</li>`;
        }
        $("#all-users").html(displayUserText);
    }
    displayUsers();
    
    $("#add-user").submit(() => {
        event.preventDefault();
        let name = $("#add-user-name").val();
        let id = parseInt($("#add-user-id").val()); 

        eventRecommender.addUser(name, id);
        
        displayUsers()
    })
    
    $("#delete-user").submit(() => {
        event.preventDefault();
        let id = parseInt($("#delete-user-id").val());
        eventRecommender.deleteUser(id);
        displayUsers();
    })
    
    // ----- EVENTS ----- //
    // Display all events when app is loaded
    function displayEvents() {
        let displayEventText = '';
        for (let event of eventRecommender.events) { 
            displayEventText += `<li>${event.eventID} - <b>${event.eventName}</b> - ${event.getFormattedDate()} - ${event.category} - ${event.description}</li>`;
        }
        $("#all-events").html(displayEventText);
    }
    displayEvents();

    $("#add-event").submit((event) => {
        event.preventDefault();
        let id = parseInt($("#add-event-id").val());
        let name = $("#add-event-name").val();
        let date = $("#add-event-date").val();
        let category = $("#add-event-category").val();
        let description = $("#add-event-description").val();
        
        eventRecommender.addEvent(name, date, category, id, description);
        displayEvents()
    })

    $("#delete-event").submit(() => {
        event.preventDefault();
        let id = parseInt($("#delete-event-id").val());
        eventRecommender.deleteEvent(id);
        displayEvents();
    })

    $("#date-search").submit(() => {
        event.preventDefault();
        let year = parseInt($("#date-search-year").val());
        let month = parseInt($("#date-search-month").val());
        let day = parseInt($("#date-search-day").val());
         
        let result = [];
        
        for (let event of eventRecommender.events) {
            if ((Number.isNaN(year) || year === event.date.getFullYear()) &&
            (Number.isNaN(month) || month === event.date.getMonth() + 1) &&
            (Number.isNaN(day) || day === event.date.getDate())) {
                result.push(event);
            }
        }
        let message = '';

        for (let element of result) {
            message += `<li>${element.eventName}</li>`;
        }

        $("#date-search-result").html(message);    
    })

    $("#category-search").submit(() => { 
        event.preventDefault();
        let category = $("#category-search-id").val();
        let filteredEvents = eventRecommender.findEventsByCategory(category); 
        if (filteredEvents.length === 0) {
            $("#category-search-result").html("No events found");
        } else {
            let categoryMessage = '';
            for (let event of filteredEvents) {
                categoryMessage += `<li>${event.eventName} - ${event.category}</li>`;
            }
            $("#category-search-result").html(categoryMessage);
        }
    })

    // ----- BOOKMARKED EVENTS ----- //
    // Display all bookmarked events when app is loaded
    function displayBookmarkedEvents() {
        let displayBookmarkedEventsText = '';
        
        for (let userid in eventRecommender.bookmarkedEvents) { 
            // start string with user's name (ID -> name)
            let userString = `${eventRecommender.getUserByID( parseInt(userid) ).userName}: `;

            let userSavedEvents = eventRecommender.bookmarkedEvents[userid]; 
            
            // getting event names for events in userSavedEvents
            for (let [i, eventid] of userSavedEvents.entries()) {
                let nameOfEvent = eventRecommender.getEventByID(eventid).eventName;
    
                // format string different if at the last element of array
                (userSavedEvents.length - 1 === i) ? userString += `${nameOfEvent}` : userString += `${nameOfEvent}, `
            }

            displayBookmarkedEventsText += `<li>${userString}</li>`
        }
        
        $("#saved-events-users").html(displayBookmarkedEventsText);
     }
     displayBookmarkedEvents();

    $("#save-user-event").submit( () => {
        event.preventDefault();
        let userid = parseInt($("#save-user-id").val());
        let eventid = parseInt($("#save-event-id").val());
        // updates eventRecommender 
        eventRecommender.saveUserEvent(userid, eventid);

        displayBookmarkedEvents()
    })    
})