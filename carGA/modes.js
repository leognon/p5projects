function simulate() {
  if (time < lifetime && cars.length > 0) {
    background(220);
    run(); //Run the simulation
  } else {
    nextGen = []; //The next generation
    if (cars.length < 3) cars = cars.concat(deadCars); //Must be at least 3 possible parents

    let sumFit = 0;
    for (car of cars) {
      let fitness = max(1, car.pos.x); //Better to go to the right
      car.fitness = ((fitness * fitness) / 10000) * (!car.dead) ? 1.5 : 1; //Evalute the fitness
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

function run() {
  for (let car of deadCars) {
    car.show();
  }

  for (let i = cars.length - 1; i >= 0; i--) {
    let car = cars[i];
    if (car.dead == false && (!paused)) {
      car.move();
      car.hit();
    }
    car.show();
    if (car.dead) {
      deadCars.push(cars[i]);
      cars.splice(i, 1);
    }
  }

  for (let obstacle of obstacles) {
    obstacle.show();
  }

  fill(0);
  noStroke();
  textSize(20);
  textAlign(LEFT);
  let txt = "Generation: " + generation + "\nFrames left: " + (lifetime - time) + "\nAlive: " + cars.length + " Dead: " + deadCars.length + "\nFrameRate: " + nf(frameRate(), 2, 1) + "\nPopulation Size: " + populationSize + "\nMutation Rate: " + mutationRate;
  text(txt, 10, 25);

  if (!paused) {
    time++;
  }
}

function editMode() {
  background(220);
  for (let obstacle of obstacles) {
    obstacle.show();
  }
  for (let car of deadCars) {
    car.show();
  }
  for (let car of cars) {
    car.show();
  }

  fill(84, 212, 255);
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