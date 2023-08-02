class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**load img */

    loadImage(path) {
        this.img = new Image(path);
        this.img.src = path;

    }

    /**
     * 
     * draw Image in Context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * 
     * draw Frame in ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken ||
            this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }


    selectRandomPicture(picture1, picture2) {
        let randomBottle = Math.random() * 10;
        if (randomBottle < 5) return picture1;
        else return picture2;
    }
}