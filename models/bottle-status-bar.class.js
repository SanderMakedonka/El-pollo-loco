class BottleStatusBar extends DrawableObject {
    y = 0;
    x = 350;
    height = 60;
    width = 60;
    amount = 0;
    counterX = 355;
    counterY = 45;


    constructor() {
        super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
    }


    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        this.setAmount(this.percentage)
    }


    setAmount(percent) {
        let amount;
        switch (percent) {
            case 20:
                amount = 1;
                break;
            case 40:
                amount = 2;
                break;
            case 60:
                amount = 3;
                break;
            case 80:
                amount = 4;
                break;
            case 100:
                amount = 5;
                break;
            default:
                amount = 0;
        }
        this.amount = amount;
    }
}