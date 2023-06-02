// Data
var data = [10, 20, 15, 25, 30, 17, 120, 38, 50];

// Create SVG container
var svg = d3.select("#chart")
  .attr("width", 1000)
  .attr("height", 500);

// Create scales
var xScale = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([0, 500])
  .padding(0.2);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, 500]);

// Create bars
// ad ogni elemento 
svg.selectAll("rect")
  .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) { return xScale(i); })
    .attr("y", function(d) { return 500 - yScale(d); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return yScale(d); });

