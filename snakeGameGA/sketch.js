const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
const gridSize = 30;
let gridWidth;
let gridHeight;

let snake;
let food;

function setup() {
  createCanvas(floor(windowWidth / gridSize) * gridSize, floor(windowHeight / gridSize) * gridSize);
  noStroke();
  gridWidth = floor(width / gridSize);
  gridHeight = floor(height / gridSize);

  snake = new Snake(floor(width / gridSize / 2), floor(height / gridSize / 2), 0);
  food = new Food();
  frameRate(8);
}

function drawRectOnGrid(x, y) {
  rect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function draw() {
  background(0);
  food.show();

  snake.move();
  snake.eat();
  snake.show();
  if (snake.hit()) {
    console.log("HIT!");
    noLoop();
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW && snake.dir != DOWN) {
    snake.dir = UP;
  } else if (keyCode == DOWN_ARROW && snake.dir != UP) {
    snake.dir = DOWN;
  } else if (keyCode == LEFT_ARROW && snake.dir != RIGHT) {
    snake.dir = LEFT;
  } else if (keyCode == RIGHT_ARROW && snake.dir != LEFT) {
    snake.dir = RIGHT;
  }
  // switch (keyCode) {
  //   case UP_ARROW:
  //     break;
  //   case DOWN_ARROW:
  //     snake.dir = DOWN;
  //     break;
  //   case LEFT_ARROW:
  //     snake.dir = LEFT;
  //     break;
  //   case RIGHT_ARROW:
  //     snake.dir = RIGHT;
  //     break;
  //   default:
  //     break;
  // }
}