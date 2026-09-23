function GameControls({onReset,  toggleMode, isDark, setIsDark, isAI}) {
    return (

        <div className="btn-group">

            <button className="theme-btn" onClick={() => setIsDark(!isDark)}>
            {isDark ? 'Light Theme' : 'Neon Theme'}
            </button>
            <button className="reset-btn" onClick={onReset}> Reset Game</button>
            <button className="mode-btn" onClick={toggleMode}>
                    {isAI ? 'AI Mode' : 'PvP Mode'}
            </button>

        </div>

    )
}

export default GameControls;