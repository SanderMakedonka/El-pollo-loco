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


    setWorld() {
        this.character.world = this;
    }


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


    checkCollisions() {
        this.collisonWithEnemy();
        this.collisionWithEndboss();
        this.coinPickUp();
        this.bottlePickUp();
        this.collisionBottleWithChicken();
        this.collisionBottleWithEndboss();
    }


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


    repeatClouds() {
        this.level.clouds.forEach((cloud) => {
            if (cloud.x < -510) cloud.x = 2880;
        });
    }


    checkAllChickensAreDeath() {
        if (this.isAllChickensDead()) this.chickenBackgroundSound.pause();
    }


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


    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);  // Paints a frame around the graphics
        if (mo.otherDirection) this.flipImageBack(mo);
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


    noneFixedObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
    }


    fixedObjects() {
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.checkEndBossStatusBar();
        this.addCounter('bottle');
        this.addCounter('coin');
    }


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


    showEndbossStatusBar() {
        if (!this.endBoss.isDead()) {
            this.endBossStatusBar = new EndbossStatusBar();
            this.endBossIcon = new Icon();
        }
    }


    checkEndBossStatusBar() {
        if (this.endBossStatusBar) {
            this.addToMap(this.endBossStatusBar);
            this.addToMap(this.endBossIcon);
        }
    }


    characterIsDead() {
        if (!gameIsOver) {
            gameIsOver = true;
            setTimeout(() => {
                gameOver(false);
            }, 1000);
        }
    }


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