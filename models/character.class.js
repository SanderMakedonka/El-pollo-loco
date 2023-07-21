class Character extends MovableObject {
    height = 280;
    width = 120;
    x = 0;
    y = 148;
    speed = 7;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    pausedTime = new Date().getTime();
    world;
    toDieSoundPlayed = false;
    walkingSound = new Audio('./audio/running.wav');
    hitSound = new Audio('./audio/hit.wav');
    jumpSound = new Audio('./audio/jump.wav');
    toDieSound = new Audio('./audio/to-die.m4a');
    snoreSound = new Audio('./audio/snore.mp3');
    offset = {
        top: 155,
        bottom: -20,
        left: 20,
        right: 20
    };


    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
    }


    animate() {
        setStoppableInterval(() => this.setMovements(), 1000 / 60);
        setStoppableInterval(() => this.setAnimations(), 100);
    }


    setMovements() {
        this.walkingSound.pause();
        if (this.isPressedKeyRight()) this.moving('right');
        if (this.isPressedKeyLeft()) this.moving('left');
        if (this.isPressedKeySpace()) this.jump();
        this.world.cameraX = -this.x + 100;
    }


    setAnimations() {
        if (this.isDead()) this.playDieAnimation();
            else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
            else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.playAnimation(this.IMAGES_WALKING);
            else this.isSleeping();
    }


    isPressedKeyRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
    }


    isPressedKeyLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    isPressedKeySpace() {
        return world.keyboard.SPACE && !this.isAboveGround();
    }


    moving(direction) {
        if (direction === 'right' ? this.moveRight() : this.moveLeft());
        if (direction === 'right' ? this.otherDirection = false : this.otherDirection = true);
        this.endedSleeping();
        this.playWalkingSound();
    }


    jump() {
        this.endedSleeping();
        super.jump();
    }


    playWalkingSound() {
        if (!this.isAboveGround()) this.walkingSound.play(); 
    }


    isSleeping() {
        let currentTime = new Date().getTime();
        if ((currentTime - this.pausedTime) > 5000) {
            if (!this.isHurt() && !this.isDead()) {
                this.snoreSound.play();
                this.playAnimation(this.IMAGES_IDLE_LONG);
            }
        } else this.playAnimation(this.IMAGES_IDLE);
    }


    endedSleeping() {
        this.pausedTime = new Date().getTime();
        this.snoreSound.pause();
    }


    playDieAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        if (!this.toDieSoundPlayed) {
            this.toDieSound.play();
            this.toDieSoundPlayed = true;
        }
    }
}



