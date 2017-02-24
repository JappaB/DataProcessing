var margin = {top: 140, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Goals:</strong> <span style='color:red'>" + d.Doelpunten + "</span>";
  })


var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Setting up the tip
chart.call(tip);

var title = d3.select(".chart").append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top)/2)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Top 10 topscorers aller tijden Eredivisie (https://nl.wikipedia.org/wiki/Lijst_van_topscorers_Eredivisie_aller_tijden)");

// Loading and mapping data
d3.json("topscoorders.json", function(error, data) {
  x.domain(data.map(function(d) { return d.Speler; }));
  y.domain([0, d3.max(data, function(d) { return d.Doelpunten; })]);


  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

// Creating bars and eventhandlers for the tip
  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Speler); })
      .attr("y", function(d) { return y(d.Doelpunten); })
      .attr("height", function(d) { return height - y(d.Doelpunten); })
      .attr("width", x.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
});