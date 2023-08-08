let level1;

/**
 * Level1 are generated with all objects
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
 * babyChickens and chicken are generated on the X axis with with a defined distance
 * @returns object
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
 * clouds are generated on the X axis with with a defined distance
 * @returns object - clouds with defined distance
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
 * backgrounds are generated on the X axis with with a defined distance
 * @returns object - backgrounds with defined distance
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
 * coins are generated on the X axis with with a defined distance
 * @returns object - coins with defined distance on x and y axis
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
 * bottles are generated on the X axis with with a defined distance
 * @returns object - bottles with defined distance on x and y axis
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