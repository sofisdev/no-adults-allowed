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

let win = window

let playerLeftSelected = false;
let playerRightSelected = false;
let userName = "";
let player = null;
let obstacle = null;
let score = 10;
let intervalId = 0;
let timerId = 0;
let pizzaTimerId = 0;
let frameNo = 0;
let isTimeForPizza = false;
let timer = 30;
let canvas = null;
let canvasHeight = 800;
let canvasWidth = 800;
let ctx = null;


let offset = 50;
let gameIsOver = false;
let finishGame = null;
let finalScore = 0;

//Background house - outer limits to drwawing
let bgnX = offset;
let bgnY = offset;
let bgnWidth = canvasWidth - (offset*2);
let bgnHeight = canvasHeight - (offset*2);
let wallXN = bgnWidth - 100;

//player properties
let playerX = bgnX;
let playerHeight = 100;
let playerY = canvasHeight - playerHeight - offset;

//Obstacles
let eX = null;
let eY = null;
let fireObstacle = [{eX:bgnWidth , eY: 600}]
let ratObstacle = [{tX:bgnWidth , tY: 300}]
let pizzaHelp = [{pX:bgnWidth / 2 , pY: 450}]

//Wall properties
let wallHeight = offset* 3 / 2;
let wallBottom = offset + wallHeight

//KeyHandler properties
let isLeftArrow = false;
let isRightArrow = false;
let isUpArrow = false;
let isDownArrow = false;

let LeftDirection = false;
let RightDirection = false;
let UpDirection = false;
let DownDirection = false;

//Music variables
let backMusic = new Audio();
backMusic.src = "audio/backMusic.ogg"


let minusMusic = new Audio();
minusMusic.src = "audio/minus.ogg"
minusMusic.volume = 1

let plusMusic = new Audio();
plusMusic.src = "audio/plus.ogg"

let selectMusic = new Audio();
selectMusic.src = "audio/select.ogg"

function callDOMevents() {
    document.addEventListener('keydown', (event) => {
        event.preventDefault() // stop the arrow keys scrolling the pag

        if (event.keyCode == 39 || event.key === 'ArrowRight'){
            isLeftArrow = false;
            isRightArrow = true;        
            isUpArrow = false;
            isDownArrow = false;

            LeftDirection = false;
            RightDirection = true;        
            UpDirection = false;
            DownDirection = false;
        } 
        else if(event.keyCode == 37 || event.key === 'ArrowLeft') {
            isLeftArrow = true;
            isRightArrow = false;
            isUpArrow = false;
            isDownArrow = false;

            LeftDirection = true;
            RightDirection = false;        
            UpDirection = false;
            DownDirection = false;
        }
        else if(event.keyCode == 38 || event.key === 'ArrowUp') {
            isLeftArrow = false;
            isRightArrow = false;
            isUpArrow = true;
            isDownArrow = false;

            LeftDirection = false;
            RightDirection = false;        
            UpDirection = true;
            DownDirection = false;
        }
        else if(event.keyCode == 39 || event.key === 'ArrowDown') {
            isLeftArrow = false;
            isRightArrow = false;
            isUpArrow = false;
            isDownArrow = true;

            LeftDirection = false;
            RightDirection = false;        
            UpDirection = false;
            DownDirection = true;
        }
    })

    document.addEventListener("keyup", (event) => {
        isRightArrow = false;
        isLeftArrow = false;
        isUpArrow = false;
        isDownArrow = false;
    })    
}

function playMusic(music) {
    music.play();
    music.volume = 0.3
}

function setCanvas() {
    //create canvas
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");  
}

function drawCanvas() {
   //create canvas 
    canvas.style.backgroundColor="white"
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight) 
    ctx.font = '30px Allerta Stencil'
}

function drawLimits() {
    
    ctx.beginPath()
    ctx.fillStyle = "#FAAA8C"
    ctx.fillRect(offset,offset,bgnWidth,bgnHeight)
    ctx.closePath()
    
}

function drawFloor() {
    ctx.strokeStyle = '#FFE5DB';

    //vertical lines
    for (let i = offset; i<canvas.width - offset; i+=offset) {
        ctx.moveTo(i, wallBottom);
        ctx.lineTo(i, bgnHeight + offset);
        
        ctx.stroke();
    }
    //horizontal lines
    for (let j = wallBottom + (offset / 2); j<canvas.height - offset; j+=(offset / 2)) {
        ctx.moveTo(offset, j);
        ctx.lineTo(bgnWidth + offset, j);
        ctx.stroke();
    }
}

function drawBackWall() {
    //Main wall
    ctx.beginPath()
    ctx.fillStyle = "#D1F3EB"
    ctx.fillRect(offset,offset,bgnWidth,wallBottom)
    ctx.stroke()
    ctx.closePath()

    //wall stripe
    ctx.beginPath()
    ctx.fillStyle = "#855746"
    ctx.fillRect(offset,wallBottom, bgnWidth, offset / 5)
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.fillStyle = "#855746"
    ctx.fillRect(offset,wallBottom + offset / 2, bgnWidth, offset / 5)
    ctx.stroke()
    ctx.closePath()
}

function drawWall() {
    //Wall north horizontal cut
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.fillRect(wallXN,offset,20,400)
    ctx.closePath()

    //Wall north vertical side
    ctx.beginPath()
    ctx.fillStyle = "#855746"
    ctx.fillRect(wallXN,offset + 400,20,wallHeight)
    ctx.closePath()
}

function draw() {
    if(score <= 0 || timer <= 0) {
        gameIsOver = true
    }
    else {
        gameIsOver = false
    }

    if(gameIsOver){
        finalScore = score;
        clearInterval(intervalId)
        clearInterval(timerId)
        clearInterval(pizzaTimerId)
        gameOver()
    }
    else {
        if (backMusic.currentTime == 0){
            playMusic(backMusic)
        }
        
        let w = screen.width;
        
        //Methods to draw the inside house basics
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawCanvas()
        drawLimits()
        drawFloor()
        drawBackWall()


        //Write score
        if(score < 5 || timer < 5){
            ctx.fillStyle = "red";
            backMusic.volume = 0.5
            backMusic.playbackRate = 1.5
        }

        ctx.fillText('Life pts: ' + score + '    |    Home Alone time: ' + timer + ' seconds', offset, offset*2/3)

        //create player from Player class
        player = new Player(canvas, playerX, playerY)

        player.draw()

        //Obstacles
        createFire()
        createRat()

        if (isTimeForPizza) {
            createPizza()
        }

        //DOM events in case of responsive gameScreen
        let btnLeft = document.querySelector('#btn-left')
        let btnRight = document.querySelector('#btn-right')
        let btnUp = document.querySelector('#btn-up')
        let btnDown = document.querySelector('#btn-down')

        btnDown.addEventListener('touchstart', () => {
            isLeftArrow = false;
            isRightArrow = false;
            isUpArrow = false;
            isDownArrow = true;
    
            LeftDirection = false;
            RightDirection = false;        
            UpDirection = false;
            DownDirection = true;
        })
    
        btnUp.addEventListener('touchstart', () => {
            isLeftArrow = false;
            isRightArrow = false;
            isUpArrow = true;
            isDownArrow = false;
    
            LeftDirection = false;
            RightDirection = false;        
            UpDirection = true;
            DownDirection = false;
        })
    
        btnLeft.addEventListener('touchstart', () => {
            isLeftArrow = true;
            isRightArrow = false;
            isUpArrow = false;
            isDownArrow = false;
    
            LeftDirection = true;
            RightDirection = false;        
            UpDirection = false;
            DownDirection = false;
        })
    
        btnRight.addEventListener('touchstart', () => {
            isLeftArrow = false;
            isRightArrow = true;
            isUpArrow = false;
            isDownArrow = false;
    
            LeftDirection = false;
            RightDirection = true;        
            UpDirection = false;
            DownDirection = false;
        })

        document.addEventListener("touchend", (event) => {
            isRightArrow = false;
            isLeftArrow = false;
            isUpArrow = false;
            isDownArrow = false;
        })

        // update position of player depending on arrows
        if(isLeftArrow && playerX > offset) {
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
        
        if(score < 5 || timer < 5){
            fireObstacle[i].eX -= 20
            // check if an enemy has reached a certain position
            if (fireObstacle.length <= 1 || fireObstacle[i].eX == 550) {
            // add a new fireObstacle at a random y value
                fireObstacle.push({
                    eX: bgnWidth,
                    eY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
                })
            }
        }
        else {
            fireObstacle[i].eX -= 10
            // check if an enemy has reached a certain position
            if (fireObstacle[i].eX <= 550 && fireObstacle.length <= 1) {
            // add a new fireObstacle at a random y value
                fireObstacle.push({
                    eX: bgnWidth,
                    eY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
                })
            }
            else if (fireObstacle[i].eX == 550) {
                // add a new fireObstacle at a random y value
                    fireObstacle.push({
                        eX: bgnWidth,
                        eY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
                    })
                }
        }

        if (fireObstacle[i].eX <= bgnX) {
            fireObstacle.splice(i, 1)
        }

        //check collisions
        if((playerX < fireObstacle[i].eX + 50 &&
            playerX + 50 > fireObstacle[i].eX &&
            playerY < fireObstacle[i].eY + 50 &&
            100 + playerY > fireObstacle[i].eY)) {
            score--
            playMusic(minusMusic)
            fireObstacle.splice(i, 1)
        }
    }
}

function createRat() {
    // loop over a set of ratObstacle to create the first animation
    for(let i = 0; i < ratObstacle.length; i++) {
        let enemyRat = new Rat(canvas, ratObstacle[i].tX, ratObstacle[i].tY)
        enemyRat.draw()

        if(score < 5 || timer < 5){
            ratObstacle[i].tX -= 20
            // check if an enemy has reached a certain position
            if (ratObstacle.length <= 1 || ratObstacle[i].tX == 550) {
            // add a new fireObstacle at a random y value
            ratObstacle.push({
                    tX: bgnWidth,
                    tY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
                })
            }
        }
        else {
            ratObstacle[i].tX -= 10
            // check if an enemy has reached a certain position
            if (ratObstacle[i].tX <= 550 && ratObstacle.length <= 1) {
            // add a new fireObstacle at a random y value
            ratObstacle.push({
                    tX: bgnWidth,
                    tY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
                })
            }
            else if (ratObstacle[i].tX == 550) {
                // add a new fireObstacle at a random y value
                ratObstacle.push({
                        tX: bgnWidth,
                        tY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
                    })
                }
        }
        
        if (ratObstacle[i].tX <= 50) {
            ratObstacle.splice(i, 1)
        
        }

        //check collisions
        if((playerX < ratObstacle[i].tX + 50 &&
            playerX + 50 > ratObstacle[i].tX &&
            playerY < ratObstacle[i].tY + 50 &&
            100 + playerY > ratObstacle[i].tY)) {
            score--
            playMusic(minusMusic)
            ratObstacle.splice(i, 1)
        }
    }
}

function createPizza() {
    // loop over a set of pizzaHelp to create the first animation
    for(let i = 0; i < pizzaHelp.length; i++) {
        
        let pizza = new Pizza(canvas, pizzaHelp[i].pX, pizzaHelp[i].pY)
        pizza.draw()

        if(pizzaHelp.length > 0) {
            if((playerX < pizzaHelp[i].pX + 50 &&
                playerX + 50 > pizzaHelp[i].pX &&
                playerY < pizzaHelp[i].pY + 50 &&
                100 + playerY > pizzaHelp[i].pY)){
                score++
                playMusic(plusMusic)
                pizzaHelp.splice(i, 1)
                pizzaHelp.push({
                    pX: 200,
                    pY: Math.floor(getRandomArbitrary(0.23, 1) * bgnHeight)
                })
                isTimeForPizza = false
            }
        }
    }

}


function game() { 
    //set canvas selector
    callDOMevents()
    setCanvas()
    
    //set main interval animation
    intervalId = setInterval(() => {
        requestAnimationFrame(draw)
    }, 100) 

    timerId = setInterval(() => {
        requestAnimationFrame(updateTimer)
    }, 1000) 

    pizzaTimerId = setInterval(() => {
        isTimeForPizza = true
    }, 3000) 

}

function updateTimer() {
    timer --
}

function setNewGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    fireObstacle = [{eX:bgnWidth , eY: 600}]
    ratObstacle = [{tX:bgnWidth , tY: 300}]
    pizzaHelp = [{pX:bgnWidth , pY: 300}]
    score = 10
    timer = 30
    playerX = bgnX;
    playerY = 650;
    DownDirection = true;
    UpDirection = false;
    LeftDirection = false;
    RightDirection = false;
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
        playMusic(backMusic)
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
            <h2>1 - What's your name?</h2>
            <div class="chooseName">
                    <label for="playerName"></label>
                    <input type="text" id="playerName" placeholder='Enter your name'>
            </div>
            <h2>2 - Choose your Kid!</h2>
            <div id="characterImages">
                <button type="button" id="player1"></button>
                <button type="button" id="player2"></button>
            </div>
        </div>
        <div class="instructions">
            <h2>Instructions</h2>
            <div>
                Easy! As any other kid, avoid dangerous incoming risks and eat as much pizza as possible before your parents come back home!<br>
                <br>Arrow Right - Move RIGHT <br>Arrow Left - Move LEFT<br>Arrow Up - Move UP<br>Arrow Down - Move DOWN
                
            </div>
        </div>
        <div class="start">
            <button id="startBtn" class ="button">START!</button>
        </div>
        <div id="copyright">
            <p>©2021 Sofía Sánchez Urbano</p>
            
            </div>
    `
    
    body.appendChild(splashScreen)

    let startBtn = document.querySelector('#startBtn')
    let playerName = document.querySelector('#playerName')
    // let chooseNameLabel = document.querySelector(".chooseName label")
    let playerBtnLeft = document.querySelector('#player1')
    let playerBtnRight = document.querySelector('#player2')
    let chooseTitle = document.querySelectorAll('.characterChoice h2')

    //Set conditions to be able to start the game
    playerBtnLeft.addEventListener('click', () => {
        playerLeftSelected = true;
        playMusic(selectMusic)
    })

    playerBtnRight.addEventListener('click', () => {
        playerRightSelected = true;
        playMusic(selectMusic)
    })

    //start game in the event of clicking the startBtn element
    startBtn.addEventListener('click', () => {
        if(playerName.value != "" && (playerLeftSelected || playerRightSelected)) {
            userName = playerName.value;
            playMusic(selectMusic)
            gameStart()
            
        }
        else {
            // chooseNameLabel.style.color =  "red"
            playerName.style.backgroundColor =  "#FFC9AC"
            chooseTitle.forEach(elem => elem.style.color = 'red');
        }      
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
    <div id="responsive">
        <button class="btn" id="btn-up">▲</button>
        <div>
            <button class="btn" id="btn-left">◄</button>
            <button class="btn" id="btn-right">►</button>
        </div>
        <button class="btn" id="btn-down">▼</button>
    </div>
    <div id="copyright">©2021 Sofía Sánchez Urbano</div>
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
        <div id="copyright">©2021 Sofía Sánchez Urbano</div>
    `
    body.appendChild(gameOverScreen)

    let gameOverMessage = document.querySelector('.gameOver h1')
    let finalScoreDOM = document.querySelector('#finalScore')

    if(finalScore > 0) {
        gameOverMessage.innerText = "You won " + userName + "! \n Time's up! your parents are back!"
        finalScoreDOM.innerHTML = finalScore
    }
    else {
        gameOverMessage.innerText = 'Oups ' + userName + ' you lost!'
        finalScoreDOM.innerHTML = 0
    }
    
    let reStartBtn = document.querySelector('#reStartBtn')
    //start game in the event of clicking the reStartBtn element
    reStartBtn.addEventListener('click', () => {
        //pause current game music and reset the speed in case the game starts again
        backMusic.pause()
        backMusic.currentTime = 0
        backMusic.playbackRate = 1

        //clickin noise
        playMusic(selectMusic)

        //Restart game and music
        gameStart()
    })
    
}

function removeGameOverScreen() {
    gameOverScreen.remove()
}


