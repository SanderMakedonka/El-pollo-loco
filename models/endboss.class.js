class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    seeCharacter = false;
    speed = 1.5;
    energy = 100;
    playedDieSound = false;
    attackSound = new Audio('./audio/endboss-attack.wav');
    hitSound = new Audio('./audio/endboss-attack.wav');
    dieSound = new Audio('./audio/endboss-kill.mp3');
    grilledSound = new Audio('./audio/endboss-grilled.mp3');
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2550;
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
            this.checkMovingStart();
        }, 1000 / 60)


        setStoppableInterval(() => {
           this.setAnimations();
        }, 200);
    }


    checkMovingStart() {
        if (this.ifMovePossible()) {
            this.moving();
            this.changeMoveDirection();
        }
    }


    setAnimations() {
        if (this.ifMovePossible()) this.playMovingAnimations();
            else this.playAnimation(this.IMAGES_ALERT);
        if (this.isHurt()) this.playIsHurtAnimation();
        if (this.isDead()) this.playDieAnimation();
    }


    changeMoveDirection() {
        if (this.x < 1) this.otherDirection = true;
        if (this.x > 2680)  this.otherDirection = false;
    }


    moving() {
        if (this.otherDirection === true) this.moveRight();
            else this.moveLeft();
    }


    playMovingAnimations() {
        if (this.isInAttackingDistance()) this.playAttackAnimation();
            else this.playAnimation(this.IMAGES_WALKING);
    }

    
    ifMovePossible() {
        return this.seeCharacter && !this.isDead();
    }


    isInAttackingDistance() {
        return this.x < world.character.x + 100 && this.x > world.character.x - 100
    }


    playAttackAnimation() {
        this.attackSound.play();
        this.playAnimation(this.IMAGES_ATTACK);
    }


    playDieAnimation() {
        this.seeCharacter = false;
        this.playAnimation(this.IMAGES_DEAD);
        if (!this.playedDieSound) {
            this.dieSound.play();
            this.grilledSound.play();
            this.playedDieSound = true;
        }
    }


    playIsHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.seeCharacter = true;
        this.speed += 0.2;
    }
}