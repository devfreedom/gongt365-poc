// Require app dependencies
// const bodyParser = require("body-parser");      // body-parser is now built into Express since 4.16
const request = require("request");
const express = require("express");
const ejs = require("ejs");
require('dotenv').config();


// Configure Express
const app = express();

// Set port for development
// const port = 3000;

// Set port for production
var port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/')); 


// Configure built-in body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API key
const apiKey = process.env.API_KEY;


// Configure javascript template engine
app.set("view engine", "ejs");
app.set('views', 'views');


// EJS view for index.ejs
/*
app.get('/', function(req, res) {
  res.render('index');
});
*/


// Initiate MongoDB via Mongoose
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');


// Set MongoDB Atlas URI as dotenv variable
const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Check connection to MongoDB Atlas
mongoose.connect(uri).then(
  () => { console.log("Successfully connected to MongoDB") },
  err => { console.log("An error has occured while connecting to MongoDB") }
);


// Define MongoDB schema
const poiSchema = {
    index: Number,
    province: String,
    city: String,
    district: String,
    place: String,
    latitude: Number,
    longtitude: Number,
    equipment: String,
    bodyPart: {
      whole_body: Boolean,
      neck: Boolean,
      shoulder: Boolean,
      arm: Boolean,
      back: Boolean,
      chest: Boolean,
      abs: Boolean,
      waist: Boolean,
      thigh: Boolean,
      calf: Boolean,
      feet: Boolean,
      cardio: Boolean,
      muscle: Boolean
      },
    authority: String,
    phone_no: String
  }


// Declare MongoDB Model by 'poi_equipments' collection
var poi_equipments = mongoose.model("poi_equipments", poiSchema);


// TODO: [Refactor] Find a better way than this

// Declare variables as global
let poiListVar = null;
let poiErrVar = null;
let currentWeatherVar = null;
let currentTempVar = null;
let weatherErrVar = null;
let weatherIconVar = null;

app.get("/", function (req, res) {
  // Retrieve fitness equipment POI data from MongoDB
  poi_equipments.find({}, function (err, result) {
    if(err) {
      poiListVar = null;
      poiErrVar = "ERROR : Couldn't retrieve POI information";
    }
    else {
      poiListVar = result;
      poiErrVar = false;
    }
  });

  // Fetch weather data from OpenWeatherMap API
  let district = req.body.district;
  // district is currently hardcoded for testing purpose
  let url = "http://api.openweathermap.org/data/2.5/weather?q=" + "Seoul" + "&units=metric&lang=kr&appid=" + apiKey;
  request(url, function(err, response, body) { 
    let weatherData = JSON.parse(body);
    if(err) {
      currentWeatherVar = null;
      weatherErrVar: 'ERROR : Could not retrieve weather information from OpenWeatherMap API';
    }
    else {
      currentWeatherVar = weatherData.weather[0].description;
      currentTempVar = weatherData.main.temp;
      weatherIconVar = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";
      weatherErrVar = false;
    }
  });

  res.render('index', { 
    poiErr: poiErrVar,
    poiList: poiListVar,
    weatherErr: weatherErrVar,
    currentWeather: currentWeatherVar,
    currentTemp: currentTempVar,
    weatherIcon: weatherIconVar
  });
});



/*
app.get('/', function(req, res) {
  
});
*/


// run Express server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});