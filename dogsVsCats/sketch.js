const dog = 0;
const cat = 1;
const newW = 40;
const newH = 40;
const halfNewW = newW / 2;
const halfNewH = newH / 2;

const networkStats = {
  inputs: (newW * newH * 4),
  hidden: 16,
  outputs: 2
}

//MAKE IT MULTI LAYER BY ADDING A FEEDFORWARD FUNCTION, WHICH TAKES IN SOME ARRAYS (START LAYER, WEIGHT MATRIX, AMT OF OUTPUTS), AND IT RETURNS AN ARRAY OF OUT PUTS. USE THIS TO MAKE IT AS MANY LAYERS AS YOU WANT!!!
const trainAmount = 10;
// let previousDesicions = [];
let ga;
const populationSize = 20;

let displaying = 0;

let trainData = [];

let scl = 20;

function preload() {
  //--------------------------------LOAD ALL TRAINING IMAGES--------------------------------
  let catIndex = 0;
  let dogIndex = 0;
  for (let i = 0; i < trainAmount; i++) {
    let classify = (random(1) < 0.5) ? dog : cat;
    let tag;
    let index;
    if (classify == dog) {
      tag = "dog";
      index = dogIndex;
      dogIndex++;
    } else if (classify == cat) {
      tag = "cat";
      index = catIndex;
      catIndex++;
    }
    loadImage("data/train/" + tag + "." + index + ".jpg", (theImg) => {
      if (theImg.width > theImg.height) {
        theImg.resize(0, newH);
      } else {
        theImg.resize(newW, 0);
      }
      let croppedImg = theImg.get((theImg.width / 2) - halfNewW, (theImg.height / 2) - halfNewH, newW, newH);
      trainData.push(new Img(croppedImg, classify));
    });
  }
  //--------------------------------END OF LOAD ALL TRAINING IMAGES--------------------------------
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(new Predictor());
  }
  ga = new GeneticAlgorithm(population, 0.005); //Create the intial population
}

function draw() {
  background(255);
  push();
  scale(scl);
  image(trainData[displaying].data, 0, 0);
  pop();
  // scale(1);
  fill(255);
  // stroke(0);
  // strokeWeight(3);
  textSize(30); //Test it and see there is no errors, get what the majority of the pop thinks it is, FIX THE TEXT NOT SHOWING!
  text("Guess: " + getGreaterPercentString(getMajorityGuess()) + "\nAnswer: " + getString(trainData[displaying].classify), 30, 25);
}

function train(amt) {
  for (let i = 0; i < amt; i++) {
    let chosenImg = random(trainData);
    ga.evolveNextGen(chosenImg.inputs, chosenImg.classify);
  }
}

function getMajorityGuess() {
  let cats = 0;
  for (let p of ga.pop) {
    if (p.getPrediction(trainData[displaying].inputs) == cat) {
      cats++;
    }
  }
  return {
    cat: cats,
    dog: ga.pop.length - cats
  };
}

function getGreaterPercentString(obj) {
  // console.log(obj.cat);
  if (obj.cat > obj.dog) {
    return round((obj.cat / ga.pop.length) * 100) + "% chance it is a cat";
  } else {
    return round((obj.dog / ga.pop.length) * 100) + "% chance it is a dog";
  }
}

function mousePressed() {
  displaying++;
  displaying = displaying % trainData.length;
}



function getString(id) {
  return (id == dog) ? "dog" : "cat";
}

class Img {
  constructor(data, classification) {
    this.data = data;
    this.classify = classification;
    this.inputs;
    this.getInputs();
  }

  getInputs() {
    this.data.loadPixels();
    this.inputs = this.data.pixels;
    return this.data.pixels;
  }
}