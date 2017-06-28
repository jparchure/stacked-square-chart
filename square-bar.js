var boxheight = 30;

var data=[10,20,97,42,30,49,15,88,72,100];
var margin = {top: 50, right: 50, bottom: 20, left: 100},
    width = 600

var translate = function(x,y){
  return "translate(" + x + "," + y + ")";
}


markAdjustment=3; //for adding white space between squares and align them to the center of ticks


var x = d3.scaleBand()
    .rangeRound([10, width])
    .paddingInner(0.1)
    .align(0.1);

x.domain(data.map(function(d,i) { return i+1; }));



var height = 600-margin.top-margin.bottom;


var svg = d3.select("#main").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", translate(margin.left, margin.top + 0.5))

var y = d3.scaleLinear() //d3v4
    .domain([0, 100])
    .range([height,0])

var maxData = Math.max.apply(Math, data);

var rectrange = function(d){ //Imitating the range for individual squares for shadow rectangle piece
  return Math.max.apply(Math,d3.range(0,(height*d)/(100*boxheight)));
}

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(data.length);

var yAxis = d3.axisLeft()
    .scale(y);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);





var squarebars = function(d,i){ //ATTEMPT TO INCORPORATE HORIZONTAL AND VERTICAL TRANSTION
      var types = d3.select(this).selectAll(".type").data(function(d){
                return d3.range(0,(height*d)/(100*boxheight));})
        .enter()
        .append("rect")
        .attr("class", "type")

    var typesTransition = types
    .attr("y", function (d, i) {
          return 0;
        })
    .attr("height", 0).transition()
    .duration(500)
    .delay(function (d, i) {
      return i * 100;
    })
    .attr("width", x.bandwidth()-markAdjustment)
    .attr("y", function(d,i){return ((height)-(boxheight))-((boxheight)*d); })
    .attr("height", boxheight-markAdjustment)


    var typesMouseEvent = types.on("mouseover",function(d){//Future Tooltip;
                    })
          .on("mouseout",function(){
                //Future Tooltip Gone;
              });
}



var groups = svg.selectAll(".group")
    .data(data)
      .enter().append("g")
      .each(squarebars); //Execute the squares

var groupTransforms=groups.transition().duration(500)
        .delay(function (d, i) {
            return i * 100;
        }).attr("transform", function(d,i){return "translate(" + x(i+1) + ", 0)"}) //UNCOMMENT THIS LINE
        .attr("class", "group")

var groupMouseover= groups.on("mouseover",function(){//Set square colors
                  d3.select(this).selectAll(".type").style("fill","#AB274F");

                })
      .on("mouseout",function(){
            d3.select(this).selectAll(".type").style("fill","#F653A6"); //Reset square colors
    })

  var groupRect=groups.append("rect") //Appending rectangle to enforce mouseover action, uniterrupted by markadjustment
      .attr("height", function(d){return (boxheight)*rectrange(d);})
        .attr("width", x.bandwidth()-markAdjustment)
        .attr("y", function(d){var e=rectrange(d);
        return ((height)-(boxheight))- (boxheight*e);
        })
        .transition()

            .attr("fill","none")








/*

THIS IS THE CODE WITH SEPARATE SQUARES, MIGHT BE RELEVANT
var types = svg.selectAll(".group").selectAll(".type").data(function(d){
          return d3.range(0,(height*d)/(100*boxheight));})
  .enter()
  .append("rect")
  .attr("class", "type")

var typesTransition = types
.attr("y", function (d, i) {
      return height;
    })

.attr("height", 0).transition()
.duration(100)
.delay(function (d, i) {
  return i * 150;
})

.attr("width", x.bandwidth()-markAdjustment)//boxheight-markAdjustment)
.attr("y", function(d,i){return ((height)-(boxheight))-((boxheight)*d); })
.attr("height", boxheight-markAdjustment)


var typesMouseEvent = types.on("mouseover",function(d){//Future Tooltip;
                })
      .on("mouseout",function(){
            //Future Tooltip Gone;
          });
*/
