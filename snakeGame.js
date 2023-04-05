class SnakeGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.box = 32;
        this.snake = [];
        this.snake[0] = {
            x: 9 * this.box,
            y: 10 * this.box
        };

        this.food = {
            x: Math.floor(Math.random() * 17 + 1) * this.box,
            y: Math.floor(Math.random() * 15 + 3) * this.box
        };

        this.d = null;
        document.addEventListener('keydown', (event) => this.direction(event));
    }

    direction(event) {
        if (event.keyCode === 37 && this.d !== 'RIGHT') {
            this.d = 'LEFT';
        } else if (event.keyCode === 38 && this.d !== 'DOWN') {
            this.d = 'UP';
        } else if (event.keyCode === 39 && this.d !== 'LEFT') {
            this.d = 'RIGHT';
        } else if (event.keyCode === 40 && this.d !== 'UP') {
            this.d = 'DOWN';
        }
    }

    collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    draw() {
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(this.box, 3 * this.box, 17 * this.box, 17 * this.box);

        for (let i = 0; i < this.snake.length; i++) {
            this.ctx.fillStyle = (i === 0) ? 'green' : 'white';
            this.ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);

            this.ctx.strokeStyle = 'red';
            this.ctx.strokeRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
        }
    }
}

