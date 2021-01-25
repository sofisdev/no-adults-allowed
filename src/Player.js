class Player {
    constructor(canvas, x, y){
        this.x = x;
        this.y = y;
        this.direction;
        this.size;
        
        this.playerImg = new Image();
        this.srcP1Front = "../images/girlFront.png";
        this.srcP1Back = "../images/girlBack.png";
        this.srcP2Front = "../images/boyFront.png";
        this.srcP2Back = "../images/boyBack.png";
        this.playerImg.src = this.srcP1Front;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.xMove = 50;
        this.yMove = 50;

    }
    draw() {
        this.playerImg.onload = () => {
            this.ctx.drawImage(this.playerImg, this.x, this.y, this.playerImg.width/3, this.playerImg.height/3);
        } 
    }

   


    checkScreenCollision () {}
} 

