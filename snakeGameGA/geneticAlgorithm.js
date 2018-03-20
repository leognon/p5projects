function calcProb() {
  let sumFit = 0;
  for (let snake of snakes) {
    sumFit += snake.getFitness();
  }
  for (let snake of snakes) {
    snake.prob = (snake.getFitness() / sumFit);
  }
}

function doGeneticAlg() {
  let nextGen = [];

  calcProb(); //FITNESS!!!

  for (let i = 0; i < populationSize; i++) {
    //SELECTION!!!
    let parentAIndex = pickIndex(snakes); //Pick the index of the first parent based on prob
    let parentBIndex = pickIndex(snakes); //Pick the index of the second parent based on prob

    let attempt = 0;
    while (parentAIndex == parentBIndex) { //Make sure both parents are different
      parentBIndex = pickIndex(snakes);
      attempt++;
      if (attempt > 500) {
        return;
        console.log("HAD TO USE DUPLICATE PARENT!!");
      }

    }
    //END OF SELECTION!

    //CREATE CHILD (crossover)
    let childBrain = snakes[parentAIndex].brain.copy(); //crossover(cars[parentAIndex], cars[parentBIndex]); //Crossover to create new genes from parents
    //END OF CROSSOVER!

    //MUTATION!!!
    //Randomly mutate genes of cars
    childBrain.mutate(mutationRate);
    //END OF MUTATION!!!

    nextGen.push(new Snake(snakeStart.x, snakeStart.y, childBrain)); //Add the child car to the next generation
  }

  snakes = nextGen; //The next Gen become the current Gen
  generation++;
  console.log("1 GENERATION COMPLETE!");
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