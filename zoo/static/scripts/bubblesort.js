document.addEventListener("DOMContentLoaded", runD3 )
function runD3(){
  var width = 800,
      height = 500;

  var canvas = d3.select(".bubble-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform',`translate(100,300)`)

  var n = 15,
      array = d3.shuffle(d3.range(n)),
      swaps = bubbleSort(array.slice()).swaps.reverse(),
      comparisons = bubbleSort(array.slice()).comparisons.reverse(),
      height = 500,
      width = 800,
      xScale = d3.scaleLinear()
        .domain([0, n - 1])
        .range([0, 600]),
      rainbow = d3.scaleLinear()
        .domain([0,n/2, n - 1])
        .range(['red','green','blue']),
      heightScale = d3.scaleLinear()
        .domain([0,n-1])
        .range([50,200])

  var lines = canvas.append("g")
    .attr("class", "line")
    .selectAll('line')
    .data(array)
    .enter().append('line')
    .attr('y2', heightT)
    .attr('transform', transform)
    .attr('stroke', color)

    var underline = canvas.append("g")
      .data(swaps)
      .attr("class","underline")
      .append("line")
      .attr("x2",xScale(1)+10)
      .attr("x1",xScale(0)-10)
      .attr("transform","translate(0,10)")
      .attr("stroke","red")


  function transform(d,i){
    return `translate(${xScale(i)})`
  }
  function color(d){
    return rainbow(d)
  }
  function heightT(d){
    return heightScale(d) * -1
  }
  function underlineT(swap){
    return `translate(${swap[0]},${swap[1]})`
  }

  var transition = d3.transition().delay(500)
    .duration(750)
    .on("start", function start(){
      var swap = swaps.pop(),
        comparison = comparisons.pop()
        i = swap[0],
        j = swap[1],
        lineI = lines._groups[0][i],
        lineJ = lines._groups[0][j];

        lines._groups[0][i] = lineJ
        lines._groups[0][j] = lineI
        transition.each(function (){
          lines.transition().attr('transform', transform)
          underline.transition().attr('x1', xScale(comparison[0]) -10).attr('x2', xScale(comparison[1])+10)
        })
        if (swaps.length) {transition = transition.transition().on('start',start)}
    })


  function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  function bubbleSort(array) {
    var swapped = true;
    var swaps = []
    var comparisons = []
    while (swapped) {
      swapped = false;
      for (var i = 0; i < array.length -1; i++) {
        comparisons.push([i,i+1])
        if (array[i] > array[i + 1]) {
          swap(array, i, i + 1);
          swaps.push([i,i+1]);
          swapped = true;
        } else {
          swaps.push([i,i])
        }
      }
    }
    return {swaps: swaps,comparisons: comparisons};
  }

}