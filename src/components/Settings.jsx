import React from "react";

function Settings ({soundEnabled, setSoundEnabled, musicEnabled, setMusicEnabled, currentTheme, setCurrentTheme, onBack }) {

return (
    <div className="settings-container">
        <h2 className="settings-title"> Game Settings</h2>

        <div className="settings-card">
            <div className="settings-item">
                <span> Sound Effect (SFX) :</span>
                <button
                className={`neon-toggle-btn ${soundEnabled ? "active" : "" }`}
                onClick={() => setSoundEnabled(!soundEnabled)}
                >
                    {soundEnabled ? "ON" : "OFF"}
                </button>
            </div>

            <div className="settings-item">
                <span> Background Music (BGM) :</span>
                <button
                className={`neon-toggle-btn ${musicEnabled ? 'active' : ''}`}
                onClick={() => setMusicEnabled(!musicEnabled)}
                >
                    {musicEnabled ? "ON" : "OFF"}
                </button>
            </div>

            <div className="setting-item column">
                <span> Neon Theme</span>
                <div className="theme-buttons">
                    <button
                    className={`theme-btn cyan ${currentTheme === 'cyan' ? 'selected' : ''}`}
                    onClick={() => setCurrentTheme("cyan")}
                    >
                        Cyber Cyan
                    </button>
                    <button
                    className={`theme-btn green ${currentTheme === 'green' ? 'selected' : ''}`}
                    onClick={() => setCurrentTheme("green")}
                    >
                        Matrix Green
                    </button>
                    <button
                    className={`theme-btn purple ${currentTheme === 'purple' ? 'selected' : ''}`}
                    onClick={() => setCurrentTheme("purple")}
                    >
                        Synth Purple
                    </button>
                </div>
            </div>
        </div>

        <button className="neon-toggle-btn-back btn-menu-back" onClick={onBack}>
        Back To Menu
        </button>
    </div>
)




}



export default Settings;