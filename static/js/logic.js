var AusCoords = [-25.2744, 133.775];
var mapZoomLevel = 3;

// Create the createMap function
var myMap = L.map("mapid", {
  center: AusCoords,
  zoom: mapZoomLevel,
});

// Create the tile layer that will be the background of our map
L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/satellite-v9",
      accessToken: API_KEY,
    }
  ).addTo(myMap);
  // Load in geojson data
  var EQdata =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Grab data with d3
d3.json(EQdata, (Earthquakes) => {

 
  var earthquake = Earthquakes.features;
  console.log(earthquake);
  earthquake.forEach((EQ) => {
    var EQMarkers_list = [];
    var EQMarker = L.marker([EQ.geometry.coordinates[1], EQ.geometry.coordinates[0]]);
      EQMarker.bindPopup(
      "<strong>Earthquake ID: </strong>" +
      EQ.geometry.id +
        "<br><strong>Depth: </strong><br> " +
        EQ.geometry.id +
        "<br><strong>Mag: </strong><br> " +
        EQ.properties.mag
    );
    EQMarkers_list.push(EQMarker);
  });
  var EQlayer = L.layerGroup(EQMarkers_list);
  EQlayer.addTo(myMap);
  });