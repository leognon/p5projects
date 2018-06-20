class NeuralNetwork {
  constructor(amtOfInputs, amtOfHiddenNodes, amtOfOutputs) {
    this.amtOfInputs = amtOfInputs; //How many input nodes
    this.amtOfOutputs = amtOfOutputs; //How many output nodes

    this.inputHidden = create2dArray(amtOfInputs, amtOfHiddenNodes); //Create random weights
    this.hiddenOutput = create2dArray(amtOfHiddenNodes, amtOfOutputs);

    this.hiddenBiases = randomArray(amtOfHiddenNodes); //Create random biases
    this.outputBiases = randomArray(amtOfOutputs);
  }

  predict(inputs) { //Feedforward algorithm to get the outputs from some inputs
    if (inputs.length != this.amtOfInputs) {
      console.log("The number of inputs must be the same as when the network was created!");
      return;
    }
    inputs = inputs.map(x => x / 255); //Normalize inputs

    let hiddenValues = this.hiddenBiases.slice(0); //The array to hold the value of each hidden node based on the inputs, starting off with the biases so it doesn't have to be added later
    for (let j = 0; j < hiddenValues.length; j++) { //Compute each hidden node
      for (let i = 0; i < inputs.length; i++) {
        hiddenValues[j] += (inputs[i] * this.inputHidden[i][j]);
      }
    }
    hiddenValues = hiddenValues.map(x => activateReLu(x)); //Activate each hidden node

    let outputs = this.outputBiases.slice(0); //The final outputs, starting out with the biases
    for (let j = 0; j < outputs.length; j++) { //Compute each hidden node
      for (let i = 0; i < hiddenValues.length; i++) {
        outputs[j] += (hiddenValues[i] * this.hiddenOutput[i][j]);
      }
    }
    let totalOutput = 0;
    for (let val of outputs) {
      totalOutput += val; //The total of all outputs, to be used for softmax
    }
    outputs = outputs.map(x => activateSoftmax(x, totalOutput)); //Activate each output
    return outputs;
  }

  crossover(other, type) { //The crossover function, type is what type of crossover to perform
    let childNN = new NeuralNetwork(networkStats.inputs, networkStats.hidden, networkStats.outputs); //Create the child

    //Make each array of the child a combination of the parents
    for (let i = 0; i < networkStats.inputs; i++) {
      childNN.inputHidden[i] = crossoverArray(this.inputHidden[i], other.inputHidden[i], type);
    }
    for (let j = 0; j < networkStats.hidden; j++) {
      childNN.hiddenOutput[j] = crossoverArray(this.hiddenOutput[j], other.hiddenOutput[j], type);
    }
    childNN.hiddenBiases = crossoverArray(this.hiddenBiases, other.hiddenBiases, type);
    childNN.outputBiases = crossoverArray(this.outputBiases, other.outputBiases, type);
    return childNN;
  }

  mutate(rate, randomizer) { //Mutate each gene with a percent chance and mutate it using a certain function
    for (let i = 0; i < this.inputHidden.length; i++) { //TODO Make these more efficient by only doing one loop
      for (let j = 0; j < this.inputHidden[i].length; j++) {
        if (Math.random() < rate) this.inputHidden[i][j] = randomizer(this.inputHidden[i][j]);
      }
    }
    for (let i = 0; i < this.hiddenOutput.length; i++) {
      for (let j = 0; j < this.hiddenOutput[i].length; j++) {
        if (Math.random() < rate) this.hiddenOutput[i][j] = randomizer(this.hiddenOutput[i][j]);
      }
    }
    for (let i = 0; i < this.hiddenBiases; i++) {
      if (Math.random() < rate) this.hiddenBiases[i] = randomizer(this.hiddenBiases[i]);
    }
    for (let i = 0; i < this.outputBiases; i++) {
      if (Math.random() < rate) this.outputBiases[i] = randomizer(this.outputBiases[i]);
    }
  }
}

function crossoverArray(arrA, arrB, type) {
  if (arrA.length != arrB.length) {
    console.log("Attempte to crossover arrays of different length!");
    return;
  }

  let childArray = []
  switch (type) {
    case 0: //Each index has a 50/50 chance of being from either array
      for (let i = 0; i < arrA.length; i++) {
        if (random(1) < 0.5) {
          childArray[i] = arrA[i]; //Instead of this, make it combine the arrays, shuffle them, then only take the first half 
        } else {
          childArray[i] = arrB[i];
        }
      }
      break;
    case 1: //Takes first 50% from arrA, second 50% from arrB
      childArray = arrA.slice(0, arrA.length / 2).concat(arrB.slice(arrB.length / 2, arrB.length));
      break;
  }
  return childArray;
}

function activateReLu(n) { //The ReLu activation function
  return max(0, n);
}

function activateSoftmax(n, total) {
  return n / total;
}

function create2dArray(rows, cols) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr.push([]);
    for (let j = 0; j < cols; j++) {
      arr[i].push(random(1) * 2 - 1); //Randomize each value
    }
  }
  return arr;
}

function randomArray(len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(random(1) * 2 - 1);
  }
  return arr;
}
