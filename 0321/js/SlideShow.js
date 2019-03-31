/* =====================
  Slides Variables
===================== */
//Showing the number of slides
var currentSlide = 0;

// Title for each slide
var slideTitle = ["Overview of Available Houses in Beijing", "Area", "Unit Price", "Year Built",
                  "Within School District"];
var information = [$('#infoForSlide0'), $('#infoForSlide1'), $('#infoForSlide2'), $('#infoForSlide3'),$('#infoForSlide4')];
var legend = [$('#legend0'),$('#legend1'),$('#legend2'),$('#legend3'), $('#legend4')];

//Show information in 5 categories for every point
var myPopups = function(myObject) {
  var myHtml = "";
  myHtml += "<table><tr><th>Name:</th><td>"+ myObject.properties.name + "</td></tr></table>";
  myHtml += "<table><tr><th>Area(m^2):</th><td>"+ myObject.properties.area + "</td></tr></table>";
  myHtml += "<table><tr><th>Unit Price(￥/m^2):</th><td>"+ myObject.properties.priceperm2 + "</td></tr></table>";
  myHtml += "<table><tr><th>Built Year:</th><td>"+ myObject.properties.yearbuilt + "</td></tr></table>";
  myHtml += "<table><tr><th>Within School District:</th><td>"+ myObject.properties.schooldistrict + "</td></tr></table>";
  return myHtml;
};

//hide the "previous" button for the first slide
$('#button-previous').hide();

/* =====================
  Map Setup
===================== */
// Center and Scale of the Basemap
var map = L.map('map', {
  center: [39.91, 116.39],
  zoom: 10
});

var tileOpts = {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
};
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', tileOpts).addTo(map);


/* =====================
  Get Data
===================== */
// Ajax to grab geojson//

var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/geojson/housingprice_Beijing.geojson");
var parseData = function(downloadedData){
  return JSON.parse(downloadedData).features;
};

//Show data for each slide
var parsed;
var markers = [];
var plotMarkers;
var featureLayer = [];

var plotMarkers = function(parsedData) {
  _.each(parsedData, function(myObject){
    myMarker = L.circleMarker([myObject.geometry.coordinates[1], myObject.geometry.coordinates[0]],
    {radius: 10,
      color:'#6d6d6d',
      weight: 5,
      opacity: 0.2,
      fillColor: '#6d6d6d',
      fillOpacity: 0.2});
    myMarker.addTo(map);
    markers.push(myMarker);
  });
};

var plotDefault = function(parsedData,currentSlide) {
  _.each(parsedData, function(myObject){
    plotMarkers = L.circleMarker([myObject.geometry.coordinates[1], myObject.geometry.coordinates[0]],
    selectStyles(myObject, currentSlide)); //in selectionStandard.js
    plotMarkers.bindPopup(myPopups(myObject)).addTo(map);
    markers.push(plotMarkers);
  });
};

var slideDefault = function(data, currentSlide) {
  parsed = parseData(data);
  plotMarkers(parsed);
  plotDefault(parsed, currentSlide);
};

$(document).ready(function() {
  downloadData.done(function(data){
    slideDefault(data, currentSlide);
  });
});

/* =====================
  Changing Slides
===================== */
var slideMove0 = function() {
  featureLayer.push(L.geoJson(parsed, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, selection0);
    }
  }));
  featureLayer[0].addTo(map);
  plotDefault(parsed, currentSlide);
};

var slideMove1 = function() {
  featureLayer.push(L.geoJson(parsed, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, selection1(feature));
    }
  }));
  featureLayer[1].addTo(map);
  plotDefault(parsed, currentSlide);
};

var slideMove2 = function() {
  featureLayer.push(L.geoJson(parsed, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, selection2(feature));
    }
  }));
  featureLayer[2].addTo(map);
  plotDefault(parsed, currentSlide);
};


var slideMove3 = function() {
  featureLayer.push(L.geoJson(parsed, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, selection3(feature));
    }
  }));
  featureLayer[3].addTo(map);
  plotDefault(parsed, currentSlide);
};

var slideMove4 = function() {
  featureLayer.push(L.geoJson(parsed, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, selection4(feature));
    }
  }));
  featureLayer[4].addTo(map);
  plotDefault(parsed, currentSlide);
};

//Function for changing slides
var slideShow = [slideMove0, slideMove1, slideMove2, slideMove3, slideMove4];

/* =====================
  Remove Functions
===================== */
var removeMarkers = function(markers){
  _.each(markers, function(marker){
    map.removeLayer(marker);
  });
};


/* =====================
  Changing data for each slide
===================== */
var filterDataNext = function(currentSlide){
  removeMarkers(markers);

  slideShow[currentSlide-1]();

  information[currentSlide-1].hide();
  legend[currentSlide-1].hide();

  information[currentSlide].show();
  legend[currentSlide].show();

};

var filterDataPrevious = function(currentSlide){
  removeMarkers(markers);

  slideShow[currentSlide]();

  information[currentSlide + 1].hide();
  legend[currentSlide + 1].hide();

  information[currentSlide].show();
  legend[currentSlide].show();
};

/* =====================
  Clicking Buttons
===================== */
var clickPrevious = function() {
  $('#button-next').show();
  currentSlide -= 1;
  filterDataPrevious(currentSlide);
  $('#slideTitle').text(slideTitle[currentSlide]);
  $('#infoForSlide' + currentSlide).show();
  $('#pageNumber').text(currentSlide + 1);

  map.setView([39.91, 116.39],10);

  //No previous button on the first slide
  if (currentSlide === 0){
    $('#button-previous').hide();
  }
  //For other four slides
  else if (currentSlide > 0){
    $('#button-previous').show();
  }
};

//Click Previous in HTML
$('#button-previous').click(function(){
  clickPrevious();
});

var clickNext = function() {
  $('#button-previous').show();
  currentSlide += 1;
  filterDataNext(currentSlide);
  $('#slideTitle').text(slideTitle[currentSlide]);
  $('#infoForSlide' + currentSlide).show();
  $('#pageNumber').text(currentSlide + 1);

  //No next button on the last slide
  if (currentSlide === 4){
    $('#button-next').hide();
    //Change the center and scale of the map
    map.setView([39.90, 116.40],11);
  }

  //For other four slides
  else if (currentSlide < 4){
    $('#button-next').show();
  }
};

//Click Next in HTML
$('#button-next').click(function(){
  clickNext();
});
