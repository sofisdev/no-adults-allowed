class Fire {
    constructor(canvas, x, y){
        this.x = x;
        this.y = y;
        this.direction;
        
        
        this.FireImg = new Image();
        this.imgSrc = "../images/fire.png";
        this.FireImg.src = this.imgSrc;

        this.width = 50;
        this.height = 50;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.xMove = 50;
        this.yMove = 50;

    }
    draw() {
        this.ctx.drawImage(this.FireImg, this.x, this.y, this.width, this.height); 
    }
} 

class Rat {
    constructor(canvas, x, y){
        this.x = x;
        this.y = y;
        this.direction;
        
        
        this.RatImg = new Image();
        this.imgSrc = "../images/rat.png";
        this.RatImg.src = this.imgSrc;

        this.width = 50;
        this.height = 50;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.xMove = 50;
        this.yMove = 50;

    }
    draw() {
        this.ctx.drawImage(this.RatImg, this.x, this.y, this.width, this.height); 
    }
} 