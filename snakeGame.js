class SnakeGame {
    constructor(canvas, scoreElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tileCount = 20;
        this.tileSize = canvas.width / this.tileCount - 2;
        this.headX = 10;
        this.headY = 10;
        this.snakeParts = [];
        this.tailLength = 2;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.appleX = 5;
        this.appleY = 5;
        this.score = 0;
        this.scoreElement = scoreElement;
        this.speed = 10;
        this.keyDown = this.keyDown.bind(this);
        document.body.addEventListener('keydown', (event) => this.keyDown(event));
    }

    keyDown(event) {
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


    drawGame() {
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
        setTimeout(() => this.drawGame(), 1000 / this.speed);
    }

    isGameOver() {
        let gameOver = false;

        if (this.yVelocity === 0 && this.xVelocity === 0) {
            return false;
        }

        if (this.headX < 0 || this.headX === this.tileCount || this.headY < 0 || this.headY === this.tileCount) {
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
        this.ctx.fillText("Score: " + this.score, this.canvas.width - 50, 10);
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
        }
    }
}

