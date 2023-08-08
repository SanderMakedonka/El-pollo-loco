let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;
let intervallIds = [];
let startScreenMusic = new Audio('./audio/startscreen-music.mp3');
let backgroundMusic = new Audio('./audio/background-music.mp3');
let youWinSound = new Audio('./audio/you-win.wav');
let youLoseSound = new Audio('./audio/you-lose.wav');
let currentMusic;
let backgroundMusicPaused = false;
let endSoundPlayed = false;
let gameIsOver;
let displayInfos = false;
let lastTouched = new Date().getTime();
let infoSection = 'general';

/**
 * Draw the start screen an load the mobile control
 */
function init() {
    canvas = document.getElementById('canvas');
    level1 = getLevel1();
    currentMusic = startScreenMusic;
    setEventListener();
}

/**
 * This function start the game
 */
function startGame() {
    world = new World(canvas, keyboard);
    gameIsOver = false;
    initStartGameCssClasses();
    initBackgroundMusic();
    if (!document.getElementById('music-off-btn').classList.contains('btn-active')) startAndStopMusic();
    document.getElementById('overlay').addEventListener('touchstart', showMovebarByTouch);
    playBackgroundMusic();
}

/**
* restart the Game
*/
function restartGame() {
    initRestartGameCssClasses();
    level1 = getLevel1();
    currentMusic.currentTime = 0;
    currentMusic = startScreenMusic;
    endSoundPlayed = false;
    playBackgroundMusic();
}

/**
 * Keyboard integration and Key's id
 */
function setEventListener() {
    setKeyListener();
    setTouchListener();
}

/**
 * set Keys in the Keyboard 
 */
function setKeyListener() {
    let events = [
        { 'code': 'ArrowRight', 'key': 'RIGHT' },
        { 'code': 'ArrowLeft', 'key': 'LEFT' },
        { 'code': 'ArrowDown', 'key': 'DOWN' },
        { 'code': 'ArrowUP', 'key': 'UP' },
        { 'code': 'Space', 'key': 'SPACE' },
        { 'code': 'KeyD', 'key': 'D' }
    ];
    keyListener(events, 'keydown');
    keyListener(events, 'keyup');
}

/**
 * Checks whether a specific key was pressed
 */
function keyListener(events, eventState) {
    window.addEventListener(eventState, (e) => {
        for (let i = 0; i < events.length; i++) {
            if (e.code === events[i].code) {
                if (eventState === 'keyup') keyboard[events[i].key] = false;
                else keyboard[events[i].key] = true;
            }
        }
    });
}

/**
* Move, Left, Space and throw-bottle-Buttons 
*/
function setTouchListener() {
    let events = [
        { 'id': 'move-right-btn', 'key': 'RIGHT' },
        { 'id': 'move-left-btn', 'key': 'LEFT' },
        { 'id': 'jump-btn', 'key': 'SPACE' },
        { 'id': 'throw-bottle-btn', 'key': 'D' },
    ];
    touchListener(events, 'touchstart');
    touchListener(events, 'touchend');
}

/**
 * handle touch events and update the keyboard object
 */
function touchListener(events, eventState) {
    let event;
    for (let i = 0; i < events.length; i++) {
        if (eventState === 'touchstart' ? event = true : false);
        document.getElementById(events[i].id).addEventListener(eventState, (e) => {
            e.preventDefault();
            keyboard[events[i].key] = event;
        });
    }
}

/**
 * Play background Music
 */
function playBackgroundMusic() {
    if (!backgroundMusicPaused) {
        currentMusic.addEventListener('ended', function () {
            currentMusic.currentTime = 0;
            currentMusic.play();
        }, false);
        currentMusic.play();
    }
}

/**
 * Start and stop music
 */
function startAndStopMusic() {
    if (!backgroundMusicPaused) {
        backgroundMusicPaused = true
        stopMusic();
    } else {
        startMusic();
        backgroundMusicPaused = false;
    }
}

/**
 * Start the music
 */
function startMusic() {
    backgroundMusicPaused = false;
    playBackgroundMusic();
}

/**
 * Stop the Music
 */
function stopMusic() {
    backgroundMusicPaused = true;
    currentMusic.pause();
}

/**
 * This function initializing and starting background Music
 */
function initBackgroundMusic() {
    stopMusic();
    currentMusic.currentTime = 0;
    currentMusic = backgroundMusic;
}

/**
 *  This function is responsible for add and remove
 *  start screen, start game, and move bar elements
 */
function initStartGameCssClasses() {
    addOrRemoveCSSClass('start-screen', 'add', 'd-none');
    addOrRemoveCSSClass('start-game', 'add', 'd-none');
    addOrRemoveCSSClass('move-bar', 'add', 'd-none');
}

/**
 * Add end-screen and restart the game 
 */
function initRestartGameCssClasses() {
    addOrRemoveCSSClass('restart-game', 'add', 'd-none');
    addOrRemoveCSSClass('end-screen', 'add', 'd-none');
    addOrRemoveCSSClass('start-screen', 'remove', 'd-none');
    addOrRemoveCSSClass('start-game', 'remove', 'd-none');
}

/**
 * Show movebar by touch
 */
function showMovebarByTouch() {
    addOrRemoveCSSClass('move-bar', 'remove', 'd-none');
    lastTouched = new Date().getTime();
}

/**
 * Remove movebar after 10s
 */
function removeMovebarAfterTime() {
    let currentTime = new Date().getTime();
    if (currentTime - lastTouched > 10000) addOrRemoveCSSClass('move-bar', "add", 'd-none');
}

/**
 * This function is to add or exit full-screen
 */
function fullscreen() {
    if (!isFullscreen) {
        let fullscreen = document.getElementById('fullscreen');
        enterFullscreen(fullscreen);
    } else exitFullscreen();
}

/**
 * This function is to add full-screen
 */
function enterFullscreen(element) {
    addOrRemoveCSSClass('header', 'add', 'd-none');
    addOrRemoveCSSClass('info', 'add', 'd-none');
    addOrRemoveCSSClass('fullscreen-btn', 'add', 'btn-active');
    isFullscreen = true;
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();      // for IE11 (remove June 15, 2022)
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen(); // iOS Safari
}

/**
 * This function is to exit full-screen
 */
function exitFullscreen() {
    addOrRemoveCSSClass('header', 'remove', 'd-none');
    addOrRemoveCSSClass('info', 'remove', 'd-none');
    addOrRemoveCSSClass('fullscreen-btn', 'remove', 'btn-active');
    isFullscreen = false;
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

/**
 * Show Info bar
 */
function showInfos() {
    let state;
    if (!displayInfos) {
        state = 'remove';
        displayInfos = true;
    } else {
        state = 'add';
        displayInfos = false;
    }
    addOrRemoveCSSClass('info-box', state, 'd-none');
    renderInfos();
}

/**
 * This function is to render Info bar
 */
function renderInfos(section) {
    setInfoSection(section);
    selectInfoHtml();
}

/**
 * This function is to set Info bar
 */
function setInfoSection(section) {
    switch (section) {
        case 'general':
            infoSection = 'general';
            break;
        case 'control':
            infoSection = 'control';
            break;
    }
}

/**
 * This function add or remove info-section:Allgemeines/Steuerung
 */
function selectInfoHtml() {
    let content = document.getElementById('info-content');
    if (infoSection === 'general') {
        content.innerHTML = renderGeneralInfoHtml();
        addOrRemoveCSSClass('control', 'remove', 'menu-active');
        addOrRemoveCSSClass('general', 'add', 'menu-active');
    } else {
        content.innerHTML = renderControlInfoHtml();
        addOrRemoveCSSClass('general', 'remove', 'menu-active');
        addOrRemoveCSSClass('control', 'add', 'menu-active');
    };
}

/**
 * This function managing different features(background-music,fullscreen and info) 
 * in a control bar interface
 */
function toggleControlBarFeatures(feature) {
    switch (feature) {
        case 'bgMusic':
            controlBarfeatureOnOff('music-off-btn');
            startAndStopMusic();
            break;
        case 'fullscreen':
            controlBarfeatureOnOff('fullscreen-btn');
            fullscreen();
            break;
        case 'info':
            controlBarfeatureOnOff('info-btn');
            showInfos();
            break;
    }
}

/**
 * This function managing ON and OFF features in Controllbar
 */
function controlBarfeatureOnOff(id) {
    let element = document.getElementById(id);
    if (element.classList.contains('btn-active')) addOrRemoveCSSClass(id, 'remove', 'btn-active');
    else addOrRemoveCSSClass(id, 'add', 'btn-active');
}

/**
 * Set Interval
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervallIds.push(id);
}

/**
 * Stop Game
 */
function stopGame() {
    intervallIds.forEach(clearInterval);

}

/**
 * Game Over
 */
function gameOver(winOrLose) {
    let endSound;
    winOrLose ? endSound = youWinSound : endSound = youLoseSound;
    if (!endSoundPlayed) {
        endSound.play();
        endSoundPlayed = true;
    }
    if (winOrLose) showEndScreen('<img src="./img/9_intro_outro_screens/game_over/game over.png">');
    else showEndScreen('<img src="./img/9_intro_outro_screens/game_over/you lost.png">');
}

/**
 * Show EndScreen Picture and stop the Game
 */
function showEndScreen(endScreenPicture) {
    document.getElementById('end-screen').innerHTML = endScreenPicture;
    addOrRemoveCSSClass('restart-game', 'remove', 'd-none');
    addOrRemoveCSSClass('end-screen', 'remove', 'd-none');
    addOrRemoveCSSClass('move-bar', 'add', 'd-none');
    stopGame();
}

/**
 * Add or remove CSS Classes
 */
function addOrRemoveCSSClass(htmlId, state, cssClass) {
    document.getElementById(htmlId).classList[state](cssClass);
}

/* Detect Landscape or Portrait mode with JavaScript
 
window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    const portrait = e.matches;
    const messageElement = document.getElementById("message");

    if (portrait) {
        document.body.style.backgroundColor = "black"; 
        window.alert("Please rotate your device for better viewing");
    } else {
        document.body.style.backgroundColor = "white";
        window.alert('Click "OK" for Landscape.');
    }
}); 
*/


