class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * constructor is defined inside a class
     * call the superclass constructor using super(), passing up the name parameter
     * create a new Object 
     * bind this to the new object
     * 
     * This function load the Image path and define coordinates x- and y-
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}