import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='start_screen'>
        <h1>Secret Word</h1>
        <p>Clique no botão para iniciar o game</p>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen