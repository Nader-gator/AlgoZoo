document.addEventListener("DOMContentLoaded", runD3);

function runD3() {
  var d3 = window.d3
  var width = 1000,
    height = 600;
  function generateBoxes(n) {
    let result = 0;
    while (n > 1) {
      result += n;
      n /= 2;
    }
    return result + 1;
  }
  function layer(boxes) {
    let result = [],
      layer = 0,
      capacity = 1,
      runningcap = 1,
      overallIndex = 0;

    boxes.forEach(el => {
      result.push({
        layer: layer,
        id: el,
        layerIndex: capacity - runningcap,
        occupied: false,
        size: n / capacity,
        overallIndex: d3.range(overallIndex, overallIndex + n / capacity)
      });
      runningcap -= 1;
      overallIndex += n / capacity;
      if (runningcap === 0) {
        layer += 1;
        capacity *= 2;
        runningcap = capacity;
      }
    });
    return result;
  }
  var svg = d3
    .select(".merge-sort")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(100,100)`);

  var n = 8,
    // nums = [3,1,2,4]
    nums = d3.shuffle(d3.range(n)),
    data = nums.map((el, i) => {
      return {
        layer: 0,
        value: el,
        index: i
      };
    }),
    boxes = layer(d3.range(generateBoxes(n))),
    moves = mergeSort(data.slice()),
    xScale = d3
      .scaleLinear()
      .domain([0, n - 1])
      .range([0, 700]),
    boxXScale = d3
      .scaleOrdinal()
      .domain(d3.range(n))
      .range(d3.range(n).map(el => el * 100)),
    boxSizeScale = d3
      .scaleOrdinal()
      .domain(d3.range(n / 2))
      .range([800, 400, 200, 100]),
    yScale = d3
      .scaleLinear()
      .domain([0, n / 2 - 1])
      .range([0, 400]),
    rainbow = d3
      .scaleLinear()
      .domain([0, n / 2, n - 1])
      .range(["red", "blue"]),
    heightScale = d3
      .scaleLinear()
      .domain([0, n - 1])
      .range([10, 70]),
    mappedData = data.map(el => {
      el.layer = 0;
      return el;
    }),
    lines = svg
      .append("g")
      .selectAll("rect")
      .data(mappedData)
      .enter()
      .append("rect")
      .attr("width", heightT)
      .attr("height", heightT)
      .attr("transform", transform)
      .attr("stroke", color)
      .attr("fill", color),
    borderBoxes = svg
      .append("g")
      .selectAll("rect")
      .data(boxes)
      .enter()
      .append("rect")
      .attr("width", boxWidth)
      .attr("height", 80)
      .attr("transform", boxTransform)
      .attr("stroke", "red")
      .attr("fill", "none")
      .attr("display", displayCheck);

  function transform(d) {
    return `translate(${xScale(d.index) +
      100 / 2 -
      heightScale(d.value) / 2},${yScale(d.layer) +
      70 / 2 -
      heightScale(d.value) / 2})`;
  }

  function displayCheck(d) {
    if (d.occupied) {
      return "initial";
    } else {
      return "none";
    }
  }

  function boxWidth(d) {
    return boxSizeScale(d.layer);
  }

  function boxTransform(d) {
    return `translate(${boxXScale(
      d.layerIndex * 2 ** (n / 2 - (d.layer + 1))
    )},${yScale(d.layer) - 5})`;
  }

  function color(d) {
    return rainbow(d.value);
  }

  function heightT(d) {
    return heightScale(d.value);
  }
  moves = moves
    .filter(el => el.type === "split")
    .concat(moves.filter(el => el.type === "swap"));
  var transition = d3
    .transition()
    .duration(550)
    .on(
      "start",
      function start() {
        checkBoxes();
        var move = moves.shift();
        if (move.type === "swap") {
          makeSwap(move);
        } else if (move.type === "split") {
          makeSplit(move);
        }
        checkBoxes();
        if (moves.length) {
          transition = transition.transition().on("start", start);
        } else {
          mappedData.map(el => {
            el.layer = 0;
            return el;
          });
          transition.each(function() {
            lines
              .transition()
              .duration(500)
              .attr("transform", transform);
          });
        }
      }
    );
  // && dataEl.index >= el.layerIndex * el.size && dataEl.index <= (el.layerIndex + el.size)

  function checkCollision(box) {
    for (let i = 0; i < mappedData.length; i++) {
      const element = mappedData[i];
      const overallIndex = element.layer * n + element.index;

      if (box.overallIndex.includes(overallIndex)) {
        return true;
      }
    }

    return false;
  }

  function checkBoxes() {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (checkCollision(box) === true) {
        box.occupied = true;
      } else if (checkCollision(box) === false) {
        box.occupied = false;
      }
    }

    transition.each(function() {
      borderBoxes.transition().attr("display", displayCheck);
    });
  }
  function makeSplit(move) {
    mappedData.forEach((element, i) => {
      if (i >= move.startPoint && i < move.endPoint) {
        element.layer += 1;
      }
    });
    transition.each(function() {
      lines
        .transition()
        .duration(500)
        .attr("transform", transform);
    });
  }

  function makeSwap(move) {
    mappedData[move.j].index =
      move.snapShot.snapShot[move.i - move.snapShot.start].index +
      move.snapShot.start;
    mappedData[move.j].layer -= 1;
    transition.each(function() {
      lines
        .transition()
        .duration(500)
        .attr("transform", transform);
    });
  }

  function mergeSort(array) {
    var moves = [];
    function merge(left, right, start, end) {
      let result = left.concat(right).sort((a, b) => {
        return a.value - b.value;
      });
      let fixedIndexes = [];
      for (let i = 0; i < result.length; i++) {
        fixedIndexes.push({
          layer: result[i].layer,
          value: result[i].value,
          index: i
        });
      }
      moves.push({
        type: "swap",
        start: start,
        end: end,
        snapShot: fixedIndexes
      });

      return result;
    }
    function deConstruct(moves) {
      var result = [];
      let testdata = nums.map((el, i) => {
        return {
          layer: 0,
          value: el,
          index: i
        };
      });
      moves.forEach(move => {
        if (move.type === "swap") {
          for (let i = move.start; i < move.end; i++) {
            for (let j = move.start; j < move.end; j++) {
              if (move.snapShot[i - move.start].value === testdata[j].value) {
                testdata[j].index =
                  move.snapShot[i - move.start].index + move.start;
                // if(i != j){
                result.push({
                  type: "swap",
                  j: j,
                  i: i,
                  snapShot: move
                });
                // }
              }
            }
          }
        } else {
          result.push(move);
        }
      });
      return result;
    }
    function split(array, layer = 0, reference = 0, endpoint = array.length) {
      array.map(el => {
        el.layer = layer;
        return el;
      });
      if (array.length < 2) return array;
      let middlePoint = array.length >> 1,
        left = array.slice(0, middlePoint),
        right = array.slice(middlePoint);
      moves.push({
        type: "split",
        middlePoint: middlePoint + reference,
        startPoint: reference,
        endPoint: endpoint + reference,
        layer: layer
      });

      return merge(
        split(left, layer + 1, reference),
        split(right, layer + 1, reference + middlePoint),
        reference,
        endpoint + reference
      );
    }

    split(array);
    return deConstruct(moves);
  }
}
