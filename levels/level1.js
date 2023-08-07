let level1;

/**
 *create and return a new instance of a "Level" object
 */
function getLevel1() {
    return new Level (
        getLevel1Enemies(),
        getLevel1Clouds(),
        getLevel1BackgroundObjects(),
        getLevel1Coins(),
        getLevel1Bottles()
    );
}

/**
 *create and return "Level" of enemies
 */
function getLevel1Enemies() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new Endboss()
    ];
}

/**
 *create and return "Level" of Clouds
 */
function getLevel1Clouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ];
}

/**
 *create and return "Level" of Background Objects
 */
function getLevel1BackgroundObjects() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png',  719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png',  719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png',  719 * 2),

        new BackgroundObject('img/5_background/layers/air.png',  719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
    ];
}

/**
 *create and return "Level" of Coins
 */
function getLevel1Coins() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ];
}

/**
 *create and return "Level" of Bottles
 */
function getLevel1Bottles() {
    return [
        new Bottle(),
        new Bottle(),  
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),  
        new Bottle(),
        new Bottle(),  
        new Bottle()
     ];
}