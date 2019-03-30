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
    moves = quickSort(array.slice()),
    height = 500,
    width = 800,
    xScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, 600]),
    rainbow = d3.scaleLinear()
    .domain([0, n / 2, n - 1])
    .range(['blue', 'purple']),
    heightScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([50, 250])
    array = array.map((el,i)=>{return {
      value: el,
      index: i
    }})

  var lines = canvas.append("g")
    .attr("class", "line")
    .selectAll('line')
    .data(array)
    .enter().append('line')
    .attr('y2', heightT)
    .attr('transform', transform)
    .attr('stroke', color)

  function transform(d, i) {
    return `translate(${xScale(d.index)})`
  }

  function color(d) {
    return rainbow(d.value)
  }

  function heightT(d) {
    return heightScale(d.value) * -1
  }

  var transition = d3.transition()
    .delay(100)
    .duration(1200)
    .on("start", function start() {
      var move = moves.shift()
      if (move.type === "snap"){
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
    let completedArray = move.leftArr.concat(move.middle).concat(move.rightArr)
    for (let i = 0; i < completedArray.length; i++) {

      for (let j = 0; j < array.length; j++) {
        if (array[j].value === completedArray[i]){
          if (array[j].index != i + move.left) {
            array[j].index = i + move.left
            transition.each(function () {
            lines.transition().duration(900).attr('transform', transform)
          })
          }
        }
      }
    }
  }

  function grayOut(move){
    lines.attr('class',function(d,i){
      if (d.index < move.left || move.right <= d.index){
        return 'greyed'
      } else if (d.index === move.pivotPoint){
        return "pivot"
      } else{
        return null
      }
    })
  }

  function colorizeAll(){
    lines.attr('class',null)
  }

function quickSort(array){
  var moves = []

  function processSlice(left,right){
    if (!(left < right - 1)){return}
    var pivotPoint = Math.floor((left + right) / 2),
    pivot = array[pivotPoint],
    leftArr = array.slice(left,right).filter((el)=>el<pivot),
    rightArr = array.slice(left,right).filter((el)=>el>pivot),
    fullArr = leftArr.concat(pivot).concat(rightArr);
    moves.push({
      type: "split",
      left: left ,
      pivotPoint: pivotPoint,
      right: right
          })

    moves.push({
      type: 'snap',
      leftArr: leftArr,
      rightArr: rightArr,
      left: left,
      right: right,
      middle: [pivot],
      pivotPoint: pivotPoint
    })
    for (let i = left; i < right; i++) {
      array[i] = fullArr[i - left]
    }
    processSlice(left, array.indexOf(pivot))
    processSlice(array.indexOf(pivot), right)
  }
  processSlice(0,array.length)
  return moves
  }
  function binarySearch(array,target){
    if (array.length < 1){return false}
    let pivotPoint = Math.floor(array.length/2),
        pivot= array[pivotPoint]
  
      if (target === pivot){
        return pivotPoint
      }
  
      if (target < pivot){
        return binarySearch(array.slice(0,pivotPoint),target)
      } else if (target > pivot) {
        let searchResult = binarySearch(array.slice(pivotPoint + 1), target)
        return searchResult === false ? false : searchResult + pivotPoint + 1
      }
  }
  debugger
}
