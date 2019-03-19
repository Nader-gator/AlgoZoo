document.addEventListener("DOMContentLoaded", runD3)

function runD3() {
  var width = 800,
    height = 500 / 3;

  var layer0 = d3.select(".merge-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,100)`)
  var layer1 = d3.select(".merge-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,100)`)
  var layer2 = d3.select(".merge-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,100)`)
  var layer3 = d3.select(".merge-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,100)`)

  var n = 8,
    array = d3.shuffle(d3.range(n)),
    moves = mergeSort(array.slice()),
    xScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, 600]),
    rainbow = d3.scaleLinear()
    .domain([0, n / 2, n - 1])
    .range(['red', 'green', 'blue']),
    heightScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([10, 50 ])


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
    return `translate(${xScale(i)})`
  }

  function color(d) {
    return rainbow(d)
  }

  function heightT(d) {
    return heightScale(d)
  }


  function mergeSort(array){
    var moves = []
    function merge(left, right) {
      result = []
      while (left.length && right.length){
        switch (right[0] <= left[0]) {
          case true:
            result.push(right.shift())
            break;
          case false:
            result.push(left.shift())
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
      return merge(split(left,layer+1),split(right,layer+1))
    }
   split(array)
   return moves
  }
}