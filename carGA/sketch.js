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
let matingPool = [];
let nextGen = [];
let populationSize = 150;
let lifetime = 150;
let time;
let startX;
let startY;
let mutationRate = 0.03;

function setup() {
  createCanvas(windowWidth, windowHeight);
  time = 0;

  startX = 100;
  startY = height / 2;
  // randomSeed(99);

  for (let i = 0; i < populationSize; i++) { //Create the initial population
    cars.push(new Car());
  }
}

function draw() {
  background(220);

  if (time < lifetime) {
    run(); //Run the simulation
  } else {
    nextGen = []; //The next generation
    matingPool = []; //The mating pool to breed the next gen

    for (let i = 0; i < cars.length; i++) {
      let car = cars[i];
      let fitness = car.pos.x; //Better to go to the right
      //Evalute the fitness

      let amt = round(fitness / 10); //How many of that cars genes will get passed on
      for (let j = 0; j < amt; j++) {
        matingPool.push(i); //Create mating pool of indeces, with better cars having more places in array
      }
    }

    for (let i = 0; i < cars.length; i++) {
      let parentA = matingPool[floor(random(matingPool.length))]; //Pick the index of the first parent
      let parentB = matingPool[floor(random(matingPool.length))]; //Pick the index of the second parent
      let attempt = 0;
      while (parentA == parentB) { //Make sure both parents are different
        parentB = matingPool[floor(random(matingPool.length))];

        attempt++;
        if (attempt > 1000) return;
      }

      let childGenes = crossover(cars[parentA], cars[parentB]); //Crossover to create new genes from parents

      //Randomly mutate genes of cars

      nextGen.push(new Car(startX, startY, childGenes)); //Add the child car to the next generation
    }

    cars = nextGen; //The next Gen become the current Gen
    time = 0; //Restart the time
  }
}

function run() {
  for (let car of cars) {
    car.move();
    car.show();
  }

  time++;
}

function pickRand(a, b) { //50/50 chance to return a or b
  if (random(1) < 0.5) return a;
  else return b;
}