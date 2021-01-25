//Create instances from classes
// let player = new Player()
// let obstacle = new Obstacle()
// let helpElement = new HelpElement()


//Main colors for the game:
// 0 light light warm "#FFE5DB"
// 1 light blue "#FAAA8C"
// 2 dark warm "#855746"

// dark green="#40AD9B"
//light green = "#ABF5E9"
//light light green "#D1F3EB"

    let player = null;
    let obstacle = null;
    let score = 0;
    let intervalId = 0
    let timer = null;
    let canvas = null;
    let ctx = null;
    let offset = 50;

    //Background house properties - outer limits to drwawing
    let bgnX = 50;
    let bgnY = offset;
    let bgnWidth = 0;
    let bgnHeight = 0;

    //Wall properties
    let wallHeight = 75;
    let wallBottom = bgnY + wallHeight

    //KeyHandler properties
    let isLeftArrow = false;
    let isRightArrow = false;
    let isUpArrow = false;
    let isDownArrow = false;
    let keyDownHandler = (event) => {
        event.preventDefault() // stop the arrow keys scrolling the pag

        if (event.keyCode == 39 || event.key === 'ArrowRight'){
            isLeftArrow = false;
            isRightArrow = true;        
            
        } else if(event.keyCode == 37 || event.key === 'ArrowLeft') {
            isLeftArrow = true;
            isRightArrow = false;
        }
    } 

    function drawCanvas() {
        //create canvas
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        canvas.style.backgroundColor="white"
        canvas.setAttribute("width", '800');
        canvas.setAttribute("height", '800') 
           
    }

    function drawLimits() {
        bgnWidth = canvas.width-offset*2;
        bgnHeight = canvas.height-offset*2;
        
        ctx.beginPath()
        ctx.fillStyle = "#FAAA8C"
        ctx.fillRect(bgnX,bgnY,bgnWidth,bgnHeight)
        ctx.closePath()
        
    }

    function drawFloor() {
        ctx.strokeStyle = '#FFE5DB';

        //vertical lines
        for (let i = bgnX + 50; i<canvas.width - 50; i+=50) {
            ctx.moveTo(i, wallBottom);
            ctx.lineTo(i, bgnHeight + offset);
            
            ctx.stroke();
        }
        //horizontal lines
        for (let j = wallBottom + 25; j<canvas.height - 50; j+=25) {
            ctx.moveTo(bgnX, j);
            ctx.lineTo(bgnX + bgnWidth, j);
            ctx.stroke();
        }
    }

    function drawBackWall() {
        //Main wall
        ctx.beginPath()
        ctx.fillStyle = "#D1F3EB"
        ctx.fillRect(bgnX,bgnY,bgnWidth,wallBottom)
        ctx.stroke()
        ctx.closePath()

        //wall stripe
        ctx.beginPath()
        ctx.fillStyle = "#855746"
        ctx.fillRect(bgnX,wallBottom, bgnWidth,10)
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = "#855746"
        ctx.fillRect(bgnX,wallBottom + 25, bgnWidth,10)
        ctx.stroke()
        ctx.closePath()
    }

   
    function draw() {
        //Methods to draw the inside house basics
        
        drawCanvas()
        drawLimits()
        drawFloor()
        drawBackWall()
        
        //create player from Player class
        player = new Player(canvas, bgnX, bgnHeight - 50)
        
        drawPlayer()

    }

    function drawPlayer() {

        if(isLeftArrow) {
            player.x -= player.xMove
        }
        else if (isRightArrow) {
            player.x += player.xMove
        }
        
        player.draw()

    }

     function game() { 
        // intervalID = setInterval(() => {
        //     requestAnimationFrame(draw)
        // }, 10)
        draw()
    }

    window.addEventListener("keydown", keyDownHandler);





