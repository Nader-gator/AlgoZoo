document.addEventListener("DOMContentLoaded", runD3)

function runD3() {
  var width = 800,
    height = 600;

  var layer0 = d3.select(".merge-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,100)`)

  var n = 8,
    array = d3.shuffle(d3.range(n)),
    moves = mergeSort(array.slice()).reverse(),
    xScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, 600]),
    yScale = d3.scaleLinear()
    .domain([0, 3])
    .range([0, 600]),
    rainbow = d3.scaleLinear()
    .domain([0, n / 2, n - 1])
    .range(['red', 'blue']),
    heightScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([10, 50 ]);

    debugger
  var lines0 = layer0.append("g")
    .attr("class", "line")
    .selectAll('rect')
    .data(array)
    .enter().append('rect')
    .attr('width', heightT)
    .attr('height', heightT)
    .attr('transform', transform)
    .attr('stroke', color)
    .attr('fill', color)

  function transform(d, i) {
    return `translate(${xScale(i)},${yScale(d.layer)})`
  }

  function color(d) {
    return rainbow(d)
  }

  function heightT(d) {
    return heightScale(d)
  }

  var transition = d3.transition()
    .duration(450)
    .on("start", function start() {
      var move = moves.pop()
      if (move.type === "merge") {
        swapBox(move)
      } else if (move.type === "split") {
        horizontalSplit(move)
      }

      if (moves.length) {
        transition = transition.transition().on('start', start)
      }
    })

  function swapBox(move){

  }

  function horizontalSplit(move){
    
  }

  function mergeSort(array){
    var moves = []
    function merge(left, right,layer) {
      result = []
      while (left.length && right.length){
        switch (right[0] <= left[0]) {
          case true:
            result.push(right.shift())
            moves.push({
              type: "merge",
              side: "right",
              layer: layer
            })
            break;
          case false:
            result.push(left.shift())
            moves.push({
              type: "merge",
              side: "left",
              layer: layer
            })
        }
      }
      return result.concat(left).concat(right)
    }

    function split(array ,layer = 0){
      if (array.length < 2) return array;
      let middlePoint = array.length >> 1,
      left = array.slice(0,middlePoint),
      right = array.slice(middlePoint)
      moves.push({
        type: "split",
        middlePoint: middlePoint,
        layer: layer
      })
      return merge(split(left,layer+1),split(right,layer+1),layer)
    }
   split(array)
   return moves
  }
  // debugger
}