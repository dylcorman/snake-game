const canvas = document.getElementById('gameCanvas');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const snakeGame = new SnakeGame(canvas, scoreElement, timerElement);
snakeGame.drawGame();






