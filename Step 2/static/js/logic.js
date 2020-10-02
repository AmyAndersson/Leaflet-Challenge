
// Create the createMap function
// var myMap = L.map("map-id", {
//   center: AusCoords,
//   zoom: mapZoomLevel,
// });

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
  );

  // Load in geojson data
var EQdata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


function Colourfun(depth) {
  switch (true) {
    case depth > 20:
      return "#FF0000";
    case depth > 15:
      return "#FF8500";
    case depth > 10:
      return "#FFD700";
    case depth > 5:
      return "#FFFF00";
    case depth < 1:
      return "#9ACD32";
    default:
      return "#008000";
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
    // EQLayer.addTo(myMap);

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (myMap) {
      var div = L.DomUtil.create("div", "info legend");
      div.innerHTML += "<h4>Earthquake Depth</h4>";
      div.innerHTML +=
        '<i style="background: #FF0000"></i><span> 15-20</span><br>';
      div.innerHTML +=
        '<i style="background: #FF8500"></i><span>10-15</span><br>';
      div.innerHTML +=
        '<i style="background: #FFD700"></i><span> 5-10 </span><br>';
      div.innerHTML +=
        '<i style="background: #FFFF00"></i><span> 1-5 </span><br>';
      div.innerHTML +=
        '<i style="background: #9ACD32"></i><span> less than 1</span><br>';
  
      return div;
    };

   

// Define variables for our tile layers
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark
};

// Overlays that may be toggled on or off
var overlayMaps = {
  Earthquake_layer: EQLayer
};

// Create map object and set default layers
var myMap = L.map("map-id", {
  center: [-25.2744, 133.775],
  zoom: 3,
  layers: [light, EQLayer]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

legend.addTo(myMap);


  });
