export function GameMode ({isAI}) {
    return (
        <div className="game-mode">
                <p>{isAI ? "Player vs AI" : "Player vs Player"}</p>
                
            </div>
    )
}

export default GameMode;