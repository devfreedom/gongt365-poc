// Require app dependencies
const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
require('dotenv').config();


// Configure Express
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/')); 


// Configure bodyParser
app.use(bodyParser.urlencoded({ extended: true }));


// Configure javascript template engine
app.set("view engine", "ejs");


// API key
const apiKey = process.env.API_KEY;


// Abandon MySQL, use MongoDB instead
/*
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "db_admin"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})

con.query('CREATE DATABASE test_db', function (err, result) {
  if (err) throw err;
    console.log('Database has been created.');
  });
*/  

// Declare MongoDB Model
var mdbModel = mongoose.model("mdbModel", {
  item: String,
  numValue: Number,
  address: String,
  description: String
});
  

// configure default EJS view
app.get('/', function(req, res) {
  res.render('index', {
    weather: null,
    error: false,
  });
});


// fetch OpenWeatherMap data
app.post('/', function(req, res) {
  let city = req.body.city;
  let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;
  request(url, function(err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'ERROR : Could not retrieve weather information'});
    }
    else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', {weather: null, error: 'ERROR : Weather information not available'});
      } 
      else {
        let placeVar = weather.sys.country;
        let tempVar = weather.main.temp;
        let descVar = weather.weather[0].description;
        let mainVar = weather.weather[0].main;
        res.render('index', {
          weather: weather,
          place: placeVar,
          temp: tempVar,
          description: descVar,
          main: mainVar,
          error: false,
        });
      }
    }
  });
});


// run Express server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});