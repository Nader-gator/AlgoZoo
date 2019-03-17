document.addEventListener("DOMContentLoaded", runD3 )
function runD3(){
const canvas = d3.select(".bubble-sort").append("svg")
  .attr('width', window.innerWidth * 0.8)
  .attr("height", window.innerHeight * 0.3)





  
function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
function bubbleSort(array) {
  var swapped = true;
  let swaps = []
  while (swapped) {
    swapped = false;
    for (var i = 0; i < array.length; i++) {
      if (array[i] && array[i + 1] && array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        swaps.push([i,i+1]);
        swapped = true;
      }
    }
  }
  return swaps;
}

}