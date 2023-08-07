class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * gravitation Function
     * Check if an object is above the ground and moving up
     * The position on the y-axis is decremented by an interval with acceleration 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { //Throwable objects should always NOT fall
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                // speed minus acceleration
            }
        }, 1000 / 25);
    }

    /**
     * checks whether an object is above the earth and returns a value
     * Throwable objects should always fall
     * @returns - a value that depends on the instance of an object
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true
        } else {
            return this.y < 155;
        }
    }

    /**
     * Check if a object is colliding with another
     * 
     * @param {object} mo - this parameter is an object
     * @returns 
     */
    isColliding(mo) {
        return this.getRightHitBoxPos() > this.getLeftHitBoxPos(mo) &&
            this.getBottomHitBoxPos() > this.getTopHitBoxPos(mo) &&
            this.getLeftOffsetPos() < this.getRightOffsetPos(mo) &&
            this.getTopOffsetPos() < this.getBottomOffsetPos(mo);
    }

    /**
     *Calculates and returns the rightmost position of the hitbox for the current object.
     */
    getRightHitBoxPos() {
        return this.x + this.width - this.offset.right;
    }
    
    /**
     *Calculates and returns the OffSet-Right Position with another object (mo). 
     */
    getRightOffsetPos(mo) {
        return mo.x + mo.width - mo.offset.right;
    }

    /**
     * Calculates and returns the leftmost position of the hitbox for another object (mo)
     * @param {object} mo 
     * @returns 
     */
    getLeftHitBoxPos(mo) {
        return mo.x + mo.offset.left;
    }

    /**
     *Calculates and returns the OffSet-Left Position with another object (mo). 
     */
    getLeftOffsetPos() {
        return this.x + this.offset.left;
    }

    /**
     * Calculates and returns the bottommost position of the offset box for another object (mo).
     */
    getBottomHitBoxPos() {
        return this.y + this.height - this.offset.bottom;
    }
    
    /**
     *Calculates and returns the OffSet-Bottom Position with another object (mo). 
     */
    getBottomOffsetPos(mo) {
        return mo.y + mo.height - mo.offset.bottom;
    }

    /**
     *  Calculates and returns the topmost position of the hitbox for another object (mo).
    */
    getTopHitBoxPos(mo) {
        return mo.y + mo.offset.top;
    }

    /**
     *  Calculates and returns the topmost position of the offset box for the current object
    */
    getTopOffsetPos() {
        return this.y + this.offset.top;
    }

    
    /**
     * Reduce the energy of an object
     */
    hit() {
        this.hitSound.play();
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

     /**
     * Check if the passed time is smaller than a given value
     * 
     * @returns - if the elapsed time is less than 1
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; // difference in s
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead 
     */
    kill() {
        this.energy = 0;
    }

    /**
     * Checks if the object is dead 
     * 
     * @returns - true
     */
    isDead() {
        return this.energy == 0;
    }
    
    /**
     * Move images from one array to another
     * 
     * @param {Array} images - Array of images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Move a object to right
     */
    moveRight() {
        this.x += this.speed; //x ++
    }

    /**
     * Move a object to left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Objects jump by adding speed y 
     */
    jump() {
        this.jumpSound.play();
        this.speedY = 30;
    }
}

