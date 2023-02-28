// Require app dependencies
// const bodyParser = require("body-parser");      // `body-parser` is now built into Express since 4.16
const express = require("express");
// const request = require("request");      // `request` is deprecated, using node-fetch instead
const ejs = require("ejs");
const bcrypt = require("bcrypt");
require('dotenv').config();

// import fetch from 'node-fetch';     // ATTENTION: node-fetch from v3 is an ESM-only module - you are not able to import it with require()
const fetch = require('node-fetch');      // Using node-fetch@2 which remains compatible with CommonJS

const sanitize = require('mongo-sanitize');
// The sanitize function will strip out any keys that start with '$' in the input,
// so you can pass it to MongoDB without worrying about malicious users overwriting
// query selectors.

// var clean = sanitize(req.params.username);
// Users.findOne({ name: clean }, function(err, doc) {
  // ...
// });

// Configure bcrypt for password hashing
const saltRounds = 10;
var newMeetupPassword = "default_password_NOT_HASHED";

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
  username: { type: String, minlength: 5, maxlength: 15, },
  password: String,
  title: String,
  city: String,
  district: String,
  isodate: String,
  poi_place: String,
  duration_min: Number,
  rsvp_count: String,
}


// Declare MongoDB Models
var poi_equipments = mongoose.model("poi_equipments", poiSchema);
var equipment_details = mongoose.model("equipment_details", equipSchema);
var meetup_events = mongoose.model("meetup_events", meetupSchema);


// TODO: [Refactor] Find a better implementation of everything here

// Retrieve POI dataset from MongoDB
function findPoiEquipments(){
  return new Promise(function(resolve, reject){
    poi_equipments.find({}, function(err, result){
      if(err){
        console.log(err);
        reject(err);
      }
      else{
        console.log("POI query has been finished");
        resolve(result);
      }
    }).sort({name:1});      // Sort by place name
  })
}

// Retrieve fitness equipment information from MongoDB
function findEquipmentDetails(){
  return new Promise(function(resolve, reject){
    equipment_details.find({}, function(err, result){
      if(err){
        console.log(err);
        reject(err);
      }
      else{
        console.log("Equipment information query has been finished");
        resolve(result);
      }
    }).sort({name:1});      // Sort by equipment name
  })
}

// Retrieve meetup event data from MongoDB
function findMeetupEvents(){
  return new Promise(function(resolve, reject){
    meetup_events.find({isodate: {"$gte" : new Date().toISOString() }}, function(err, result){      // Ignore past events
      if(err){
        console.log(err);
        reject(err);
      }
      else{
        console.log("Meetup events list query has been finished")
        resolve(result);
      }
    }).sort({isodate:1});      // Sort by event date
  })
}

// Retrieve distinct POI place names for the meetup event modal
function findPoiPlaceNames(){
  return new Promise(function(resolve, reject){
    poi_equipments.distinct('place', function(err ,result){
      if(err){
        console.log(err);
        reject(err);
      }
      else{
        console.log("Meetup place name list query has been finished")
        resolve(result);
      }
    });      // NOTE: [MongoDB] `.sort()` cannot be used with `.distinct()`
  })
}

// Fetch weather data from OpenWeatherMap API
async function fetchWeatherData(){
    // let district = req.body.district;
    // district is currently hardcoded for testing purpose
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + "Seoul" + "&units=metric&lang=kr&appid=" + owmApiKey;
   
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log("Weather information query has been finished");
    return weatherData;
}

app.get("/", function (req, res) { 

  async function initialData() {
    // Wait for DB query results
    var poiListVar = await findPoiEquipments();
    var equipListVar = await findEquipmentDetails();
    var meetupListVar = await findMeetupEvents();
    var meetupPlaceListVar = await findPoiPlaceNames();
    var weatherDataVar = await fetchWeatherData();

    var currentWeatherVar = weatherDataVar.weather[0].description;
    var currentTempVar = weatherDataVar.main.temp;
    var weatherIconVar = "http://openweathermap.org/img/wn/" + weatherDataVar.weather[0].icon + ".png";

    // Render ejs view when datasets are ready
    res.render('index', {
      poiList: poiListVar,
      equipList: equipListVar,
      meetupList: meetupListVar,
      meetupPlaceList: meetupPlaceListVar,
      currentWeather: currentWeatherVar,
      currentTemp: currentTempVar,
      weatherIcon: weatherIconVar,
    })
  }
  
  initialData();

  /*
  findPoiEquipments()
  .then((poiResult) => {
      poiListVar = poiResult;
      console.log("POI query has been finished");
      return findEquipmentDetails();
  })
  .then((equipResult) => {
      equipListVar = equipResult;
      console.log("Equipments list query has been finished")
      return findMeetupEvents();
  })
  .then((meetupResult) => {
      meetupListVar = meetupResult;
      return findPoiPlaceNames();
      console.log("Meetup events list query has been finished")
  })
  .then((meetupPlaceListResult) => {
      meetupPlaceListVar = meetupPlaceListResult;
      console.log("Meetup place name list query has been finished")
      return fetchWeatherData();
  })
  .then((weatherData) => {
      currentWeatherVar = weatherData.weather[0].description;
      currentTempVar = weatherData.main.temp;
      weatherIconVar = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";
      console.log("Weather information query has been finished")
      console.log("Now rendering an ejs view...")
      res.render('index', {
        poiList: poiListVar,
        currentWeather: currentWeatherVar,
        currentTemp: currentTempVar,
        weatherIcon: weatherIconVar,
        equipList: equipListVar,
        meetupList: meetupListVar,
        meetupPlaceList: meetupPlaceListVar,
      });
      return;
  })
  .catch(function(error){
    console.log(error);
  });
  */


  /*
 

  var progress = 0;

  
  findPoiEquipments()
  findEquipmentDetails()
  findMeetupEvents()
  findPoiPlaceNames()
  fetchWeatherData()
  if (progress==5) {
    return success;
  }
  else
    return;
  

  res.render("index", { 
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
  */
});


app.post('/new_meetup', function(req, res) {

  // Receive "Create a new meetup event" form inputs
  let newMeetupUsernameInputVar = req.body.newMeetupUsernameInput;
  let newMeetupPasswordInputVar = req.body.newMeetupPasswordInput;
  let newMeetupTitleInputVar = req.body.newMeetupTitleInput;
  let newMeetupPlaceInputVar = req.body.newMeetupPlaceInput;
  let newMeetupDateInputVar = req.body.newMeetupDateInput;
  let newMeetupHourInputVar = req.body.newMeetupHourInput;
  let newMeetupMinuteInputVar = req.body.newMeetupMinuteInput;
  let newMeetupDurationInputVar = req.body.newMeetupDurationInput;

  // Inspect the data
  // NOTE: Template literals uses backticks, not double quotes
  console.log("DATA ENTRY INSPECTION");
  console.log(`User credential: ID = ${newMeetupUsernameInputVar}, PW = ${newMeetupPasswordInputVar}`);
  console.log(`Meetup: ${newMeetupTitleInputVar} / ${newMeetupPlaceInputVar}`);
  console.log(`Datetime(KST): ${newMeetupDateInputVar} ${newMeetupHourInputVar}:${newMeetupMinuteInputVar}`);

  // Convert the local input datetime (UTC+9) into ISODate (UTC+0)
  
  // ATTENTION: [Javascript] `new Date` object constructor defines 'month' as 'monthIndex' (zero-based numbering), with a range of 0-11, NOT 1-12
    // new Date (year, monthIndex, day, hours, minutes, seconds, milliseconds);
    // Input month value needs to be converted into an index by subtracting '1'
  let newMeetupKstDatetime = new Date(newMeetupDateInputVar.slice(0,4), newMeetupDateInputVar.slice(5,7) -1, newMeetupDateInputVar.slice(8,10), newMeetupHourInputVar, newMeetupMinuteInputVar, 00);
  let newMeetupIsodate = newMeetupKstDatetime.toISOString();
  console.log(`isodate(UTC): ${newMeetupIsodate}`);      // NOTE: Template literals uses backticks, not double quotes

  // Salt and hash the password first, using `bcrypt.hash`
  bcrypt.hash(newMeetupPasswordInputVar, saltRounds)
    .then(hash => { 
      newMeetupPassword = hash
      console.log("Hashed password: " + newMeetupPassword); 
      
      // And then create/insert the document
      meetup_events.create({
      username: newMeetupUsernameInputVar,
      password: newMeetupPassword,      // WARNING: User-input password needs to be salted and hashed before creating the document
      title: newMeetupTitleInputVar,
      city: "서울특별시",     // Hardcoded for now
      district: "서대문구",      // Hardcoded for now
      poi_place: newMeetupPlaceInputVar,
      isodate: newMeetupIsodate,
      duration_min: newMeetupDurationInputVar
      }, function(err) {
        if(err) {
          // res.status(200).json({ "status": false, "result": "모임을 기록하는 도중 오류가 발생했습니다." });
          console.log(err);
          res.send("<script>alert(\"모임을 기록하는 도중 오류가 발생했습니다.\"); window.location.href = \"/\"; </script>");
          return;      // Necessary to prevent sending another response
        } else {
          // res.status(200).json({ "status": true, "result": "모임을 성공적으로 만들었습니다!" });
          res.send("<script>alert(\"모임을 성공적으로 만들었습니다!\"); window.location.href = \"/\"; </script>");
          return;
        }
      });
    }).catch(err => console.error(err.message));

});


// Compare the input password to the stored password, by using `bcrypt.compare`
// Note: `bcrypt.hash` generates a unique hash based on special salt every time, to prevent rainbow table attacks
function compareHash(hash) {
  bcrypt
    .compare(password, hash)
    .then(res => {
      console.log(res) // return true
    })
    .catch(err => console.error(err.message))
}


// run Express server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});