import React from 'react'
import './Game.css'

const Game = ({verifyLetter}) => {
  return (
    <div>
        <button onClick={verifyLetter}>prox stage, finalizar</button>
    </div>
  )
}

export default Game