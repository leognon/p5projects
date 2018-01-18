function createAllDOM() {
  createStartDOM();
  createEditDOM();
  createSimulateDOM();
}

function createStartDOM() {
  DOM.startButton = makeButton("START", width / 2 - 75, height - 125, 150, 100, 40, false, () => { //Start game, goes to edit mode
    mode = 2;
    DOM.editVarsContainer.show();
    DOM.startButton.hide();
    DOM.editDoneButton.show();
    DOM.editObstacle.show();
    DOM.editSpawn.show();
    reset();
  });
}

function createEditDOM() {
  DOM.editDoneButton = makeButton("DONE", 15, height - 61, 100, 56, 25, true, () => { //Finish editing, goes to simulation
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
    lifetime = int(DOM.editVars[1].inp.value());
    mutationRate = parseFloat(DOM.editVars[2].inp.value());

    mode = 1;
    drawingObstacle.drawing = false;
    DOM.editVarsContainer.hide();
    DOM.editDoneButton.hide();
    DOM.editButton.show();
    DOM.editObstacle.hide();
    DOM.editSpawn.hide();
    DOM.speedInp.text.show();
  });

  DOM.editObstacle = makeButton("Obstacle", 125, height - 61, 110, 56, 25, true, () => {
    tool = 0;
    DOM.editObstacle.class("selected");
    DOM.editSpawn.class("");
  });
  DOM.editObstacle.class("selected");

  DOM.editSpawn = makeButton("SpawnPoint", 245, height - 61, 160, 56, 25, true, () => {
    tool = 1;
    DOM.editSpawn.class("selected");
    DOM.editObstacle.class("");
  });

  DOM.editCheckpoint = makeButton("Checkpoint", 415, height - 61, 160, 56, 25, true, () => {
    tool = 1;
    DOM.editSpawn.class("selected");
    DOM.editObstacle.class("");
  });

  let editVarsX = 10;
  DOM.editVarsContainer = createDiv("").position(editVarsX, 0).hide();

  DOM.editVars[0] = makeInput("Population Size: ", populationSize, false, DOM.editVarsContainer);
  DOM.editVars[1] = makeInput("Lifetime: ", lifetime, false, DOM.editVarsContainer);
  DOM.editVars[2] = makeInput("MutationRate: ", mutationRate, false, DOM.editVarsContainer);
  DOM.editVars[2].inp.size(50);
  DOM.editVars[2].inp.attribute("step", 0.001);
}

function createSimulateDOM() {
  DOM.editButton = makeButton("EDIT", 10, 190, 100, 50, 25, true, () => { //Edit button, goes to edit mode
    mode = 2;
    DOM.editVarsContainer.show();
    DOM.editButton.hide();
    DOM.speedInp.text.hide();
    DOM.editDoneButton.show();
    DOM.editObstacle.show();
    DOM.editSpawn.show();
  });
  DOM.speedInp = makeInput("Speed: ", 1, true);
  DOM.speedInp.text.position(10, 140);
  DOM.speedInp.text.style("font-size", "20px");
  DOM.speedInp.inp.style("font-size", "15px");
  DOM.speedInp.inp.attribute("step", 1);
  DOM.speedInp.inp.input(() => {
    speed = max(1, int(DOM.speedInp.inp.value()));
    DOM.speedInp.inp.value(0.01); //Remove the decimal
    DOM.speedInp.inp.value(speed); //Remove the decimal
  });
}

function keyPressed() {
  if (key == 'P' && mode == 1) {
    paused = !paused;
  } else if (keyCode == ESCAPE && drawingObstacle.drawing) {
    drawingObstacle.drawing = false;

    DOM.editDoneButton.show();
    DOM.editVarsContainer.show();
    DOM.editObstacle.show();
    DOM.editSpawn.show();
  }
}

function canvasClicked(evt) {
  if (mode != 2) return;

  if (evt.button === 0 && tool === 0) { //Left clicked to draw obstacle
    if (drawingObstacle.drawing == false) { //Start drawing
      drawingObstacle.x = mouseX;
      drawingObstacle.y = mouseY;
      drawingObstacle.drawing = true;

      //Hide DOM elements when drawing
      DOM.editDoneButton.hide();
      DOM.editVarsContainer.hide();
      DOM.editObstacle.hide();
      DOM.editSpawn.hide();

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
      DOM.editDoneButton.show();
      DOM.editVarsContainer.show();
      DOM.editObstacle.show();
      DOM.editSpawn.show();
    }
  } else if (evt.button === 0 && tool == 1) {
    startX = mouseX;
    startY = mouseY;
  } else if (evt.button == 2 && !drawingObstacle.drawing) { //Right click to remove obstacle
    for (let i = obstacles.length - 1; i >= 0; i--) {
      let obstacle = obstacles[i];
      if (mouseX > obstacle.pos.x && mouseX < obstacle.pos.x + obstacle.width && mouseY > obstacle.pos.y && mouseY < obstacle.pos.y + obstacle.height) {
        obstacles.splice(i, 1);
        return;
      }
    }
  }
}

function makeButton(txt, x, y, width, height, fontSize, hide, clicked, parent) {
  let button = createButton(txt);
  button.style("font-size", fontSize + "px");
  button.size(width, height);
  button.position(x, y);
  button.mouseReleased(clicked);
  if (parent) button.parent(parent);
  if (hide) button.hide();
  return button;
}

function makeInput(name, val, hide, parent, type = "number") {
  let obj = {
    text: createP(name), //.position(x, y),
    inp: createInput(val, type).size(40, text.height)
  }
  if (parent) obj.text.parent(parent);

  obj.inp.parent(obj.text);
  if (hide) obj.text.hide();

  return obj;
}