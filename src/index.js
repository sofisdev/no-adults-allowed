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
let score = 10;
let intervalId = 0
let timer = 120;
let canvas = null;
let ctx = null;
let offset = 50;
let gameIsOver = false;
let finishGame = null;

//Background house - outer limits to drwawing
let bgnX = offset;
let bgnY = offset;
let bgnWidth = 700;
let bgnHeight = 700;
let wallXN = bgnX + 500;

//player properties
let playerX = bgnX;
let playerY = 650;

//Obstacles
let eX = null;
let eY = null;
let fireObstacle = [{eX:bgnWidth , eY: 600}]
let ratObstacle = [{tX:bgnWidth , tY: 300}]
let pizzaHelp = [{pX:bgnWidth / 2 , pY: 450}]

//Wall properties
let wallHeight = 75;
let wallBottom = bgnY + wallHeight

//KeyHandler properties
let isLeftArrow = false;
let isRightArrow = false;
let isUpArrow = false;
let isDownArrow = false;



document.addEventListener('keydown', (event) => {
    event.preventDefault() // stop the arrow keys scrolling the pag

    if (event.keyCode == 39 || event.key === 'ArrowRight'){
        isLeftArrow = false;
        isRightArrow = true;        
        isUpArrow = false;
        isDownArrow = false;
    } 
    else if(event.keyCode == 37 || event.key === 'ArrowLeft') {
        isLeftArrow = true;
        isRightArrow = false;
        isUpArrow = false;
        isDownArrow = false;
    }
    else if(event.keyCode == 38 || event.key === 'ArrowUp') {
        isLeftArrow = false;
        isRightArrow = false;
        isUpArrow = true;
        isDownArrow = false;
    }
    else if(event.keyCode == 39 || event.key === 'ArrowDown') {
        isLeftArrow = false;
        isRightArrow = false;
        isUpArrow = false;
        isDownArrow = true;
    }
})

document.addEventListener("keyup", (event) => {
    isRightArrow = false;
    isLeftArrow = false;
    isUpArrow = false;
    isDownArrow = false;
})

function setCanvas() {
    //create canvas
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    
}

function drawCanvas() {
    //create canvas 
    canvas.style.backgroundColor="white"
    canvas.setAttribute("width", '800');
    canvas.setAttribute("height", '800') 
       
}

function drawLimits() {
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

function drawWall() {
    //Wall north horizontal cut
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.fillRect(wallXN,bgnY,20,400)
    ctx.closePath()

    //Wall north vertical side
    ctx.beginPath()
    ctx.fillStyle = "#855746"
    ctx.fillRect(wallXN,bgnY + 400,20,wallHeight)
    ctx.closePath()
}

function draw() {

    if(score > 0) {
        gameIsOver = false
    }
    else {
        gameIsOver = true
    }

    if(!gameIsOver){
        //Methods to draw the inside house basics
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawCanvas()
        drawLimits()
        drawFloor()
        drawBackWall()
        drawWall()

        //Obstacles
        createFire()
        createRat()
        // if (score < 7){
        //     createPizza()
        // }
        
        //Write score
        ctx.font = '30px Allerta Stencil'
        ctx.fillText('Score: ' + score, bgnX, 30)
        ctx.fillText('Time: ' + timer + ' seconds', bgnX + 200, 30)

        //create player from Player class
        player = new Player(canvas, playerX, playerY)
        player.draw()

        // update position of player depending on arrows
        if(isLeftArrow && (playerX > bgnX || (playerX > 570 && playerY < 450) )) {
            playerX -= player.xMove
        }
        else if (isRightArrow && playerX + player.width < canvas.width - offset) {
            playerX += player.xMove
        }
        else if (isUpArrow && playerY > wallBottom) {
            playerY -= player.yMove
        }
        else if (isDownArrow && playerY + player.height < canvas.height - offset) {
            playerY += player.yMove
        }

    }
    else {
        clearInterval(intervalId)
        gameOver()
    }
    
    
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createFire() {
    // loop over a set of fireObstacle to create the first animation
    for(let i = 0; i < fireObstacle.length; i++) {
        let enemyFire = new Fire(canvas, fireObstacle[i].eX, fireObstacle[i].eY)
        enemyFire.draw()

        // make the fireObstacle move towards the left on the x axis
        // decrementing the x value does that
        fireObstacle[i].eX -= 10

        // check if an enemy has reached a certain position
        if (fireObstacle[i].eX == 500) {
        // add a new fireObstacle at a random y value
            fireObstacle.push({
                eX: bgnWidth,
                eY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
            })
        }
        else if (fireObstacle[i].eX <= bgnX) {
            fireObstacle.splice(i, 1)
        }

        if((fireObstacle[i].eX == playerX + 50 || fireObstacle[i].eX + 50 == playerX) && ((playerY <= fireObstacle[i].eY && playerY + 100 > fireObstacle[i].eY) || (playerY <= fireObstacle[i].eY + 50 && playerY + 100 > fireObstacle[i].eY + 50))) {
            score--
            fireObstacle.splice(i, 1)
        }
    }
}

function createRat() {
    // loop over a set of ratObstacle to create the first animation
    for(let i = 0; i < ratObstacle.length; i++) {
        let enemyRat = new Rat(canvas, ratObstacle[i].tX, ratObstacle[i].tY)
        enemyRat.draw()

        // make the ratObstacle move towards the left on the x axis
        // decrementing the x value does that
        ratObstacle[i].tX -= 10

        // check if an enemy has reached a certain position
        if (ratObstacle[i].tX == 500) {
        // add a new rat at a random y value
            ratObstacle.push({
                tX: bgnWidth - 60,
                tY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
            })
        }
        else if (ratObstacle[i].tX <= bgnX) {
            ratObstacle.splice(i, 1)
        }

        if((ratObstacle[i].tX == playerX + 50 || ratObstacle[i].tX + 50 == playerX) && ((playerY <= ratObstacle[i].tY && playerY + 100 > ratObstacle[i].tY) || (playerY <= ratObstacle[i].tY + 50 && playerY + 100 > ratObstacle[i].tY + 50))) {
            score--
            ratObstacle.splice(i, 1)
        }
    }
}

function createPizza() {
    // loop over a set of pizzaHelp to create the first animation
    for(let i = 0; i < pizzaHelp.length; i++) {
        let pizza = new Pizza(canvas, pizzaHelp[i].pX, pizzaHelp[i].pY)
        pizza.draw()

        
        pizzaHelp.push({
            pX: Math.floor(getRandomArbitrary(0.23, 1) * bgnWidth),
            pY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
        })
        

        if(pizzaHelp.length > 0) {
            if((pizzaHelp[i].pX == playerX + 50 || pizzaHelp[i].pX + 50 == playerX) && ((playerY <= pizzaHelp[i].pY && playerY + 100 > pizzaHelp[i].pY) || (playerY <= pizzaHelp[i].pY + 50 && playerY + 100 > pizzaHelp[i].pY + 50))) {
                score++
                pizzaHelp.splice(i, 1)
            }
        }
        
    }
}

function game() { 
    //set canvas selector
    setCanvas()
    
    //set main interval animation
    intervalId = setInterval(() => {
        requestAnimationFrame(draw)
    }, 100) 
}

function setNewGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    fireObstacle = [{eX:bgnWidth , eY: 600}]
    ratObstacle = [{tX:bgnWidth , tY: 300}]
    pizzaHelp = [{pX:bgnWidth , pY: 300}]
    score = 10
    playerX = bgnX;
    playerY = 650;
}

//--------------------------------------------------//

//Functions to switch between SHEETS
// Changing DOM element depending on the screen
function DomElement(htmlString) {
    var div = document.createElement("div");
  
    div.innerHTML = htmlString;
  
    return div.children[0];
  }

let body = document.querySelector('body')

let splashScreen;
let gameScreen;
let gameOverScreen;

// to load the splash creen as main page 
loadSplashScreen();

//function when the game begins, other screens must be removed
function gameStart() {
    gameIsOver = false;
    if(gameOverScreen) {
        removeGameOverScreen()   
    }

    removeSplashScreen()
    loadGameScreen()    
    
    if (!gameIsOver) {
        // function to starts the game from the class
    game();
    }
}

//function to be called when the game is over and gameOverScreen appears
function gameOver() {
    removeGameScreen()
    loadGameOverScreen()
    setNewGame()
}


//SPLASH SCREEN
function loadSplashScreen() {   
    splashScreen = document.createElement('div')
    splashScreen.className = "splashScreen"
    splashScreen.innerHTML = `
        <h1 class="gameTitle">No Adults<br>Allowed</h1>
        <div class="characterChoice">
            <h2>Choose your character!</h2>
            <div id="characterImages">
                <button type="button" id="player1"></button>
                <button type="button" id="player2"></button>
            </div>
            <div class="chooseName">
                    <label for="playerName">What's your name? </label>
                    <input type="text" id="playerName" placeholder='Enter your name'>
            </div>
        </div>
        <div class="instructions">
            <h2>Instructions</h2>
            <div>
                <p>Example text do this do that blablablabla</p>
            </div>
        </div>
        <div class="start">
            <button id="startBtn" class ="button">START!</button>
        </div>
    `
    body.appendChild(splashScreen)

    let startBtn = document.querySelector('#startBtn')
    let playerName = document.querySelector('#playerName')
    let chooseNameLabel = document.querySelector(".chooseName label")
    //start game in the event of clicking the startBtn element
    startBtn.addEventListener('click', () => {
        // if(playerName.value != "") {
        //     gameStart()
        // }
        // else {
        //     chooseNameLabel.style.color =  "red"
        //     playerName.style.backgroundColor =  "#FFC9AC"
        // }

        gameStart()
    })

}

function removeSplashScreen() {
    splashScreen.remove()    
}

//GAME SCREEN
function loadGameScreen() {
    
    
    gameScreen = document.createElement('div')
    gameScreen.className = "gameScreen"
    gameScreen.innerHTML = `
    <h1 class="gameTitle">No Adults Allowed!</h1>
    <div class="sceneCanvas">
        <canvas></canvas>
    </div>
`
    body.appendChild(gameScreen)         
}

function removeGameScreen() {
    gameScreen.remove()
}

//GAMEOVER SCREEN
function loadGameOverScreen() {
    gameOverScreen = document.createElement('div')
    gameOverScreen.className = "gameOverScreen"
    gameOverScreen.innerHTML = `
        <h1 class="gameTitle">No Adults Allowed!</h1>
        <div class="gameOver">
            <h1>Game Over, your Parents are back!</h1>
        </div>
        <div id="scoreBar">
            <h2>your score: </h2>
            <h2 id="finalScore">test</h2>
            <button id="reStartBtn" class ="button">Play again!</button>
        </div>
        
    `
    body.appendChild(gameOverScreen)

    
    let reStartBtn = document.querySelector('#reStartBtn')
    //start game in the event of clicking the reStartBtn element
    reStartBtn.addEventListener('click', gameStart)
    
}

function removeGameOverScreen() {
    gameOverScreen.remove()
}


