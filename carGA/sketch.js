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
let speed = 1;
let tool = 0;
let render = true;

let checkpoints = [];

let drawingObstacle = {
  drawing: false,
  x: 0,
  y: 0
};

let contain = {
  startScreen: null,
  editScreen: null,
  simulateScreen: null
}

let DOM = {
  startButton: null,
  editDoneButton: null,
  editSaveButton: null,
  editButton: null,
  editVarsContainer: null,
  editVars: [],
  editObstacle: null,
  editSpawn: null,
  editCheckpoint: null,
  speedInp: null
}

function setup() {
  createCanvas(windowWidth, windowHeight).mousePressed(canvasClicked);
  reset();
  createAllDOM();

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
  startX = 45;
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