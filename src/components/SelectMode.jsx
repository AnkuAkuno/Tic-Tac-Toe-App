function SelectMode ({onSelectMode, onBack}) {
    return (
        <div className="mode-container">
            <h2 className="screen-title"> PILIH MODE MAIN</h2>

            <div className="mode-buttons">
                <button className="btn-mode" onClick={ () => onSelectMode('ai')}>
                    Single Mode
                </button>
                <button className="btn-mode" onClick={ () => onSelectMode('pvp')}>
                    Multi-Player
                </button>
            </div>

            <button className="btn-back" onClick={onBack}>
                Kembali
            </button>
        </div>

        
    )
}

export default SelectMode