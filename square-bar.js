var boxheight = 10;

var data=[10,20,97,42,30,49,15,88,72,100];
var margin = {top: 200, right: 200, bottom: 20, left: 200},
    width = 600

var translate = function(x,y){
  return "translate(" + x + "," + y + ")";
}
/*
var x = d3.scaleLinear()//d3v4
    .range([0,width])
    .domain([0,data.length+1]);
*/

markAdjustment=3; //for adding white space between squares and align them to the center of ticks


var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .paddingOuter(0.05)
    .align(0.1);

x.domain(data.map(function(d,i) { return i+1; }));

var xbar=d3.scaleBand()
    .rangeRound([25, width])
    .paddingInner(0.05)
    .align(0.1);

console.log(xbar.bandwidth())
xbar.domain(data.map(function(d,i) { return i; }));
/*
var xbar = d3.scaleLinear()//d3v4
  .range([(-1*boxheight/2)+ (markAdjustment/2),(width-(boxheight/2)+(markAdjustment/2))])
      //.range([-7.5,width-(7.5)])
        //.range([-0.25*boxheight,width-(0.25*boxheight)])
        .domain([0,data.length+1])
*/



var height = 600;


console.log(height);

var svg = d3.select("#main").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", translate(margin.left, margin.top + 0.5))

var y = d3.scaleLinear() //d3v4
    .domain([0, 100])
    .range([height,0])

/*
var color = d3.scaleOrdinal(d3.schemeCategory10)//d3v4
    .domain(["a", "b", "c"])

data.forEach(function(d){
  var y0 = 0;
  d.offsets = color.domain().map(function(type){
    return {type: type, y0: y0, y1: y0 += +d[type], value : d[type]}
  });
});
*/

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(data.length);

var yAxis = d3.axisLeft()
    .scale(y);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);


var groups = svg.selectAll(".group")
    .data(data)
      .enter().append("g")
        .attr("transform", function(d,i){console.log(xbar(i));return "translate(" + x(i+1) + ", 1)"})
        .attr("class", "group")

var types = groups.selectAll(".type").data(function(d){//console.log(d);
  //console.log(d3.range(0,(height*d)/(100*boxheight)));
          return d3.range(0,(height*d)/(100*boxheight));
          //console.log(d3.range(0,d));
        })
  .enter()
  .append("rect")
  .attr("height", boxheight-markAdjustment)
        .attr("width", x.bandwidth()-markAdjustment)//boxheight-markAdjustment)
        .attr("y", function(d,i){return ((height)-(boxheight))-(boxheight*d); })
        .attr("class", "type");

/*
var types = groups.selectAll(".type")
    .data(function(d){return d.offsets})
      .enter().append("g")
        .attr("transform", function(d){ return translate(0,y(d.y1))})
        .attr("class", "type")
        //.attr("fill", function(d){return color(d.type)})

types.selectAll("rect")
    .data(function(d){return d3.range(0,d.value)})
      .enter().append("rect")
        .attr("height", boxheight-0.5)
        .attr("width", boxheight-0.5)
        .attr("y", function(d){ return boxheight * d })
*/
