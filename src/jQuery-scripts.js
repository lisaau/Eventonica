$(document).ready( () => {
    const eventRecommender = new EventRecommender();
    eventRecommender.addUser("person1", 12345);
    eventRecommender.addUser("person2", 12346);
    eventRecommender.addUser("person3", 12347);
    eventRecommender.addEvent("Event 1", new Date(2020, 01, 03), "Concert", 11111,  "Description on Event 1");
    eventRecommender.addEvent("Event 2", new Date(2020, 02, 03), "Concert", 22222, "Description on Event 2");
    eventRecommender.addEvent("Event 3", new Date(2020, 04, 03), "Sport", 33333, "Description on Event 3");
    eventRecommender.addEvent("Event 4", new Date(2020, 05, 03), "Art and Theater", 44444, "Description on Event 4");

    const eventRecommenderUsers = [];
    for (let user of eventRecommender.users) {
        eventRecommenderUsers.push(user);
    }

    const eventRecommenderEvents = [];
    for (let event of eventRecommender.events) {
        eventRecommenderEvents.push(event);
    }
    //console.log("default", eventRecommenderUsers);
    

    // PUTTING THIS IN A FUNCTION IS UNNECESSARY?
    // NEED TO ONLY DISPLAY THE LIST ONCE, NOT APPEND TO IT?
    // STORE EVERYTHING IN AN ARRAY AND DISPLAY IT WHEN NEEDED?
    function displayUsers() {
        let displayUserText = '';
        for (let user of eventRecommender.users) {
            displayUserText += `<li>${user.userName}, ID: ${user.userID}</li>`;
        }
        $("#all-users").html(displayUserText);
    }
    
    displayUsers();
    
    
    $("#add-user-submit").click((event) => {
        event.preventDefault();
        let name = $("#add-user-name").val();
        let id = parseInt($("#add-user-id").val());
        
        console.log("before adding a user: ", eventRecommender);
        console.log("array before adding a user: ", eventRecommenderUsers);
        
        if (name && id) {
            $("#add-user-announcement").empty();
            eventRecommender.addUser(name, id);
            let newUser = eventRecommender.users[eventRecommender.users.length - 1] //OPTIONAL??
            eventRecommenderUsers.push(newUser); //OPTIONAL??
            displayUsers()
        } else {
            $("#add-user-announcement").html("Please provide a User ID and User Name")
        }
        
        console.log("after adding a user: ", eventRecommender);
        console.log("array after adding a user: ", eventRecommenderUsers);
        
        // $("#all-users").append(`<li>${newUser.userName}</li>`)
    })
    
    $("#delete-user-submit").click((event) => {
        event.preventDefault();
        $("#add-user-announcement").empty(); // DELETE LATER WHEN WE REFRESH PAGE
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

    $("#add-event-submit").click((event) => {
        event.preventDefault();
        let id = parseInt($("#add-event-id").val());
        let name = $("#add-event-name").val();
        let date = $("#add-event-date").val();
        let category = $("#add-event-category").val();
        let description = $("#add-event-description").val();
        
        if (name && id && date && category && description) {
            $("#add-event-announcement").empty();
            eventRecommender.addEvent(name, date, category, id, description);
            displayEvents()
        } else {
            $("#add-event-announcement").html("Please complete all fields")
        }


    })

    $("#delete-event-submit").click((event) => {
        event.preventDefault();
        $("#add-user-announcement").empty(); // DELETE LATER WHEN WE REFRESH PAGE
        let id = parseInt($("#delete-event-id").val());
        eventRecommender.deleteEvent(id);
        displayEvents();
    })

    // DOES NOT WORK HOW I WANT IT TO. ADD DATE PICKER?
    $("#date-search-submit").click((e) => {
        e.preventDefault();  
        let dateString = `${$("#date-search-year").val()},${$("#date-search-month").val()},${$("#date-search-day").val()}`; 
        console.log(dateString);
        let dateObject = new Date(dateString);
        console.log(dateObject);
        
        console.log(eventRecommender);
        

        let filteredEvents = eventRecommender.findEventsByDate(dateObject); 
        console.log(filteredEvents);
        console.log(!$("#date-search-year").val());
        

        if (!$("#date-search-year").val() || !$("#date-search-month").val() || !$("#date-search-day").val()) {
            $("#date-search-result").html("Please provide a valid date")
        } else if (filteredEvents.length === 0) {
            $("#date-search-result").html(`No events found on ${dateObject}`)
        } else {
            for (let event of filteredEvents) {
                $("#date-search-result").append(`<li>${event.eventName} - ${event.category}</li>`)
            }
        }
    })

    $("#category-search-submit").click((e) => {
        e.preventDefault();  
        let category = $("#category-search-id").val();
        let filteredEvents = eventRecommender.findEventsByCategory(category); 
        console.log(filteredEvents);
        if (filteredEvents.length === 0) {
            $("#category-search-result").html("Please enter a category");
        } else {
            let categoryMessage = '';
            for (let event of filteredEvents) {
                categoryMessage += `<li>${event.eventName} - ${event.category}</li>`;
            }
            $("#category-search-result").html(categoryMessage)
        }
    })
    
})