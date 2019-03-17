document.addEventListener("DOMContentLoaded", runD3)

function runD3() {
  var width = 800,
    height = 500;

  // var canvas = d3.select(".quick-sort").append("svg")
  //   .attr('width', width)
  //   .attr("height", height)
  //   .append('g')
  //   .attr('transform', `translate(100,300)`)

  // var n = 15,
  //   array = d3.shuffle(d3.range(n)),
  //   swaps = quickSort(array.slice()).reverse(),
  //   comparisons = quickSort(array.slice()).reverse(),
  //   height = 500,
  //   width = 800,
  //   xScale = d3.scaleLinear()
  //   .domain([0, n - 1])
  //   .range([0, 600]),
  //   rainbow = d3.scaleLinear()
  //   .domain([0, n / 2, n - 1])
  //   .range(['red', 'green', 'blue']),
  //   heightScale = d3.scaleLinear()
  //   .domain([0, n - 1])
  //   .range([50, 250])

  // var lines = canvas.append("g")
  //   .attr("class", "line")
  //   .selectAll('line')
  //   .data(array)
  //   .enter().append('line')
  //   .attr('y2', heightT)
  //   .attr('transform', transform)
  //   .attr('stroke', color)

  // var underline = canvas.append("g")
  //   .data(swaps)
  //   .attr("class", "underline")
  //   .append("line")
  //   .attr("x2", xScale(1) + 10)
  //   .attr("x1", xScale(0) - 10)
  //   .attr("transform", "translate(0,10)")
  //   .attr("stroke", "red")


  // function transform(d, i) {
  //   return `translate(${xScale(i)})`
  // }

  // function color(d) {
  //   return rainbow(d)
  // }

  // function heightT(d) {
  //   return heightScale(d) * -1
  // }

  // function underlineT(swap) {
  //   return `translate(${swap[0]},${swap[1]})`
  // }

  // var transition = d3.transition().delay(500)
  //   .duration(750)
  //   .on("start", function start() {
  //     var swap = swaps.pop(),
  //       comparison = comparisons.pop()
  //     i = swap[0],
  //       j = swap[1],
  //       lineI = lines._groups[0][i],
  //       lineJ = lines._groups[0][j];

  //     lines._groups[0][i] = lineJ
  //     lines._groups[0][j] = lineI
  //     transition.each(function () {
  //       lines.transition().attr('transform', transform)
  //       underline.transition().attr('x1', xScale(comparison[0]) - 10).attr('x2', xScale(comparison[1]) + 10)
  //     })
  //     if (swaps.length) {
  //       transition = transition.transition().on('start', start)
  //     }
  //   })



function quickSort(array){
  moves = []

  function swap(i, j) {
    if (i === j) return;
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    moves.push({type: "swap", first: i, second: j});
  }

  function processSlice(left,pivotPoint,right){
    var pivot = array[pivotPoint]
    swap(pivotPoint,--right)
    for (let i = left; i < right; i++) {
      if (array[i] <= pivot){
        swap(i,left++)
      }
    }
    swap(left,right)
    return left
  }

  function split(left,right){
    if (left < right - 1){
      var pivotPoint = Math.floor((left+right)/2)
      moves.push({
        type: "split",
        left: left,
        pivotPoint: pivotPoint,
        right: right,
      })
      newPivot = processSlice(left,pivotPoint,right)
      split(left,newPivot)
      split(newPivot+1,right)
    }
  }

  split(0,array.length)
  return moves
}

// function quickSort(array) {
//   var actions = [];

//   function partition(left, right, pivot) {
//     var v = array[pivot];
//     swap(pivot, --right);
//     for (var i = left; i < right; ++i)
//       if (array[i] <= v) swap(i, left++);
//     swap(left, right);
//     return left;
//   }


//   function recurse(left, right) {
//     if (left < right - 1) {
//       var pivot = (left + right) >> 1;
//       actions.push({
//         type: "partition",
//         "left": left,
//         "pivot": pivot,
//         "right": right
//       });
//       pivot = partition(left, right, pivot);
//       recurse(left, pivot);
//       recurse(pivot + 1, right);
//     }
//   }

//   recurse(0, array.length);
//   return actions;
// }

quickSort([6,4,8,3])
}