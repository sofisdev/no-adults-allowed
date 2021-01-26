class Pizza {
    constructor(canvas, x, y){
        this.x = x;
        this.y = y;
        this.direction;
        
        
        this.PizzaImg = new Image();
        this.imgSrc = "../images/pizza.png";
        this.PizzaImg.src = this.imgSrc;

        this.width = 50;
        this.height = 50;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.xMove = 50;
        this.yMove = 50;

    }
    draw() {
        this.ctx.drawImage(this.PizzaImg, this.x, this.y, this.width, this.height); 
    }
} 