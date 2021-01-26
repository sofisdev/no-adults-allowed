//Main js file

// Changing DOM element depending on the screen
function DomElement(htmlString) {
    var div = document.createElement("div");
  
    div.innerHTML = htmlString;
  
    return div.children[0];
  }


function loadPage() {
    let body = document.querySelector('body')

    let splashScreen;
    let gameScreen;
    let gameOverScreen;

    
    // to load the splash creen as main page 
    loadSplashScreen();

    //function when the game begins, other screens must be removed
    function gameStart() {
        let playerName = document.querySelector('#playerName').value

        removeSplashScreen()
        //removeGameOverScreen()
        loadGameScreen()    
        
        if (!gameIsOver) {
            // function to starts the game from the class
        game();
        }
        else {
            console.log('game is over')
            switchtoGameOver(gameOver)
        }
        


    }

    //function to be called when the game is over and gameOverScreen appears
    function gameOver() {
        removeGameScreen()
        loadGameOverScreen()
    }

    
    //SPLASH SCREEN
    function loadSplashScreen() {

        //MOVE BACKGROUND??
        // let intervalId = setInterval(() => {
        //     body.style.backgroundPositionX -= 1
        // }, 10);
        
        splashScreen = document.createElement('div')
        splashScreen.className = "splashScreen"
        splashScreen.innerHTML = `
            <h1 class="gameTitle">No Adults<br>Allowed</h1>
            <div class="characterChoice">
                <h2>Choose your character</h2>
                <div id="characterImages">
                    <button type="button" id="player1"></button>
                    <button type="button" id="player2"></button>
                </div>
                <div class="chooseName">
                        <label for="name" >What's your name? </label>
                        <input type="text" id="playerName" maxlength="24">
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

        //start game in the event of clicking the startBtn element
        startBtn.addEventListener('click', () => {
            gameStart()
        })

    }

    function removeSplashScreen() {
        splashScreen.remove()    }

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

        //CHECK FOR THIS
        return gameScreen
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
    

}




// Load main loadPage() on first page load
window.addEventListener("load", loadPage);
