var boxheight = 10;
/*var data = [];
for (i=0; i < 100; i++) {
  data.push({
    a : ((Math.random() * 30) | 0),
    b : ((Math.random() * 30) | 0),
    c : ((Math.random() * 30) | 0)
  });
}
*/
boxheight=boxheight;
var data=[10,20,42,30,49,15,88,72,19,56];
var margin = {top: 20, right: 20, bottom: 80, left: 40},
    width = boxheight * data.length*2;

var translate = function(x,y){               
  return "translate(" + x + "," + y + ")";
}

var x = d3.scaleLinear()//d3v4
    .range([0,width*2])
    .domain([0,data.length*2])

var max = 100;//d3.max(data,100);
var height = max * boxheight/2;


console.log(height);

var svg = d3.select("#main").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", translate(margin.left, margin.top + 0.5))

var y = d3.scaleLinear() //d3v4
    .domain([0, max])
    .range([height/2,0])

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
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height/2) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);



var groups = svg.selectAll(".group")
    .data(data)
      .enter().append("g")
        .attr("transform", function(d,i){return "translate(" + x(i) + ", 0)"})
        .attr("class", "group")

var types = groups.selectAll(".type").data(function(d){//console.log(d);
          return d3.range(0,d*0.25);
          //console.log(d3.range(0,d));
        })
  .enter()
  .append("rect")
  .attr("height", boxheight-0.5)
        .attr("width", boxheight-0.5)
        .attr("y", function(d){return ((height/2)-(boxheight))-(boxheight*d); })
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


