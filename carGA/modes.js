function simulate() {
  for (let i = 0; i < speed; i++) {
    if (time < lifetime && cars.length > 0) {
      run(); //Run the simulation
    } else {
      nextGen = []; //The next generation
      if (cars.length < 3) cars = cars.concat(deadCars); //Must be at least 3 possible parents

      let sumFit = 0;
      for (car of cars) {
        car.fitness = calcFitness(car);
        sumFit += car.fitness;
      }
      for (car of cars) {
        car.prob = (car.fitness / sumFit);
      }

      for (let i = 0; i < populationSize; i++) {
        let parentAIndex = pickIndex(cars); //Pick the index of the first parent
        let parentBIndex = pickIndex(cars); //Pick the index of the second parent

        let attempt = 0;
        while (parentAIndex == parentBIndex) { //Make sure both parents are different
          parentBIndex = pickIndex(cars);

          attempt++;
          if (attempt > 500) {
            return;
            console.log("HAD TO USE DUPLICATE PARENT!!");
          }
        }

        let childGenes = crossover(cars[parentAIndex], cars[parentBIndex]); //Crossover to create new genes from parents

        //Randomly mutate genes of cars

        nextGen.push(new Car(startX, startY, childGenes)); //Add the child car to the next generation
      }

      cars = nextGen; //The next Gen become the current Gen
      deadCars = [];
      generation++;
      time = 0; //Restart the time
    }
  }
  background(220);
  if (render) {
    displaySimulation();
  }
}

function calcFitness(car) {
  let fitness;
  let checkPointBonus = car.checkpointsReached * 1500; //1500 for every checkpoint reached
  let distBonus = 0;

  if (car.checkpointsReached < checkpoints.length) { //Did not finish
    distBonus = 500 - p5.Vector.dist(car.pos, checkpoints[checkpoints.length - 1].pos); //500 - dist from checkopint
  } else { //Finished
    checkPointBonus *= 2; //2 Times bonus
  }
  fitness = checkPointBonus + distBonus;
  if (car.dead) fitness /= 2;

  // console.log(fitness);
  return fitness;
}

function run() {
  for (let i = cars.length - 1; i >= 0; i--) {
    let car = cars[i];
    if (car.dead == false && car.checkpointsReached < checkpoints.length && (!paused)) {
      car.move();
      car.hit();
    }
    if (car.dead) {
      deadCars.push(cars[i]);
      cars.splice(i, 1);
    }
  }

  if (!paused) {
    time++;
  }
}

function displaySimulation() {
  for (let car of deadCars) {
    car.show();
  }

  for (let car of cars) {
    car.show();
  }

  for (let checkpoint of checkpoints) {
    checkpoint.show();
  }

  for (let obstacle of obstacles) {
    obstacle.show();
  }

  fill(0);
  noStroke();
  textSize(20);
  textAlign(LEFT, BASELINE);
  let txt = "Generation: " + generation + "\nFrames left: " + (lifetime - time) + "\nAlive: " + cars.length + " Dead: " + deadCars.length + "\nFrameRate: " + nf(frameRate(), 2, 1) + "\nPopulation Size: " + populationSize + "\nMutation Rate: " + mutationRate;
  text(txt, 10, 25);
}

function editMode() {
  background(220);
  for (let car of deadCars) {
    car.show();
  }
  for (let car of cars) {
    car.show();
  }

  for (let obstacle of obstacles) {
    obstacle.show();
  }
  for (let i = checkpoints.length - 1; i >= 0; i--) {
    checkpoints[i].show();
  }



  fill(84, 212, 255);
  noStroke();
  ellipse(startX, startY, 30, 30);

  if (drawingObstacle.drawing) {
    noFill();
    stroke(0);
    strokeWeight(3);
    rect(drawingObstacle.x, drawingObstacle.y, mouseX - drawingObstacle.x, mouseY - drawingObstacle.y);
  }
}

function startScreen() {
  background(220);
  fill(0);
  noStroke();
  textSize(50);
  textAlign(CENTER);
  text("Evolving Car Genetic Algorithm", width / 2, 75);
}