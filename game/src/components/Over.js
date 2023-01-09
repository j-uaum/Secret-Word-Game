import React from 'react'
import './Over.css'
const Over = ({retry, score}) => {
  return (
    <div>
     
        <h1>Fim de jogo</h1>
        <h2>A sua pontuação foi <span>{score}</span></h2>
        
        <button onClick={retry}>Reiniciar</button>
    </div>
  )
}

export default Over