class Predictor {
  constructor(brain) {
    if (brain) {
      this.brain = brain;
    } else {
      this.brain = new NeuralNetwork(networkStats.inputs, networkStats.hidden, networkStats.outputs);
    }
    this.fitness = 0;
    this.prob = 0;
  }

  getColor(r, g, b) {
    let ans = this.brain.predict([r, g, b])[0];
    if (ans > .5) {
      return 255;
    } else {
      return 0;
    }
  }

  crossover(other, type) {
    return new Predictor(this.brain.crossover(other.brain, type));
  }

  mutate(rate) {
    this.brain.mutate(rate, x => Math.random() * 2 - 1);
  }

  getFitness(r, g, b, correctAnswer) { //TODO MAKE THE FITNESS FUNCITON BETTER!
    let thisAnswer = this.getColor(r, g, b);
    if (thisAnswer == correctAnswer) {
      this.fitness = 15;
      // console.log("Correct!" + thisAnswer);
    } else {
      this.fitness = 1;
    }
    return this.fitness;
  }
}