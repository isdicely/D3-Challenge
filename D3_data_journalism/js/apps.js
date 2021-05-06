// set the dimensions and margins of the graph
var margin = { top: 50, right: 30, bottom: 50, left: 60 },
  width = 960 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data/data.csv").then((d) => {
  console.log(d);

  const age_max = Math.max(...d.map((entry) => entry.age));
  const age_min = Math.min(...d.map((entry) => entry.age));

  const obesity_max = Math.max(...d.map((entry) => entry.obesity));
  const obesity_mix = Math.min(...d.map((entry) => entry.obesity));

  // Add X axis
  var x = d3.scaleLinear().domain([0, 0]).range([0, width]);
  svg
    .append("g")

    .attr("class", "myXaxis") // add class to x axis to call and modify later
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .attr("opacity", "0");

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      Math.floor(obesity_mix / 10) * 10,
      Math.ceil(obesity_max / 10) * 10,
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add dots
  svg
    .append("g")
    .selectAll("stateCircle")
    .data(d)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.age);
    })
    .attr("cy", function (d) {
      return y(d.obesity);
    })
    .attr("r", 14)
    .style("fill", "#0066CC")
    .attr("opacity", "1");

  //  new X axis
  x.domain([Math.floor(age_min / 10) * 10, Math.ceil(age_max / 10) * 10]);
  svg
    .select(".myXaxis")
    .transition()
    .duration(2000)
    .attr("opacity", "1")
    .call(d3.axisBottom(x));

  svg
    .selectAll("circle")
    .transition()
    .delay(function (d, i) {
      return i * 2;
    })
    .duration(2000)
    .attr("cx", function (d) {
      return x(d.age);
    })
    .attr("cy", function (d) {
      return y(d.obesity);
    });
  // TRYING TO ADD TEXT ON CIRCLES
  svg
    .selectAll(".stateText")
    .data(d)
    .enter()
    .append("text")
    .transition()
    .duration(2000)
    .attr("class", "stateText")
    .attr("x", function (d) {
      return x(d.age) - 0.1;
    })
    .attr("y", function (d) {
      return y(d.obesity) + 5;
    })
    .text(function (d) {
      return d.abbr;
    });

      

  // Add X axis label:
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top - 5)
    .text("Age (Median)");

  // Add Y axis label:
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -margin.top)
    .text("Obese(%)");

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Obesity and Age by State (2014)");
});
