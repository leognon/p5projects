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

  getPrediction(inp) {
    let ans = this.brain.predict(inp); //The outputs are a probability of it being black or white
    if (ans[0] > ans[1]) {
      return cat; //Thinks it's white
    } else {
      return dog; //Thinks it's black
    }
  }

  crossover(other, type) {
    return new Predictor(this.brain.crossover(other.brain, type));
  }

  mutate(rate) {
    this.brain.mutate(rate, x => Math.random() * 2 - 1);
  }


  getFitness(inputs, correctOutput) {
    // let fitness = 0;
    // for (let descision of previousDesicions) {
    //   // console.log(descision.correct);
    //   let thisAnswer = this.brain.predict([descision.r, descision.g, descision.b]);
    //   let error0 = abs(descision.correct[0] - thisAnswer[0]);
    //   let error1 = abs(descision.correct[1] - thisAnswer[1]);
    //   let avgError = (error0 + error1) / 2;
    //   // console.log(error);
    //   // console.log(descision.correct);
    //   fitness += avgError; //The larger the error, the less gets added
    // }
    // this.fitness = 1 / fitness; //Inverts it, so the worse you did, the lower your fitness value
    // // console.log(this.fitness); //TODO Fix fitness being negative
    // return this.fitness;
    if (this.getPrediction(inputs) === correctOutput) {
      this.fitness = 10;
      return 10;
    } else {
      this.fitness = 1;
      return 1;
    }
  }
}