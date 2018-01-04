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

let cars = [];
let deadCars = [];
let nextGen = [];
let populationSize = 50;
let lifetime = 150;
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

function setup() {
  createCanvas(windowWidth, windowHeight);
  time = 0;
  obstacles = [];

  startX = 100;
  startY = height / 2;
  // randomSeed(99);

  for (let i = 0; i < populationSize; i++) { //Create the initial population
    cars.push(new Car());
  }

  obstacle = new Obstacle(325, 325, 100, 200);
}

function draw() {
  if (time < lifetime && cars.length > 0) {
    background(220);
    run(); //Run the simulation
  } else {
    nextGen = []; //The next generation
    if (cars.length < 3) cars = cars.concat(deadCars); //Must be at least 3 possible parents

    let sumFit = 0;
    for (car of cars) {
      let fitness = max(1, car.pos.x); //Better to go to the right
      car.fitness = ((fitness * fitness) / 10000) * (!car.dead) ? 1.5 : 1; //Evalute the fitness
      sumFit += car.fitness;
    }
    for (car of cars) {
      car.prob = (car.fitness / sumFit);
    }

    for (let i = 0; i < populationSize; i++) {
      let parentAIndex = pickIndex(cars); //Pick the index of the first parent
      let parentBIndex = pickIndex(cars); //Pick the index of the second parent

      let attempt = 0;
      while (parentAIndex == parentBIndex) { //Make sure both parents are different
        parentBIndex = pickIndex(cars);

        attempt++;
        if (attempt > 500) {
          return;
          console.log("HAD TO USE DUPLICATE PARENT!!");
        }
      }

      let childGenes = crossover(cars[parentAIndex], cars[parentBIndex]); //Crossover to create new genes from parents

      //Randomly mutate genes of cars

      nextGen.push(new Car(startX, startY, childGenes)); //Add the child car to the next generation
    }

    cars = nextGen; //The next Gen become the current Gen
    deadCars = [];
    generation++;
    time = 0; //Restart the time
  }
}

function run() {
  if (drawingObstacle.drawing) {
    noFill();
    stroke(0);
    strokeWeight(3);
    rect(drawingObstacle.x, drawingObstacle.y, mouseX - drawingObstacle.x, mouseY - drawingObstacle.y);
  }
  for (let car of deadCars) {
    car.show();
  }

  for (let i = cars.length - 1; i >= 0; i--) {
    let car = cars[i];
    if (car.dead == false && !paused) {
      car.move();
      car.hit();
    }
    car.show();
    if (car.dead) {
      deadCars.push(cars[i]);
      cars.splice(i, 1);
    }
  }

  for (let obstacle of obstacles) {
    obstacle.show();
  }

  fill(0);
  noStroke();
  textSize(25);
  let txt = "Generation: " + generation + "\nFrames left: " + (lifetime - time) + "\nAlive: " + cars.length + " Dead: " + deadCars.length + "\nFrameRate: " + floor(frameRate()) + "\nPopulation Size: " + populationSize + "\nMutation Rate: " + mutationRate;
  text(txt, 10, 25);

  if (!paused) {
    time++;
  }
}

function keyPressed() {
  if (key == 'P') {
    paused = !paused;
  } else if (keyCode == ESCAPE && drawingObstacle.drawing) {
    drawingObstacle.drawing = false;
  }
}

function mousePressed() {
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
      height = abs(height);
      width = abs(width);

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