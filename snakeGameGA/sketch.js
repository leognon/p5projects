/*
NN.JS AND MATRIX.JS ARE BOTH CREDITED TO DANIEL SHIFFMAN. (https://github.com/CodingTrain/Toy-Neural-Network-JS)
For information on how it works, see his video series: https://youtu.be/XJ7HLz9VYz0?list=PLRqwX-V7Uu6aCibgK1PTWWu9by6XFdCfh
*/

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const UPLEFT = 4;
const UPRIGHT = 5;
const DOWNLEFT = 6;
const DOWNRIGHT = 7;

const WALLid = 0;
const FOODid = 1;
const TAILid = 2;

const gridSize = 30;
const mutationRate = 0.005;
const nnValues = {
  inputs: 16,
  hidden: 64,
  output: 4
};
const populationSize = 150;

let mustEatEvery = 150;
let time = 0;
let generation = 0;
let speed = 1;
let deadSnakes = 0;
let snakeStart;
let gridWidth;
let gridHeight;

let snakes = [];

function setup() {
  createCanvas(floor(windowWidth / gridSize) * gridSize, floor(windowHeight / gridSize) * gridSize);
  noStroke();
  snakeStart = createVector(floor(width / gridSize / 2), floor(height / gridSize / 2))
  gridWidth = floor(width / gridSize);
  gridHeight = floor(height / gridSize);

  for (let i = 0; i < populationSize; i++) {
    snakes.push(new Snake(snakeStart.x, snakeStart.y));
  }
  //Inputs [snakeX, snakeY, foodX, foodY, ] TODO: Make snake see around itself
}

/*
 Initial Population - DONE!

 Run snakes - DONE!
 Evaluate fitness - DONE! (revise this later)
 Selection - DONE!
 Crossover - DONE! (Make it actual crossover!)
 Mutation - DONE!
 */

function draw() {
  for (let i = 0; i < speed; i++) {
    background(0);

    if (deadSnakes < snakes.length) {
      for (let snake of snakes) {
        snake.run();
      }
    } else {
      doGeneticAlg();
      time = 0;
      deadSnakes = 0;
    }
    time++;
  }
}

function mousePressed() { //If simulation gets stuck, pressed to end generation
  deadSnakes = snakes.length;
}

function pickHighest(list) {
  let record = 0;
  let recordIndex;
  for (let i = 0; i < list.length; i++) {
    if (list[i] > record) {
      record = list[i];
      recordIndex = i;
    }
  }
  return recordIndex;
}

function drawRectOnGrid(x, y) {
  rect(x * gridSize, y * gridSize, gridSize, gridSize);
}

/*
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
}*/