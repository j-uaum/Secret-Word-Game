import React from 'react'
import './Over.css'
const Over = ({retry}) => {
  return (
    <div>
     
        <h1>GameOver</h1>
        <p>Voltar</p>
        <button onClick={retry}>Reiniciar</button>
    </div>
  )
}

export default Over