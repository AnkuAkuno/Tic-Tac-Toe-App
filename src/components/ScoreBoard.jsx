function ScoreBoard ({scores, playerSymbol, gameMode}) {

    return (
        <div className="score-board">
            <div className="score-item x-score">
                <span className="score-label">
                    {gameMode === 'ai' ? (playerSymbol === 'X' ? 'YOU (X)' : 'AI (X)') : 'PLAYER X'}
                </span>
                <span className="score-value">{scores.X}</span>
            </div>

            <div className="score-item draw-score">
                <span className="score-label">SERI</span>
                <span className="score-value">{scores.draws}</span>
            </div>

            <div className="score-item o-score">
                <span className="score-label">
                {gameMode === 'ai' ? (playerSymbol === 'O' ? 'YOU (O)' : 'AI (O)') : 'PLAYER O'}
                </span>
                <span className="score-value">{scores.O}</span>
            </div>
        </div>
    )
}

export default ScoreBoard