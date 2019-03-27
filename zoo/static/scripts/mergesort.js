document.addEventListener("DOMContentLoaded", runD3)

function runD3() {
  var width = 1000,
    height = 600;

  var layer0 = d3.select(".merge-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,100)`)

  var n = 8,
    // nums = [3,1,2,4]
    nums = d3.shuffle(d3.range(n)),
    data = nums.map((el, i) => {
      return {
        layer: 0,
        value: el,
        index: i
      }
    }),
    moves = mergeSort(data.slice()),
    xScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, 700]),
    yScale = d3.scaleLinear()
    .domain([0, n/2 -1])
    .range([0, 400]),
    rainbow = d3.scaleLinear()
    .domain([0, n / 2, n - 1])
    .range(['red', 'blue']),
    heightScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([10, 70 ]);
    data = data.map((el)=>{el.layer=0;return el}),
    lines = layer0.append("g")
    .attr("class", "line")
    .selectAll('rect')
    .data(data)
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
    .duration(550)
    .on("start", function start() {
      var move = moves.shift()
      if (move.type === "swap") {
        makeSwap(move)
      } else if (move.type === "split") {
        makeSplit(move)
      }

      if (moves.length) {
        transition = transition.transition().on('start', start)
      } else {
        data.map((el)=>{el.layer = 0;return el})
        transition.each(function () {
          lines.transition()
            .duration(500)
            .attr('transform', transform)
        })
      }
    })

  function makeSplit(move){
    data.forEach((element,i) => {
      if (i >= move.startPoint && i < move.endPoint){
        element.layer += 1
      }
    });
    transition.each(function () {
      lines.transition()
      .duration(500)
      .attr('transform', transform)
    })
  }

  // function makeSwap(move){
    data.forEach((element, i) => {
      if (i >= move.start && i < move.end) {
        element.layer -= 1
      }
    });
  //   for (let i = move.start; i < move.end; i++) {
  //     for (let j = move.start; j < move.end; j++) {
  //       if (move.snapShot[i - move.start].value === data[j].value){
  //         data[j].index = move.snapShot[i-move.start].index + move.start
  //       }
  //     }

  //   }
// }
  function makeSwap(move){

    data[move.j].index = move.snapShot.snapShot[move.i-move.snapShot.start].index + move.snapShot.start
    data[move.j].layer -= 1

    transition.each(function () {
      lines.transition()
      .duration(500)
      .attr('transform', transform)
    })
  }
  

 function mergeSort(array){

  var moves = []
    function merge(left,right,start,end) {
      // debugger
      // let result = []
      // position = reference,
      // leftFrom = reference,
      // rightfrom = reference+left.length;
      // debugger
      // while (left.length && right.length) {
      //   switch (right[0].value <= left[0].value) {
      //     case true:
      //       result.push(right.shift())
      //       moves.push({
      //         type: "swap",
      //         // layer: layer,
      //         from: rightfrom,
      //         to: position
      //       })
      //       position++
      //       rightfrom++
      //       break;
      //     case false:
      //       result.push(left.shift())
      //       moves.push({
      //         type: "swap",
      //         // layer: layer,
      //         from: leftFrom,
      //         to: position
      //       })
      //       leftFrom++
      //       position++
      //   }
      // }
      let result = left.concat(right).sort((a,b)=>{return a.value-b.value})
      let fixedIndexes = []
      for (let i = 0; i < result.length; i++) {
        fixedIndexes.push({
          layer: result[i].layer,
          value: result[i].value,
          index: i,
        })
      }
      moves.push({
        type: "swap",
        start: start,
        end: end,
        snapShot: fixedIndexes
      })
      // debugger
      return result
    }
    function deConstruct(moves){
      var result = []
      let testdata = nums.map((el, i) => {
          return {
            layer: 0,
            value: el,
            index: i
          }
        })
      moves.forEach(move => {
        if (move.type === 'swap'){
          for (let i = move.start; i < move.end; i++) {
            for (let j = move.start; j < move.end; j++) {
              if (move.snapShot[i - move.start].value === testdata[j].value) {
                testdata[j].index = move.snapShot[i - move.start].index + move.start
                // if(i != j){
                  result.push({
                    type: 'swap',
                    j: j,
                    i: i,
                    snapShot: move
                  })
                // }
              }
            }
          }
        }else {result.push(move)}
        });
      return result
    }
    function split(array ,layer = 0,reference = 0,endpoint = array.length){
      // debugger
      array.map((el)=>{el.layer = layer;return el})
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
      return merge(split(left,layer+1,reference),split(right,layer+1,reference+middlePoint),reference,endpoint+reference)
    }
    // debugger
   split(array)
   return deConstruct(moves)
  }
  debugger
}