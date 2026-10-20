function SelectDifficulty({onSelectDifficulty, onBack}) {

    return (
        <div className="mode-container">
            <h2 className="screen-title">PILIH TINGKAT KESULITAN</h2>

            <div className="mode-buttons">
                <button className="btn-mode btn-easy" onClick={() => onSelectDifficulty('easy')}>
                Easy ( Santai )    
                </button> 
                <button className="btn-mode btn-medium" onClick={() => onSelectDifficulty('medium')}>
                Medium ( Menantang )    
                </button> 
                <button className="btn-mode btn-hard" onClick={() => onSelectDifficulty('hard')}>
                Hardcore ( Mustahil )    
                </button> 
            </div>

            <button className="btn-back" onClick={onBack}>
                Kembali
            </button>
        </div>
    )
}

export default SelectDifficulty