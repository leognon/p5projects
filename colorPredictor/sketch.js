const networkStats = {
  inputs: 3,
  hidden: 4,
  outputs: 1
}
let ga;
const populationSize = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(new Predictor());
  }
  ga = new GeneticAlgorithm(population, 0.005);
}

function draw() {
  background(0);
} //TODO Make UI and every time user makes a decision, evolve
//TODO Also saving and loading neural networks