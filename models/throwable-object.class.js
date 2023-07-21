class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    throwBootleSound = new Audio('./audio/throw-bottle.wav');
    brockenBootleSound = new Audio('./audio/broken-bottle.wav');
    enemyKill = false;
    endBossIsHurt = false;
    bottleSplashed = false;
    throwDirection;


    constructor(x, y, throwDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.throwDirection = throwDirection;
    }


    throw() {
        this.throwBootleSound.play();
        this.speedY = 30;
        this.applyGravity();
        this.animate();
        setStoppableInterval(() => {
            if (this.throwDirection) this.x -= 10;
                else this.x += 10;
        }, 25);
    }


    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
            this.bottleSplash();
        }, 100);
    }


    bottleSplash() {
        if (this.hasHitBottle()) {
            this.playAnimation(this.IMAGES_SPLASH);
            this.brockenBootleSound.play();
            this.enemyKill = false;
            this.endBossIsHurt = false;
            this.loadImage('./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png');
        }
    }


    hasHitBottle() {
        return this.bottleHitTheGround() || this.enemyKill || this.endBossIsHurt;
    }

    
    bottleHitTheGround() {
        if (this.y > 300 && this.y < 390) {
            return true;
        }
    }
}


