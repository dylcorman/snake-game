describe('SnakeGame', () => {
    let canvas;
    let snakeGame;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.width = 608;
        canvas.height = 608;
        snakeGame = new SnakeGame(canvas);
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
        snakeGame.keyDown({ keyCode: 37 });
        expect(snakeGame.xvelocity).toBe(-1);
        expect(snakeGame.yvelocity).toBe(0);
        snakeGame.keyDown({ keyCode: 38 });
        expect(snakeGame.xvelocity).toBe(0);
        expect(snakeGame.yvelocity).toBe(-1);
        snakeGame.keyDown({ keyCode: 39 });
        expect(snakeGame.xvelocity).toBe(1);
        expect(snakeGame.yvelocity).toBe(0);
        snakeGame.keyDown({ keyCode: 40 });
        expect(snakeGame.xvelocity).toBe(0);
        expect(snakeGame.yvelocity).toBe(1);
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
});




