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
  randomizeColor();
}
let count = 0;
let totalTrain = 3; //TODO Make sure it is working! See what jabrils used for his fitness func

function draw() {
  while (count < totalTrain) { //Train the population very quickly at the start of the program
    let choice = 255;
    if ((r + g + b) / 3 > 127) { //If bright enough then the better color is black
      choice = 0;
    }
    let correctOutput = [];
    if (choice === 0) {
      correctOutput = [1, 0];
    } else {
      correctOutput = [0, 1];
    }

    previousDesicions.push({
      r: r,
      g: g,
      b: b,
      correct: correctOutput
    });

    ga.evolveNextGen([r, g, b], correctOutput);
    randomizeColor();
    count++;
  }
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

  fill(0);
  rect(0, height - 75, width, 75);
  fill(255);
  text("Press H to hide/show what the network thingks!", width / 2, height - 38);
  if (!hidden) {
    let choseWhite = 0;
    let choseBlack = 0;
    for (let p of ga.pop) {
      if (p.getColor(r, g, b) === 0) {
        choseBlack++;
      } else {
        choseWhite++;
      }
    }
    let whiteChance = floor((choseWhite / populationSize) * 100);
    let blackChance = floor((choseBlack / populationSize) * 100);
    text(whiteChance + "% sure white looks better", width / 8, height - 38);
    text(blackChance + "% sure black looks better", width * 7 / 8, height - 38);
  }
}
//TODO Also saving and loading neural networks

function mousePressed() {
  let choice; //The correct output
  if (mouseX < width / 2) {
    choice = 255;
  } else {
    choice = 0;
  }

  let correctOutput = [];
  if (choice === 0) {
    correctOutput = [1, 0];
  } else {
    correctOutput = [0, 1];
  }

  previousDesicions.push({
    r: r,
    g: g,
    b: b,
    correct: correctOutput
  });


  ga.evolveNextGen([r, g, b], correctOutput);
  randomizeColor();
}

function keyPressed() {
  if (keyCode == 72) {
    hidden = !hidden;
  }
}

function randomizeColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}