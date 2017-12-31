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
let populationSize = 50;
let lifetime = 250;
let time;
let startX;
let startY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  time = 0;

  startX = width / 2;
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
    matingPool = [];

    for (let i = 0; i < cars.length; i++) {
      let car = cars[i];
      let fitness = car.pos.x; //Better to go to the right
      //Evalute the fitness

      let amt = round(fitness / 30);
      for (let j = 0; j < amt; j++) {
        matingPool.push(i); //Create mating pool of indeces
      }
    }

    for (let i = 0; i < cars.length; i++) {
      let parentA = floor(random(matingPool.length));
      let parentB = floor(random(matingPool.length));
      let attempt = 0;
      while (parentA == parentB) {
        parentB = floor(random(matingPool.length));

        attempt++;
        if (attempt > 1000) return;
      }

      //Crossover to create new cars
    }


    //Randomly mutate genes of cars
  }
}

function run() {
  for (let car of cars) {
    car.move();
    car.show();
  }

  time++;
}

class Car {
  constructor(x = startX, y = startY, genes = randGenes()) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);

    this.genes = genes;
  }

  move() {
    this.vel.add(this.genes.accs[time]);
    this.vel.limit(this.genes.maxSpeed);
    this.pos.add(this.vel);
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + HALF_PI);
    fill(50);
    noStroke();
    rect(-this.genes.width / 2, -this.genes.height / 2, this.genes.width, this.genes.height);
    pop();
  }
}

function randGenes() {
  genes = {
    accs: [],
    maxSpeed: random(limits.minSpeed, limits.maxSpeed),
    accRate: random(limits.minAcc, limits.maxAcc),
    width: random(limits.minW, limits.maxW),
    height: random(limits.minH, limits.maxH)
  };
  for (let i = 0; i < lifetime; i++) {
    genes.accs.push((p5.Vector.random2D().setMag(genes.accRate)));
  }
  return genes;
}