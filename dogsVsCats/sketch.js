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
const amtOfTrainData = 10;
const amtOfTestData = 10;
// let previousDesicions = [];
let ga;
const populationSize = 50;

let displaying = 0;

let trainData = [];
let testData = [];

let accuracy = 0;

let scl = 20;

function preload() {
  //--------------------------------LOAD ALL TRAINING IMAGES--------------------------------
  trainData = loadImgsToArr(amtOfTrainData, "data/train/");
  testData = loadImgsToArr(amtOfTestData, "data/test/");
  //--------------------------------END OF LOAD ALL TRAINING IMAGES--------------------------------
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(new Predictor());
  }
  ga = new GeneticAlgorithm(population, 0.005); //Create the intial population
  accuracy = calcAccuracy(testData);
}

function loadImgsToArr(amt, path) {
  let arr = [];

  let catIndex = 0;
  let dogIndex = 0;
  for (let i = 0; i < amt; i++) {
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
    loadImage(path + tag + "." + index + ".jpg", (theImg) => {
      let prettyImg = theImg.get(0, 0, theImg.width, theImg.height);
      if (theImg.width > theImg.height) {
        theImg.resize(0, newH);
      } else {
        theImg.resize(newW, 0);
      }
      let croppedImg = theImg.get((theImg.width / 2) - halfNewW, (theImg.height / 2) - halfNewH, newW, newH);
      arr.push(new Img(croppedImg, prettyImg, classify));
    });
  }
  return arr;
}

function draw() {
  background(51);
  let guessObj = getMajorityGuess(trainData[displaying]);
  let guess;
  let correct = trainData[displaying].classify;

  if (guessObj.cat > guessObj.dog) {
    guess = cat;
  } else {
    guess = dog;
  }
  if (guess == correct) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  rect(0, 0, trainData[displaying].prettyData.width + 4, trainData[displaying].prettyData.height + 4);
  image(trainData[displaying].prettyData, 2, 2);
  fill(255);
  noStroke();
  textSize(30);
  text("Accuracy: " + accuracy + "%", 5, trainData[displaying].prettyData.height + 30);
  text("ID: " + displaying + "\nGuess: " + getGreaterPercentString(guessObj) + "\nAnswer: " + getString(trainData[displaying].classify), trainData[displaying].prettyData.width + 10, 25);
}

function train(amt) {
  for (let i = 0; i < amt; i++) {
    let chosenImg = random(trainData);
    ga.evolveNextGen(chosenImg.inputs, chosenImg.classify);
    console.log("Generation complete! " + ((i + 1) / amt) * 100 + "% complete.");
  }
  accuracy = calcAccuracy(testData);
  console.log("Train Data Accuracy: " + calcAccuracy(trainData));
  console.log("Training complete.");
}

function calcAccuracy(dataset) {
  let correctAmt = 0;

  for (let i = 0; i < testData.length; i++) {
    let correct = testData[i].classify;
    let guess = convertMajToSingle(getMajorityGuess(dataset[i]));
    if (guess == correct) {
      correctAmt++;
    }
  }
  return ((correctAmt / testData.length) * 100);
  // console.log(accuracy + "% correct, " + correctAmt + " correct");
}

function convertMajToSingle(obj) {
  if (obj.cat > obj.dog) {
    return cat;
  } else {
    return dog;
  }
}

function getMajorityGuess(img) {
  let cats = 0;
  for (let p of ga.pop) {
    if (p.getPrediction(img.inputs) == cat) {
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
  constructor(data, prettyData, classification) {
    this.data = data;
    this.prettyData = prettyData;
    this.classify = classification;
    this.inputs;
    this.getInputs();
  }

  getInputs() {
    this.data.loadPixels();
    this.inputs = Array.from(this.data.pixels).map(x => x / 255);
  }
}