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
    hiddenValues = hiddenValues.map(x => activate(x)); //Activate each hidden node

    let outputs = this.outputBiases.slice(0); //The final outputs, starting out with the biases
    for (let j = 0; j < outputs.length; j++) { //Compute each hidden node
      for (let i = 0; i < hiddenValues.length; i++) {
        outputs[j] += (hiddenValues[i] * this.hiddenOutput[i][j]);
      }
    }
    outputs = outputs.map(x => activate(x)); //Activate each output
    return outputs;
  }
}

function activate(n) { //The activation function
  return max(0, n); //ReLu activation funciton
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