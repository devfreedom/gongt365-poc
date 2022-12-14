// Load UI Handler
import "./uiux.js";


// Define global variables
let currentPosLat = 0;    // The latitude of current position
let currentPosLng = 0;    // The longitude of current position


// Global timers
// window.onload = setTimeout(   , 3000);


// Initialize Leaflet.js
var map = L.map('map', {
  center: [37.3306890, 126.5930664],
  zoom: 20,
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
  alert("현재 위치를 가져올 수 없습니다.\nERROR: " + errMsg[err.code]);
}

function fetchCurrentPos() {
  navigator.geolocation.getCurrentPosition(success, error, options);
}


// Define current position marker function
function showCurrentPosMarker() {
  var currentPositionMarker = L.icon({
    iconUrl: '../img/current-location-marker.png',
    iconSize:     [30, 30],     // size of the icon
    // shadowSize:   [50, 64],  // size of the shadow
    iconAnchor:   [15, 15],     // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],   // the same for the shadow
    // popupAnchor:  [-3, -76]  // point from which the popup should open relative to the iconAnchor
  });
  L.marker([currentPosLat, currentPosLng], {icon: currentPositionMarker}).addTo(map);
}


// Trigger showCurrentPosMarker() when 'currentPosBtn' is clicked
document.getElementById('currentPosBtn').addEventListener("click", function() {
  fetchCurrentPos();
  showCurrentPosMarker();
  map.setView([currentPosLat, currentPosLng]);
});


// Trigger showCurrentPosMarker() every second when 'trackCurrentPos' is checked 


// Display POI markers on the map
// TODO: [Improvement][Refactor] Fix slow performance when markers are too many
//      Solution 1: Use WebGL to draw Leaflet.js map (https://gist.github.com/Sumbera/c6fed35c377a46ff74c3)
//      Solution 2: Use Leaflet.js plugin Leaflet.glify based on Solution 1 (https://robertleeplummerjr.github.io/Leaflet.glify/)
//      Solution 3: Add markers directly on the canvas (https://github.com/domoritz/leaflet-maskcanvas)
//      Solution 4: Use official Leaflet.js plugin PixiOverlay which uses WebGL (https://github.com/manubb/Leaflet.PixiOverlay)
//      Solution 5: Instead of DOM-based client-side rendering, refactor the code to query database flexibly upon different zoom levels
var poiIndex = null;
var poiLat = null;
var poiLng = null;
var poiPlace = null;
var poiEquipment = null;
var poiTitle = null;

const poiItemList = document.querySelectorAll('.poiItem')
poiItemList.forEach (item => {
  poiIndex = item.querySelector('.poiIndex').innerText;
  poiLat = item.querySelector('.poiLat').innerText;
  poiLng = item.querySelector('.poiLng').innerText;
  poiPlace = item.querySelector('.poiPlace').innerText;
  poiEquipment = item.querySelector('.poiEquipment').innerText;
  poiTitle = poiPlace + " (" + poiEquipment + ")";
  var addMarker = L.marker([poiLat, poiLng], {title: poiTitle}).addTo(map).bindPopup(poiTitle);;
});


// freeform Leaflet.js map
map.invalidateSize();