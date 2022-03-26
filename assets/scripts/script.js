
  var w = 700
  var h = 800
  var numCols = 5;
  
  var margin = {
    right: 0,
    left: 0,
    top: 70,
    bottom: 40
  }
  var whitePop= 50;
  var blackPop= 40;
  var hispanicPop= 30;
  var otherPop= 10;
  
  var width = w - margin.right - margin.left;
  var height = h - margin.top - margin.bottom;
  
  var svg = d3.select("#d3-chart")
    .append("svg")
    .attr("id", "chart")
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");
  
  var div = d3.select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
  
  
d3.csv("/assets/data/race.csv", function(error, data){

  
    var race = d3.nest()
      .key(function(d){ return d.race })
      .entries(data)
  
      console.log(race)
  
      svg.append("text")
        .attr("x", 0)
        .attr("y", -30)
        .text("White")
        .style("font-weight", "bold")
        .style("text-align", "center")
        .style("font-size", 13)
        .style("font-family", "Open Sans")
  
      svg.append("text")
        .attr("x", 180)
        .attr("y", -30)
        .text("Black")
        .style("font-weight", "bold")
        .style("text-align", "center")
        .style("font-size", 13)
        .style("font-family", "Open Sans")
  
      svg.append("text")
        .attr("x", 380)
        .attr("y", -30)
        .html("Hispanic")
        .style("font-weight", "bold")
        .style("font-size", 13)
        .style("text-align", "center")
        .style("font-family", "Open Sans")

  
        svg.append("text")
        .attr("x", 580)
        .attr("y", -30)
        .html("Other")
        .style("font-weight", "bold")
        .style("text-align", "center")
        .style("font-size", 13)
        .style("font-family", "Open Sans")
  
  
  
  
      var plots = svg.selectAll("g")
        .data(race)
        .enter()
        .append("g")
        .attr("transform", function(d, i){ 
          if(d.key == "hispanic"){
            return "translate(380," + ((i * 0)) + ")" 
          }
          if(d.key == "other"){
            return "translate(580," + ((i * 0)) + ")" 
          }
          if(d.key == "black"){
            return "translate(180," + ((i * 0)) + ")" 
          }
           else {
            "translate(10," + ((i * 150)) + ")"
          }
          
        })
  
  
        function update(white,black,hispanic,other){
            var u = plots.selectAll("rect")
                .data(function(d){ return d.values})
            
            u
                .enter()
                .append("rect")
                .attr("width", function(d){if(d.race == 'white'){if(parseInt(d.filter)<=parseInt(white)){return 18}else{return 0}}if(d.race == 'black'){if(parseInt(d.filter)<=parseInt(black)){return 18}else{return 0}}if(d.race == 'hispanic'){if(parseInt(d.filter)<=parseInt(hispanic)){return 18}else{return 0}}if(d.race == 'other'){if(parseInt(d.filter)<=parseInt(other)){return 18}else{return 0}}})
                .attr("height", function(d){if(d.race == 'white'){if(parseInt(d.filter)<=parseInt(white)){return 18}else{return 0}}if(d.race == 'black'){if(parseInt(d.filter)<=parseInt(black)){return 18}else{return 0}}if(d.race == 'hispanic'){if(parseInt(d.filter)<=parseInt(hispanic)){return 18}else{return 0}}if(d.race == 'other'){if(parseInt(d.filter)<=parseInt(other)){return 18}else{return 0}}})
                .attr("x", function(d, i){
                var colIndex = i % numCols
                return colIndex * 24
                })
                .attr("y", function(d, i){
                var rowIndex = Math.floor(i/numCols)
                return rowIndex * 24
                })
                .attr("r", 6)
                .style("fill", "#e2c642")
                .style("stroke", "none")
                .on("mouseover", function(d){
                        div.transition()
                        .duration(100)
                        .style("opacity", 1)
                        var element = d3.select(this)
                        element.style("fill", "Black")
                    div.html("<span style = 'font-weight: bold'>" + d["Actor leading role"] + "</span>" + "<br>" + "<span style = 'font-style: italic'>" + d.Movie_male + " " + "(" + d.Year + ")" + "</span>")
                            .style("font-family", "Helvetica")
                    div.style("visibility", "visible")
                    .style("left", (d3.event.pageX - 20) + "px")    
                    .style("top", (d3.event.pageY - 35) + "px")
                    })
                    .on("mousemove", function(d){
                    div.style("left", (d3.event.pageX - 20) + "px")    
                    .style("top", (d3.event.pageY - 65) + "px")
                    })
                    .on("mouseout", function(d){
                    div.transition()
                    .duration(500)
                    div.style("visibility", "hidden")
                    var element = d3.select(this)
                    element.style("fill", "#e2c642")
                    })
            }
            update(whitePop,blackPop,hispanicPop,otherPop);
        
            // Initialize the button
            d3.select("#whiteInput").on("change", changeWhite )
            d3.select("#blackInput").on("change", changeBlack )
            d3.select("#hispanicInput").on("change", changeHispanic )
            d3.select("#otherInput").on("change", changeOther )

            function changeWhite(){
                whitePop = this.value;
                plots.selectAll("rect").remove();
                update(whitePop,blackPop,hispanicPop,otherPop);
            }
            function changeBlack(){
                blackPop = this.value;
                plots.selectAll("rect").remove();
                update(whitePop,blackPop,hispanicPop,otherPop);
            }
            function changeHispanic(){
                hispanicPop = this.value;
                plots.selectAll("rect").remove();
                update(whitePop,blackPop,hispanicPop,otherPop);
            }
            function changeOther(){
                otherPop = this.value;
                plots.selectAll("rect").remove();
                update(whitePop,blackPop,hispanicPop,otherPop);
            }
  })
  
  