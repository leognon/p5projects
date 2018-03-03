const pixelWidth = 10;
const WHITE = 0;
const BLACK = 1;
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

let drawPixels = true;
let grid = [];
let speed = 500;
let antX;
let antY;
let antDir = UP;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < width / pixelWidth; i++) {
    grid[i] = [];
    for (let j = 0; j < height / pixelWidth; j++) {
      grid[i][j] = WHITE;
    }
  }

  let halfPixelsWidth = floor(grid.length / 2);
  let halfPixelsHeight = floor(grid[0].length / 2);

  antX = halfPixelsWidth;
  antY = halfPixelsHeight;
  grid[halfPixelsWidth][halfPixelsHeight] = BLACK;
}


function draw() {
  for (let i = 0; i < speed; i++) {
    runAnt();
  }
  if (drawPixels) {
    show();
  }
}

function runAnt() {
  setDir();
  move();
}

function setDir() {
  if (grid[antX][antY] === WHITE) {
    //Turn right
    antDir++;
  } else {
    //Turn left
    antDir += 3;
  }
  grid[antX][antY] = int(!grid[antX][antY]); //Flip the tile (black -> white, white -> black)

  antDir = (antDir + 4) % 4;
}

function mousePressed() {
  drawPixels = !drawPixels;
  console.log("STOPPED DRAWING! CLICK AGAIN TO CONTINUE");
}

function move() {
  switch (antDir) {
    case UP:
      antY--;
      break;
    case DOWN:
      antY++;
      break;
    case LEFT:
      antX--;
      break;
    case RIGHT:
      antX++;
      break;
    default:
      break;
  }
  antX = (antX + grid.length) % grid.length; //Wrap around walls
  antY = (antY + grid[0].length) % grid[0].length; //Wrap around walls
}

function show() {
  background(255); //White background
  fill(0); //Draw black pixels
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == BLACK) {
        rect(i * pixelWidth, j * pixelWidth, pixelWidth, pixelWidth);
      }
    }
  }
}