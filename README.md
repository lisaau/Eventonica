# Eventonica

Eventonica is a web app to manage events from [Techtonica's curriculum]( https://github.com/Techtonica/curriculum/tree/master/projects/eventonica). This repo includes part 1-3 listed in the [Overview](#overview).

View the web app: https://lisaau.github.io/Eventonica/



## Overview

The project is split into seven phases covering various topics, some of which are in a different GitHub repo.

| Project Outline                                              | Project Repo                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Part 1 - Object-Oriented Programming](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part1-objects.md) | [Eventonica]([Eventonica](https://github.com/lisaau/Eventonica)) |
| [Part 2 - Testing](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part2-testing.md) | [Eventonica](https://github.com/lisaau/Eventonica)           |
| [Part 3 - jQuery UI](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part3-jquery-ui.md) | [Eventonica](https://github.com/lisaau/Eventonica)           |
| [Part 4 - API's](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part4-apis.md) | [Eventonica-API](https://github.com/lisaau/Eventonica-API)   |
| [Part 5 - Express Backend](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part5-express-backend.md) | [Eventonica-With-Express](https://github.com/lisaau/Eventonica-Express) |
| [Part 6 - Postgres Database](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part6-postgres.md) | [Eventonica-Postgres](https://github.com/lisaau/Eventonica-Postgres) |
| [Part 7 - React Frontend](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part7-react.md) | [Eventonica-React](https://github.com/lisaau/Eventonica-React) |



### Part 1-3

The project in this repo includes object-oriented-programming, unit testing with Jasmine, and jQuery and Bootstrap for the UI.

Additionally, this project includes a [simple static file server](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework), `nodeServer.js`, without the use of a framework to demonstrate understanding of server-side programming. Running the app with this server will display the `404.html` file if the route does not exist.



## Running the app

To run locally, 

1. Clone this repo by running

```bash
git clone https://github.com/lisaau/Eventonica.git
```

2. Then install dependencies with 

```bash
npm install
```

3. To view the app, you may open the HTML file in the browser or run it with the static file server that is part of this repo
   1. OPTION 1: 
      Open `index.html` in the browser of your choice to view the app
   2. OPTION 2:
      Run `node nodeServer.js` in the terminal to start the server and then view the app on http://localhost:8125/
4. To run the tests, type `jasmine` in the terminal

