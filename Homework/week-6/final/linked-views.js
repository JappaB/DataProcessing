// Jasper Bakker linked views


/* Problemen:
- Had veel moeite om 'year' te accessen buiten de jquery functie (ondanks dat ik er een global variable van heb gemaakt).
Daarom heb ik zelfs de queue maar in de jquery functie gezet, zodat ik in ieder geval die extra interactie er in kan brengen. 
- Als ik een land een nieuwe kleur heb gegeven door op de scatter te drukken, kan ik niet meer de oude kleur terugkrijgen.
- De tooltip van de scatterplot komt niet bij het juiste bolletje



*/

// Make sure all scriptfiles are loaded before using them

// Global variables
var map;
var colorArray = ["#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c"];
var year;
var first = 0
var data = {};
var legend;
var scatter;


// Load DOM first
window.onload = function() {

    queue()
        .defer(d3.json, 'lifeExpectancy.json')
        .defer(d3.json, 'healthPercGDP.json')
        .await(ready);

    //sources: http://stackoverflow.com/questions/24620741/get-selected-item-value-from-bootstrap-dropdown-with-specific-id
   // http://www.java2s.com/Tutorials/HTML_CSS/Bootstrap_Example/Dropdown/Handle_dropdown_menu_click_event.htm
$(".dropdown-menu li a").click(function(){
        year = $(this).attr("data-id");

        //remove old elements
        d3.select(".datamap").remove();
        d3.select(".datamaps-hover").remove();
        d3.select(".scatter").remove();
        d3.select(".datamaps-legend").remove();

        makeMap(data, year);
        makeScatter(data, year);
        });
};


function ready(error, lifeExpectancy, healthPercGDP){

	// If error, show in console
	if (error) return console.warn(error);

    // If data has been loaded once, then first remove old datamap before creating new one.

    if (first == 1){
       
    }

    first = 1;



		// number of years (= number of objects per country minus 1 for the name of the country)
		var number = Object.keys(lifeExpectancy[1]).length - 1


		// getting the minimum and the maximum life expectancy of the entire dataset
		var min = Number.MAX_VALUE,
	    max = -Number.MAX_VALUE;

		lifeExpectancy.forEach(function (o) {
		    Object.keys(o).forEach(function (k) {                
		        if (k !== 'country' && o[k] !== null) {
		            min = Math.min(min, o[k]);
		            max = Math.max(max, o[k]);
		        }
		    });
		});

		// calculating the denumerator 
		var denumerator = (max-min) /5;


        // Make the datastructure
        // (Trying to) make ranges with 2 decimals
        var LifeExpectArray = [min + " - " + (Math.round((min + denumerator)*100)/100),
        (Math.round((min + denumerator)*100)/100 + 0.01) + " - " + (Math.round((min + 2 * denumerator)*100)/100),
        (Math.round((min + 2 * denumerator)*100)/100 + 0.01) + " - " + (Math.round((min + 3 * denumerator)*100)/100),
        (Math.round((min + 3 * denumerator)*100)/100 + 0.01) + " - " + (Math.round((min + 4 * denumerator)*100)/100),
        (Math.round((min + 4 * denumerator)*100)/100 + 0.01) + " - " + (Math.round((min + 5 * denumerator)*100)/100)]




        // Creating the datastructure
        for(var k = 0; k < number; k++){
                var year = 1995 + k;
                data[year] = {};
            for (var i = 0; i < lifeExpectancy.length; i++){

                for (var j = 0; j < countryCodes.length; j++){
                    // ["..."] to be able to walk over strings

                    if(lifeExpectancy[i]["country"] == countryCodes[j][2]){

                        data[year][countryCodes[j][1]] = {
                            fillKey: LifeExpectArray[(Math.floor((lifeExpectancy[i][year] - min)/denumerator))],
                            country: lifeExpectancy[i]["country"], 
                            countryCode: countryCodes[j][1],
                            lifeExpectancy: lifeExpectancy[i][Object.keys(lifeExpectancy[i])[k]],
                            healthPercGDP: healthPercGDP[i][Object.keys(healthPercGDP[i])[k]]}
                    }
                }
            }
        }

    // Default year when first rendering map and scatterplot
    year = 1995;

	// Make scatter and make map
   makeMap(data, year);
   makeScatter(data, year);

}

function makeMap(data, year){

	// Using colorblind safe colors from colorbrewer2.org 

	// Creating the map
  map = new Datamap ({
	element: document.getElementById('map'),
	responsive: true,

    // Fill the countries with the right colors (https://www.w3schools.com/colors/colors_hexadecimal.asp)
    fills: {
    	"32.2 - 42.72": colorArray[0],
    	"42.73 - 53.24": colorArray[1],
    	"53.25 - 63.76": colorArray[2],
    	
      "63.769999999999996 - 74.28": colorArray[3],
    	"74.29 - 84.8": colorArray[4],
    	defaultFill : "#FFFFFF" 
    },
    // Input data
    data: data[year],
    // Styling
    geographyConfig: {
      borderColor: 'black',
      highlightBorderColor: 'white',
      highlightOnHover: true,
      highlightFillColor: false,
          popupTemplate: function(geography, data) {
            return '<div class="hoverinfo">' + 'Life expectancy in the year ' + year + ': '
            + data.lifeExpectancy + '<br> Country name: ' + data.country + '<br> healthcare:' 
              + data.healthPercGDP + ' (% GDP)' 
          }
    },
    // When clicking on a country, update the scatterplot (not finished)
    done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              var countryCode = map.options.data[geography.id].countryCode
              updateCountry(countryCode, data, year);
          });
      }

	});

	//  Creating a legend 
	legend = map.legend({
	 legendTitle: "Life Expectancy ("+ year + "):"
	});



}

function makeScatter(data, year){

	// Source http://bl.ocks.org/weiglemc/6185069

	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = 500 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

	// Setup x 
  var xValue = function(d) {return d["healthPercGDP"];}, // data -> value
      xScale = d3.scale.linear().range([0, width]), // value -> display
      xMap = function(d) {return xScale(xValue(d));}, // data -> display
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");

	
// Get min and max values for the domain

//http://stackoverflow.com/questions/11734417/javascript-equivalent-of-pythons-values-dictionary-method
//http://stackoverflow.com/questions/33946567/javascript-iterate-over-values-of-map

  var minLifeExpectancy = Number.MAX_VALUE,
  maxLifeExpectancy = -Number.MAX_VALUE;


  Object.keys(data[year]).forEach(function (o) {


       Object.keys(data[year][o]).forEach(function (k) { 
          if(data[year][o]["lifeExpectancy"] !== null ){               
              minLifeExpectancy = Math.min(minLifeExpectancy, data[year][o]["lifeExpectancy"])
              maxLifeExpectancy = Math.max(maxLifeExpectancy, data[year][o]["lifeExpectancy"])
          }
       });
  });




  var minHealthPercGDP = Number.MAX_VALUE,
  maxHealthPercGDP= -Number.MAX_VALUE;


    Object.keys(data[year]).forEach(function (o) {


         Object.keys(data[year][o]).forEach(function (k) { 
            if(data[year][o]["healthPercGDP"] !== null ){               
                minHealthPercGDP = Math.min(minHealthPercGDP, data[year][o]["healthPercGDP"])
                maxHealthPercGDP = Math.max(maxHealthPercGDP, data[year][o]["healthPercGDP"])
            }
         });
    });


  // Setup Y
  var yValue = function(d) { return d["lifeExpectancy"];}, // data -> value
      yScale = d3.scale.linear().range([height, 0]), // value -> display
      yMap = function(d) { return yScale(yValue(d));}, // data -> display
      yAxis = d3.svg.axis().scale(yScale).orient("left");

	// Setup fill col
	var cValue = function(d) { return d.Manufacturer;},
	    color = d3.scale.category10();

	var svg = d3.select("body").append("svg")
          .classed("scatter", true)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                  	// // don't want dots overlapping axis, so add in buffer to data domain (the +5 and starting from 0)
                  	xScale.domain([0, maxHealthPercGDP + 5]);
                  	yScale.domain([0, maxLifeExpectancy + 5]);

// X-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Healthcare expenditures (% of GDP)");

  // Y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Life Expectancy (years)");

  var tip = d3.select('.scatter')
        .append('div')
        .attr('class', 'tip')
        .html('I am a tooltip...')
        .style('border', '1px solid steelblue')
        .style('padding', '5px')
        .style('position', 'absolute')
        .style('display', 'none')
        .on('mouseover', function(d, i) {
          tip.transition().duration(0);
        })
        .on('mouseout', function(d, i) {
          tip.style('display', 'none');
        });

    //svg.call(tip);   wilt alsnog niet werken


	// Draw dots
    scatterData =[];

    for (key in data[year]){
        scatterData.push(data[year][key])
    }


  svg.selectAll(".dot")
      .data(scatterData)
    .enter().append("circle")
    //filtering out the countries that have a 'null' value for one of the two variables
    .filter(function(d) { return d["healthPercGDP"] !== null && d["lifeExpectancy"] !== null})
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));})
      .on('click', function(d) {scatterClick(d)})
      .on('mouseover', function(d, i) {
        tip.transition().duration(0);
        tip.style('top', yScale(d["lifeExpectancy"]) - 20 + 'px');
        tip.style('left', xScale(d["healthPercGDP"]) + 'px');
        tip.style('display', 'block');
      })
      .on('mouseout', function(d, i) {
        tip.transition()
        .delay(500)
        .style('display', 'none');
      })


      // Interaction between the two visualizations
      var clickedColor;
      var clickedCountry;
      let fills = {
            "32.2 - 42.72": colorArray[0],
            "42.73 - 53.24": colorArray[1],
            "53.25 - 63.76": colorArray[2],
            
            "63.769999999999996 - 74.28": colorArray[3],
            "74.29 - 84.8": colorArray[4],
            defaultFill : "#FFFFFF" 
        }
    function scatterClick(selectedCountry){


        updateCountry = {};

        // Sets color back when clicking on different countries
        if(clickedColor){
            updateCountry[clickedCountry.countryCode] = clickedColor
        }
        console.log(clickedColor)
        clickedCountry = selectedCountry;
        clickedColor = fills[clickedCountry.countryCode.fillKey]
        var country = selectedCountry["countryCode"]
        updateCountry[country] = 'orange'
        map.updateChoropleth(updateCountry)
    }
}
