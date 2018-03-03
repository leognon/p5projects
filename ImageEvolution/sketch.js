let goalImg;
let goalPixels;
let population = [];
let perfectScore = 255;
let popSize = 400;
let amountOfRects = 15;
let mutationRate = 0.001;

function preload() {
  goalImg = loadImage("https://images-na.ssl-images-amazon.com/images/I/81%2BriieG%2BQL._SY355_.jpg");
}

function setup() {
  goalImg.resize(200, 200);

  goalImg.loadPixels();
  goalPixels = goalImg.pixels;

  createCanvas(goalImg.width, goalImg.height);

  perfectScore *= goalImg.width * goalImg.height;

  for (let i = 0; i < popSize; i++) {
    population.push(new Img());
  }
}

/*
1. Fitness
2. Selection
3. Crossover
4. Mutation
*/
let x = true;

function draw() {
  // background(255);
  // population[0].show();

  if (x) {
    evolve();
  }
}

function evolve() {
  let nextGen = [];
  let sumFit = 0;
  let recordFit = 0;
  let recordHolder;

  for (img of population) {
    img.calcFitness();
    if (img.fitness > recordFit) {
      recordFit = img.fitness
      recordHolder = img;
    }
    sumFit += img.fitness;
  }

  for (img of population) {
    img.prob = (img.fitness / sumFit);
  }

  for (let i = 0; i < population.length; i++) {
    let parentAIndex = pickIndex(population); //Pick the index of the first parent
    let parentBIndex = pickIndex(population); //Pick the index of the second parent

    let attempt = 0;
    while (parentAIndex == parentBIndex) { //Make sure both parents are different
      parentBIndex = pickIndex(population);

      attempt++;
      if (attempt > 500) {
        return;
        console.log("HAD TO USE DUPLICATE PARENT!!");
      }
    }

    let childGenes = crossover(population[parentAIndex], population[parentBIndex]); //Crossover to create new genes from parents
    mutate(childGenes);

    nextGen.push(new Img(childGenes)); //Add the child car to the next generation
  }

  background(255);
  recordHolder.show();

  population = nextGen; //The next Gen become the current Gen
  console.log("nextGen!");

}

function crossover(parentA, parentB) {
  let firstHalf = parentA.rects.slice(0, floor(parentA.rects.length / 2));
  let secondHalf = parentB.rects.slice(floor(parentB.rects.length / 2));

  return (firstHalf.concat(secondHalf));
}

function pickRandomProperty(obj) {
  let result;
  let count = 0;
  for (let prop in obj)
    if (Math.random() < 1 / ++count)
      result = prop;
  return result;
}

function mutate(genes) {
  for (let r of genes) {
    if (random(1) < mutationRate) {
      let prop = pickRandomProperty(r);
      switch (prop) {
        case "x":
          r.x = random(0, width - r.w);
          break;
        case "y":
          r.y = random(0, height - r.h);
          break;
        case "w":
          r.w = random(20, 75);
          break;
        case "h":
          r.h = random(20, 75);
          break;
        case "colR":
          r.colR = random(255);
          break;
        case "colG":
          r.colG = random(255);
          break;
        case "colB":
          r.colB = random(255);
          break;
        default:
          break;
      }

      // let w = random(20, 75);
      // let h = random(20, 75);
      // let x = random(0, width - w);
      // let y = random(0, height - h);
      //r
      //g
      //b
      // r = new rectangle(x, y, w, h, random(255), random(255), random(255));
    }
  }
}

function pickIndex(list) {
  var index = -1;
  var r = random(1);
  while (r > 0) {
    index++;
    r -= list[index].prob;
  }
  return index;
}

function pickRand(a, b) { //50/50 chance to return a or b
  if (random(1) < 0.5) return a;
  else return b;
}

class Img {
  constructor(genes) {
    this.fitness;
    this.prob;

    if (genes) {
      this.rects = genes;
    } else {
      this.rects = [];
      for (let i = 0; i < amountOfRects; i++) {
        let w = random(20, 75);
        let h = random(20, 75);
        let x = random(0, width - w);
        let y = random(0, height - h);
        this.rects.push(new rectangle(x, y, w, h, random(255), random(255), random(255)));
      }
    }

    this.img = createGraphics(width, height);
    this.img.noStroke();
    for (let r of this.rects) {
      r.show(this.img);
    }
  }

  calcFitness() {
    this.img.loadPixels();
    this.fitness = perfectScore;

    let pixels = this.img.pixels;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let index = (x + y * width) * 4;
        let thisR = pixels[index];
        let thisG = pixels[index + 1];
        let thisB = pixels[index + 2];

        let goalR = goalPixels[index];
        let goalG = goalPixels[index + 1];
        let goalB = goalPixels[index + 2];

        let rDiff = abs(thisR - goalR);
        let gDiff = abs(thisG - goalG);
        let bDiff = abs(thisB - goalB);

        this.fitness -= ((rDiff + gDiff + bDiff) / 3);
      }
    }

    this.fitness = floor(this.fitness);
    return this.fitness;
  }

  show() {
    image(this.img, 0, 0);
  }
}


class rectangle {
  constructor(x, y, w, h, colR, colG, colB) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colR = colR;
    this.colG = colG;
    this.colB = colB;
  }
  show(graphic) {
    graphic.fill(this.colR, this.colG, this.colB);
    graphic.rect(this.x, this.y, this.w, this.h);
  }
}