// Require app dependencies
const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");
const ejs = require("ejs");
require('dotenv').config();


// Configure Express
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/')); 


// Configure bodyParser
app.use(bodyParser.urlencoded({ extended: true }));


/* DO NOT IMPLEMENT PEDOMETER FEATURE UNTIL ACCELEROMETER/GYROSCOPE SENSOR DATA CAN BE RETRIEVED

/* Activate node-pedometer, the following codes are a sample from the repo

// The latest version of Node package 'csv-parse' spits an error, use lower 4.4.6 version instead

// Configure node-pedometer
var pedometer = require('pedometer').pedometer,
    fs = require('fs'),
    parse = require('csv-parse/lib/sync');

// Function to load Data from csv file
function loadData(filename){
    
    //Load file
    var data=fs.readFileSync(filename,'utf8');
    
    //parse CSV
    data=parse(data, {trim: true, auto_parse: true});
    
    //Store data in arrays
    var acc=[],att=[];
    for (var i=0;i<data.length;i++){
        acc[i]=data[i].slice(0,3);
        att[i]=[data[i][4], -data[i][5],data[i][3]];   //Attitude is adjusted to correctly match [ pitch, roll, yaw ]
    }
    
    //Return arrays
    return {acc:acc,att:att};
}
   
// Load first test case
var data=loadData('./node_modules/pedometer/test/DataWalking1.csv');      //You might need to adjust the path here

// Define algorithm options (optional). All recommended default values here.
var options={
                windowSize:1, //Length of window in seconds
                minPeak:2, //minimum magnitude of a steps largest positive peak
                maxPeak:8, //maximum magnitude of a steps largest positive peak
                minStepTime: 0.3, //minimum time in seconds between two steps
                peakThreshold: 0.5, //minimum ratio of the current window's maximum to be considered a step
                minConsecutiveSteps: 3, //minimum number of consecutive steps to be counted
                maxStepTime: 0.8, //maximum time between two steps to be considered consecutive
                meanFilterSize: 1, //Amount of smoothing (Values <=1 disable the smoothing)
                debug:false //Enable output of debugging data in matlab/octave format
};
        
// Perform step detection. Leaving away ,options here (recommended), will use the default settings as specified above.
var steps = pedometer(data.acc,data.att,100,options);

// Print number of detected steps
console.log("The algorithm detected "+steps.length+" steps.");

// node-pedometer code ends

*/



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


/* Initiate MongoDB via Mongoose */

const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
// Set as dotenv variable
const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


/* Check connection to MongoDB Atlas */

mongoose.connect(uri).then(
  () => { console.log("Successfully connected to MongoDB") },
  err => { console.log("An error has occured while connectingn to MongoDB") }
);

/*
function mongo_main() {
  client.connect(err => {
  const collection = client.db("test").collection("devices");
  // Perform actions on the collection object
  client.close();
  });
}
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