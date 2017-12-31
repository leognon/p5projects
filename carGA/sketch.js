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

let population = [];
let populationSize = 50;
let lifetime = 250;
let time;

function setup() {
  createCanvas(windowWidth, windowHeight);
  time = 0;
  // randomSeed(99);

  for (let i = 0; i < populationSize; i++) { //Create the initial population
    population.push(new Car());
  }
}

function draw() {
  background(220);

  run();
}

function run() {
  for (let car of population) {
    if (time < lifetime) car.move();
    car.show();
  }

  if (time < lifetime) {
    time++;
  }
}

class Car {
  constructor(x = width / 2, y = height / 2, genes = randGenes()) {
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