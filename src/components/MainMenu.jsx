function MainMenu ({onQuickPlay}) {

    return (
        <div className="main-menu-container">
            <div className="neon-title"> 
                <h1> TIC TAC TOE</h1>
                <p className="neon-copyright"> Made By : Anku Akuno</p>
            </div>
            <div className="menu-buttons">
                <button className="btn-menu" onClick={onQuickPlay}>
                    Quick Play
                </button>
                <button className="btn-menu">
                    Settings
                </button>
            </div>
        </div>
    )

}

export default MainMenu