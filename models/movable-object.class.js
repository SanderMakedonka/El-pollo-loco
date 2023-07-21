class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable objects should always fall
            return true
        } else {
            return this.y < 155;
        }
    }


    // charakter.isColliding(chicken);
    isColliding(mo) {
        return this.getRightHitBoxPos() > this.getLeftHitBoxPos(mo) &&
            this.getBottomHitBoxPos() > this.getTopHitBoxPos(mo) &&
            this.getLeftOffsetPos() < this.getRightOffsetPos(mo) &&
            this.getTopOffsetPos() < this.getBottomOffsetPos(mo);
    }


    getRightHitBoxPos() {
        return this.x + this.width - this.offset.right;
    }

    getRightOffsetPos(mo) {
        return mo.x + mo.width - mo.offset.right;
    }


    getLeftHitBoxPos(mo) {
        return mo.x + mo.offset.left;
    }


    getLeftOffsetPos() {
        return this.x + this.offset.left;
    }


    getBottomHitBoxPos() {
        return this.y + this.height - this.offset.bottom;
    }


    getBottomOffsetPos(mo) {
        return mo.y + mo.height - mo.offset.bottom;
    }


    getTopHitBoxPos(mo) {
        return mo.y + mo.offset.top;
    }


    getTopOffsetPos() {
        return this.y + this.offset.top;
    }


    hit() {
        this.hitSound.play();
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }


    kill() {
        this.energy = 0;
    }


    isDead() {
        return this.energy == 0;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.jumpSound.play();
        this.speedY = 30;
    }
}

