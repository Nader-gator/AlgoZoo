document.addEventListener("DOMContentLoaded", runD3)

function runD3() {
  var width = 800,
    height = 500;

  var canvas = d3.select(".merge-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,300)`)

  var n = 40,
    array = d3.shuffle(d3.range(n)),
    // swaps = bubbleSort(array.slice()).swaps.reverse(),
    // comparisons = bubbleSort(array.slice()).comparisons.reverse(),
    height = 500,
    width = 800,
    xScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, 600]),
    rainbow = d3.scaleLinear()
    .domain([0, n / 2, n - 1])
    .range(['red', 'green', 'blue']),
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


  function mergeSort(array){
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

    function split(array){
      if (array.length < 2) return array;
      let middlePoint = array.length >> 1,
      left = array.slice(0,middlePoint),
      right = array.slice(middlePoint)

      return merge(split(left),split(right))
    }

    return split(array)
  }
  debugger
}