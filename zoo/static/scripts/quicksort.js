document.addEventListener("DOMContentLoaded", runD3)

function runD3() {
  var width = 800,
    height = 500;

  var canvas = d3.select(".quick-sort").append("svg")
    .attr('width', width)
    .attr("height", height)
    .append('g')
    .attr('transform', `translate(100,300)`)
}