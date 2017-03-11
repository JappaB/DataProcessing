// Jasper Bakker (10260250)



// Make sure all scriptfiles are loaded before using them
window.onload = function() {

  // Get data and pass the data to the function that makes the chart
  getData(makeChart);

};


// Get data
function getData(callback){

	// Loading data
	d3.json("weatherDeBilt.json", function(error, data) {

	  // If error, show in console
	  if (error) return console.warn(error);

	  // Parse date to a datetime format
	  var parseDate = d3.timeParse("%Y%m%d");

	  data.forEach(function(d) {
 		d.YYYYMMDD = parseDate(d.YYYYMMDD);
 		d.TG = +d.TG / 10;
		d.TN = +d.TN / 10;
		d.TX = +d.TX / 10;
 	  });

	  // Return the data
	  callback(data);
	})
};


// Reload data
function reloadData(filename, callback){

	// Loading data
	d3.json(filename, function(error, data) {

	  // If error, show in console
	  if (error) return console.warn(error);

	  // Parse date to a datetime format
	  var parseDate = d3.timeParse("%Y%m%d");

	  data.forEach(function(d) {
 		d.YYYYMMDD = parseDate(d.YYYYMMDD);
 		d.TG = +d.TG / 10;
		d.TN = +d.TN / 10;
		d.TX = +d.TX / 10;
 	  });

	  // Return the data
	  callback(data);
	})
};


// Make chart
function makeChart(data){

	// Select SVG and create margins
	var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleTime().range([0, width]),
	    y = d3.scaleLinear().range([height, 0]),
	    z = d3.scaleOrdinal(d3.schemeCategory10);



	// map is ook een soort loop functie, de (d) is het datapunt waar hij nu mee bezig is.
	// slice herhaalt hij steeds (door het .map)
	data.columns = ["YYYYMMDD","TG","TN","TX"];


	var chartData = data.columns.slice(1).map(function(id) {
	  return {

	    id: id,
	    values: data.map(function(d) {

	      return {date: d.YYYYMMDD, temperature: +d[id]};
	    })
	  };
	});

  // Create the lines

  var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

	// Create x domain
	x.domain(d3.extent(data, function(d) { return d.YYYYMMDD;}));

	//	Create y domain
	y.domain([
    d3.min(chartData, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
    d3.max(chartData, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
  	]);

	// Z domain to color the lines
   z.domain(chartData.map(function(c) { return c.id; }));


  // Create 
  g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Temperature, °C");

  var temperature = g.selectAll(".temperature")
    .data(chartData)
    .enter().append("g")
      .attr("class", "temperature");

  temperature.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); })
      .style("fill", "none")

  temperature.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });



// Make a mouse-over so it's easier to see the exact temperatures
  var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Make a line and a circle to folow the mouse and the graph
  mouseG.append("path")
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opatemp", "0");
  var lines = document.getElementsByClassName('line');
  var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(chartData)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");
  mousePerLine.append("circle")
      .attr("r", 3)
      .style("stroke", "black")
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opatemp", "0");
  mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

  // Make a rectangle over which the mouse will move   
  mouseG.append('svg:rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')

      // When the mouse enters the graph, the line and circle will apear
      .on('mouseover', function() {
          d3.select(".mouse-line")
              .style("opatemp", "1");
          d3.selectAll(".mouse-per-line circle")
              .style("opatemp", "1");
          d3.selectAll(".mouse-per-line text")
              .style("opatemp", "1");
      })
      // When the mouse moves over the canvas, marker folows
      .on('mousemove', function() {
          var mouse = d3.mouse(this);
          d3.select(".mouse-line")
              .attr("d", function() {
                  var d = "M" + mouse[0] + "," + height;
                  d += " " + mouse[0] + "," + 0;
                  return d;
      });


  d3.selectAll(".mouse-per-line")
      .attr("transform", function(d, i) {
          var xDate = x.invert(mouse[0]),
              bisect = d3.bisector(function(d) {
                  return d.date;
              }).right;
          idx = bisect(d.values, xDate);
          var beginning = 0,
              end = lines[i].getTotalLength(),
              target = null;
          while (true) {
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0]) end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break;
          }
          d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));
          return "translate(" + mouse[0] + "," + pos.y + ")";
      });
  });

// Make a list that let's users choose the dataset		
  d3.selectAll(".menu")
      .on("click", function() {
          var filename;
          var station = this.getAttribute("value");
          if (station == "deBilt") {
              filename = "weatherDeBilt.json";
              document.getElementById("location").innerHTML = "Temperaturen De Bilt:";
          } else if (station == "schiphol") {
              filename = "weatherSchiphol.json";
              document.getElementById("location").innerHTML = "Temperaturen Schiphol:";
          }

      // set up svg and clean the data
     	svg.selectAll().exit().remove();
    
     // Update the graph => ik krijg de oude data en graph alleen niet weg!
    reloadData(filename, makeChart);
  });


};