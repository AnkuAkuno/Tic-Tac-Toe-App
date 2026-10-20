function GameControls({onReset, onHome}) {
    return (

        <div className="btn-group">

            <button className="btn-back" onClick={onReset}>
                Reset Game
            </button>

            <button className="btn-back" onClick={onHome}>
                Main Menu
            </button>

        </div>

    )
}

export default GameControls;