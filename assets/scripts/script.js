

  var w = 700
  var h = 320
  var numCols = 10;
  
  var margin = {
    right: 0,
    left: 0,
    top: 70,
    bottom: 40
  }
  // var whitePop= 50;
  // var blackPop= 40;
  // var hispanicPop= 30;
  // var otherPop= 10;

  var whitePop= 100;
  var blackPop= 100;
  var hispanicPop= 100;
  var otherPop= 100;
  
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
  
  
d3.csv("Bias-in-vi-spdat/assets/data/race.csv", function(error, data){

  
    var race = d3.nest()
      .key(function(d){ return d.race })
      .entries(data)
  
      svg.append("text")
        .attr("x", 0)
        .attr("y", -30)
        .text("White")
        .style("font-weight", "bold")
        .style("text-align", "center")
        .style("font-size", 13)
        .style("font-family", "Open Sans")
  
      svg.append("text")
        .attr("x", 380)
        .attr("y", -30)
        .text("Black")
        .style("font-weight", "bold")
        .style("text-align", "center")
        .style("font-size", 13)
        .style("font-family", "Open Sans")
  
      // svg.append("text")
      //   .attr("x", 380)
      //   .attr("y", -30)
      //   .html("Hispanic")
      //   .style("font-weight", "bold")
      //   .style("font-size", 13)
      //   .style("text-align", "center")
      //   .style("font-family", "Open Sans")

  
      //   svg.append("text")
      //   .attr("x", 580)
      //   .attr("y", -30)
      //   .html("Other")
      //   .style("font-weight", "bold")
      //   .style("text-align", "center")
      //   .style("font-size", 13)
      //   .style("font-family", "Open Sans")
  
  
  
  
      var plots = svg.selectAll("g")
        .data(race)
        .enter()
        .append("g")
        .attr("transform", function(d, i){ 
          // if(d.key == "hispanic"){
          //   return "translate(380," + ((i * 0)) + ")" 
          // }
          // if(d.key == "other"){
          //   return "translate(580," + ((i * 0)) + ")" 
          // }
          if(d.key == "black"){
            return "translate(380," + ((i * 0)) + ")" 
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
                .style("opacity", "1")
                .style("fill", function(d,index){
                        var total = 0;
                        if(d.race == 'white'){total = whitePop};
                        if(d.race == 'black'){total = blackPop};
                        if(d.race == 'hispanic'){total = hispanicPop};
                        if(d.race == 'other'){total = otherPop};
                        if(index>=(total/2)){ return "#E49494"}
                        else{return "#816060"};})
                .attr("class", function(d,index){
                          if(d.race == 'white'){return "white"}
                          if(d.race == 'black'){return "black"}
                          if(d.race == 'hispanic'){return "hispanic"}
                          if(d.race == 'other'){return "other"}
                          else{return "none"}
                        })
                .style("stroke", "none")
                // .on("mouseover", function(d){
                //         div.transition()
                //         .duration(100)
                //         .style("opacity", 1)
                //         var element = d3.select(this)
                //         element.style("fill", "Black")
                //     div.html("<span style = 'font-weight: bold'>" + d["Actor leading role"] + "</span>" + "<br>" + "<span style = 'font-style: italic'>" + d.Movie_male + " " + "(" + d.Year + ")" + "</span>")
                //             .style("font-family", "Helvetica")
                //     div.style("visibility", "visible")
                //     .style("left", (d3.event.pageX - 20) + "px")    
                //     .style("top", (d3.event.pageY - 35) + "px")
                //     })
                //     .on("mousemove", function(d){
                //     div.style("left", (d3.event.pageX - 20) + "px")    
                //     .style("top", (d3.event.pageY - 65) + "px")
                //     })
                //     .on("mouseout", function(d){
                //     div.transition()
                //     .duration(500)
                //     div.style("visibility", "hidden")
                //     var element = d3.select(this)
                //     element.style("fill", "#e2c642")
                //     })
            }
            update(whitePop,blackPop,hispanicPop,otherPop);
        
            // Initialize the button
            d3.select("#whiteInput").on("change", changeWhite )
            d3.select("#blackInput").on("change", changeBlack )
            // d3.select("#hispanicInput").on("change", changeHispanic )
            // d3.select("#otherInput").on("change", changeOther )
            d3.select("#testButton").on("click", changeTransition )

            function changeTransition(){   
                console.log("CLICK");
                
                plots.selectAll("rect")
                .transition()
                .style("fill", "grey")
                .style("stroke", "white")
                .style("stroke-width", "10px")
            }

            function changeGenderLikelihood(likelihoodForWomen, likelihoodForMen){   
              // var likelihoodForWomen = 178;
              // var likelihoodForMen = 88;
              
              plots.selectAll("rect")
              .transition()
              .style("opacity", function(d,index){
                            if(this.style.fill == "rgb(228, 148, 148)"){
                              if((simulateEvent([100,likelihoodForWomen])+1) == 1)
                                return (this.style.opacity-.5);
                              else{
                                return this.style.opacity;
                              }
                            }
                            else{
                              if((simulateEvent([100,likelihoodForMen])+1) == 1)
                                return (this.style.opacity-.5);
                              else {return this.style.fill}
                            }
                          })
          }
          function changeRaceLikelihood(likelihoodForWhite, likelihoodForBlack, likelihoodForHispanic, likelihoodForOther){   

            
            plots.selectAll("rect")
            .transition()
            .style("opacity", function(d,index){
                          if(this.classList.contains("white")){
                            if((simulateEvent([100,likelihoodForWhite])+1) == 1)
                              return (this.style.opacity-.5);
                            else{
                              return this.style.opacity;
                            }
                          }
                          else if(this.classList.contains("black")){
                            if((simulateEvent([100,likelihoodForBlack])+1) == 1)
                              return (this.style.opacity-.5);
                            else {return this.style.opacity}
                          }
                          else if(this.classList.contains("hispanic")){
                            if((simulateEvent([100,likelihoodForHispanic])+1) == 1)
                              return (this.style.opacity-.5);
                            else {return this.style.opacity}
                          }
                          else{
                            if((simulateEvent([100,likelihoodForOther])+1) == 1)
                              return (this.style.opacity-.5);
                            else {return this.style.opacity}
                          }
                        })
        }

        function changeGenderPercent(percentForWomen, percentForMen){ 
          plots.selectAll("rect")
          .transition()
          .style("opacity", function(d,index){
                        if(this.style.fill == "rgb(228, 148, 148)"){
                          if(percentCalc(percentForWomen) == 0)
                            return (this.style.opacity-.5);
                          else{
                            return this.style.opacity;
                          }
                        }
                        else{
                          if(percentCalc(percentForMen) == 0)
                            return (this.style.opacity-.5);
                          else {return this.style.opacity}
                        }
                      })
        }
        function changeRacePercent(percentForWhite, percentForBlack, percentForHispanic, percentForOther){   

          plots.selectAll("rect")
          .transition()
          .style("opacity", function(d,index){
                        if(this.classList.contains("white")){
                          if(percentCalc(percentForWhite) == 0)
                            return (this.style.opacity-.5);
                          else{
                            return this.style.opacity;
                          }
                        }
                        else if(this.classList.contains("black")){
                          if(percentCalc(percentForBlack) == 0)
                            return (this.style.opacity-.5);
                          else {return this.style.opacity}
                        }
                        else if(this.classList.contains("hispanic")){
                          if(percentCalc(percentForHispanic) == 0)
                            return (this.style.opacity-.5);
                          else {return this.style.opacity}
                        }
                        else{
                          if(percentCalc(percentForOther) == 0)
                            return (this.style.opacity-.5);
                          else {return this.style.opacity}
                        }
                      })
      }
          function simulateEvent(chances) {
            var sum = 0;
            chances.forEach(function(chance) {
                sum+=chance;
            });
            var rand = Math.random();
            var chance = 0;
            for(var i=0; i<chances.length; i++) {
                chance+=chances[i]/sum;
                if(rand<chance) {
                    return i;
                }
            }
            
            // should never be reached unless sum of probabilities is less than 1
            // due to all being zero or some being negative probabilities
            return -1;
          }

        function percentCalc(percent){
          var min = Math.ceil(0);
          var max = Math.floor(100);
          var rand = Math.floor(Math.random() * (max - min + 1) + min); 
          if(rand <= percent){
            return 1;
          }
          else{
            return 0;
          }
        }


        function weightedSample(pairs) {
          const n = Math.random() * 100;
          const match = pairs.find(({value, probability}) => n <= probability);
          return match ? match.value : last(pairs).value;
        }
        
        function last(array) {
          return array[array.length - 1];
        }
        
        // const result = weightedSample([
        //   {value: 'Bad', probability: 1},
        //   {value: 'Normal', probability: 29},
        //   {value: 'Good', probability: 70}
        // ]);
        
        // console.log(result);


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

            function adjustLastSlide(){
              var whiteWomenElement = document.getElementById("white-female-percent");
              var whiteMenElement = document.getElementById("white-male-percent");
              var blackWomenElement = document.getElementById("black-female-percent");
              var blackMenElement = document.getElementById("black-male-percent");
              
              var whiteFNum = 0;
              var whiteMNum = 0;
              var blackFNum = 0;
              var blackMNum = 0;
              
              plots.selectAll("rect")
                    .transition()
                    .style("opacity", function(d,index){
                                      var bBox = this.getBBox();
                                      if(this.style.opacity > 0 && bBox.width >0){
                                        if(this.classList.contains("white")){
                                          if(this.style.fill == "rgb(228, 148, 148)")
                                              whiteFNum +=1;
                                          else
                                              whiteMNum +=1;
                                        }
                                        if(this.classList.contains("black")){
                                          if(this.style.fill == "rgb(228, 148, 148)")
                                              blackFNum +=1;
                                          else
                                              blackMNum +=1;
                                        }
                                      }
                                      return this.style.opacity})
              console.log("whiteFNum = "+whiteFNum);
              console.log("whiteMNum = "+whiteMNum);
              console.log("blackFNum = "+blackFNum);
              console.log("blackMNum = "+blackMNum);
              console.log("whitePop = "+whitePop);
              console.log("blackPop = "+blackPop);

              whiteWomenElement.innerText = ((whiteFNum/(whitePop/2))*100).toFixed();
              whiteMenElement.innerText = ((whiteMNum/(whitePop/2))*100).toFixed();
              blackWomenElement.innerText = ((blackFNum/(blackPop/2))*100).toFixed();
              blackMenElement.innerText = ((blackMNum/(blackPop/2))*100).toFixed();
            }

            const scenes = document.querySelectorAll('scroll-scene');
            scenes.forEach((scene) => {
              scene.addEventListener('scroll-scene-enter', (event) => {
                // no need to allow it to bubble up to `document`
                    console.log("SCENE ENTER");
                event.stopPropagation();

                // "event" is a CustomEvent, giving it has a `detail` property
                const detail = event.detail;
                    if(detail.element.id == "step1"){
                        detail.element.classList.add("freeze");
                    }
                    if(detail.element.id == "step2"){
                      changeRacePercent(100, 80, 80, 80);//homeless due to trauma for race
                  }
                    if(detail.element.id == "step3"){
                      changeGenderLikelihood(178, 88);
                    }
                    if(detail.element.id == "step4"){
                      changeGenderPercent(69.7, 51.5);//homeless due to trauma for gender
                      changeRacePercent(61.0, 49.3,49.3,49.3);//homeless due to trauma for race
                    }
                    if(detail.element.id == "step5"){
                      changeGenderPercent(52.2, 49.4);
                      changeRacePercent((100-48.0), (100-56.1),(100-56.1),(100-56.1));
                    }
                    if(detail.element.id == "step6"){
                      changeGenderPercent(20.9, 17.0);
                      changeRacePercent(21.7, 14.3,14.3,14.3);
                      adjustLastSlide();
                    }
               
              });
            });
  })
  

  //handling scrolling events in here
  

  document.addEventListener('scroll-scene-enter', (event) => {
	// "event" is a CustomEvent, giving it has a `detail` property
	const detail = event.detail;

	// the triggering element
	const element = event.element;

	// just like in standard DOM events, "target" is also the triggering element
	const target = event.target;

	// the bounds of the triggering element
	const bounds = detail.bounds;

	// whether the page was scrolling up or down when the event was triggered
	const isScrollingDown = detail.isScrollingDown;

	// the offset used for this element
	const offset = detail.offset;
});

// const scenes = document.querySelectorAll('scroll-scene');
// scenes.forEach((scene) => {
// 	scene.addEventListener('scroll-scene-enter', (event) => {
// 		// no need to allow it to bubble up to `document`
//         console.log("SCENE ENTER");
// 		event.stopPropagation();

// 		// "event" is a CustomEvent, giving it has a `detail` property
// 		const detail = event.detail;
//         if(detail.element.id == "step1"){
//             detail.element.classList.add("freeze");
//         }
//         if(detail.element.id == "step2"){
//           changeStep1();
//         }
// 		// ...
// 	});
// });
  