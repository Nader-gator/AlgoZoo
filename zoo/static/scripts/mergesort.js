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

  var transition = d3.transition()
    .on("start", function start() {
      // var move = moves.pop()
      // if (move.type === "merge") {
      //   swapBox(move)
      // } else if (move.type === "split") {
      //   horizontalSplit(move)
      // }

      // if (moves.length) {
      //   transition = transition.transition().on('start', start)
      // }
      mergeSort(array,transition)
    })

  function mergeSort(array,transition){

    function merge(left, right) {
      let result = []
      while (left.length && right.length){
        switch (right[0].value <= left[0].value) {
          case true:
            result.push(right.shift())
            break;
          case false:
            result.push(left.shift())
        }
      }
      result = result.concat(left).concat(right).map(el => {
        el.layer -= 1
        return el
      })
      debugger
      // transition.each(function () {
      //   lines.transition().attr('transform', transform)
      // })
      return result
    }

    function split(array){
      transition.each(function () {
        lines.transition().duration(1000).attr('transform', transform)
      })
      if (array.length < 2) return array;
      let middlePoint = array.length >> 1,
      left = array.slice(0,middlePoint),
      right = array.slice(middlePoint);
      debugger
      left = left.map(el=>{
        el.layer += 1
        return el
      })
      right = right.map(el=>{
        el.layer += 1
        return el
      })
      debugger
      return merge(split(left),split(right))
    }
   return split(array)
  }
  
}