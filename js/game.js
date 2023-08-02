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




function init() {
    canvas = document.getElementById('canvas');
    level1 = getLevel1();
    currentMusic = startScreenMusic;
    setEventListener();
}

/**
* start Game
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
* restart Game
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
* allows you to add event listeners on any HTML DOM object such as HTML elements, the HTML document,
 the window object, or other objects that support events
*/

function setEventListener() {
    setKeyListener();
    setTouchListener();
}

/**
 * set Keyboard / key
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
 this function sets up a key event listener that updates 
 a keyboard object based on the specified keys and event state
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


function startMusic() {
    backgroundMusicPaused = false;
    playBackgroundMusic();
}


function stopMusic() {
    backgroundMusicPaused = true;
    currentMusic.pause();
}


function initBackgroundMusic() {
    stopMusic();
    currentMusic.currentTime = 0;
    currentMusic = backgroundMusic;
}

/**
 * is responsible for initializing the CSS classes 
 * for the start screen, start game, and move bar elements
 */

function initStartGameCssClasses() {
    addOrRemoveCSSClass('start-screen', 'add', 'd-none');
    addOrRemoveCSSClass('start-game', 'add', 'd-none');
    addOrRemoveCSSClass('move-bar', 'add', 'd-none');
}

/**
 * is responsible for initializing the CSS classes 
 * for the restart screen
 */

function initRestartGameCssClasses() {
    addOrRemoveCSSClass('restart-game', 'add', 'd-none');
    addOrRemoveCSSClass('end-screen', 'add', 'd-none');
    addOrRemoveCSSClass('start-screen', 'remove', 'd-none');
    addOrRemoveCSSClass('start-game', 'remove', 'd-none');
}


function showMovebarByTouch() {
    addOrRemoveCSSClass('move-bar', 'remove', 'd-none');
    lastTouched = new Date().getTime();
}


function removeMovebarAfterTime() {
    let currentTime = new Date().getTime();
    if (currentTime - lastTouched > 10000) addOrRemoveCSSClass('move-bar', "add", 'd-none');
}


function fullscreen() {
    if (!isFullscreen) {
        let fullscreen = document.getElementById('fullscreen');
        enterFullscreen(fullscreen);
    } else exitFullscreen();
}


function enterFullscreen(element) {
    addOrRemoveCSSClass('header', 'add', 'd-none');
    addOrRemoveCSSClass('info', 'add', 'd-none');
    addOrRemoveCSSClass('fullscreen-btn', 'add', 'btn-active');
    isFullscreen = true;
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();      // for IE11 (remove June 15, 2022)
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen(); // iOS Safari
}


function exitFullscreen() {
    addOrRemoveCSSClass('header', 'remove', 'd-none');
    addOrRemoveCSSClass('info', 'remove', 'd-none');
    addOrRemoveCSSClass('fullscreen-btn', 'remove', 'btn-active');
    isFullscreen = false;
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}


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


function renderInfos(section) {
    setInfoSection(section);
    selectInfoHtml();
}


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


function controlBarfeatureOnOff(id) {
    let element = document.getElementById(id);
    if (element.classList.contains('btn-active')) addOrRemoveCSSClass(id, 'remove', 'btn-active');
    else addOrRemoveCSSClass(id, 'add', 'btn-active');
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervallIds.push(id);
}


function stopGame() {
    intervallIds.forEach(clearInterval);

}


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


function showEndScreen(endScreenPicture) {
    document.getElementById('end-screen').innerHTML = endScreenPicture;
    addOrRemoveCSSClass('restart-game', 'remove', 'd-none');
    addOrRemoveCSSClass('end-screen', 'remove', 'd-none');
    addOrRemoveCSSClass('move-bar', 'add', 'd-none');
    stopGame();
}


// Adds or removes CSS classes
function addOrRemoveCSSClass(htmlId, state, cssClass) {
    document.getElementById(htmlId).classList[state](cssClass);
}

//Detect Landscape or Portrait mode with JavaScript
window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    const portrait = e.matches;

    if (portrait) {
        window.alert("PLease rotate your device for better viewing");
    } else {
        window.alert('Click "ok" for Landscape.');
    }
});
