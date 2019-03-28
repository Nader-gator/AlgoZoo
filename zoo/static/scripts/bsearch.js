document.addEventListener("DOMContentLoaded", runD3)

function runD3() {
  var width = 800,
    height = 500;

  var canvas = d3.select(".quick-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,300)`)

  var n = 25,
    array = d3.shuffle(d3.range(n)),
    // moves = quickSort(array.slice()).reverse(),
    height = 500,
    width = 800,
    xScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, 600]),
    rainbow = d3.scaleLinear()
    .domain([0, n / 2, n - 1])
    .range(['blue', 'purple', 'orange']),
    heightScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([50, 250])

  var lines = canvas.append("g")
    .attr("class", "line")
    .selectAll('line')
    .data(array)
    .enter().append('line')
    .attr('y2', heightT)
    .attr('transform', transform)
    .attr('stroke', color)

  function transform(d, i) {
    return `translate(${xScale(i)})`
  }

  function color(d) {
    return rainbow(d)
  }

  function heightT(d) {
    return heightScale(d) * -1
  }

  var transition = d3.transition().delay(200)
    .duration(450)
    .on("start", function start() {
      // var move = moves.pop()
      // if (move.type === "swap") {
      //   swapBars(move)
      // } else if (move.type === "split") {
      //   grayOut(move)
      // }

      // if (moves.length) {
      //   transition = transition.transition().on('start', start)
      // } else {
      //   colorizeAll()
      // }
    })

  
}