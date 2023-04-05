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

    it('should initialize the snake with one segment', () => {
        expect(snakeGame.snake.length).toBe(1);
    });

    it('should initialize the food object', () => {
        expect(snakeGame.food).toBeDefined();
    });

    it('should not detect a collision with an empty array', () => {
        const head = { x: 1, y: 1 };
        const array = [];
        expect(snakeGame.collision(head, array)).toBe(false);
    });

    it('should detect a collision with a matching coordinate in the array', () => {
        const head = { x: 1, y: 1 };
        const array = [{ x: 1, y: 1 }];
        expect(snakeGame.collision(head, array)).toBe(true);
    });
});

