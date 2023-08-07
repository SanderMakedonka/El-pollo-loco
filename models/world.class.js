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


    /**
     * object orientation. Into this function,
     *  all subclasses,functions and Keyboard will be integrated
     */
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
     * Object Orientation.This function set character in world class. 
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * This function check collisions,check movable objects,check endboss character,
     *  repeat clouds,check or all chickens are dead, check if games end and 
     * remove ovebar within 100ms
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
     * This funcion check collisions between enemy with endboss,
     * pick up coins and bottle and
     * check coollisions between Bottle with Chicken/Endboss
     * 
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
     * Collision with enemy.If the character is above the ground, 
     * then enemy is dead and the number of enemies is increased..
     * If not, the character is hit and his energy is reduced
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
     * Collision with endboss.When the character is injured by the Endboss
     *  his life energy is reduced
     */
    collisionWithEndboss() {
        if (this.characterCollisionWithEndboss()) {
            this.character.hit();
            this.healthStatusBar.setPercentage(this.character.energy);
        }
    }


    characterCollisionWithEnemy(enemy) {
        return this.character.isColliding(enemy) && enemy instanceof Chicken
            && !enemy.isDead() && !this.characterHasWon;
    }


    characterCollisionWithEndboss() {
        return this.character.isColliding(this.endBoss) && !this.endBoss.isDead() && !this.characterHasWon
    }

    /**
     *  Coins pick up
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
    * Bottles pick up
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
     * this function has 2 actions
     * if chicken is dead, then the number of chicken will be increased,
     * and 2. play Kill Sound in background
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
     * If endboss is dead, play attackSound in background, show endboss statusbar Energy in %
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


    bottleHitChicken(enemy, bottle) {
        return enemy.isColliding(bottle) && !enemy.isDead() && !(enemy instanceof Endboss);
    }


    bottleHitEndboss(bottle) {
        return this.endBoss.isColliding(bottle) && !this.endBoss.isDead();
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            let currentBottleThrown = new Date().getTime();
            if (currentBottleThrown - this.lastBottleThrown > 1000) { //A maximum of one bottle can be thrown per second
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


    checkGameOver() {
        if (this.isGameOver()) {
            document.getElementById('overlay').removeEventListener('touchstart', showMovebarByTouch);
            this.stopAllSounds();
            if (this.character.isDead()) this.characterIsDead();
            else this.endbossIsDead();
        }
    }


    isGameOver() {
        return this.character.isDead() || this.endBoss.isDead();
    }

    /**
     * 1.each time this funk repeats, shift left y=0
     * 2.add bottle
     * 3.back
     * 4.forwards
     * 5.push everything back to the right because the games will crash
    
     */
    draw() {
        let self = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0); //1.
        this.addObjectsToMap(this.level.backgroundObjects);
        this.noneFixedObjects();
        this.addObjectsToMap(this.throwableObjects); //2.
        this.ctx.translate(-this.cameraX, 0); //3.
        this.fixedObjects();
        this.ctx.translate(this.cameraX, 0);//4.
        this.addToMap(this.character); //5.
        this.ctx.translate(-this.cameraX, 0);
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    /**
     * 
     * objects add to Map
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    /**
     * 
     * googeln canvas mirror picture add to map
     * this.flipImage(mo); shortened Image below
     */

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);  // Paints a frame around the graphics
        if (mo.otherDirection) this.flipImageBack(mo); //end
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * this function is responsible for adding clouds, coins, bottles,
     *  and enemies to a map by calling the "addObjectsToMap"
     *  method with the respective arrays of objects.
     */

    noneFixedObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * this function is responsible for adding Healthy Statusbar, 
     * Bottle Statusbar, coins Statusbar, to check endBoss Statusbar
     * 
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
     * 
     * First, the function declares two variables, "type" and "maxValue", 
     * without assigning any initial values to them.
     * Second, checks if the value of the "counter" parameter is equal to the string 'bottle'. 
     * If it is, the function assigns the value of "this.bottleStatusBar" to the "type" variable 
     * and assigns the value 5 to the "maxValue" variable.
      This suggests that there is a bottle status bar and its maximum value is set to 5.
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


    setCounter(type, maxValue) {
        type.amount < maxValue ? this.ctx.fillStyle = "#f6d96b" : this.ctx.fillStyle = "#f1a61b";
        this.ctx.font = "bold 32px zabars";
        this.ctx.fillText(type.amount, type.counterX, type.counterY);
    }


    startBackgroundSounds() {
        this.playBackgroundSound(this.chickenBackgroundSound);
        this.playBackgroundSound(this.backGroundWindSound);
    }


    playBackgroundMusic() {
        currentMusic.addEventListener('ended', function () {
            currentMusic.currentTime = 0;
            currentMusic.play();
        }, false);
        currentMusic.play();
    }


    stopAllSounds() {
        this.chickenBackgroundSound.pause();
        this.backGroundWindSound.pause();
        this.character.hitSound.pause();
        this.character.snoreSound.pause();
        this.character.walkingSound.pause();
        currentMusic.pause();
    }

    /**
     *  Music Volume = 0.5 and windSound.volume = 0.3
     */
    soundsCalibration() {
        currentMusic.volume = 0.5;
        this.backGroundWindSound.volume = 0.3;
    }


    playBackgroundSound(sound) {
        sound.addEventListener('ended', function () {
            sound.currentTime = 0;
            sound.play();
        }, false);
        sound.play();
    }

    /**
     * Show Endboss statusbar and when endboss is dead add new Image and 
     * new Statusbar
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
     * Pepe is dead
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
     * Endboss is dead
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