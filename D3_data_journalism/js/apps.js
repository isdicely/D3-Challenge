// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 600 - margin.left - margin.right,
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

    const age_max = Math.max(...d.map(entry => entry.age));
    const age_min = Math.min(...d.map(entry => entry.age));

    const obesity_max = Math.max(...d.map(entry => entry.obesity));
    const obesity_mix = Math.min(...d.map(entry => entry.obesity));

  // Add X axis
//   var x = d3.scaleLinear().domain([Math.floor(age_min/10)*10, Math.ceil(age_max/10)*10]).range([0, width]);
    var x = d3.scaleLinear()
        .domain([0, 0])
        .range([0, width]);
  svg
    .append("g")
    .attr("class", "myXaxis") // add class to x axis to call and modify later
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .attr("opacity", "0")

  // Add Y axis
  var y = d3.scaleLinear().domain([Math.floor(obesity_mix/10)*10, Math.ceil(obesity_max/10)*10]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(d)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.age); })
    .attr("cy", function (d) {
      return y(d.obesity);})
    .attr("r", 5)
    .style("fill", "#69b3a2");

//  new X axis
    x.domain([Math.floor(age_min/10)*10, Math.ceil(age_max/10)*10])
    svg.select(".myXaxis")
    .transition()
    .duration(2000)
    .attr("opacity", "1")
    .call(d3.axisBottom(x));

    svg.selectAll("circle")
        .transition()
        .delay(function(d,i){return(i*3)})
        .duration(2000)
        .attr("cx", function (d) {
            return x(d.age); })
          .attr("cy", function (d) {
            return y(d.obesity);})

});

// const data =  d.map(entry => [entry.age, entry.obesity]);
//     console.log(data)