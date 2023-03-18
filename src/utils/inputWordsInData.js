export default function inputWordsInData(rowsNumber, words, data) {

  //массив объектов, в которых нах. информация о линиях слов
  const wordLines = words.map((word, index) => {
    return ({
      letters: word.split(''),
      startCoord: { x: 0, y: 0 },
      horisontal: (index % 2) ? false : true, //каждое нечетное будет вертикальным
      index: index,
      coords: [],
      breakers: false
    })
  })

  function setCoords(line) {
    if (line.horisontal) {//если слово распологается горизонтально

      line.startCoord.x = Math.floor((rowsNumber - line.letters.length) / 2)
      line.startCoord.y = Math.floor(rowsNumber / 2) + line.index - 4
      line.coords = line.letters.map((item, index) => {
        return [line.startCoord.x + index, line.startCoord.y]
      })

    }
    else {//если слово распологается вертикально
      line.startCoord.x = Math.floor(rowsNumber / 2) + line.index - 4
      line.startCoord.y = Math.floor((rowsNumber - line.letters.length) / 2)
      line.coords = line.letters.map((item, index) => {
        return [line.startCoord.x, line.startCoord.y + index]
      })

    }
  }

  //устанавливаем координаты для ячеек слова
  wordLines.forEach((line) => setCoords(line))

  //проверяем совпадение ячеек
  wordLines.forEach((lineDef, index1) => {

    const breakers = []

    wordLines.forEach((lineAtacker, index2) => {
      if ((index1 !== index2) && (index1 < index2)) {

        let breakupSpot = null

        lineAtacker.coords.forEach((coordA, ind) => {
          lineDef.coords.forEach((coordD, spot) => {
            if (coordD[0] === coordA[0]) {
              if (coordD[1] === coordA[1]) {
                breakupSpot = spot
              }
            }
          })
        })


        //кто и где ломает
        if (breakupSpot) {
          breakers.push({
            index: lineAtacker.index,
            spot: breakupSpot
          })
        }


      }
    })

    lineDef.breakers = breakers
  })


  //разлом слова
  wordLines.forEach((line, ind) => {
    if (line.breakers.length > 0) {
      line.breakers.forEach((breaker, ind) => {
        //добавляем разлом в слове
        line.letters.splice(breaker.spot, 0, '')
        //увеличивем кол-во координат на 1  
        let lastCoords = line.coords[line.coords.length - 1]
        if (line.horisontal) { //увеличиваем x на один
          line.coords.push([lastCoords[0] + 1, lastCoords[1]])
        } else {//увеличиваем y на один
          line.coords.push([lastCoords[0], lastCoords[1] + 1])
        }
      })
    }
  })

  //вставка в дб
  wordLines.forEach((line, ind) => {

    line.letters.forEach((letter, i) => {
      let coords = line.coords[i]
      let y = coords[1]
      let x = coords[0]

      try {
        //присвоение каждой букве значения и индекса
        data[y][x].val = letter
        data[y][x].ind = line.index
      } catch (error) { }
    })
  })

}