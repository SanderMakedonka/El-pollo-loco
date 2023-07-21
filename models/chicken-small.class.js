class ChickenSmall extends Chicken {
    y = 390;
    height = 40;
    width = 40;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = './img/3_enemies_chicken/chicken_small/2_dead/dead.png';


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.chickenKillSound = new Audio('./audio/small-chicken-kill.m4a');
    }
}