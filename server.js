// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Dependencies
const bodyParser = require('body-parser');   //to parse our data

/* Middleware */
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));    //to tell bodyParser how exactly we want our data to be dealt with
app.use(bodyParser.json());     //going with JSON

// Cors for cross origin allowance
const cors = require('cors');   //a package that lets the browser and the server to talk to each other wihtout security interruptions 
app.use(cors());

// Initialize the main project folder
app.use(express.static('website')); //pointing the app to the folder

// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log(`server is running on localhost: ${port}`);
}

app.get('/getData', (request, response) => {
    response.send(JSON.stringify(projectData));
})

app.post('/newEntry', (request, response) => {
    // console.log(request.body);
    const data = request.body;
    // console.log("the data");
    // console.log(data);
    if (data) {
        projectData.date = data.date;
        projectData.cityName = data.cityName;
        projectData.temperature = data.temperature;
        projectData.tempFeels = data.tempFeels;
        projectData.tempMain = data.tempMain;
        projectData.feelings = data.feelings;
    }
    // console.log("the data");
    // console.log(projectData);
    response.send({message: 'Post Successful'});
});
