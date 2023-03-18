import * as d3 from 'd3';

//рисует тетрис
export default function drawTetris(svgRef, data4canvas) {
  const width = parseInt(svgRef.current.clientWidth)

  const size = width / data4canvas.length
  const svg = d3.select(svgRef.current).html(null)

  data4canvas.forEach((row, Y) => {
    row.forEach((box, X) => {
      let boxLetter = svg
        .append('g')
        .attr('class', 'rect')


      boxLetter.append('rect')
        .attr('width', size)
        .attr('height', size)
        .attr('x', box.x * size)
        .attr('y', box.y * size)
        .attr('rx', size / 3)
        .attr('rx', size / 3)
        .attr('class', `rect-${box.ind}`)


      boxLetter.append('text')
        .text(box.val)
        .attr('x', box.x * size + size / 2)
        .attr('y', box.y * size + size / 1.5)
        .attr('class', 'rect-text')
        .attr('text-anchor', 'middle')
        .style('fill', 'black')
        .style('font-size', size / 2 + "px")
    })
  })
}