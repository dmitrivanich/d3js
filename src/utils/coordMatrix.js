export default function coordMatrix(rowsNumber) {
  return new Array(rowsNumber).fill(new Array(rowsNumber).fill(null)).map((row, indY) => {
    return row.map((el, indX) => ({ x: indX, y: indY }))
  })
}
