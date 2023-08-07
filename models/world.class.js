class World {
    character = new Character();
    level = level1;
    endBoss = this.level.enemies.find(e => e instanceof Endboss);
    canvas;
    keyboard;
    ctx;
    characterX;
    characterPaused = new Date().getTime();
    otherDirection = false;
    cameraX = 0;
    healthStatusBar = new HealthStatusBar();
    bottleStatusBar = new BottleStatusBar();
    coinStatusBar = new CoinStatusBar();
    endBossStatusBar;
    endBossIcon;
    throwableObjects = [];
    picedCoins = 0;
    allCoins = this.level.coins.length;
    picedBottles = 0;
    killedChickens = 0;
    lastBottleThrown = new Date().getTime();
    chickenBackgroundSound = new Audio('./audio/chickens-background-sound.mp3');
    backGroundWindSound = new Audio('./audio/wind.mp3');
    backGroundWindSoundvolume = 0.0;
    characterHasWon = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
        this.draw();
        this.startBackgroundSounds();
        this.soundsCalibration();
    }

    /**
     * hands over the world to the character
     */
    setWorld() {
        this.character.world = this;
    }


    /**
      * Check all collisions and throw objects
      */
    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossSeeCharacter();
            this.repeatClouds();
            this.checkAllChickensAreDeath();
            this.checkGameOver();
            removeMovebarAfterTime();
        }, 100);
    }

    /**
     * check all collisions and throw objects and
     * pick up coins and bottle 
     */
    checkCollisions() {
        this.collisonWithEnemy();
        this.collisionWithEndboss();
        this.coinPickUp();
        this.bottlePickUp();
        this.collisionBottleWithChicken();
        this.collisionBottleWithEndboss();
    }

    /**
     * Character killes the enemy then
     * play kills dound. When nicht,
     * character get demaged and 
     * health stauts bar gets set
     */
    collisonWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterCollisionWithEnemy(enemy)) {
                if (this.character.isAboveGround()) {
                    enemy.kill();
                    enemy.chickenKillSound.play();
                    this.killedChickens++;
                } else {
                    this.character.hit();
                    this.healthStatusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Character is colliding with endBoss.
     * character is demaged, then
     * health StatusBar/his energy is reduced
     */
    collisionWithEndboss() {
        if (this.characterCollisionWithEndboss()) {
            this.character.hit();
            this.healthStatusBar.setPercentage(this.character.energy);
        }
    }

    /**
     *  Character is colliding with enemy
     */
    characterCollisionWithEnemy(enemy) {
        return this.character.isColliding(enemy) && enemy instanceof Chicken
            && !enemy.isDead() && !this.characterHasWon;
    }

    /**
     *  Character is colliding with endBoss
     */
    characterCollisionWithEndboss() {
        return this.character.isColliding(this.endBoss) && !this.endBoss.isDead() && !this.characterHasWon
    }

    /**
     *  This function picked up Coins 
     */
    coinPickUp() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coin.picCoinSound.play();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.picedCoins++;
                this.coinStatusBar.setPercentage(this.picedCoins);
            }
        });
    }

    /**
    * Character collides with a bottle. 
    * the character hasn't already picked up 5 bottles, then
    * removes the picked bottle from the array, and updates a bottle status bar accordingly.
    */
    bottlePickUp() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.picedBottles < 5) {
                    bottle.picBottleSound.play();
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                    this.picedBottles++;
                    this.bottleStatusBar.setPercentage(this.picedBottles * (100 / 5));
                }
            }
        });
    }

    /**
     * The bottle is colliding with the enemy,
     * enemy is dead, then
     * play kill sound
     */
    collisionBottleWithChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach(enemy => {
                if (this.bottleHitChicken(enemy, bottle)) {
                    enemy.kill();
                    this.killedChickens++;
                    enemy.chickenKillSound.play();
                    bottle.enemyKill = true;
                }
            });
        });
    }

    /**
     * The bottle is colliding with the endBoss
     * endboss is demaged, 
     * play attackSound in background,
     * stauts bar gets set
     */
    collisionBottleWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.bottleHitEndboss(bottle)) {
                this.seeCharacter = true;
                this.endBoss.attackSound.play();
                this.endBoss.hit();
                this.showEndbossStatusBar();
                this.endBossStatusBar.setPercentage(this.endBoss.energy);
                bottle.endBossIsHurt = true;
            }
        });
    }

    /**
     *Enemy is colliding with the bottle,
     * the enemy is not dead 
     * the enemy is not an instance of the Endboss class
     */
    bottleHitChicken(enemy, bottle) {
        return enemy.isColliding(bottle) && !enemy.isDead() && !(enemy instanceof Endboss);
    }

    /**
     *The end boss is colliding with the bottle
     * the end boss is not dead.
     */
    bottleHitEndboss(bottle) {
        return this.endBoss.isColliding(bottle) && !this.endBoss.isDead();
    }

    /**
     * Check throw Objects
     * maximum of one bottle can be thrown per second
     */
    checkThrowObjects() {
        if (this.keyboard.D) {
            let currentBottleThrown = new Date().getTime();
            if (currentBottleThrown - this.lastBottleThrown > 1000) { 
                if (this.picedBottles > 0) {
                    let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
                    this.throwableObjects.push(bottle);
                    this.picedBottles--;
                    this.bottleStatusBar.setPercentage(this.picedBottles * (100 / 5));
                    this.lastBottleThrown = new Date().getTime();
                }
            }
        }
    }

    /**
     * check and show endBoss status bar
     */
    checkEndbossSeeCharacter() {
        if (this.character.x > 2190 && !this.endBoss.seeCharacter) {
            setTimeout(() => {
                this.endBoss.seeCharacter = true;
                this.showEndbossStatusBar();
            }, 3000)
        }
    }

    /**
     * repeat Clouds
     */
    repeatClouds() {
        this.level.clouds.forEach((cloud) => {
            if (cloud.x < -510) cloud.x = 2880;
        });
    }

    /**
     * check if all chicken are dead
     */
    checkAllChickensAreDeath() {
        if (this.isAllChickensDead()) this.chickenBackgroundSound.pause();
    }

    /**
     * level back if all chicken are dead
     */
    isAllChickensDead() {
        return this.killedChickens === this.level.enemies.length - 1;
    }

    /**
     * check if game is over
     */
    checkGameOver() {
        if (this.isGameOver()) {
            document.getElementById('overlay').removeEventListener('touchstart', showMovebarByTouch);
            this.stopAllSounds();
            if (this.character.isDead()) this.characterIsDead();
            else this.endbossIsDead();
        }
    }

    /**
     * if character or endboss is dead, then game is over
     */
    isGameOver() {
        return this.character.isDead() || this.endBoss.isDead();
    }

    /**
     * Draw the world on the canvas and set the camera position
     */
    draw() {
        let self = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0); 
        this.addObjectsToMap(this.level.backgroundObjects);
        this.noneFixedObjects();
        this.addObjectsToMap(this.throwableObjects); 
        this.ctx.translate(-this.cameraX, 0); 
        this.fixedObjects();
        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.character); 
        this.ctx.translate(-this.cameraX, 0);
        requestAnimationFrame(function () {
            self.draw();
        })
    }

     /**
     * This function calls the addToMap function for all objects of the array 
     * 
     * @param {object} objects - this parameter is an object
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    /**
     * The function is used to draw the object
     * 
     * @param {object} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);  // Paints a frame around the graphics
        if (mo.otherDirection) this.flipImageBack(mo); //end
    }

     /**
     * The function is flip the image when the character is walking in other direction
     * 
     * @param {object} mo  - this parameter is an object
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * The function is flip the image back when it was flipped before 
     * 
     * @param {object} mo -  this parameter is an object
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * add clouds, coins, bottles, enemies to Map
     */
    noneFixedObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * add health-, bottle- and coins Statusbar, and check endBoss Statusbar 
     */
    fixedObjects() {
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.checkEndBossStatusBar();
        this.addCounter('bottle');
        this.addCounter('coin');
    }

    /**
     * checks if the value of the "counter" parameter is equal to the 'bottle'. 
     * If it is, bottle status bar - maximum value is 5
     */
    addCounter(counter) {
        let type;
        let maxValue;
        if (counter === 'bottle') {
            type = this.bottleStatusBar;
            maxValue = 5;
        } else {
            type = this.coinStatusBar;
            maxValue = 15;
        }
        this.setCounter(type, maxValue);
    }

    /**
     * Initialize and declaring the count variables
     */
    setCounter(type, maxValue) {
        type.amount < maxValue ? this.ctx.fillStyle = "#f6d96b" : this.ctx.fillStyle = "#f1a61b";
        this.ctx.font = "bold 32px zabars";
        this.ctx.fillText(type.amount, type.counterX, type.counterY);
    }

    /**
     * Start background sounds
     */
    startBackgroundSounds() {
        this.playBackgroundSound(this.chickenBackgroundSound);
        this.playBackgroundSound(this.backGroundWindSound);
    }

    /**
     * Play background music
     */
    playBackgroundMusic() {
        currentMusic.addEventListener('ended', function () {
            currentMusic.currentTime = 0;
            currentMusic.play();
        }, false);
        currentMusic.play();
    }

    /**
     * Stop all sounds
     */
    stopAllSounds() {
        this.chickenBackgroundSound.pause();
        this.backGroundWindSound.pause();
        this.character.hitSound.pause();
        this.character.snoreSound.pause();
        this.character.walkingSound.pause();
        currentMusic.pause();
    }

    /**
     *  Add music volume
     */
    soundsCalibration() {
        currentMusic.volume = 0.0;
        this.backGroundWindSound.volume = 0.0;
    }

    /**
     * Play background Sound
     */
    playBackgroundSound(sound) {
        sound.addEventListener('ended', function () {
            sound.currentTime = 0;
            sound.play();
        }, false);
        sound.play();
    }

    /**
     * Show Endboss statusbar,when 
     * endboss is dead add new Image and new Statusbar
     */
    showEndbossStatusBar() {
        if (!this.endBoss.isDead()) {
            this.endBossStatusBar = new EndbossStatusBar();
            this.endBossIcon = new Icon();
        }
    }

    /**
     * Check Endboss statusbar
     */
    checkEndBossStatusBar() {
        if (this.endBossStatusBar) {
            this.addToMap(this.endBossStatusBar);
            this.addToMap(this.endBossIcon);
        }
    }

    /**
     * Chracter is dead, then
     * Game is over
     */
    characterIsDead() {
        if (!gameIsOver) {
            gameIsOver = true;
            setTimeout(() => {
                gameOver(false);
            }, 1000);
        }
    }

    /**
     * Character is winner, then
     * endBoss is dead/grilled 
     */
    endbossIsDead() {
        if (!gameIsOver) {
            gameIsOver = true;
            this.characterHasWon = true;
            setTimeout(() => {
                this.endBoss.grilledSound.pause();
                gameOver(true);
            }, 4000);
        }
    }
}