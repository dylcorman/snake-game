class SnakeGame {
    constructor(canvas, scoreElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scoreElement = scoreElement;
        this.tileCount = 20;
        this.updateCanvasSize();
        this.initializeGame();
        window.addEventListener('resize', () => this.handleResize());
    }

    initializeGame() {
        this.headX = 10;
        this.headY = 10;
        this.snakeParts = [];
        this.tailLength = 2;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.appleX = 5;
        this.appleY = 5;
        this.score = 0;
        this.speed = 10;
        this.paused = false;
        this.highScore = this.loadHighScore();
        this.keyDown = this.keyDown.bind(this);
        document.body.addEventListener('keydown', (event) => this.keyDown(event));
    }

    updateCanvasSize() {
        const minDimension = Math.min(window.innerWidth, window.innerHeight) * 0.8;
        this.canvas.width = minDimension;
        this.canvas.height = minDimension;
        this.tileSize = minDimension / this.tileCount - 2;
    }

    handleResize() {
        this.updateCanvasSize();
        this.drawGame();
    }

    keyDown(event) {
        if (event.keyCode === 27) {
            this.togglePause();
        }
        if ((event.keyCode === 38 || event.keyCode === 87) && this.yVelocity !== 1) { // Add "W" key (keyCode 87)
            this.yVelocity = -1;
            this.xVelocity = 0;
        } else if ((event.keyCode === 40 || event.keyCode === 83) && this.yVelocity !== -1) { // Add "S" key (keyCode 83)
            this.yVelocity = 1;
            this.xVelocity = 0;
        } else if ((event.keyCode === 37 || event.keyCode === 65) && this.xVelocity !== 1) { // Add "A" key (keyCode 65)
            this.yVelocity = 0;
            this.xVelocity = -1;
        } else if ((event.keyCode === 39 || event.keyCode === 68) && this.xVelocity !== -1) { // Add "D" key (keyCode 68)
            this.yVelocity = 0;
            this.xVelocity = 1;
        }
    }

    togglePause() {
        this.paused = !this.paused;
        const pauseMenu = document.getElementById('pause-menu');
        if (this.paused) {
            pauseMenu.style.display = 'block';
        } else {
            pauseMenu.style.display = 'none';
            this.drawGame();
        }
    }


    drawGame() {
        if (this.paused) return;

        this.changeSnakePosition();
        let isGameOver = this.isGameOver();
        if (isGameOver) {
            return;
        }
        this.clearScreen();
        this.drawSnake();
        this.drawApple();
        this.checkCollision();
        this.drawScore();
        this.drawHighScore();
        setTimeout(() => this.drawGame(), 1000 / this.speed);
    }

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

        if (gameOver) {
            this.ctx.fillStyle = "white";
            this.ctx.font = "50px Verdana";
            this.ctx.fillText("Game Over!", this.canvas.width / 6.5, this.canvas.height / 2);
        }

        return gameOver;
    }

    drawScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "10px Verdana";
        this.ctx.fillText("Score: " + this.score, (this.canvas.width / 2) - 30, 10);
    }

    drawHighScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "10px Verdana";
        this.ctx.fillText('High Score: ' + this.highScore, this.canvas.width - 50, 10);
    }

    loadHighScore() {
        const highScore = localStorage.getItem('snakeGameHighScore');
        return highScore ? parseInt(highScore) : 0;
    }

    saveHighScore(score) {
        localStorage.setItem('snakeGameHighScore', score);
    }

    clearScreen() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

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

    changeSnakePosition() {
        this.headX += this.xVelocity;
        this.headY += this.yVelocity;
    }

    drawApple() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.appleX * this.tileCount, this.appleY * this.tileCount, this.tileSize, this.tileSize);
    }

    checkCollision() {
        if (this.appleX === this.headX && this.appleY === this.headY) {
            this.appleX = Math.floor(Math.random() * this.tileCount);
            this.appleY = Math.floor(Math.random() * this.tileCount);
            this.tailLength++;
            this.score++;
            //check to if current score is higer than high score, then save if neccessary
            if (this.score > this.highScore) {
                this.highScore = this.score;
                this.saveHighScore(this.highScore);
            }
        }
    }
}

