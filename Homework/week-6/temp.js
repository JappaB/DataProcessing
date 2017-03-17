// Jasper Bakker linked views


/* Vragen:
- De countrycodes (is een js bestand) kan ik niet meer accessen als ik eenmaal in de queue functie zit.
- de fillKey goed krijgen lukt niet => moet ik misschien alle getallen van string naar number krijgen? => Hoe loop je dan makkelijk over al die getallen in de hele lifeexpectancy database
- Hoe weet d3 welke d je moet gebruiken bij function(d). Er kunnen zoveel datavariabelen zijn...
- Tooltip krijg ik niet naast de scatterplot circle
- map tooltip geeft een vreemd jaar aan (259 ipv 2011 in de beginsituatie)
- Ik moet bij de scatterplot de ene dataset met de ander vermengen... HOE?



*/

// Make sure all scriptfiles are loaded before using them
window.onload = function() {


	queue()
		.defer(d3.json, 'lifeExpectancy.json')
		.defer(d3.json, 'healthPercGDP.json')
		.await(ready);

};


function ready(error, lifeExpectancy, healthPercGDP){
var countryCodes =[
    ["af", "AFG", "Afghanistan"],
    ["ax", "ALA", "Åland Islands"],
    ["al", "ALB", "Albania"],
    ["dz", "DZA", "Algeria"],
    ["as", "ASM", "American Samoa"],
    ["ad", "AND", "Andorra"],
    ["ao", "AGO", "Angola"],
    ["ai", "AIA", "Anguilla"],
    ["aq", "ATA", "Antarctica"],
    ["ag", "ATG", "Antigua and Barbuda"],
    ["ar", "ARG", "Argentina"],
    ["am", "ARM", "Armenia"],
    ["aw", "ABW", "Aruba"],
    ["au", "AUS", "Australia"],
    ["at", "AUT", "Austria"],
    ["az", "AZE", "Azerbaijan"],
    ["bs", "BHS", "Bahamas"],
    ["bh", "BHR", "Bahrain"],
    ["bd", "BGD", "Bangladesh"],
    ["bb", "BRB", "Barbados"],
    ["by", "BLR", "Belarus"],
    ["be", "BEL", "Belgium"],
    ["bz", "BLZ", "Belize"],
    ["bj", "BEN", "Benin"],
    ["bm", "BMU", "Bermuda"],
    ["bt", "BTN", "Bhutan"],
    ["bo", "BOL", "Bolivia, Plurinational State of"],
    ["bq", "BES", "Bonaire, Sint Eustatius and Saba"],
    ["ba", "BIH", "Bosnia and Herzegovina"],
    ["bw", "BWA", "Botswana"],
    ["bv", "BVT", "Bouvet Island"],
    ["br", "BRA", "Brazil"],
    ["io", "IOT", "British Indian Ocean Territory"],
    ["bn", "BRN", "Brunei Darussalam"],
    ["bg", "BGR", "Bulgaria"],
    ["bf", "BFA", "Burkina Faso"],
    ["bi", "BDI", "Burundi"],
    ["kh", "KHM", "Cambodia"],
    ["cm", "CMR", "Cameroon"],
    ["ca", "CAN", "Canada"],
    ["cv", "CPV", "Cape Verde"],
    ["ky", "CYM", "Cayman Islands"],
    ["cf", "CAF", "Central African Republic"],
    ["td", "TCD", "Chad"],
    ["cl", "CHL", "Chile"],
    ["cn", "CHN", "China"],
    ["cx", "CXR", "Christmas Island"],
    ["cc", "CCK", "Cocos (Keeling) Islands"],
    ["co", "COL", "Colombia"],
    ["km", "COM", "Comoros"],
    ["cg", "COG", "Congo"],
    ["cd", "COD", "Congo, the Democratic Republic of the"],
    ["ck", "COK", "Cook Islands"],
    ["cr", "CRI", "Costa Rica"],
    ["ci", "CIV", "Côte d'Ivoire"],
    ["hr", "HRV", "Croatia"],
    ["cu", "CUB", "Cuba"],
    ["cw", "CUW", "Curaçao"],
    ["cy", "CYP", "Cyprus"],
    ["cz", "CZE", "Czech Republic"],
    ["dk", "DNK", "Denmark"],
    ["dj", "DJI", "Djibouti"],
    ["dm", "DMA", "Dominica"],
    ["do", "DOM", "Dominican Republic"],
    ["ec", "ECU", "Ecuador"],
    ["eg", "EGY", "Egypt"],
    ["sv", "SLV", "El Salvador"],
    ["gq", "GNQ", "Equatorial Guinea"],
    ["er", "ERI", "Eritrea"],
    ["ee", "EST", "Estonia"],
    ["et", "ETH", "Ethiopia"],
    ["fk", "FLK", "Falkland Islands (Malvinas)"],
    ["fo", "FRO", "Faroe Islands"],
    ["fj", "FJI", "Fiji"],
    ["fi", "FIN", "Finland"],
    ["fr", "FRA", "France"],
    ["gf", "GUF", "French Guiana"],
    ["pf", "PYF", "French Polynesia"],
    ["tf", "ATF", "French Southern Territories"],
    ["ga", "GAB", "Gabon"],
    ["gm", "GMB", "Gambia"],
    ["ge", "GEO", "Georgia"],
    ["de", "DEU", "Germany"],
    ["gh", "GHA", "Ghana"],
    ["gi", "GIB", "Gibraltar"],
    ["gr", "GRC", "Greece"],
    ["gl", "GRL", "Greenland"],
    ["gd", "GRD", "Grenada"],
    ["gp", "GLP", "Guadeloupe"],
    ["gu", "GUM", "Guam"],
    ["gt", "GTM", "Guatemala"],
    ["gg", "GGY", "Guernsey"],
    ["gn", "GIN", "Guinea"],
    ["gw", "GNB", "Guinea-Bissau"],
    ["gy", "GUY", "Guyana"],
    ["ht", "HTI", "Haiti"],
    ["hm", "HMD", "Heard Island and McDonald Islands"],
    ["va", "VAT", "Holy See (Vatican City State)"],
    ["hn", "HND", "Honduras"],
    ["hk", "HKG", "Hong Kong"],
    ["hu", "HUN", "Hungary"],
    ["is", "ISL", "Iceland"],
    ["in", "IND", "India"],
    ["id", "IDN", "Indonesia"],
    ["ir", "IRN", "Iran, Islamic Republic of"],
    ["iq", "IRQ", "Iraq"],
    ["ie", "IRL", "Ireland"],
    ["im", "IMN", "Isle of Man"],
    ["il", "ISR", "Israel"],
    ["it", "ITA", "Italy"],
    ["jm", "JAM", "Jamaica"],
    ["jp", "JPN", "Japan"],
    ["je", "JEY", "Jersey"],
    ["jo", "JOR", "Jordan"],
    ["kz", "KAZ", "Kazakhstan"],
    ["ke", "KEN", "Kenya"],
    ["ki", "KIR", "Kiribati"],
    ["kp", "PRK", "Korea, Democratic People's Republic of"],
    ["kr", "KOR", "Korea, Republic of"],
    ["kw", "KWT", "Kuwait"],
    ["kg", "KGZ", "Kyrgyzstan"],
    ["la", "LAO", "Lao People's Democratic Republic"],
    ["lv", "LVA", "Latvia"],
    ["lb", "LBN", "Lebanon"],
    ["ls", "LSO", "Lesotho"],
    ["lr", "LBR", "Liberia"],
    ["ly", "LBY", "Libya"],
    ["li", "LIE", "Liechtenstein"],
    ["lt", "LTU", "Lithuania"],
    ["lu", "LUX", "Luxembourg"],
    ["mo", "MAC", "Macao"],
    ["mk", "MKD", "Macedonia, the former Yugoslav Republic of"],
    ["mg", "MDG", "Madagascar"],
    ["mw", "MWI", "Malawi"],
    ["my", "MYS", "Malaysia"],
    ["mv", "MDV", "Maldives"],
    ["ml", "MLI", "Mali"],
    ["mt", "MLT", "Malta"],
    ["mh", "MHL", "Marshall Islands"],
    ["mq", "MTQ", "Martinique"],
    ["mr", "MRT", "Mauritania"],
    ["mu", "MUS", "Mauritius"],
    ["yt", "MYT", "Mayotte"],
    ["mx", "MEX", "Mexico"],
    ["fm", "FSM", "Micronesia, Federated States of"],
    ["md", "MDA", "Moldova, Republic of"],
    ["mc", "MCO", "Monaco"],
    ["mn", "MNG", "Mongolia"],
    ["me", "MNE", "Montenegro"],
    ["ms", "MSR", "Montserrat"],
    ["ma", "MAR", "Morocco"],
    ["mz", "MOZ", "Mozambique"],
    ["mm", "MMR", "Myanmar"],
    ["na", "NAM", "Namibia"],
    ["nr", "NRU", "Nauru"],
    ["np", "NPL", "Nepal"],
    ["nl", "NLD", "Netherlands"],
    ["nc", "NCL", "New Caledonia"],
    ["nz", "NZL", "New Zealand"],
    ["ni", "NIC", "Nicaragua"],
    ["ne", "NER", "Niger"],
    ["ng", "NGA", "Nigeria"],
    ["nu", "NIU", "Niue"],
    ["nf", "NFK", "Norfolk Island"],
    ["mp", "MNP", "Northern Mariana Islands"],
    ["no", "NOR", "Norway"],
    ["om", "OMN", "Oman"],
    ["pk", "PAK", "Pakistan"],
    ["pw", "PLW", "Palau"],
    ["ps", "PSE", "Palestine, State of"],
    ["pa", "PAN", "Panama"],
    ["pg", "PNG", "Papua New Guinea"],
    ["py", "PRY", "Paraguay"],
    ["pe", "PER", "Peru"],
    ["ph", "PHL", "Philippines"],
    ["pn", "PCN", "Pitcairn"],
    ["pl", "POL", "Poland"],
    ["pt", "PRT", "Portugal"],
    ["pr", "PRI", "Puerto Rico"],
    ["qa", "QAT", "Qatar"],
    ["re", "REU", "Réunion"],
    ["ro", "ROU", "Romania"],
    ["ru", "RUS", "Russian Federation"],
    ["rw", "RWA", "Rwanda"],
    ["bl", "BLM", "Saint Barthélemy"],
    ["sh", "SHN", "Saint Helena, Ascension and Tristan da Cunha"],
    ["kn", "KNA", "Saint Kitts and Nevis"],
    ["lc", "LCA", "Saint Lucia"],
    ["mf", "MAF", "Saint Martin (French part)"],
    ["pm", "SPM", "Saint Pierre and Miquelon"],
    ["vc", "VCT", "Saint Vincent and the Grenadines"],
    ["ws", "WSM", "Samoa"],
    ["sm", "SMR", "San Marino"],
    ["st", "STP", "Sao Tome and Principe"],
    ["sa", "SAU", "Saudi Arabia"],
    ["sn", "SEN", "Senegal"],
    ["rs", "SRB", "Serbia"],
    ["sc", "SYC", "Seychelles"],
    ["sl", "SLE", "Sierra Leone"],
    ["sg", "SGP", "Singapore"],
    ["sx", "SXM", "Sint Maarten (Dutch part)"],
    ["sk", "SVK", "Slovakia"],
    ["si", "SVN", "Slovenia"],
    ["sb", "SLB", "Solomon Islands"],
    ["so", "SOM", "Somalia"],
    ["za", "ZAF", "South Africa"],
    ["gs", "SGS", "South Georgia and the South Sandwich Islands"],
    ["ss", "SSD", "South Sudan"],
    ["es", "ESP", "Spain"],
    ["lk", "LKA", "Sri Lanka"],
    ["sd", "SDN", "Sudan"],
    ["sr", "SUR", "Suriname"],
    ["sj", "SJM", "Svalbard and Jan Mayen"],
    ["sz", "SWZ", "Swaziland"],
    ["se", "SWE", "Sweden"],
    ["ch", "CHE", "Switzerland"],
    ["sy", "SYR", "Syrian Arab Republic"],
    ["tw", "TWN", "Taiwan, Province of China"],
    ["tj", "TJK", "Tajikistan"],
    ["tz", "TZA", "Tanzania, United Republic of"],
    ["th", "THA", "Thailand"],
    ["tl", "TLS", "Timor-Leste"],
    ["tg", "TGO", "Togo"],
    ["tk", "TKL", "Tokelau"],
    ["to", "TON", "Tonga"],
    ["tt", "TTO", "Trinidad and Tobago"],
    ["tn", "TUN", "Tunisia"],
    ["tr", "TUR", "Turkey"],
    ["tm", "TKM", "Turkmenistan"],
    ["tc", "TCA", "Turks and Caicos Islands"],
    ["tv", "TUV", "Tuvalu"],
    ["ug", "UGA", "Uganda"],
    ["ua", "UKR", "Ukraine"],
    ["ae", "ARE", "United Arab Emirates"],
    ["gb", "GBR", "United Kingdom"],
    ["us", "USA", "United States"],
    ["um", "UMI", "United States Minor Outlying Islands"],
    ["uy", "URY", "Uruguay"],
    ["uz", "UZB", "Uzbekistan"],
    ["vu", "VUT", "Vanuatu"],
    ["ve", "VEN", "Venezuela, Bolivarian Republic of"],
    ["vn", "VNM", "Viet Nam"],
    ["vg", "VGB", "Virgin Islands, British"],
    ["vi", "VIR", "Virgin Islands, U.S."],
    ["wf", "WLF", "Wallis and Futuna"],
    ["eh", "ESH", "Western Sahara"],
    ["ye", "YEM", "Yemen"],
    ["zm", "ZMB", "Zambia"],
    ["zw", "ZWE", "Zimbabwe"] ];

	// If error, show in console
	if (error) return console.warn(error);

	// Default year and country when first rendering map
	var year = 2011;
	var country = "Netherlands";

	data = {}

	// Using colorblind safe colors from colorbrewer2.org 
	var colorArray = ["lowest", "low", "middle", "high", "highest"]

		// number of years (= number of objects per country minus 1 for the name of the country)
		number = Object.keys(lifeExpectancy[1]).length - 1


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
		var denumerator = max /5;


		// // Make the datastructure
		for (var i = 0; i < lifeExpectancy.length; i++){


	    	for (var j = 0; j < countryCodes.length; j++){


	      			if(lifeExpectancy[i]["country"] == countryCodes[j][2]){

		        		data[countryCodes[j][1]] = {}

		        		for(var k = 0; k < number; k++){
		        			var year = 1995 + k;
		        			data[countryCodes[j][1]][Object.keys(lifeExpectancy[i])[k]] = 
		        				{fillKey: (Math.floor((lifeExpectancy[i][year] - min)/denumerator)),
		        				country: lifeExpectancy[i]["country"], 
		        				lifeExpectancy: lifeExpectancy[i][Object.keys(lifeExpectancy[i])[k]],
		        				healthPercGDP: healthPercGDP[i][Object.keys(healthPercGDP[i])[k]]}
		        		}
		        	}
	      		

	    	}
	    }


	 var data2 = {};
	    	// Make the datastructure
		for (var i = 0; i < lifeExpectancy.length; i++){
	    	// var object = data[i];
		    for(var k = 0; k < number; k++){
				var year = 1995 + k;
				data2[Object.keys(lifeExpectancy[i])[k]] = {}


	    		for (var j = 0; j < countryCodes.length; j++){
	      			// ["..."] to be able to walk over strings

	      			if(lifeExpectancy[i]["country"] == countryCodes[j][2]){

		        		data2[Object.keys(lifeExpectancy[i])[k]][countryCodes[j][1]] = {
		        			fillKey: (Math.floor((lifeExpectancy[i][year] - min)/denumerator)),
	        				country: lifeExpectancy[i]["country"], 
	        				lifeExpectancy: lifeExpectancy[i][Object.keys(lifeExpectancy[i])[k]],
	        				healthPercGDP: healthPercGDP[i][Object.keys(healthPercGDP[i])[k]]}
		        	}
		       	}
	    	}
	    }


    console.log(Object.keys(lifeExpectancy[1]))
    console.log(countryCodes[0][1],countryCodes[1][1],countryCodes[2][1],countryCodes[0][2])
    console.log(data)
    console.log("data2",data2)


    // Make the datastructure






    makeMap(data2, year);
   makeScatter(lifeExpectancy, healthPercGDP, country)





}

// function selectYear(lifeExpectancy = 1999, year){

// 	// Pass values of the year needed
// 	var lifeExpectancyYear = {};
// 	var year = year;


// 	console.log(lifeExpectancy)

// // taking only the relevant information by selecting only the given year
// 	// for (i = 0; i < lifeExpectancy.length; i++){
//  //    	var object = lifeExpectancyYear[i];






// }



function makeMap(data, year){

	console.log("datamap", data);

	// Using colorblind safe colors from colorbrewer2.org 
	var colorArray = ["#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c"]

	//  // Creating the map
	var map = new Datamap ({
		element: document.getElementById('container'),
		responsive: true,

	    // Fill the countries with the right colors (https://www.w3schools.com/colors/colors_hexadecimal.asp)
	    fills: {
	    	'1': colorArray[0],
	    	'2': colorArray[1],
	    	'3': colorArray[2],
	    	'4': colorArray[3],
	    	'5': colorArray[4],
	    	defaultFill : "#FFFFFF" 
	    },
	    // Input data data[year]
	    data: data[year],
	    // Styling
	    geographyConfig: {
	      borderColor: 'black',
	      highlightBorderColor: 'white',
	      highlightOnHover: true,
	      highlightFillColor: false,
	          popupTemplate: function(geography, mapData) {
	            return '<div class="hoverinfo">' + 'Life expectancy in the year ' + year + ': '
	            + mapData.lifeExpectancy + '<br> Country name: ' + mapData.name 
	          }
	    },
	    done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                updateCountry(lifeExpectancy, healthPercGDP, mapData.name);
            });
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

	// slider source: http://bl.ocks.org/cmdoptesc/fc0e318ce7992bed7ca8



}

function makeScatter(lifeExpectancy, healthPercGDP, country){

	

	//http://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object
	var filteredData = lifeExpectancy.filter(d => d.country === country);
	var filteredData2 = healthPercGDP.filter(d => d.country === country);
	countryData = [];
	countryData2 = [];

	// adding the life expectancy data
  	for (var prop in filteredData[0]){
    	countryData.push({
      	year: +prop,
      	expect: filteredData[0][prop]
      	})
    }

    // adding the percentage of the GDP that goes to healthcare

   for (var prop in filteredData2[0]){
   		countryData2.push({
   			year: +prop,
   			percentage: filteredData2[0][prop]
   		})

   }


	// source http://bl.ocks.org/weiglemc/6185069

	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// setup x 
var xValue = function(d) { return d.year;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	var y = d3.scale.linear()
	    .range([height, 0]);

// setup y
var yValue = function(d) { return d.expect;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Hier nog de data naar getallen mappen???

// don't want dots overlapping axis, so add in buffer to data domain
xScale.domain([d3.min(countryData, xValue)-1, d3.max(countryData, xValue)+1]);
yScale.domain([d3.min(countryData, yValue)-1, d3.max(countryData, yValue)+1]);


// x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("year");

  // y-axis
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

      // create tooltip
var tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tip')


  // draw dots
  svg.selectAll(".dot")
      .data(countryData)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d) 
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  // // draw legend
  // var legend = svg.selectAll(".legend")
  //     .data(color.domain())
  //   .enter().append("g")
  //     .attr("class", "legend")
  //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // // draw legend text
  // legend.append("text")
  //     .attr("x", width - 24)
  //     .attr("y", 9)
  //     .attr("dy", ".35em")
  //     .style("text-anchor", "end")
  //     .text(function(d) { return d;})

}





function updateCountry(lifeExpectancy, healthPercGDP, updatedCountry){


	makeScatter(lifeExpectancy, healthPercGDP, updatedCountry);


}

function updateYear(data){

	// http://stackoverflow.com/questions/29438410/update-variable-with-html-slider

	// Update map and update chart
 //  	makeMap(updatedData);
	// makeScatter(updatedData);

}