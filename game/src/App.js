// react hooks
import {useCallback, useEffect, useState } from 'react'

// data
import {wordsList} from './data/words'

// css
import './App.css';
// comp
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import Over from './components/Over';
const stages =[
  {id:1, name: 'start'},
  {id:2, name: 'game'},
  {id:3, name: 'end'}
]


// importação da variavel com as palavras do game

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)


const [pickedWord, setPickedWord] = useState('')
const [pickedCategory, setPickedCategory] = useState('')
const [letter, setLetters] = useState([])


const pickWordAndCategory = () => {
const categories = Object.keys(words)// array com as chaves do data
const category = categories[Math.floor(Math.random()* Object.keys(categories).length)]
console.log(category)

//words
const word = words[category][Math.floor(Math.random()* words[category].length)]
console.log(word)

return {word, category}
}

  // start
  const startGame = ()=>{
// o que deve ja estar pronto
// pick word and pick caterogy


const {word, category} = pickWordAndCategory() /* Aqui ele tem 2 variaveis a definir com a função, ent ele vai executar a 
função receber o valor e inserir nessas 2 variaveis. Ou seja o valor dessa var é o q retornar dessa função
*/
let wordLetters = word.split('')
wordLetters = wordLetters.map((l) => l.toLowerCase())
console.log(word, category)
console.log(wordLetters)

//fill states 
setPickedWord = (word)
setPickedCategory = (category)
setLetters = (letter)

// a ultima coisa a ser feita
    setGameStage(stages[1].name)
  }
  //process letter games
  const verifyLetter = ()=>{
    setGameStage(stages[2].name)
  }
  // reiniciar
  const retry = ()=>{
    setGameStage(stages[0].name)
  }
  console.log(words)
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <Over retry={retry}/>}

    </div>
  );
}

export default App;
