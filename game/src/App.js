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
  const [letters, setLetters] = useState([])


  // estados de letras advinhadas

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)


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
console.log(wordLetters)
}


  //process letter games
  const verifyLetter = (letter)=>{

    const normalizedLetter = letter.toLowerCase()

   //check if letter has been utilized

   if(guessedLetters.includes(normalizedLetter)|| wrongLetters.includes(normalizedLetter)){
    return;
   }
   // push guessed letter or remove a guess

   if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]) 
   }else{
    setWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters,
      normalizedLetter
    ]) 
   }
  }
  // reiniciar
  const retry = ()=>{
    setGameStage(stages[0].name)
  }
  console.log(guessedLetters)
  
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}

      {gameStage === 'game' && <Game
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters = {guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />}
      {gameStage === 'end' && <Over retry={retry}/>}

    </div>
  );
}

export default App;
