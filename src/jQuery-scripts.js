$(document).ready( () => {
    const eventRecommender = new EventRecommender();
    eventRecommender.addUser("person1", 12345);
    eventRecommender.addUser("person2", 12346);
    eventRecommender.addUser("person3", 12347);
    eventRecommender.addEvent("Event 1", new Date(2020, 01, 03), "Concert");
    eventRecommender.addEvent("Event 2", new Date(2020, 02, 03), "Concert");
    eventRecommender.addEvent("Event 3", new Date(2020, 04, 03), "Sport");
    eventRecommender.addEvent("Event 4", new Date(2020, 05, 03), "Art and Theater");
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
    function displayUsers(array) {
        for (let user of array) {
            $("#all-users").append(`<li>${user.userName}</li>`)
        }
    }
    
    displayUsers(eventRecommenderUsers);
    
    
    $("#add-user-submit").click((event) => {
        event.preventDefault();
        let name = $("#add-user-name").val();
        let id = parseInt($("#add-user-id").val());
        
        console.log("before adding a user: ", eventRecommender);
        console.log("array before adding a user: ", eventRecommenderUsers);
        
        
        eventRecommender.addUser(name, id);
        
        let newUser = eventRecommender.users[eventRecommender.users.length - 1]
        eventRecommenderUsers.push(newUser);
        
        // console.log(eventRecommender.addUser(name, id));
        console.log("after adding a user: ", eventRecommender);
        console.log("array after adding a user: ", eventRecommenderUsers);
        // eventRecommenderUsers.push(eventRecommender.addUser(name, id));
        // console.log(eventRecommenderUsers[eventRecommenderUsers.length]);
        
        
        $("#all-users").append(`<li>${newUser.userName}</li>`)
    })
    
    $("#delete-user-submit").click((event) => {})
    
   
    for (let event of eventRecommender.events) {
        $("#all-events").append(`<li>${event.eventName}</li>`);
    }

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

    })
    
})