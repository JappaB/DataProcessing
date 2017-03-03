// Jasper Bakker - Map of mobile phones per 100 people

// Make sure all scriptfiles are loaded before using them
window.onload = function() {

  // Get data and within getData make the map
  getData();

};


// Get data and within getData make the map
function getData(){

// Loading and mapping data
d3.json("cellphones.json", function(error, data) {

  // If error, show in console
  if (error) return console.warn(error);

  // Create global variable for the dataset
  makeMap(data);

})};

// Funtion that categorizes the data and makes the map
function makeMap(data) {
      var mapData = {};
  // Link mobile phone dataset with countrycodes and categorize the mobile phone dataset
  for (i = 0; i < data.length; i++){
    var object = data[i];


    for (j = 0; j < countryCodes.length; j++){
      // ["..."] to be able to walk over strings
      if (object["Mobile cellular subscriptions (per 100 people)"] == countryCodes[j][2]){
        object.countryCodes = countryCodes[j][1]
      }
    }

    // Within the Countrycode object, create a fillkey and add the countryname and # of cellphones
    // No Data (to append to Json, source: http://stackoverflow.com/questions/736590/add-new-attribute-element-to-json-object-using-javascript)
    if (object["2011"] == null){
      mapData[object.countryCodes] = {fillKey: "noData",
       name: object["Mobile cellular subscriptions (per 100 people)"],
       cellphones: object["2011"]}
    }

    // 0-33 phones per 100 people ()
    if (0 < object["2011"] && object["2011"] <= 33){
     mapData[object.countryCodes] = {fillKey: "phones0To33",
       name: object["Mobile cellular subscriptions (per 100 people)"],
       cellphones: object["2011"]}
    }    

    // 34-66 Phones per 100 people
    if (34 <= object["2011"] && object["2011"] <= 66){
      mapData[object.countryCodes] = {fillKey: "phones34To66",
       name: object["Mobile cellular subscriptions (per 100 people)"],
       cellphones: object["2011"]}
    }

    // 67-99 phones per 100 people
    if (67 <= object["2011"] && object["2011"] <= 100){
      mapData[object.countryCodes] = {fillKey: "phones67To99",
       name: object["Mobile cellular subscriptions (per 100 people)"],
       cellphones: object["2011"]}
    }

    // 100 - 133 phones per 100 people
    if (100 <= object["2011"] && object["2011"] <= 133){
      mapData[object.countryCodes] = {fillKey: "phones100To133",
       name: object["Mobile cellular subscriptions (per 100 people)"],
       cellphones: object["2011"]}
    }

    // 134+ phones per 100 people
    if (134 <= object["2011"]){
      mapData[object.countryCodes] = {fillKey: "phones134AndMore",
       name: object["Mobile cellular subscriptions (per 100 people)"],
       cellphones: object["2011"]}
    }
  }
  
  // Creating the map
  var map = new Datamap ({
    element: document.getElementById('container'),

    // Fill the countries with the right colors (https://www.w3schools.com/colors/colors_hexadecimal.asp)
    fills: {
    'noData': "grey",
    'phones0To33': "#33f40c",
    'phones34To66': "#20a420",
    'phones67To99': "#207b20",
    'phones100To133': "#205b20",
    'phones134AndMore': "#203020",
    defaultFill: "grey" 
    },
    // Input data
    data: mapData,
    // Styling
    geographyConfig: {
      borderColor: 'black',
      highlightBorderColor: 'white',
      highlightOnHover: true,
      highlightFillColor: false,
          popupTemplate: function(geography, mapData) {
            return '<div class="hoverinfo">' + 'Number of cellphones: '
            + mapData.cellphones + '<br> Country name: ' + mapData.name 
          }
    }

  });

  //  Creating a legend 
  map.legend({
     legendTitle: "# Phones per 100 people",
     labels: {
       noData: "No data in dataset",
       phones0To33: "0-33",
       phones34To66: "34-66",
       phones67To99: "67-99",
       phones100To133: "100-133",
       phones134AndMore: "134+"
      }
  });
};






