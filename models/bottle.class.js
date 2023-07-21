class Bottle extends DrawableObject {
    height = 60;
    width = 50;
    y = 360;
    picBottleSound = new Audio('audio/pick-bottle.wav');


    constructor() {
        super().loadImage(this.selectRandomPicture(
            './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        ));
        this.x = 200 + Math.random() * 1960;    // Calculates random    
        this.y = 330 + Math.random() * 60;      // x and y positions  
    }
}


