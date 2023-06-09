class SnakeGame {
    constructor(canvas, scoreElement, timerElement) {
        // Initialize game properties
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scoreElement = scoreElement;
        this.timerElement = timerElement;
        this.tileCount = 20;
        this.directionChanged = false;
        this.gameStarted = false;
        this.updateCanvasSize();
        this.initializeGame();
        window.addEventListener('resize', () => this.handleResize());
    }

    // Set initial game values
    initializeGame() {
        // Snake position/parts
        this.headX = 10;
        this.headY = 10;
        this.snakeParts = [];
        this.tailLength = 2;
        // Velocity and direction
        this.xVelocity = 0;
        this.yVelocity = 0;
        // Position of apple
        this.appleX = 5;
        this.appleY = 5;
        // Score and speed
        this.score = 0;
        this.speed = 10;
        // Pause and high score 
        this.paused = false;
        this.highScore = this.loadHighScore();
        // Initialize timer
        this.timeRemaining = 60;
        this.timerStarted = false; // Initialize timerStarted
        // Initialize time Items
        this.initializeTimeItems();
        // Bind keyDown method and add event listener
        this.keyDown = this.keyDown.bind(this);
        document.body.addEventListener('keydown', (event) => this.keyDown(event));
    }

    // Method to reset timer 
    resetTimer() {
        this.timeRemaining = 60;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    // Add the updateTimerDisplay method
    drawTimeRemaining() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "10px Verdana";
        this.ctx.fillText("Time Remaining: " + this.timeRemaining, this.canvas.width / 20, this.canvas.height / 40);
    }


    // Start timer method
    startTimer() {
        if (!this.timerInterval) {
            this.timerInterval = setInterval(() => {
                this.timeRemaining--;

                if (this.timeRemaining < 0) {
                    clearInterval(this.timerInterval);
                    this.timerInterval = null;
                    this.isGameOver();
                } else {
                    this.drawTimeRemaining();
                }
            }, 1000);
        }
    }


    // Add methods for initializing time items
    initializeTimeItems() {
        this.placeTimePlusItem();
        this.placeTimeMinusItem();
    }

    placeTimePlusItem() {
        this.timePlusX = Math.floor(Math.random() * this.tileCount);
        this.timePlusY = Math.floor(Math.random() * this.tileCount);
        // Ensure the time plus item is within the game board
        if (this.timePlusX * this.tileSize >= this.canvas.width) {
            this.timePlusX = this.tileCount - 1;
        }
        if (this.timePlusY * this.tileSize >= this.canvas.height) {
            this.timePlusY = this.tileCount - 1;
        }
    }

    placeTimeMinusItem() {
        this.timeMinusX = Math.floor(Math.random() * this.tileCount);
        this.timeMinusY = Math.floor(Math.random() * this.tileCount);
        // Ensure the time minus item is within the game board
        if (this.timeMinusX * this.tileSize >= this.canvas.width) {
            this.timeMinusX = this.tileCount - 1;
        }
        if (this.timeMinusY * this.tileSize >= this.canvas.height) {
            this.timeMinusY = this.tileCount - 1;
        }
    }

    drawTimeItems() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold " + this.tileSize + "px Arial";
        this.ctx.fillText("+", this.timePlusX * this.tileCount, (this.timePlusY + 1) * this.tileCount);
        this.ctx.fillText("-", this.timeMinusX * this.tileCount, (this.timeMinusY + 1) * this.tileCount);
    }

    checkTimeItemCollision() {
        if (this.timePlusX === this.headX && this.timePlusY === this.headY) {
            this.placeTimePlusItem();
            this.timeRemaining += 10; // Add 10 seconds to the timer
        }

        if (this.timeMinusX === this.headX && this.timeMinusY === this.headY) {
            this.placeTimeMinusItem();
            this.timeRemaining -= 10; // Subtract 10 seconds from the timer
            if (this.timeRemaining < 0) this.timeRemaining = 0;
        }
    }

    // Update canvas size based on window size
    updateCanvasSize() {
        const minDimension = Math.min(window.innerWidth, window.innerHeight) * 0.8;
        this.canvas.width = minDimension;
        this.canvas.height = minDimension;
        this.tileSize = minDimension / this.tileCount - 2;
    }

    // Hanlde window resize
    handleResize() {
        this.updateCanvasSize();
        this.drawGame();
    }

    // Handle keyboard input for snake movement/game pause
    keyDown(event) {
        if (event.keyCode === 27) {
            this.togglePause();
        }

        if (!this.timerStarted && (event.keyCode === 38 || event.keyCode === 87 || event.keyCode === 40 || event.keyCode === 83 || event.keyCode === 37 || event.keyCode === 65 || event.keyCode === 39 || event.keyCode === 68)) {
            this.startTimer();
            this.timerStarted = true;
        }

        if (this.directionChanged) {
            return;
        }

        if ((event.keyCode === 38 || event.keyCode === 87) && this.yVelocity !== 1) {
            this.yVelocity = -1;
            this.xVelocity = 0;
            this.directionChanged = true;
        } else if ((event.keyCode === 40 || event.keyCode === 83) && this.yVelocity !== -1) {
            this.yVelocity = 1;
            this.xVelocity = 0;
            this.directionChanged = true;
        } else if ((event.keyCode === 37 || event.keyCode === 65) && this.xVelocity !== 1) {
            this.yVelocity = 0;
            this.xVelocity = -1;
            this.directionChanged = true;
        } else if ((event.keyCode === 39 || event.keyCode === 68) && this.xVelocity !== -1) {
            this.yVelocity = 0;
            this.xVelocity = 1;
            this.directionChanged = true;
        }
    }


    // Toggle pause state/display pause menu
    togglePause() {
        this.paused = !this.paused;
        const pauseMenu = document.getElementById('pause-menu');
        if (this.paused) {
            pauseMenu.style.display = 'block';
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        } else {
            pauseMenu.style.display = 'none';
            this.startTimer();
            this.drawGame();
        }
    }



    // Main game loop
    drawGame() {
        if (this.paused) return;

        // Update snake position and check for game over
        this.changeSnakePosition();
        this.directionChanged = false;
        let isGameOver = this.isGameOver();
        if (isGameOver) {
            return;
        }
        this.clearScreen();
        this.drawSnake();
        this.drawApple();
        this.checkCollision();
        this.checkTimeItemCollision();
        this.drawScore();
        this.drawHighScore();
        this.drawTimeItems();
        this.drawTimeRemaining(); 
        setTimeout(() => this.drawGame(), 1000 / this.speed);
    }


    // Check to see if the game is over due to snake collision/border collision
    isGameOver() {
        let gameOver = false;

        if (this.yVelocity === 0 && this.xVelocity === 0) {
            return false;
        }

        if (this.headX < 0 || this.headX * this.tileCount >= this.canvas.width || this.headY < 0 || this.headY * this.tileCount >= this.canvas.height) {
            gameOver = true;
        }


        for (let i = 0; i < this.snakeParts.length; i++) {
            let part = this.snakeParts[i];
            if (part.x === this.headX && part.y === this.headY) {
                gameOver = true;
                break;
            }
        }

        // Check if timer has reached zero
        if (this.timeRemaining <= 0) {
            gameOver = true;
        }

        if (gameOver) {
            this.ctx.fillStyle = "white";
            this.ctx.font = "50px Verdana";
            this.ctx.fillText("Game Over!", this.canvas.width / 6.5, this.canvas.height / 2);

            // Clear timer interval
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        return gameOver;
    }

    // Display current score on canvas
    drawScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "10px Verdana";
        this.ctx.fillText("Score: " + this.score, (this.canvas.width / 2) - 30, 10);
    }

    // Display high score on canvas
    drawHighScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "10px Verdana";
        this.ctx.fillText('High Score: ' + this.highScore, this.canvas.width - 80, 10);
    }

    // Load high score from local storage
    loadHighScore() {
        const highScore = localStorage.getItem('snakeGameHighScore');
        return highScore ? parseInt(highScore) : 0;
    }

    // Save high score to local storage
    saveHighScore(score) {
        localStorage.setItem('snakeGameHighScore', score);
    }

    // Clear canvas for redrawing game elements
    clearScreen() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw snake on canvas
    drawSnake() {
        this.ctx.fillStyle = "green";
        for (let i = 0; i < this.snakeParts.length; i++) {
            let part = this.snakeParts[i];
            this.ctx.fillRect(part.x * this.tileCount, part.y * this.tileCount, this.tileSize, this.tileSize);
        }

        this.snakeParts.push({ x: this.headX, y: this.headY });
        if (this.snakeParts.length > this.tailLength) {
            this.snakeParts.shift();
        }

        this.ctx.fillStyle = "orange";
        this.ctx.fillRect(this.headX * this.tileCount, this.headY * this.tileCount, this.tileSize, this.tileSize);
    }

    // Update snake posistion
    changeSnakePosition() {
        this.headX += this.xVelocity;
        this.headY += this.yVelocity;
    }

    // Draw apple on canvas
    drawApple() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.appleX * this.tileCount, this.appleY * this.tileCount, this.tileSize, this.tileSize);
    }

    // Check for collision
    checkCollision() {
        if (this.appleX === this.headX && this.appleY === this.headY) {
            this.appleX = Math.floor(Math.random() * this.tileCount);
            this.appleY = Math.floor(Math.random() * this.tileCount);
            this.tailLength++;
            this.score++;
            this.checkTimeItemCollision();
            //check to if current score is higer than high score, then save if neccessary
            if (this.score > this.highScore) {
                this.highScore = this.score;
                this.saveHighScore(this.highScore);
            }
        }
    }
}

