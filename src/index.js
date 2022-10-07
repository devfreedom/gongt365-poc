// Define global variables
let currentPosLat = 0;    // The latitude of current position
let currentPosLng = 0;    // The longitude of current position


// Global timers
window.onload = setTimeout(showWeatherInfo, 3000);


// Initialize Leaflet.js
var map = L.map('map', {
  center: [37.3306890, 126.5930664],
  zoom: 13,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Define fetchCurrentPos()
var options = {                               // Options for getCurrentPosition()
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function success(position) {                  // when getCurrentPosition() is complete
  currentPosLat = position.coords.latitude;
  currentPosLng = position.coords.longitude;
  // alert("Your location is: " + position.coords.latitude + ", " + position.coords.longitude);
  console.log(`Latitude: ${position.coords.latitude}, ` + `Longitude: ${position.coords.longitude}`);
  console.log(`Accuracy: Approximately ${position.coords.accuracy} meters.`);
}

function error(err) {                         // when getCurrentPosition() fails
  const errMsg = ["zero-filler", "PERMISSION_DENIED", "POSITION_UNAVAILABLE", "TIMEOUT"];
  alert("Couldn't fetch your current location.\nError Code: " + errMsg[err.code]);
}

function fetchCurrentPos() {
  navigator.geolocation.getCurrentPosition(success, error, options);
}


// Define showCurrentPosMarker()
function showCurrentPosMarker() {
  var currentPositionMarker = L.icon({
    iconUrl: 'img/current-location-marker.png',
    iconSize:     [50, 50],     // size of the icon
    // shadowSize:   [50, 64],  // size of the shadow
    iconAnchor:   [25, 25],     // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],   // the same for the shadow
    // popupAnchor:  [-3, -76]  // point from which the popup should open relative to the iconAnchor
  });
  L.marker([currentPosLat, currentPosLng], {icon: currentPositionMarker}).addTo(map);
}


// Trigger showCurrentPosMarker() when 'currentPosBtn' is clicked
document.getElementById('currentPosBtn').addEventListener("click", function() {
  fetchCurrentPos();
  showCurrentPosMarker();
  map.setView([currentPosLat, currentPosLng], 15);
});


// Trigger showCurrentPosMarker() every second when 'trackCurrentPos' is checked 
function showWeatherInfo(){
  if(currentPosLat !== 0 && currentPosLng !== 0){
    // Security audit: use Node.textContents to prevent XSS attack
    document.getElementById('weatherInfo').innerHTML = weatherDescription + "celsius";      
    document.getElementById('weatherIcon').innerHTML = "<img src=" + imageURL + ">";       
  }
  else {}
}