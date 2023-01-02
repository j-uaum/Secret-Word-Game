import React from 'react'
import './Game.css'

const Game = ({verifyLetter, pickedWord, pickedCategory, guessedLetters, wrongLetters, guesses, score, letters}) => {
  return (
    <div className="game">
        <p className="points">Pontuação: {score}</p>
        <h1>
          Advinhe a palavra: 
        </h1>
        <h3 className="tip">Dica sobre a palavra <span>{pickedCategory}</span></h3>
        <p>Você ainda tem {guesses} Tentavivas(s)</p>
        <div className="wordContainer">
          {letters.map((letter, i)=> (
            guessedLetters.includes(letter) ? (<span key={i} className='letter'>{letter}</span>):(<span key={i} className='blankSquare'></span>)
          ))}
          </div>
        <div className="letterContainer">
          <p>Tente advinhar uma letra da palavra:</p>
          <form>
            <input type="text" name='letter' maxLength='1' required/>

          <button onClick={verifyLetter}>Jogar</button>
          </form>
        </div>
        <div className="wrongLettersContainer">
          <p>
            Letras já utilizadas: <span>a,</span>
            {wrongLetters.map((letter, i)=>(
              <span key={i}>{letter}</span>
            ))}
          </p>
        </div>
    </div>
  )
}

export default Game