import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import MainMenu from './components/MainMenu'
import SelectMode from './components/SelectMode'
import SelectDifficulty from './components/SelectDifficulty'
import SelectSymbol from './components/SelectSymbol'
import Settings from './components/Settings'
import { useEffect } from 'react'
import ClickSoundFile from './assets/audio/click.mp3';
import WinSoundFile from './assets/audio/win.wav';
import MenuClickFile from './assets/audio/menu_click.wav';
import BackButtonFile from './assets/audio/back_button.wav';
import musicFile from './assets/audio/music.mp3';
import { useRef } from 'react';

function App() {

  const [screen, setScreen] = useState('menu');
  const [isDark, setIsDark] = useState(true);
  const [gameMode, setGameMode] = useState('pvp');
  const [difficulty, setDifficulty] = useState('easy');
  const [playerSymbol, setPlayerSymbol] = useState('X');

  //fungsi untuk navigasi berpindah layar


  const handleQuickplay = () => {
    playSFX('menu')
    setScreen('mode')
  }

  const handleSettings = () => {
    playSFX('menu')
    setScreen('settings')
  }

  const handleBack = (targetScreen) => {
    playSFX('back')
    setScreen(targetScreen)
  }

  //fungsi untuk screen selectmode
  const handleSelectMode = (mode) => {
    setGameMode(mode)
    if (mode === 'ai') {
      playSFX('menu')
      setScreen('difficulty')
    } else {
      playSFX('menu')
      setScreen('symbol')
    }
  }

  //fungsi untuk screen difficulty
  const handleSelectDifficulty = (selectedDiff) => {
    setDifficulty(selectedDiff)
    playSFX('menu')
    setScreen('symbol')
  }

  //fungsi untuk screen select Symbol
  const handleSelectSymbol = (symbol) => {
    setPlayerSymbol(symbol)
    playSFX('menu')
    setScreen('game')
  }

  //fungsi untuk bagian settings
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("tictactoe_sound");
    return saved !== null ? JSON.parse(saved) : true;
  })

  const [musicEnabled, setMusicEnabled] = useState (() => {
    const saved = localStorage.getItem("tictactoe_music");
    return saved !== null ? JSON.parse(saved) : false;
  })

  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("tictactoe_theme") || "cyan";
  });

  //simpan ke localstorage setiap kali valodenya berubah pakai useEffect
  useEffect(() => {
    localStorage.setItem("tictactoe_sound", JSON.stringify(soundEnabled));
    localStorage.setItem("tictactoe_theme", JSON.stringify(musicEnabled));
    localStorage.setItem("tictactoe_theme", (currentTheme));

    //menerapkan atribut tema ke root/body dokumen
    document.documentElement.setAttribute("data-theme", currentTheme);
    
  }, [soundEnabled, musicEnabled, currentTheme]);




  //State/Helper untuk BGM dan SFX
  const bgmRef = useRef(new Audio(musicFile));

  const playSFX = (type) => {
    if (!soundEnabled) return;

    let audioSrc = '';
    if (type === 'click') audioSrc = ClickSoundFile;
    if (type === 'win') audioSrc = WinSoundFile;
    if (type === 'menu') audioSrc = MenuClickFile;
    if (type === 'back') audioSrc = BackButtonFile;

    if (audioSrc) {
      const sfx = new Audio(audioSrc);
      sfx.volume = 0.4;
      sfx.play().catch((err) => console.log("Audio play Blocked/error", err));
    }
  };

  useEffect(() => {
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.4;

    if(musicEnabled) {
      bgmRef.current.play().catch((err) => {
        console.log("Audio Error", err);
      });
    } else {
      bgmRef.current.pause();
    }
  }, [musicEnabled])



  

return (

  <div className={`App-container ${isDark ? 'dark' : 'light'}`}>

  {screen === 'menu' && <MainMenu onQuickPlay={handleQuickplay} onSettings={handleSettings} />}

  {screen === 'game' && (
    <Board 
    isDark={isDark}
    setIsDark={setIsDark}
    gameMode={gameMode}
    difficulty={difficulty}
    playerSymbol={playerSymbol}
    playSFX={playSFX}
    onHome={() => handleBack('menu')}
    />
  )}

  {screen === "settings" && (
    <Settings 
    soundEnabled={soundEnabled}
    setSoundEnabled={setSoundEnabled}
    musicEnabled={musicEnabled}
    setMusicEnabled={setMusicEnabled}
    currentTheme={currentTheme}
    setCurrentTheme={setCurrentTheme}
    onBack={() => handleBack('menu')}
  />
  )}
  
  {screen === 'mode' && (
    <SelectMode onSelectMode={handleSelectMode} onBack={() => handleBack('menu')} />
  )}

  {screen === 'difficulty' && (
    <SelectDifficulty onSelectDifficulty={handleSelectDifficulty} onBack={() => handleBack('mode')} />
  )}

  {screen === 'symbol' && (
    <SelectSymbol 
      onSelectSymbol={handleSelectSymbol}
      onBack={() => handleBack(gameMode === 'ai' ? 'difficulty' : 'mode')} />
  )}

  </div>

)
}

export default App
