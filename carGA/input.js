function createAllDOM() {
  contain.startScreen = createDiv("").position(0, 0);
  contain.editScreen = createDiv("").position(0, 0).hide();
  contain.simulateScreen = createDiv("").position(0, 0).hide();

  createStartDOM();
  createEditDOM();
  createSimulateDOM();
}

function createStartDOM() {
  DOM.startButton = makeButton("START", width / 2 - 75, height - 125, 150, 100, 40, contain.startScreen, () => { //Start game, goes to edit mode
    mode = 2;
    contain.startScreen.hide();
    contain.editScreen.show();
    contain.simulateScreen.hide();
    reset();
  });
}


function createEditDOM() {
  DOM.editDoneButton = makeButton("DONE", 15, height - 61, 100, 56, 25, contain.editScreen, () => { //Finish editing, goes to simulation
    if (checkpoints.length < 1) {
      alert("You must have at least one checkpoint of where the cars goal is to go!");
      return;
    }

    if (time === 0 && generation === 0) {
      for (let car of cars) {
        car.pos.x = startX;
        car.pos.y = startY;
      }
    }

    if (lifetime != DOM.editVars[1].inp.value()) { //If lifetime was changed, create new genes
      for (let car of cars) {
        for (let i = car.genes.accs.length; i < DOM.editVars[1].inp.value(); i++) {
          car.genes.accs.push((p5.Vector.random2D().mult(car.genes.accRate)));
        }
      }
    }

    populationSize = int(DOM.editVars[0].inp.value());
    if (cars.length > populationSize) {
      cars.splice(populationSize, cars.length - populationSize);
    }

    lifetime = int(DOM.editVars[1].inp.value());
    mutationRate = parseFloat(DOM.editVars[2].inp.value());

    mode = 1;
    drawingObstacle.drawing = false;

    contain.startScreen.hide();
    contain.editScreen.hide();
    contain.simulateScreen.show();
  });

  DOM.editObstacle = makeButton("Obstacle", 125, height - 61, 120, 56, 25, contain.editScreen, () => {
    tool = 0;
    DOM.editObstacle.class("selected");
    DOM.editSpawn.class("");
    DOM.editCheckpoint.class("");
  });
  DOM.editObstacle.class("selected");

  DOM.editSpawn = makeButton("SpawnPoint", 255, height - 61, 160, 56, 25, contain.editScreen, () => {
    tool = 1;
    DOM.editSpawn.class("selected");
    DOM.editObstacle.class("");
    DOM.editCheckpoint.class("");
  });

  DOM.editCheckpoint = makeButton("Checkpoint", 425, height - 61, 160, 56, 25, contain.editScreen, () => {
    tool = 2;
    DOM.editSpawn.class("");
    DOM.editObstacle.class("");
    DOM.editCheckpoint.class("selected");
  });

  DOM.loadButton = makeButton("Load File", 595, height - 61, 160, 56, 25, contain.editScreen, () => {
    document.getElementById('fileInput').click();
    document.getElementById('fileInput').onchange = function (event) {
      var fileList = document.getElementById('fileInput').files;
      console.log(fileList);
      let fr = new FileReader();
      fr.onload = function (e) {
        let loadedData = JSON.parse(e.target.result);
        loadAll(loadedData);
      };
      fr.readAsText(fileList[0]);
    }
  });
  DOM.loadButton.drop((data) => {
    let fr = new FileReader();
    fr.onload = function (e) {
      let loadedData = JSON.parse(e.target.result);
      loadAll(loadedData);
    };
    fr.readAsText(data.file);

  });

  DOM.saveButton = makeButton("Save", 765, height - 61, 160, 56, 25, contain.editScreen, () => {
    saveAll();
    //TODO DONE!??!!??!?!?!!?!??!?!?
  });

  DOM.editVarsContainer = createDiv("").position(10, 0).size(160, 100).parent(contain.editScreen);

  DOM.editVars[0] = makeInput("Population Size: ", populationSize, DOM.editVarsContainer);
  DOM.editVars[1] = makeInput("Lifetime: ", lifetime, DOM.editVarsContainer);
  DOM.editVars[2] = makeInput("MutationRate: ", mutationRate, DOM.editVarsContainer);
  DOM.editVars[2].inp.size(57);
  DOM.editVars[2].inp.attribute("step", 0.001);

}

function createSimulateDOM() {
  DOM.editButton = makeButton("EDIT", 10, 190, 100, 50, 25, contain.simulateScreen, () => { //Edit button, goes to edit mode
    mode = 2;

    contain.startScreen.hide();
    contain.editScreen.show();
    contain.simulateScreen.hide();
  });
  DOM.speedInp = makeInput("Speed: ", 1, contain.simulateScreen);
  DOM.speedInp.text.position(10, 140).style("font-size", "20px").size(150, 10);
  DOM.speedInp.inp.style("font-size", "15px").attribute("step", 1);
  DOM.speedInp.inp.changed(() => {
    speed = max(1, int(DOM.speedInp.inp.value()));
    DOM.speedInp.inp.value(0.01); //Remove the decimal
    DOM.speedInp.inp.value(speed); //Remove the decimal
  });
  DOM.speedInp.inp.input(() => {
    speed = max(1, int(DOM.speedInp.inp.value()));
  });
}

function keyPressed() {
  if (key == 'P' && mode == 1) {
    paused = !paused;
  } else if (keyCode == ESCAPE && drawingObstacle.drawing) {
    drawingObstacle.drawing = false;

    contain.editScreen.show();
  } else if (key == 'H') {
    let msg = "In this Genetic Algorithm, the cars (rectangles), are learning how to reach the checkpoints (green circles) in the correct order. They must also avoid the obstacles (gray rectangles). If they hit an obstacle, they crash and loose. \n\nTo place obstacles, go into edit mode, select obstacle and click for a starting point, then click for the ending point. To place checkpoints, place them in the order that you want the cars to reach them.\n\nYou can go back and edit the course, and any of the algorithms variables.\nPopulation Size - The amount of Cars\nLifetime - How many frames each car has to reach all the checkpoints.\nMutation rate - The percent chance that a cars gene with mutate to a random value\n\nThe cars genes consist of what vector will be applied as an acceleration each frame, the maximum speed of the car, the acceleration rate, the width and the height.\n\nControls:\nPause - P\n   Cancel placing obstacle - Right Click\nRemove obstacle/checkpoint - Right Click\nHelp - H";
    alert(msg);
  }
}

function saveAll() {
  let data = {
    mutationRate: mutationRate,
    populationSize: populationSize,
    lifetime: lifetime,
    startX: startX,
    startY: startY,
    generation: generation,
    obstacles: [],
    checkpoints: [],
    carGenes: []
  };

  for (let obstacle of obstacles) {
    let o = {
      pos: saveVec(obstacle.pos),
      w: obstacle.width,
      h: obstacle.height
    };

    data.obstacles.push(o);
  }
  for (let checkpoint of checkpoints) {
    let c = {
      pos: saveVec(checkpoint.pos),
      index: checkpoint.i
    };

    data.checkpoints.push(c);
  }
  for (let car of cars) {
    let c = {
      accs: [],
      maxSpeed: car.genes.maxSpeed,
      accRate: car.genes.accRate,
      width: car.genes.width,
      height: car.genes.width
    };
    for (let acc of car.genes.accs) {
      c.accs.push(saveVec(acc));
    }
    data.carGenes.push(c);
  }

  saveJSON(data, 'carGA.json');
  return data;
}

function loadAll(data) {
  mutationRate = data.mutationRate;
  populationSize = data.populationSize;
  lifetime = data.lifetime;
  DOM.editVars[0].inp.value(populationSize); //= makeInput("Population Size: ", populationSize, DOM.editVarsContainer);
  DOM.editVars[1].inp.value(lifetime); // = makeInput("Lifetime: ", lifetime, DOM.editVarsContainer);
  DOM.editVars[2].inp.value(mutationRate); //= makeInput("MutationRate: ", mutationRate, DOM.editVarsContainer);

  startX = data.startX;
  startY = data.startY;
  generation = data.generation;

  obstacles = [];
  checkpoints = [];
  carGenes = [];

  for (let obstacle of data.obstacles) {
    let o = new Obstacle(obstacle.pos.x, obstacle.pos.y, obstacle.w, obstacle.h);
    obstacles.push(o);
  }

  for (let checkpoint of data.checkpoints) {
    checkpoints.push(new Checkpoint(checkpoint.pos.x, checkpoint.pos.y, checkpoint.index));
  }

  for (let carGene of data.carGenes) {
    let genes = {
      accs: [],
      maxSpeed: carGene.maxSpeed, //car.genes.maxSpeed,
      accRate: carGene.accRate,
      width: carGene.width,
      height: carGene.height
    };
    for (let acc of carGene.accs) {
      genes.accs.push(createVector(acc.x, acc.y));
    }
    let c = new Car(startX, startY, genes);
    cars.push(c);
  }
}

function saveVec(v) {
  return {
    x: v.x,
    y: v.y
  };
}

function canvasClicked(evt) {
  if (mode != 2) return;

  if (evt.button === 0) { //Left click
    switch (tool) {
      case 0: //Start Drawing, place, or remove obstacles
        if (evt.button === 0) {
          if (drawingObstacle.drawing == false) { //Start drawing
            drawingObstacle.x = mouseX;
            drawingObstacle.y = mouseY;
            drawingObstacle.drawing = true;

            //Hide DOM elements when drawing
            contain.editScreen.hide();
          } else { //Stop drawing and place obstacle
            let width = mouseX - drawingObstacle.x;
            let height = mouseY - drawingObstacle.y;

            if (width < 0) drawingObstacle.x += width;
            if (height < 0) drawingObstacle.y += height;
            height = max(3, abs(height));
            width = max(3, abs(width));

            obstacles.push(new Obstacle(drawingObstacle.x, drawingObstacle.y, width, height));
            drawingObstacle.drawing = false;

            //Show DOM elements after drawing
            contain.editScreen.show();
          }
        }
        break;
      case 1: //Set spawn
        if (evt.button === 0) {
          startX = mouseX;
          startY = mouseY;
        }
        break;
      case 2: //Place or remove checkpoints
        if (evt.button === 0) { //Place checkpoint
          checkpoints.push(new Checkpoint(mouseX, mouseY, checkpoints.length));
        }
      default:
        break;
    }
  } else if (evt.button == 2) { //Right click
    if (drawingObstacle.drawing) return; //Right click to remove obstacle
    for (let i = obstacles.length - 1; i >= 0; i--) { //Remove obstacles
      let obstacle = obstacles[i];
      if (mouseX > obstacle.pos.x && mouseX < obstacle.pos.x + obstacle.width && mouseY > obstacle.pos.y && mouseY < obstacle.pos.y + obstacle.height) {
        obstacles.splice(i, 1);
        return;
      }
    }

    for (let i = 0; i < checkpoints.length; i++) { //Remove checkpoints
      let checkpoint = checkpoints[i];
      if (pow(mouseX - checkpoint.pos.x, 2) + pow(mouseY - checkpoint.pos.y, 2) < pow(checkpoint.r, 2)) {
        checkpoints.splice(i, 1);
        for (let j = i; j < checkpoints.length; j++) {
          checkpoints[j].i--;
        }
        return;
      }
    }
  }
}

function makeButton(txt, x, y, width, height, fontSize, parent, clicked) {
  let button = createButton(txt);
  button.style("font-size", fontSize + "px");
  button.size(width, height);
  button.position(x, y);
  button.mouseReleased(clicked);
  if (parent) button.parent(parent);
  // if (hide) button.hide();
  return button;
}

function makeInput(name, val, parent, type = "number") {
  let obj = {
    text: createP(name), //.position(x, y),
    inp: createInput(val, type).size(40, text.height)
  }
  obj.inp.parent(obj.text);
  obj.text.parent(parent);
  // if (hide) obj.text.hide();

  return obj;
}