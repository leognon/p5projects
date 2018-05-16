class GeneticAlgorithm {
  constructor(population, mutationRate) { //Maybe pass in function to create random individual
    this.pop = population;
    this.generation = 0;
    this.mutRate = mutationRate;
    //Make ga variables here (population, mutation rate, etc)
  }

  evolveNextGen(inputs, correctAnswer) {
    this.evaluateAllFitness(inputs, correctAnswer); //Evaluate fitness
    let newPop = []; //Create a new population

    for (let p of this.pop) {
      let parentAIndex = pickIndex(this.pop); //Selection
      let parentBIndex = pickIndex(this.pop);

      let attempt = 0; //Make sure both parents are different
      while (parentAIndex == parentBIndex) {
        parentBIndex = pickIndex(this.pop);
        attempt++;
        if (attempt > 500) {
          console.log(this.pop);
          console.log(parentAIndex + "   " + parentBIndex);
          console.log("HAD TO USE DUPLICATE PARENT!!");
          return;
        }
      }

      let child = this.pop[parentAIndex].crossover(this.pop[parentBIndex], 1); //Crossover

      child.mutate(this.mutRate); //Mutation

      newPop.push(child); //Add to new population
    }
    this.pop = newPop;
    this.generation++;
  }

  evaluateAllFitness(inp, correctAnswer) {
    let totalFitness = 0;
    for (let p of this.pop) {
      totalFitness += p.getFitness(inp[0], inp[1], inp[2], correctAnswer);
    }
    for (let p of this.pop) {
      p.prob = p.fitness / totalFitness;
    }
  }

  setMutationRate(n) {
    this.mutRate = n;
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