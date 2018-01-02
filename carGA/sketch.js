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
let matingPool = [];
let nextGen = [];
let populationSize = 400;
let lifetime = 350;
let time;
let startX;
let startY;
let mutationRate = 0.005;
let showDebug = false;
let obstacles = [];

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
    matingPool = []; //The mating pool to breed the next gen
    if (cars.length <= 3) cars = cars.concat(deadCars); //Must be at least 3 possible parents

    for (let i = 0; i < cars.length; i++) {
      let car = cars[i];

      let fitness = max(1, car.pos.x); //Better to go to the right
      fitness *= fitness;
      //Evalute the fitness

      let amt = round(fitness / 100); //How many of that cars genes will get passed on
      for (let j = 0; j < amt; j++) {
        matingPool.push(i); //Create mating pool of indeces, with better cars having more places in array
      }
    }

    for (let i = 0; i < populationSize; i++) {
      let parentA = matingPool[floor(random(matingPool.length))]; //Pick the index of the first parent
      let parentB = matingPool[floor(random(matingPool.length))]; //Pick the index of the second parent
      let attempt = 0;
      while (parentA == parentB) { //Make sure both parents are different
        parentB = matingPool[floor(random(matingPool.length))];

        attempt++;
        if (attempt > 500) {
          return;
          console.log("HAD TO USE DUPLICATE PARENT!!");
        }
      }

      let childGenes = crossover(cars[parentA], cars[parentB]); //Crossover to create new genes from parents

      //Randomly mutate genes of cars

      nextGen.push(new Car(startX, startY, childGenes)); //Add the child car to the next generation
    }

    cars = nextGen; //The next Gen become the current Gen
    deadCars = [];
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
    if (!car.dead) {
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

  time++;
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

function pickRand(a, b) { //50/50 chance to return a or b
  if (random(1) < 0.5) return a;
  else return b;
}

function simplifyAngle(angle) {
  return (round((angle / (QUARTER_PI))) * QUARTER_PI) % PI;
}