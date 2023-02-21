// Require app dependencies
// const bodyParser = require("body-parser");      // body-parser is now built into Express since 4.16
const request = require("request");
const express = require("express");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
require('dotenv').config();

const sanitize = require('mongo-sanitize');
// The sanitize function will strip out any keys that start with '$' in the input,
// so you can pass it to MongoDB without worrying about malicious users overwriting
// query selectors.

// var clean = sanitize(req.params.username);
// Users.findOne({ name: clean }, function(err, doc) {
  // ...
// });

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
const owmApiKey = process.env.OWM_API_KEY;


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
  longitude: Number,
  equipment: String,
  authority: String,
  phone_no: String
}

const equipSchema = {
  index: Number,
  name: String,
  image: String,
  video_url: String,
  desc: String,
}

const meetupSchema = {
  index: Number,
  username: { type: String, minlength: 5, maxlength: 15, },
  password: { type: String, minlength: 8, maxlength: 20, },
  title: String,
  city: String,
  district: String,
  isodate: String,
  poi_place: String,
  duration_min: Number,
  rsvp_count: String,
}


// Declare MongoDB Model by 'poi_equipments' collection
var poi_equipments = mongoose.model("poi_equipments", poiSchema);

// Declare MongoDB Model by 'equipment_info' collection
var equipment_details = mongoose.model("equipment_details", equipSchema);

// Declare MongoDB Model by 'meetup' collection
var meetup_events = mongoose.model("meetup_events", meetupSchema);

// TODO: [Refactor] Find a better implementation of everything here

// Declare variables as global
let poiListVar = null;
let poiErrVar = null;
let currentWeatherVar = null;
let currentTempVar = null;
let weatherErrVar = null;
let weatherIconVar = null;
let equipListVar = null;
let equipErrVar = null;
let meetupListVar = null;
let meetupErrVar = null;
let meetupPlaceListVar = null;

app.get("/", function (req, res) {
  // Retrieve POI data from MongoDB
  poi_equipments.find({}, function (err, result) {     
    if(err) {
      poiListVar = null;
      poiErrVar = "ERROR : Couldn't retrieve POI list";
    }
    else {
      poiListVar = result;
      poiErrVar = false;
    }
  }).sort({name:1});      // Sort by place name

  // Retrieve fitness equipment information from MongoDB
  equipment_details.find({}, function (err, result) {     
    if(err) {
      equipListVar = null;
      equipErrVar = "ERROR : Couldn't retrieve equipment information";
    }
    else {
      equipListVar = result;
      equipErrVar = false;
    }
  }).sort({name:1});      // Sort by equipment name

  // Retrieve meetup event data from MongoDB
  meetup_events.find({isodate: {"$gte" : new Date().toISOString() }}, function (err, result) {     // Find upcoming events only
    if(err) {
      meetupListVar = null;
      meetupErrVar = "ERROR : Couldn't retrieve meetup information";
    }
    else {
      meetupListVar = result;
      meetupErrVar = false;
    }
  }).sort({isodate:1});      // Sort by event date;

  // Retrieve distinct POI place names for the meetup event modal
  poi_equipments.distinct('place', function (err, result) {
    if(err) {
      meetupPlaceListVar = null;
      poiErrVar = "ERROR : Couldn't retrieve POI list";
    }
    else {
      meetupPlaceListVar = result;
      poiErrVar = false;
    }
  });     // WARNING: [MongoDB] sort cannot be used with distinct

  // Fetch weather data from OpenWeatherMap API
  let district = req.body.district;
  // district is currently hardcoded for testing purpose
  let url = "http://api.openweathermap.org/data/2.5/weather?q=" + "Seoul" + "&units=metric&lang=kr&appid=" + owmApiKey;
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
    weatherIcon: weatherIconVar,
    equipErr: equipErrVar,
    equipList: equipListVar,
    meetupErr: meetupErrVar,
    meetupList: meetupListVar,
    meetupPlaceList: meetupPlaceListVar,
  });
});

// run Express server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});