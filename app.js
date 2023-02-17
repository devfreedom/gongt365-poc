// Require app dependencies
// const bodyParser = require("body-parser");      // body-parser is now built into Express since 4.16
const request = require("request");
const express = require("express");
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

const equipSchema = {
  index: Number,
  name: String,
  image: String,
  video_url: String,
  desc: String,
}

const meetupSchema = {
  index: Number,
  user: String,
  title: String,
  location: String,
  rsvp: String,
}


// Declare MongoDB Model by 'poi_equipments' collection
var poi_equipments = mongoose.model("poi_equipments", poiSchema);

// Declare MongoDB Model by 'equipment_info' collection
var list_equipments = mongoose.model("list_equipments", equipSchema);

// TODO: [Refactor] Find a better implementation

// Declare variables as global
let poiListVar = null;
let poiErrVar = null;
let currentWeatherVar = null;
let currentTempVar = null;
let weatherErrVar = null;
let weatherIconVar = null;
let equipListVar = null;
let equipErrVar = null;

app.get("/", function (req, res) {
  // Retrieve fitness equipment POI data from MongoDB
  poi_equipments.find({}, function (err, result) {
    if(err) {
      poiListVar = null;
      poiErrVar = "ERROR : Couldn't retrieve POI list";
    }
    else {
      poiListVar = result;
      poiErrVar = false;
    }
  });

  // Retrieve fitness equipment information from MongoDB
  list_equipments.find({}, function (err, result) {
    if(err) {
      equipListVar = null;
      equipErrVar = "ERROR : Couldn't retrieve equipment information";
    }
    else {
      equipListVar = result;
      equipErrVar = false;
    }
  });

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
  });
});

// run Express server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});