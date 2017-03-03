// Jasper Bakker - Map of mobile phones per 100 people
//"use strict"; 

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

  // Link mobile phone dataset with countrycodes and categorize the mobile phone dataset
  for (i = 0; i < data.length; i++){
    var object = data[i];

    for (j = 0; j < countryCodes.length; j++){
      // ["..."] to be able to walk over strings
      if (object["Mobile cellular subscriptions (per 100 people)"] == countryCodes[j][2]){
        object.countryCodes = countryCodes[j][1]
      }
    }

    // Putting al the relevant information IN the country code object
    // for (j = 0; j < countryCodes.length; j++){

    // No Data (to append to Json, source: http://stackoverflow.com/questions/736590/add-new-attribute-element-to-json-object-using-javascript)
    if (object["2011"] == null){
      object.fillKey = "noData";
    }

    // 0-33 phones per 100 people ()
    if (0 < object["2011"] && object["2011"] <= 33){
      object.fillKey = "phones0To33";
    }    

    // 34-66 Phones per 100 people
    if (34 <= object["2011"] && object["2011"] <= 66){
      object.fillKey = "phones34To66";
    }

    // 67-99 phones per 100 people
    if (67 <= object["2011"] && object["2011"] <= 100){
      object.fillKey = "phones67To99";
    }

    // 100 - 133 phones per 100 people
    if (100 <= object["2011"] && object["2011"] <= 133){
      object.fillKey = "phones100To133";
    }

    // 134+ phones per 100 people
    if (134 <= object["2011"]){
      object.fillKey = "phones134AndMore";
    }
  }



  // Hier werkt het uitlezen van data al niet
  console.log("1",data)
  if(data.fillKey == "phones134AndMore"){
    console.log("fillkey",data)
  }
  console.log("2",data.fillKey)
  console.log("3",data['fillKey'])
  console.log("4",data[6].fillKey)

  // Color codes (source: http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/)
  //var ramp = d3.scale.linear().domain([0,134]).range(["white","darkgreen"]);

  // Creating the map
  var map = new Datamap ({
    element: document.getElementById('container'),

    // Fill the countries with the right colors (https://www.w3schools.com/colors/colors_hexadecimal.asp)
    fills: {
    'noData': "#f2f2f2",
    phones0To33: "20c620",
    phones34To66: "#20a420",
    phones67To99: "#207b20",
    phones100To133: "#205b20",
    phones134AndMore: "#203020",
    },
      data: data,
    //   for (i = 0; i < data.length; i++){
    //     if()

    // Hier wilde ik dan met if-statements zorgen dat de telefooncategorieën worden gekoppeld aan
    // de landen codes middels een for-loop. Echter krijg ik dus geen acces tot de  


   
    // },
    // arcConfig: {
    //   strokeColor: '#DD1C77',
    //   strokeWidth: 1,
    //   arcSharpness: 1,
    //   animationSpeed: 600
    // },
    geography_config: {
      borderColor: 'rgba(255,255,255,0.3)',
       highlightBorderColor: 'rgba(0,0,0,0.5)',

       // Omdat ik niet de juiste datamaps file kan inladen werkt de onderstaande popuptemplate ook niet. Hij herkent de variabele '_' niet

      // popupTemplate: _.template([
      //  '<div class="hoverinfo">',
      //  '<% if (data["Mobile cellular subscriptions (per 100 people)"]) { %> <strong><%= data.["Mobile cellular subscriptions (per 100 people)"] %></strong><br/><% } %>',
      //  '<% if (data.startOfConflict) { %>',
      //  'Started in <%= data.startOfConflict %><br/> <% } %>',
      //  '</div>'
      // ].join('') )
    // popupTemplate: function(geography, data) {
    //   console.log("6",geography.properties.name)
    //   // return '<div class="hoverinfo">' + geography.properties.name + ' 
    //   // Electoral Votes:' +  data[0]["2011"] + ' '
    // },

    }
});




// 1 kleur geeft hij nog niet in de legenda vreemd genoeg.


  // Creating a legend 
  map.legend({
    legendTitle: "# Phones per 100 people",
    labels: {
      noData: "No data",
      phones0To33: "0-33",
      phones34To66: "34-66",
      phones67To99: "67-99",
      phones100To133: "100-133",
      phones134AndMore: "134+"
    }
  });

}


