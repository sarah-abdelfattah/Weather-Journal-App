/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiKey = '3d7aa46d5ff370fec3541241e8014f24';

const date = document.querySelector('#date');
const city = document.querySelector('#city');
const temp = document.querySelector('#temp');
const feelsLike = document.querySelector('#feels_like');
const tempMain = document.querySelector('#temp_main');
const content = document.querySelector('#content');

const generateBtn = document.getElementById('generate');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let data;


// to update user interface with recent results
function updateUI(data) {
    date.innerHTML = '<strong>Date: </strong>' + data.date;
    city.innerHTML = '<strong>City: </strong> ' + data.cityName;
    temp.innerHTML = '<strong>Temperature: </strong>' + data.temperature;
    feelsLike.innerHTML = '<strong>It feels llike: </strong>' + data.tempFeels;
    tempMain.innerHTML = '<strong>It is: </strong>' + data.tempMain;
    content.innerHTML = '<strong>You feel like: </strong>' + data.feelings;
}


//Get data .. last ProjectData from server
const getData = async(url) => {
    const response = await fetch('getData');
    try {
        const data = await response.json();
        console.log(data);
        updateUI(data);
    } catch (error) {
        console.log('error', error);
    }
}


//Post Data
const postData = async(url, data) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error ", error);
    }
};

//getting weatherData
async function getWeatherData(baseUrl, zip, key){
    //1- fetch call with API to openWeatherMap
    //https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=3d7aa46d5ff370fec3541241e8014f24#
    console.log(baseUrl+zip+key);
    return await fetch(baseUrl+zip+'&appid='+key);
    
}


async function performAction() {
    generateBtn.textContent = 'Generating...';
    //user's data
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    //get WeatherData from OpenWeatherMap
    const result = await getWeatherData(baseUrl, newZip, apiKey);
    console.log("THE result");
    console.log(result);
    const res = await result.json();
    

    //my variables = data recieved from Openweather 
    const city = res.name.toString();
    const temp = res.main.temp + ' °C';
    const tempFeelsLike = res.main.feels_like + ' °C';
    const main = res.weather[0].main.toString();
    
    //POST data to server
    const dataset = {date: newDate, cityName: city, temperature: temp, tempFeels: tempFeelsLike, tempMain: main, feelings: feelings};
    data = await postData('/newEntry', dataset);

    // GET request .. to server .. to get the last ProjectData
    getData('getData');
    generateBtn.textContent = 'Generate';
}

document.getElementById('generate').addEventListener('click', performAction);
