class BottleStatusBar extends DrawableObject {
    y = 0;
    x = 350;
    height = 60;
    width = 60;
    amount = 0;
    counterX = 355;
    counterY = 45;

    /**
     * constructor musst be defined inside a class
     * call the superclass constructor using super()
     * create a new Object 
     * bind this to the new object, so you can refer to this in your constructor code
     * 
     * This function load Bottle's Image path
     */
    constructor() {
        super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
    }

     /**
     * set the percentage for the status bar 
     * 
     * @param {number} percentage - precentage for the status bar
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        this.setAmount(this.percentage)
    }

    /**
     * set the Amount for the status bar 
     * 
     * @param {number} percent 
     */
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