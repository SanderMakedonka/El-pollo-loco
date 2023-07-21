class Level {
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    levelEndX = 2200;


    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}