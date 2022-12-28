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
];


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
  //words
  const word = words[category][Math.floor(Math.random()* words[category].length)]
  return {word, category}
};

  // start
const startGame = ()=>{
const {word, category} = pickWordAndCategory()
let wordLetters = word.split('')
wordLetters = wordLetters.map((l) => l.toLowerCase())
setPickedWord(word)
setPickedCategory(category)
setLetters(wordLetters)
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
  
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <Over retry={retry}/>}

    </div>
  );
}

export default App;
