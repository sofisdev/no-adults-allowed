class Fire {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.direction;
        
        
        this.FireImg = new Image();
        this.imgSrc = "../images/fire.png";
        this.FireImg.src = this.imgSrc;

        this.width = 50;
        this.height = 50;

        // this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.xMove = 50;
        this.yMove = 50;

    }
    draw() {
        this.FireImg.onload = () => {
            this.ctx.drawImage(this.FireImg, this.x, this.y, this.width, this.height);
        } 
    }
} 