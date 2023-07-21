class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;
    speed = 0.25;


    constructor() {
        super().loadImage(this.selectRandomPicture(
            './img/5_background/layers/4_clouds/1.png',
            './img/5_background/layers/4_clouds/2.png'
        ));
        this.x = 0 + Math.random() * 2880;
        this.animate();
    }


    animate() {
        setStoppableInterval(() => this.moveLeft(), 50);
    }
}

