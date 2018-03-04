const pixelWidth = 5;
const WHITE = 0;
const BLACK = 1;
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
const amountOfAnts = 3;

let drawPixels = true;
let grid = [];
let speed = 1;

let ants = [];

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
  // grid[halfPixelsWidth][halfPixelsHeight] = BLACK;

  for (let i = 0; i < amountOfAnts; i++) {
    ants.push(new Ant(floor(random(grid.length)), floor(random(grid[0].length))));
  }
}

function draw() {
  for (let i = 0; i < speed; i++) {
    runAnts();
  }
  if (drawPixels) {
    show();
  } else {
    fill(255);
    noStroke();
    textSize(15);
    let txt = "STOPPED RENDERING! CLICK AGAIN TO RESUME";
    rect(0, 0, textWidth(txt) + 10, 20);
    fill(255, 0, 0);
    text(txt, 5, 15)
  }
}

function runAnts() {
  for (let ant of ants) {
    ant.setDir();
    ant.move();
  }
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

class Ant {
  constructor(x, y, dir = UP) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }

  setDir() {
    if (grid[this.x][this.y] === WHITE) {
      //Turn right
      this.dir++;
    } else {
      //Turn left
      this.dir += 3;
    }
    grid[this.x][this.y] = int(!grid[this.x][this.y]); //Flip the tile (black -> white, white -> black)

    this.dir = (this.dir + 4) % 4;
  }

  move() {
    switch (this.dir) {
      case UP:
        this.y--;
        break;
      case DOWN:
        this.y++;
        break;
      case LEFT:
        this.x--;
        break;
      case RIGHT:
        this.x++;
        break;
      default:
        break;
    }
    this.x = (this.x + grid.length) % grid.length; //Wrap around walls
    this.y = (this.y + grid[0].length) % grid[0].length; //Wrap around walls
  }
}

function keyPressed() {
  if (key == 'S') {
    speed = prompt("What would you like to set the speed of the simulation to?");
  } else if (key == 'A') {
    let amt = prompt("How many ants would you like to add? Use a negative to remove ants", 1);
    console.log(amt);
    if (amt > 0) {
      for (let i = 0; i < amt; i++) {
        ants.push(new Ant(floor(random(grid.length)), floor(random(grid[0].length))));
      }
    } else if (amt < 0) {
      ants.splice(ants.length - abs(amt), ants.length);
    }
  }
}

function mousePressed() {
  drawPixels = !drawPixels;
  console.log("STOPPED DRAWING! CLICK AGAIN TO CONTINUE");
}