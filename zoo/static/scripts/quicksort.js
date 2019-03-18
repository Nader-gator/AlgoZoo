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
    moves = quickSort(array.slice()).reverse(),
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

  var transition = d3.transition().delay(200)
    .duration(650)
    .on("start", function start() {
      var move = moves.pop()
      if (move.type === "swap"){
        swapBars(move)
      }else if (move.type === "split"){
        grayOut(move)
      }
      
      if (moves.length) {
        transition = transition.transition().on('start', start)
      } else {
        colorizeAll()
      }
    })

  function swapBars(move){
    var i = move.first,
        j = move.second,
        lineI = lines._groups[0][i],
        lineJ = lines._groups[0][j];

    lines._groups[0][i] = lineJ
    lines._groups[0][j] = lineI
    transition.each(function () {
      lines.transition().attr('transform', transform)
    })
  }

  function grayOut(move){
    lines.attr('class',function(d,i){
      debugger
      if (i < move.left || move.right < i){
        return 'greyed'
      } else if (i === move.pivotPoint){
        return "pivot"
      }
    })
  }

  function colorizeAll(){

  }

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
}