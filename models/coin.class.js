class Coin extends MovableObject {
    height = 100;
    width = 100;
    picCoinSound = new Audio('./audio/pic-coin.wav');
    IMAGES_COINS = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];


    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        super.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 1960;     
        this.y = 300 - Math.random() * 250;     
        this.animate();
    }

    /**
     * Animate the coin
     */
    animate() {
        setStoppableInterval(() => this.playAnimation(this.IMAGES_COINS), 500)
    }
}

