var AusCoords = [-25.2744, 133.775];
var mapZoomLevel = 3;

// Create the createMap function
var myMap = L.map("map-id", {
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
var EQdata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


function Colourfun(depth) {
  switch (true) {
    case depth > 20:
      return "#ea2c2c";
    case depth > 15:
      return "#ea822c";
    case depth > 10:
      return "#ee9c00";
    case depth > 5:
      return "#eecc00";
    case depth > 1:
      return "#d4ee00";
    default:
      return "#98ee00";
  }; 
};




// Grab data with d3
d3.json(EQdata, (earthquakesdata) => {
  console.log(EQdata);
  var earthquake_list = [];
  var feature = earthquakesdata.features

  // console.log(feature[0].geometry.coordinates);
  

  // for each function to populate earthquake markers
      feature.forEach((feature) => {
        var EQMarker = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{
          opacity: 1,
          fillOpacity: 1,
          fillColor: Colourfun(feature.geometry.coordinates[2]),
          color: "#000000",
          radius: feature.properties.mag *20000,
          stroke: true,
          weight: 0.5
        })      
        .bindPopup(
          "<strong>Earthquake ID: </strong>" +
          feature.id +
            "<br><strong>Depth: </strong><br> " +
            feature.geometry.coordinates[2] +
            "<br><strong>Mag: </strong><br> " +
            feature.properties.mag  
        );

        earthquake_list.push(EQMarker);
        // console.log(earthquake_list)

        });
 

    var EQLayer = L.layerGroup(earthquake_list); 
    EQLayer.addTo(myMap);
  });