class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * constructor is defined inside a class
     * call the superclass constructor using super(), passing up the name parameter
     * create a new Object 
     * bind this to the new object, so you can refer to this in your constructor code
     * 
     * This function load Image path and define coordinate x and y
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}