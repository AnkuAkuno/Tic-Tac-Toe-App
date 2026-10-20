import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import MainMenu from './components/MainMenu'
import SelectMode from './components/SelectMode'
import SelectDifficulty from './components/SelectDifficulty'
import SelectSymbol from './components/SelectSymbol'

function App() {

  const [screen, setScreen] = useState('menu');
  const [isDark, setIsDark] = useState(true);
  const [gameMode, setGameMode] = useState('pvp');
  const [difficulty, setDifficulty] = useState('easy');
  const [playerSymbol, setPlayerSymbol] = useState('X');

  //fungsi untuk navigasi berpindah layar
  const handleQuickplay = () => {
    setScreen('mode')
  }

  //fungsi untuk screen selectmode
  const handleSelectMode = (mode) => {
    setGameMode(mode)
    if (mode === 'ai') {
      setScreen('difficulty')
    } else {
      setScreen('symbol')
    }
  }

  //fungsi untuk screen difficulty
  const handleSelectDifficulty = (selectedDiff) => {
    setDifficulty(selectedDiff)
    setScreen('symbol')
  }

  //fungsi untuk screen select Symbol
  const handleSelectSymbol = (symbol) => {
    setPlayerSymbol(symbol)
    setScreen('game')
  } 

return (

  <div className={`App-container ${isDark ? 'dark' : 'light'}`}>

  {screen === 'menu' && <MainMenu onQuickPlay={handleQuickplay} />}

  {screen === 'game' && (
    <Board 
    isDark={isDark}
    setIsDark={setIsDark}
    gameMode={gameMode}
    difficulty={difficulty}
    playerSymbol={playerSymbol}
    onHome={() => setScreen('menu')}
    />
  )}
  
  {screen === 'mode' && (
    <SelectMode onSelectMode={handleSelectMode} onBack={ () => setScreen('menu')} />
  )}

  {screen === 'difficulty' && (
    <SelectDifficulty onSelectDifficulty={handleSelectDifficulty} onBack={() => setScreen('mode')} />
  )}

  {screen === 'symbol' && (
    <SelectSymbol 
      onSelectSymbol={handleSelectSymbol}
      onBack={() => setScreen(gameMode === 'ai' ? 'difficulty' : 'mode')} />
  )}

  </div>

)
}

export default App
