function renderGeneralInfoHtml() {
    return `
        <div class="info-section general">
            <h2>Besiege den mächtigen El Pollo Loco</h2>
            <p>Farmer Pepe hat sein Lieblingshuhn mit dem falschen Futter gefüttert und dadurch wurde dieses zu dem  mächtigen El Pollo Loco. 
            Besiege ihn indem du Flaschen auf ihn wirfst. Aber hüte dich, je öfter er getroffen wird umso wütender und schneller wird er.</p>
            <p>Es kommt auf die richtige Taktik an. Auch solltest du dich vor seinen kleinen Gefolgshühnern in acht nehmen. 
            Sie sind zwar kleiner aber nicht weniger gefährlich. Du kannst allerdings auf sie springen.</p>
            <p>Denke auch immer daran, dass du maximal 5 Flaschen auf einmal tragen kannst. Sei also extrem vorsichtig.</p> 
            <p>Viel Glück!</p>
        </div>
    `;
}


function renderControlInfoHtml() {
    return `
        <div class="info-section">
        <h2>Symbole</h2>
        <div id="symbols">
            <div>
                <div><img src="./img/icons/info.png"></div>
                <div>informationen</div>
            </div>
            <div>
                <div><img src="./img/icons/music-off.png"></div>
                <div>Musik an / aus</div>
            </div>
            <div>
                <div><img src="./img/icons/fullscreen.png"></div>
                <div>Vollbildschirm an / aus</div>
            </div>
        </div>
    </div>
    <div class="info-section">
        <h2>Tastenbelegung</h2>
        <div id="key-control">
            <div>
                <div class="key">&RightArrow;</div>
                <div>Nach rechts</div>
            </div>
            <div>
                <div class="key">&LeftArrow;</div>
                <div>Nach links</div>
            </div>
            <div>
                <div class="key">Leertaste</div>
                <div>Springen</div>
            </div>
            <div>
                <div class="key">D</div>
                <div>Werfen</div>
            </div>
        </div>
    </div>
    <div class="info-section">
        <h2>Steuerung auf Touchgeräten</h2>
        <p>Bei Berührung des Displays, werden Steuersymbole eingeblendet.
            Nach einer Inaktivität von mehr als 10 Sekunden werden diese wieder automatisch deaktiviert. Für ein korrektes Spielerlebnis
            wird empfohlen dein Gerät in den Landscape-Modus zu versetzen und im Spiel den Vollbildmodus einzuschalten.
        </p>
    </div>`
}