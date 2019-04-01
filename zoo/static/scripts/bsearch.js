document.addEventListener("DOMContentLoaded", runD3)

function runD3() {
  var width = 800,
    height = 500;

  var canvas = d3.select(".quick-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,400)`)

  var n = 40,
    target = Math.floor(Math.random() * (n-1)),
    array = (d3.range(n)),
    moves = bsearch(array.slice(),target),
    data = array.map((el) => {
      return {
        value: el,
        type: 'line'
      }
    }),
    height = 500,
    width = 800,
    xScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, 600]),
    rainbow = d3.scaleLinear()
    .domain([0, n / 2, n - 1])
    .range(['#3399ff','black', '#ff00ff']),
    heightScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([50, 250])
  var lines = canvas.append("g")
    .attr("class", "line")
    .selectAll('line')
    .data(data)
    .enter().append('line')
    .attr('y2', heightT)
    .attr('transform', transform)
    .attr('stroke', color)

  function transform(d, i) {
    return `translate(${xScale(i)})`
  }

  function color(d) {
    return rainbow(d.value)
  }

  function heightT(d) {
    return heightScale(d.value) * -1
  }

  var move = moves.shift()
  if (move.type === "highlight") {
    setTimeout(() => {
      // lines._groups[0][move.location].setAttribute('class','target')
      data[move.location].type = 'target'
      lines.transition().attr('class', function (d, i) {
        return d.type
      })
    }, 500);
  }
  var transition = d3.transition().delay(1500)
    .duration(1000)
    .on("start", function start() {
      var move = moves.shift()
      switch (move.type) {
        case 'split':
          for (let i = 0; i < data.length; i++) {
            if (i >= move.left && i < move.right){
              data[i].type = 'grayed'
            }
          }
          break;
        case 'check':
          data[move.index].type = 'highlight'
          break;
      }
      if (!moves.length) {
        data[move.index].type = 'found'
      }
      transition.each(function(){
        lines.transition().attr('class',function(d,i){
          return d.type})
      })
      if (moves.length) {
        transition = transition.transition().on('start', start)
      }
    })


  function bsearch(array,target){
    let moves = []

    function recurse(array, target,reference = 0) {
      if (array.length < 1) {
        return false
      }
      let midPoint = array.length >> 1;
      mid = array[midPoint];
      moves.push({
        type: 'check',
        index: reference + midPoint
      })

      if (mid === target) {
        return midPoint
      }
      if (target < mid) {
        moves.push({
          type: 'split',
          left: midPoint + reference,
          right: n
        })
        return recurse(array.slice(0, midPoint), target,reference)
      } else if (target > mid) {
          moves.push({
            type: 'split',
            left: reference,
            right: reference + midPoint + 1
          })
        let search = recurse(array.slice(midPoint + 1), target,reference+midPoint+1)
        return search === false ? false : search + midPoint + 1
      }
    }
  result = recurse(array,target)
  moves.unshift({type: 'highlight',location: result})
  return moves
  }
}