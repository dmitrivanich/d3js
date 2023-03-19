import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import coordMatrix from '../utils/coordMatrix';
import drawTetris from "../utils/drawTetris"
import getWordsFromServer from '../utils/getWordsFromServer';
import inputWordsInData from "../utils/inputWordsInData"

import "./Tetris.scss"


export default function Tetris() {
  const svgRef = useRef()
  const [rowsNumber, setRowsNumber] = useState(26)
  const [someWords, setSomeWords] = useState([])
  const tetrisData = useMemo(() => (
    coordMatrix(rowsNumber)
  ), [rowsNumber, someWords])

  const setWordsFromServer = useCallback(() => {
    getWordsFromServer(10).then((words) => {
      setSomeWords(words)
      console.log('====================================');
      console.log(words);
      console.log('====================================');
    })
  }, [])

  useEffect(() => {
    setWordsFromServer()
  }, [])

  useEffect(() => {
    if (someWords.length) {
      inputWordsInData(rowsNumber, someWords, tetrisData) //Вставляет слова data4canvas
      drawTetris(svgRef, tetrisData) //Рисует canvas на основе data4canvas и размерах canvas
    }
  }, [someWords, rowsNumber])


  return (
    <div id='container'>
      <div id='controllerBox'>
        <div>
          <p>Grid size: {rowsNumber}x{rowsNumber}</p>
          <input type="range" value={rowsNumber} min={1} max={50} onChange={(e) => setRowsNumber(+e.target.value)}></input>
        </div>
        <div>
          <button id='randomWordsBtn' onClick={setWordsFromServer}>Randomize words</button>
          <button onClick={() => {
            setSomeWords(someWords.splice(0, someWords.length - 1))
          }}>Remove last</button>
        </div>
      </div>

      <div id="svgBox">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}
