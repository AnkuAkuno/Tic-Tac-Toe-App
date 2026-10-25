

function GameControls({onReset, onHome, winner, isGameOver}) {
    return (

        <div className="btn-group">

          {(winner || isGameOver) && (
            <button className="btn-back" onClick={onReset}>
                Next Round
            </button>
          )}

            <button className="btn-back" onClick={onHome}>
                Main Menu
            </button>

        </div>

    )
}

export default GameControls;