const networkStats = {
  inputs: 3,
  hidden: 8,
  outputs: 2
}
let previousDesicions = [];
let ga;
let hidden = false;
const populationSize = 150;
let r, g, b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(new Predictor());
  }
  ga = new GeneticAlgorithm(population, 0.005);
}

function draw() {}