# No Adults Allowed

[Click here to see deployed game](https://sofsanurb.github.io/no-adults-allowed/)

![Gamescreen](images/finalGame.png)

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][https://creativecommons.org/licenses/by-nc-sa/4.0/].

[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Description
"No Adults Allowed" is a game where the player is a kid alone in his house. The player can move vertically and horizontally through the room, avoiding incoming obstacles that appear randomly in the space and move in one direction from right to left. 
The game ends either when the player's score reaches 0 (Game lost) or when the timer stops (Game won), showing the final score to the user. 
The score will increase if the player eats food, and it will decrease every time the player hits an obstacle or an enemy.


## MVP
- Obstacles randomly appear in the space and move in one direction.
- Touching an enemy or obstacle decreases the score.
- Food randomly appears in the space every 3 seconds.
- Eating food increases the score.
- Timer is set before starting (30 sec.).
- The player can choose between 2 avatars (Kid 1 or Kid 2).


## Backlog
- Add music button (on/off)
- Responsive web design for tablets and phones
- Add new scenes.
- Add multiplayer option in one scene.


## Data structure
### index.js

- callDOMevents () {}

- playMusic () {}
- setCanvas () {}
- drawCanvas() {}
- drawLimits () {}
- drawFloor () {}
- drawBackWall () {}
- drawWall () {}
- draw () {}

- getRandomArbitrary () {}
- createFire () {}
- createRat () {}
- createPizza () {}

- game () {}
- updateTimer () {}
- setNewGame () {}
- DomElement () {}
- gameStart () {}
- loadSplashScreen () {} 
- removeSplashScreen () {} 
- loadGameScreen () {} 
- removeGameScreen () {} 
- loadGameOverScreen () {}
- removeGameOverScreen () {}
- gameOver () {}


### player.js 

- this.x;
- this.y;
- this.direction;
- this.playerImg;
- this.width;
- this.height;
- this.canvas;
- this.ctx;
- this.xMove;
- this.yMove;
- draw () {}

### obstacle.js 

- this.x;
- this.y;
- this.direction;
- this.playerImg;
- this.width;
- this.height;
- this.canvas;
- this.ctx;
- draw () {}

### helpElements.js 

- this.x;
- this.y;
- this.direction;
- this.playerImg;
- this.width;
- this.height;
- this.canvas;
- this.ctx;
- draw () {}

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen - transition between outer space and inner space
- gameOverScreen


## Links

### Slides
- [Slides Link](https://docs.google.com/presentation/d/1t6d6EYKvuuCyHxVKGqrkmNmpAaASrb2E0O4o9vVD02M/edit?usp=sharing)

### Git
- [Github repository Link](https://github.com/SofSanUrb/no-adults-allowed)
- [Deployment Link](https://sofsanurb.github.io/no-adults-allowed/)