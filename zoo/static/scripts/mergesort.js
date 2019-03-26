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
    array = d3.shuffle(d3.range(n)).map((el, i) => {
      return {
        layer: 0,
        value: el,
        index: i
      }
    }),
    moves = mergeSort(array.slice()),
    xScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, 600]),
    yScale = d3.scaleLinear()
    .domain([0, 3])
    .range([0, 400]),
    rainbow = d3.scaleLinear()
    .domain([0, n / 2, n - 1])
    .range(['red', 'blue']),
    heightScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([10, 50 ]);


  var lines = layer0.append("g")
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
    return `translate(${xScale(d.index)},${yScale(d.layer)})`
  }

  function color(d) {
    return rainbow(d.value)
  }

  function heightT(d) {
    return heightScale(d.value)
  }
  moves = moves.filter((el)=> el.type === "split").concat(moves.filter((el)=> el.type === "swap"))
  var transition = d3.transition()
    .duration(350)
    .on("start", function start() {
      var move = moves.shift()
      if (move.type === "swap") {
        makeSwap(move)
      } else if (move.type === "split") {
        makeSplit(move)
      }

      if (moves.length) {
        transition = transition.transition().on('start', start)
      }
    })

  function makeSplit(move){
    array.forEach((element,i) => {
      if (i > move.startPoint && i < move.endPoint){
        element.layer += 1
      }
    });
    transition.each(function () {
      lines.transition().attr('transform', transform)
    })
  }

  function makeSwap(move){
    debugger
    var temp = array[move.first].index
    array[move.first].index = array[move.second].index
    array[move.second].index = temp

    transition.each(function () {
      lines.transition().attr('transform', transform)
    })
  }


 function mergeSort(array){
    var moves = []
    function merge(left,right,layer,reference) {
      // debugger
      let unsorted = left.concat(right),
      sorted = unsorted.slice().sort((a,b)=>{return a.value - b.value })
      addDif(unsorted,sorted,reference)
      return sorted
    }


    function addDif(unsorted,sorted,reference){
      debugger
    }
    function split(array ,layer = 0,reference = 0,endpoint = array.length){
      // debugger
      if (array.length < 2) return array;
      let middlePoint = array.length >> 1,
      left = array.slice(0,middlePoint),
      right = array.slice(middlePoint);
      moves.push({
        type: "split",
        middlePoint: middlePoint+reference,
        startPoint: reference,
        endPoint: endpoint+reference,
        layer: layer
      })
      // debugger
      return merge(split(left,layer+1,reference),split(right,layer+1,reference+middlePoint),layer,reference)
    }
    // debugger
   split(array)
   return moves
  }
}