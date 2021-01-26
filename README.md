# No Adults Allowed

[Click here to see deployed game](http://github.com)

## Description
"No Adults Allowed" is a game where the player is a kid who is alone in his house. The player has to move vertically and horizontally through the rooms, avoidind incoming obstacles/fireObstacle that appear randomly in the space. 
The game ends either when the player's score reaches 0 or when the timer stops, showing the final score to the user. 
The score will increase if the player eats food or finds weapons, and it will decrease every time the player hits an obstacle or an enemy.


## MVP
- fireObstacle or obstacles will randomly appear in the space
- Touching an enemy or obstacle decreases the score
- Food or weapons will randomly appear in the space
- Eating food or getting weapons increases the score
- Timer is set by the user before starting, choosing between 30 sec, 1 min or 3 min.


## Backlog
- Add scorebar and counter of weapons
- Add outer space
- Add new enemy that randomly appears and moves throuh the scene vertically and horizontally
- Add option to choose between 2 characters (Kid 1 or Kid 2)


## Data structure
# main.js

- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}
- addEventListener() {}

# mainGame.js

- Game () {}
- starLoop () {}
- checkCollisions () {}
- addObstacle () {}
- addHelpElements () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}

# player.js 

- setCoordinates () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkScreenCollision () {}

# obstacle.js 

- setCoordinates () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}

# helpElements.js 

- setCoordinates () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}



## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen - transition between outer space and inner space
- gameOverScreen


## Task

- main: buildSplashScreen
- main: buildGameScreen
- main: buildGameOverScreen
- main: addEventListener

- mainGame: Game
- mainGame: starLoop
- mainGame: checkCollisions
- mainGame: addObstacle
- mainGame: addHelpElements
- mainGame: clearCanvas
- mainGame: updateCanvas
- mainGame: drawCanvas
- mainGame: GameOver

- player: setCoordinates
- player: draw
- player: move
- player: checkScreenCollision

- obstacle: setCoordinates
- obstacle: draw
- obstacle: move

- heplElements: setCoordinates
- heplElements: draw
- heplElements: move

## Links

### Trello
- [Trello Link](https://trello.com)

### Slides
- [Slides Link](http://slides.com)

### Git
- [Github repository Link](http://github.com)
- [Deployment Link](http://github.com)