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
const guessesQuant = 3


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
  const [guesses, setGuesses] = useState(guessesQuant)
  const [score, setScore] = useState(0)


  const pickWordAndCategory = useCallback(() => {
  const categories = Object.keys(words)// array com as chaves do data
  const category = categories[Math.floor(Math.random()* Object.keys(categories).length)]
  //words
  const word = words[category][Math.floor(Math.random()* words[category].length)]
  return {word, category}
},[words])

  // start
const startGame = useCallback(()=>{
  clearLettersStates()
const {word, category} = pickWordAndCategory()
let wordLetters = word.split('')
wordLetters = wordLetters.map((l) => l.toLowerCase())
setPickedWord(word)
setPickedCategory(category)
setLetters(wordLetters)
setGameStage(stages[1].name)
console.log(wordLetters)
},[pickWordAndCategory])


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

      setGuesses((actualGuesses) => actualGuesses - 1)



   }
  }

// useEffect

const clearLettersStates = ()=>{
  setGuessedLetters([])
  setWrongLetters([])
 
}

useEffect(() => {

if(guesses <=0) {
  // reset all stages 
  clearLettersStates()
  //muda o estagio do game
  setGameStage(stages[2].name)
}
}, [guesses])

useEffect(()=>{

  const uniqueLetters = [...new Set(letters)]
  // o set só funciona pra itens unicos
  // por sua vez, deixa o array com letras unicas sem repetir
  console.log(uniqueLetters)

  if(guessedLetters.length === uniqueLetters.length){
    setScore((actualScore)=> actualScore += 100)

    startGame()

    // serve pra eliminar as letras das palavras que ja são
    // repetidas para facilitar na checagem letra por letra
    // há outras formas de fazer essa verificação
    //porem o curso mostra essa forma
  }


}, [guessedLetters, letters, startGame])

  // reiniciar
  const retry = ()=>{
    setScore(0)
    setGuesses(guessesQuant)
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
      {gameStage === 'end' && <Over retry={retry} score={score}/>}

    </div>
  );
}

export default App;
