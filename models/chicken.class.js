class Chicken extends MovableObject {
    y = 370;
    height = 60;
    width = 60;
    chickenKillSound;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = './img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 2680; // Calculates random start position
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.5; // Calculates random speed
        this.chickenKillSound = new Audio('./audio/chicken-kill.mp3');
        this.setRandomStartDirection();
        this.animate();
    }


    animate() {
        setStoppableInterval(() => this.setMovements(), 1000 / 60)
        setStoppableInterval(() => this.setAnimations(), 200);
    }


    setMovements() {
        if (!this.isDead()) {
            this.setMoveDirection();
            this.moving();
        }
    }


    setAnimations() {
        if (!this.isDead()) this.playAnimation(this.IMAGES_WALKING);
            else this.loadImage(this.IMAGE_DEAD); 
    }


    setRandomStartDirection() {
        let randomDirection = Math.random();
        if (randomDirection < 0.5) this.otherDirection = false;
            else this.otherDirection = true;
    }


    setMoveDirection() {
        if (this.x < 1) this.otherDirection = true;
        if (this.x > 2680) this.otherDirection = false;
    }


    moving() {
        if (this.otherDirection === true) this.moveRight();
            else this.moveLeft();
    }
}