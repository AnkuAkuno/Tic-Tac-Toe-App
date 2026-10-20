function SelectSymbol ({onSelectSymbol, onBack}) {

    return (
        <div className="mode-container">
            <h2 className="screen-title">PILIH SIMBOL KAMU</h2>
            <p className="symbol-subtitle">Simbol X selalu jalan duluan!</p>

            <div className="symbol-buttons">
                <button className="btn-symbol btn-x" onClick={() => onSelectSymbol('X')}>
                    X
                </button>
                <button className="btn-symbol btn-o" onClick={() => onSelectSymbol('O')}>
                    O
                </button>
            </div>

            <button className="btn-back" onClick={onBack}>
                Kembali
            </button>
        </div>
    )
}

export default SelectSymbol