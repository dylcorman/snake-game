//Define variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 32;
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

//Create food object/define inital position
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

//Define snake's inital direction
let d; 
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode === 37 && d !== 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode === 38 && d !== 'DOWN') {
        d = 'UP';
    } else if (event.keyCode === 39 && d !== 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode === 40 && d !== 'UP') {
        d = 'DOWN';
    }
}

//Create collision factor 
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

//Function to draw the snake and food objects
function draw() { 
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(box, 3 * box, 17 * box, 17 * box);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

//
let snakeX = snake[0].x;
let snakeY = snake[0].y;

