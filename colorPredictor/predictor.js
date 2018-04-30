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
    let ans = this.brain.predict([r, g, b]);
    if (ans[0] > ans[1]) {
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
    this.correct = 0;
    for (let descision of previousDesicions) {
      let thisAnswer = this.getColor(descision.r, descision.g, descision.b);
      if (thisAnswer == descision.correct) {
        this.correct++;
      }
    }
    this.fitness = 100 * (this.correct / previousDesicions.length);
    console.log(this.fitness); //TODO Make sure the algorithm is working
    return this.fitness;
  }
}