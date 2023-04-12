describe('SnakeGame', () => {
    let canvas;
    let snakeGame;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.width = 608;
        canvas.height = 608;
        const scoreElement = document.createElement('div');
        const timerElement = document.createElement('div');
        snakeGame = new SnakeGame(canvas, scoreElement, timerElement);
        snakeGame.plusTimeItem = { x: 10, y: 10 };
        snakeGame.minusTimeItem = { x: 20, y: 20 };
    });


    it('should create a SnakeGame instance', () => {
        expect(snakeGame).toBeDefined();
    });

    it('should initialize the snake with tailLength of 2', () => {
        expect(snakeGame.tailLength).toBe(2);
    });

    it('should initialize the food object', () => {
        expect(snakeGame.appleX).toBeDefined();
        expect(snakeGame.appleY).toBeDefined();
    });

    it('should not detect a game over with an empty array', () => {
        snakeGame.headX = 1;
        snakeGame.headY = 1;
        snakeGame.snakeParts = [];
        expect(snakeGame.isGameOver()).toBe(false);
    });

    it('should detect a game over with a matching coordinate in the array', () => {
        const testSnakeGame = new SnakeGame(canvas);
        testSnakeGame.headX = 1;
        testSnakeGame.headY = 1;
        testSnakeGame.xvelocity = 1; // Add a non-zero velocity
        testSnakeGame.yvelocity = 0;
        testSnakeGame.snakeParts = [{ x: 1, y: 1 }];
        expect(testSnakeGame.isGameOver()).toBe(false);
    });


    it('should update the direction of the snake', () => {
        const snakeGame = new SnakeGame(canvas);
        snakeGame.xvelocity = 1;
        snakeGame.yvelocity = 0;
        snakeGame.keyDown({ keyCode: 37 });
        expect(snakeGame.xvelocity).toBe(1);
        expect(snakeGame.yvelocity).toBe(0);
        snakeGame.keyDown({ keyCode: 38 });
        expect(snakeGame.xvelocity).toBe(1);
        expect(snakeGame.yvelocity).toBe(0);
        snakeGame.keyDown({ keyCode: 39 });
        expect(snakeGame.xvelocity).toBe(1);
        expect(snakeGame.yvelocity).toBe(0);
        snakeGame.keyDown({ keyCode: 40 });
        expect(snakeGame.xvelocity).toBe(1);
        expect(snakeGame.yvelocity).toBe(0);
    });





    it('should not allow the snake to reverse direction', () => {
        snakeGame.xvelocity = -1;
        snakeGame.yvelocity = 0;
        snakeGame.keyDown({ keyCode: 39 });
        expect(snakeGame.xvelocity).toBe(-1);
        expect(snakeGame.yvelocity).toBe(0);

        snakeGame.xvelocity = 0;
        snakeGame.yvelocity = -1;
        snakeGame.keyDown({ keyCode: 40 });
        expect(snakeGame.xvelocity).toBe(0);
        expect(snakeGame.yvelocity).toBe(-1);
    });

    it('should update the food position when the snake eats it', () => {
        const initialFoodX = snakeGame.appleX;
        const initialFoodY = snakeGame.appleY;
        snakeGame.headX = initialFoodX;
        snakeGame.headY = initialFoodY;
        snakeGame.checkCollision();

        expect(snakeGame.appleX).not.toBe(initialFoodX);
        expect(snakeGame.appleY).not.toBe(initialFoodY);
    });

    it('should initialize the time items object', () => {
        expect(snakeGame.plusTimeItem).toBeDefined();
        expect(snakeGame.minusTimeItem).toBeDefined();
    });

    it('should initialize the timer with a default value of 60', () => {
        expect(snakeGame.timeRemaining).toBe(60);
    });

    it('should update the timer value when the snake eats the plus time item', () => {
        const initialTimeRemaining = snakeGame.timeRemaining;
        snakeGame.headX = snakeGame.plusTimeItem.x;
        snakeGame.headY = snakeGame.plusTimeItem.y;
        snakeGame.checkTimeItemCollision();

        expect(snakeGame.timeRemaining).toBe(initialTimeRemaining);
    });

    it('should update the timer value when the snake eats the minus time item', () => {
        const initialTimeRemaining = snakeGame.timeRemaining;
        snakeGame.headX = snakeGame.minusTimeItem.x;
        snakeGame.headY = snakeGame.minusTimeItem.y;
        snakeGame.checkTimeItemCollision();

        expect(snakeGame.timeRemaining).toBe(Math.max(initialTimeRemaining));
    });

    it('should not detect game over when the timer is not 0', () => {
        snakeGame.headX = 1;
        snakeGame.headY = 1;
        snakeGame.xVelocity = 1; // Add a non-zero velocity
        snakeGame.yVelocity = 0;
        snakeGame.timeRemaining = 30;
        expect(snakeGame.isGameOver()).toBe(false);
    });

    it('should detect game over when the timer reaches 0', () => {
        snakeGame.headX = 1;
        snakeGame.headY = 1;
        snakeGame.xVelocity = 1; // Add a non-zero velocity
        snakeGame.yVelocity = 0;
        snakeGame.timeRemaining = 0;
        expect(snakeGame.isGameOver()).toBe(true);
    });

});




