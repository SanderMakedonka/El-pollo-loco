class StatusBar extends DrawableObject {
    x = 0;
    y = 0;
    percentage;
    width = 200;
    height = 60;


    constructor() {
        super();
    }

    // setPercentage(50);
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage > 99) return 5;
            else if (this.percentage > 79) return 4;
            else if (this.percentage > 59) return 3;
            else if (this.percentage > 39) return 2;
            else if (this.percentage > 19) return 1;
                else return 0;
    }
}