class CoinStatusBar extends BottleStatusBar {
    height = 60;
    width = 60;
    y = 0;
    x = 265;
    counterX = 250;
    counterY = 45;
    amount = 0;


    constructor() {
        super().loadImage('./img/7_statusbars/3_icons/icon_coin.png');
    }


    setAmount(percent) {
        this.amount = percent;
    }
}