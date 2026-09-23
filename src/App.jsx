import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import GameHeader from './components/GameHeader'

function App() {

  const [isDark, setIsDark] = useState(true);

return (

  <div className={`App-container ${isDark ? 'dark' : 'light'}`}>

    <GameHeader />
  
    <Board isDark={isDark} setIsDark={setIsDark} />

  </div>

)
}

export default App
