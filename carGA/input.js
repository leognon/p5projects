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

    contain.startScreen.hide();
    contain.editScreen.hide();
    contain.simulateScreen.show();
  });

  DOM.editObstacle = makeButton("Obstacle", 125, height - 61, 110, 56, 25, contain.editScreen, () => {
    tool = 0;
    DOM.editObstacle.class("selected");
    DOM.editSpawn.class("");
    DOM.editCheckpoint.class("");
  });
  DOM.editObstacle.class("selected");

  DOM.editSpawn = makeButton("SpawnPoint", 245, height - 61, 160, 56, 25, contain.editScreen, () => {
    tool = 1;
    DOM.editSpawn.class("selected");
    DOM.editObstacle.class("");
    DOM.editCheckpoint.class("");
  });

  DOM.editCheckpoint = makeButton("Checkpoint", 415, height - 61, 160, 56, 25, contain.editScreen, () => {
    tool = 2;
    DOM.editSpawn.class("");
    DOM.editObstacle.class("");
    DOM.editCheckpoint.class("selected");
  });

  DOM.editVarsContainer = createDiv("").position(10, 0).size(450, 100).parent(contain.editScreen);

  DOM.editVars[0] = makeInput("Population Size: ", populationSize, DOM.editVarsContainer);
  DOM.editVars[1] = makeInput("Lifetime: ", lifetime, DOM.editVarsContainer);
  DOM.editVars[2] = makeInput("MutationRate: ", mutationRate, DOM.editVarsContainer);
  DOM.editVars[2].inp.size(50);
  DOM.editVars[2].inp.attribute("step", 0.001);
}

function createSimulateDOM() {
  DOM.editButton = makeButton("EDIT", 10, 190, 100, 50, 25, contain.simulateScreen, () => { //Edit button, goes to edit mode
    mode = 2;

    contain.startScreen.hide();
    contain.editScreen.show(); //TODO Fix edit button not clickable (change position fixes it!)
    contain.simulateScreen.hide();
  });
  DOM.speedInp = makeInput("Speed: ", 1, contain.simulateScreen);
  DOM.speedInp.text.position(10, 140).style("font-size", "20px").size(150, 10);
  DOM.speedInp.inp.style("font-size", "15px").attribute("step", 1);
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
      } else if (evt.button == 2 && !drawingObstacle.drawing) { //Right click to remove obstacle
        for (let i = obstacles.length - 1; i >= 0; i--) {
          let obstacle = obstacles[i];
          if (mouseX > obstacle.pos.x && mouseX < obstacle.pos.x + obstacle.width && mouseY > obstacle.pos.y && mouseY < obstacle.pos.y + obstacle.height) {
            obstacles.splice(i, 1);
            return;
          }
        }
      }
      break;
    case 1: //Set spawn
      if (evt.button === 0) {
        startX = mouseX;
        startY = mouseY;
      }
      break;
    case 2:
      if (evt.button === 0) { //Place checkpoint
        checkpoints.push(new Checkpoint(mouseX, mouseY, checkpoints.length));
      } else if (evt.button == 2) { //Remove checkpoint
        for (let i = 0; i < checkpoints.length; i++) {
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
    default:
      break;
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