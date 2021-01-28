class Player {
    constructor(canvas, x, y){
        this.x = x;
        this.y = y;
        this.direction;
        
        this.playerImg = new Image();
        
        this.width = 50;
        this.height = 100;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.xMove = 50;
        this.yMove = 50;

        if (playerLeftSelected) {
            this.srcP1Front = "images/girlFront.png";
            this.srcP1Back = "images/girlBack.png";
            this.srcP1Left = "images/girlLeft.png";
            this.srcP1Right = "images/girlRight.png";
        }
        else {
            this.srcP1Front = "images/boyFront.png";
            this.srcP1Back = "images/boyBack.png";
            this.srcP1Left = "images/boyLeft.png";
            this.srcP1Right = "images/boyRight.png";
        }
        
        this.playerImg.src = this.srcP1Front
    }
    draw() {

        if(LeftDirection) {
            this.playerImg.src = this.srcP1Left;
        }
        else if (RightDirection) {
            this.playerImg.src = this.srcP1Right;
        }
        else if (UpDirection) {
            this.playerImg.src = this.srcP1Back;
        }
        else if (DownDirection) {
            this.playerImg.src = this.srcP1Front;
        }


        this.ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height);
        // this.playerImg.onload = () => {
        //     this.ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height);
        // } 
    }
} 

