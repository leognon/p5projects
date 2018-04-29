const networkStats = {
  inputs: 3,
  hidden: 4,
  outputs: 1
}
let ga;
const populationSize = 150;
let r, g, b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(new Predictor());
  }
  ga = new GeneticAlgorithm(population, 0.005);
  randomizeColor();
}

function draw() {
  background(r, g, b);
  fill(255);
  textSize(25);
  stroke(0);
  strokeWeight(5);
  line(width / 2, 0, width / 2, height);

  noStroke();
  textAlign(CENTER, CENTER);
  text("Click which color is better", width / 4, height / 2);
  fill(0);
  text("Click which color is better", width * 3 / 4, height / 2);
} //TODO Make UI and every time user makes a decision, evolve
//TODO Also saving and loading neural networks

function mousePressed() {
  let choice;
  if (mouseX < width / 2) {
    choice = 255;
  } else {
    choice = 0;
  }
  let choseWhite = 0;
  let choseBlack = 0;
  for (let p of ga.pop) {
    if (p.getColor(r, g, b) === 0) {
      choseBlack++;
    } else {
      choseWhite++;
    }
  }
  console.log(choseWhite + " chose white, " + choseBlack + " chose black");

  ga.evolveNextGen([r, g, b], choice);
  randomizeColor();


}

function randomizeColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}