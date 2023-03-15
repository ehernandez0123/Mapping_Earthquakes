// Add console.log to check to see if our code is working.
console.log("working");

//  Add a marker to the map for Los Angeles, California.
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: 'black',
    fillColor: 'yellow',
    fillOpacity: 0.2    
 }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Street": streets,
    "Satellite Streets": satelliteStreets
  };

  // Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
  })

  // Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grabbing our GeoJSON data.
d3.json(earthquakes).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);