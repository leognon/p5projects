let limits = { //For generating genes and limiting cars
  minSpeed: 3,
  maxSpeed: 8,
  minAcc: 0.2,
  maxAcc: 0.4,
  minW: 15,
  maxW: 30,
  minH: 35,
  maxH: 70
}

let mode = 0;

let cars = [];
let deadCars = [];
let nextGen = [];
let populationSize = 150;
let lifetime = 250;
let paused = false;
let time;
let startX;
let startY;
let mutationRate = 0.001;
let showDebug = false;
let obstacles = [];
let generation = 0;

let drawingObstacle = {
  drawing: false,
  x: 0,
  y: 0
};

let DOM = {
  startButton: null,
  editDoneButton: null,
  editSaveButton: null,
  editButton: null
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();

  DOM.startButton = makeButton("START", width / 2 - 75, height - 125, 150, 100, 40, false, () => {
    mode = 2;
    DOM.startButton.hide();
    DOM.editDoneButton.show();
    reset();
  });

  DOM.editDoneButton = makeButton("DONE", 15, height - 61, 100, 56, 25, true, () => {
    mode = 1;
    drawingObstacle.drawing = false;
    DOM.editDoneButton.hide();
    DOM.editButton.show();
  });

  DOM.editButton = makeButton("EDIT", 10, 160, 100, 50, 25, true, () => {
    mode = 2;
    DOM.editButton.hide();
    DOM.editDoneButton.show();
  });

  // randomSeed(99);
}

function draw() {
  if (mode == 0) {
    startScreen();
  } else if (mode == 1) {
    simulate();
  } else if (mode == 2) {
    editMode();
  }
}

function reset() {
  populationSize = 150; //Editable vars
  lifetime = 250;
  startX = width / 2;
  startY = height / 2;
  mutationRate = 0.001;

  time = 0;
  for (let i = 0; i < populationSize; i++) { //Create the initial population
    cars.push(new Car());
  }
  deadCars = [];
  nextGen = [];
  paused = false;
  showDebug = false;
  obstacles = [];
  generation = 0;
  drawingObstacle.drawing = false;
}

function keyPressed() {
  if (key == 'P' && mode == 1) {
    paused = !paused;
  } else if (keyCode == ESCAPE && drawingObstacle.drawing) {
    drawingObstacle.drawing = false;
  }
}

function mousePressed() {
  if (mode != 2) return;

  if (mouseButton == LEFT) {
    if (drawingObstacle.drawing == false) {
      drawingObstacle.x = mouseX;
      drawingObstacle.y = mouseY;
      drawingObstacle.drawing = true;
    } else {
      let width = mouseX - drawingObstacle.x;
      let height = mouseY - drawingObstacle.y;

      if (width < 0) drawingObstacle.x += width;
      if (height < 0) drawingObstacle.y += height;
      height = max(3, abs(height));
      width = max(3, abs(width));

      obstacles.push(new Obstacle(drawingObstacle.x, drawingObstacle.y, width, height));
      drawingObstacle.drawing = false;
    }
  } else if (mouseButton == RIGHT) {
    for (let i = obstacles.length - 1; i >= 0; i--) {
      let obstacle = obstacles[i];
      if (mouseX > obstacle.pos.x && mouseX < obstacle.pos.x + obstacle.width && mouseY > obstacle.pos.y && mouseY < obstacle.pos.y + obstacle.height) {
        obstacles.splice(i, 1);
        return;
      }
    }
  }
}

function makeButton(txt, x, y, width, height, fontSize, hide, clicked) {
  let button = createButton(txt);
  button.style("font-size", fontSize + "px");
  button.size(width, height);
  button.position(x, y);
  button.mouseReleased(clicked);
  if (hide) button.hide();
  return button;
}

function pickIndex(list) {
  var index = -1;
  var r = random(1);
  while (r > 0) {
    index++;
    r -= list[index].prob;
  }
  return index;
}

function pickRand(a, b) { //50/50 chance to return a or b
  if (random(1) < 0.5) return a;
  else return b;
}

function simplifyAngle(angle) {
  return (round((angle / (QUARTER_PI))) * QUARTER_PI) % PI;
}