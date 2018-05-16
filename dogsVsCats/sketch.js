const networkStats = {
  inputs: 3,
  hidden: 8,
  outputs: 2
}
// let previousDesicions = [];
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


}

function train() {

}