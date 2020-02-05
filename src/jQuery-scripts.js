$(document).ready( () => {
    const eventRecommender = new EventRecommender();
    eventRecommender.addUser("person1", 12345);
    eventRecommender.addUser("person2", 12346);
    eventRecommender.addUser("person3", 12347);
    eventRecommender.addEvent("Event 1", new Date(2020, 01, 03), "Concert", 11111,  "Description on Event 1");
    eventRecommender.addEvent("Event 2", new Date(2020, 02, 14), "Concert", 22222, "Description on Event 2");
    eventRecommender.addEvent("Event 3", new Date(2020, 04, 17), "Sport", 33333, "Description on Event 3");
    eventRecommender.addEvent("Event 4", new Date(2020, 05, 05), "Art and Theater", 44444, "Description on Event 4");

    const eventRecommenderUsers = [];
    for (let user of eventRecommender.users) {
        eventRecommenderUsers.push(user);
    }
    const eventRecommenderEvents = [];
    for (let event of eventRecommender.events) {
        eventRecommenderEvents.push(event);
    }

    function displayUsers() {
        let displayUserText = '';
        for (let user of eventRecommender.users) {
            displayUserText += `<li>${user.userName}, ID: ${user.userID}</li>`;
        }
        $("#all-users").html(displayUserText);
    }
    
    displayUsers();
    
    
    $("#add-user").submit(() => {
        let name = $("#add-user-name").val();
        let id = parseInt($("#add-user-id").val()); 

        eventRecommender.addUser(name, id);
        displayUsers()
    })
    
    $("#delete-user").submit(() => {
        let id = parseInt($("#delete-user-id").val());
        eventRecommender.deleteUser(id);
        displayUsers();
    })
    

   function displayEvents() {
       let displayEventText = '';
       for (let event of eventRecommender.events) { 
           displayEventText += `<li>${event.eventID} - ${event.eventName} - ${event.getFormattedDate()} - ${event.category} - ${event.description}</li>`;
       }
       $("#all-events").html(displayEventText);
    }

    displayEvents();

    $("#add-event").submit((event) => {
        // event.preventDefault();
        console.log("add event button is clicked")
        let id = parseInt($("#add-event-id").val());
        let name = $("#add-event-name").val();
        let date = $("#add-event-date").val();
        let category = $("#add-event-category").val();
        let description = $("#add-event-description").val();
        
        if (name && id && date && category && description) {
            $("#add-event-announcement").empty();
            eventRecommender.addEvent(name, date, category, id, description);
            displayEvents()
        } 
    })

    $("#delete-event").submit(() => {
        let id = parseInt($("#delete-event-id").val());
        eventRecommender.deleteEvent(id);
        displayEvents();
    })

    // DOES NOT WORK HOW I WANT IT TO. ADD DATE PICKER?
    $("#date-search").submit(() => {
        let year = parseInt($("#date-search-year").val());
        let month = parseInt($("#date-search-month").val());
        let day = parseInt($("#date-search-day").val());
        
        console.log(year, month, day)
         
        let result = [];
        
        for (let event of eventRecommender.events) {
            console.log(event.date.getMonth());
            
            if ((Number.isNaN(year) || year === event.date.getFullYear()) &&
            (Number.isNaN(month) || month === event.date.getMonth() + 1) &&
            (Number.isNaN(day) || day === event.date.getDate())) {
                result.push(event);
            }
        }
        let message = '';
        console.log(result)
        for (let element of result) {
            message += `<li>${element.eventName}</li>`;
        }

        $("#date-search-result").html(message);    
    })

    $("#category-search").submit(() => { 
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

    $("#saved-events-users").submit( () => {
        let userid = $("#save-user-id").val();
        let eventid = $("#save-event-id").val();
        // updates eventRecommender 
        eventRecommender.saveUserEvent(userid, eventid);
        console.log(eventRecommender)
    })
    
})