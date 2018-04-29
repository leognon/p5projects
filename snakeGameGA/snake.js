class Snake {
  constructor(x, y, brain = new NeuralNetwork(nnValues.inputs, nnValues.hidden, nnValues.output), len = 1) {
    this.pos = createVector(x, y);
    this.dir = UP;
    this.hist = [];
    this.len = len;
    this.dead = false;
    this.lastAte = time;

    this.brain = brain;
    this.prob = 0;
    this.food = new Food(randFoodPos(this));
    this.fitness;

    this.lastedTo = 0; //REMOVE THIS!
  }

  run() {
    if (this.dead) return;

    let guess = this.brain.predict(this.getInputs());
    this.setDir(pickHighest(guess));
    this.move();
    this.eat();

    if (populationSize - deadSnakes < amtToShow) {
      this.food.show(); //Only show food when there is 30 snakes
      this.show();
    }

    if (this.lastAte + mustEatEvery < time || this.hit()) {
      this.lastedTo = time;
      deadSnakes++;
      this.dead = true;
    }
  }

  getInputs() {
    let vecToFoodX = this.pos.x - this.food.pos.x;
    let vecToFoodY = this.pos.y - this.food.pos.y;
    return [vecToFoodX, vecToFoodY];

    //By default all are going to the wall
    let upInfo = [this.pos.y + 1, WALLid];
    let downInfo = [(gridHeight - this.pos.y), WALLid];
    let leftInfo = [this.pos.x + 1, WALLid];
    let rightInfo = [(gridWidth - this.pos.x), WALLid];

    let upLeftInfo = [min(this.pos.x + 1, this.pos.y + 1), WALLid];
    let upRightInfo = [min(rightInfo[0], this.pos.y + 1), WALLid];
    let downLeftInfo = [min(this.pos.x + 1, downInfo[0]), WALLid];
    let downRightInfo = [min(rightInfo[0], downInfo[0]), WALLid];

    // let posInfo = [this.food.pos.x, this.food.pos.y, this.pos.x, this.pos.y];
    /*
        let foodDistVec = findDistVec(this.pos, this.food.pos);
        if (foodDistVec != -1) {
          switch (foodDistVec[0]) {
            case UP:
              upInfo = [foodDistVec[1], FOODid];
              break;
            case DOWN:
              downInfo = [foodDistVec[1] + 1, FOODid];
              break;
            case LEFT:
              leftInfo = [foodDistVec[1], FOODid];
              break;
            case RIGHT:
              rightInfo = [foodDistVec[1] + 1, FOODid];
              break;
            case UPLEFT:
              upLeftInfo = [foodDistVec[1], FOODid];
              break;
            case UPRIGHT:
              upRightInfo = [foodDistVec[1], FOODid];
              break;
            case DOWNLEFT:
              downLeftInfo = [foodDistVec[1], FOODid];
              break;
            case DOWNRIGHT:
              downRightInfo = [foodDistVec[1], FOODid];
              break;
            default:
              console.log("nothing?!?!");
              break;
          }
        }

        for (let v of this.hist) {
          let distVec = findDistVec(this.pos, v);
          // console.log(distVec);
          if (distVec != -1) {
            switch (distVec[0]) {
              case UP:
                if (foodDistVec[1] < upInfo[1]) { //Make sure it is closer than before
                  upInfo = [foodDistVec[1], FOODid];
                }
                break;
              case DOWN:
                if (foodDistVec[1] < upInfo[1]) {
                  downInfo = [foodDistVec[1] + 1, FOODid];
                }
                break;
              case LEFT:
                if (foodDistVec[1] < upInfo[1]) {
                  leftInfo = [foodDistVec[1], FOODid];
                }
                break;
              case RIGHT:
                if (foodDistVec[1] < upInfo[1]) {
                  rightInfo = [foodDistVec[1] + 1, FOODid];
                }
                break;
              case UPLEFT:
                if (foodDistVec[1] < upInfo[1]) {
                  upLeftInfo = [foodDistVec[1], FOODid];
                }
                break;
              case UPRIGHT:
                if (foodDistVec[1] < upInfo[1]) {
                  upRightInfo = [foodDistVec[1], FOODid];
                }
                break;
              case DOWNLEFT:
                if (foodDistVec[1] < upInfo[1]) {
                  downLeftInfo = [foodDistVec[1], FOODid];
                }
                break;
              case DOWNRIGHT:
                if (foodDistVec[1] < upInfo[1]) {
                  downRightInfo = [foodDistVec[1], FOODid];
                }
                break;
              default:
                break;
            }
          }
        } //Find all closest tail position in the 8 directions
        //TODO
        //Tail is not seen
        ////DownInfo is off by 1
        //Up is off by one when on food
        //upLeft is off
        //Diagonials are off because it doesn't get cut off by the wall! Use min(x, y)
        return upInfo.concat(downInfo, leftInfo, rightInfo, upLeftInfo, upRightInfo, downLeftInfo, downRightInfo);*/
  }

  getFitness() {
    this.fitness = pow(this.len, 2);
    return this.fitness;
    /*if (this.len < 10) {
      this.fitness = floor(this.lastedTo * this.lastedTo * pow(2, (floor(this.len))));
    } else {
      //grows slower after 10 to stop this.fitness from getting stupidly big
      //ensure greater than len = 9
      this.fitness = this.lastedTo * this.lastedTo;
      this.fitness *= pow(2, 10);
      this.fitness *= (this.len - 9);
    }
    this.fitness /= 100000;
    return this.fitness;
    // let fitness = pow(this.len, 2) * this.lastedTo;
    // if (this.dead) fitness /= 2;
    // this.fitness = fitness;
    // return fitness; // this.len * this.len);//TODO FIX FITNESS FUNCTION AND ADD CROSSOVER!*/
  }

  show() {
    noStroke();
    fill(100);
    drawRectOnGrid(this.pos.x, this.pos.y);
    fill(150);
    for (let p of this.hist) {
      drawRectOnGrid(p.x, p.y);
    }
  }

  hit() {
    if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x >= gridWidth || this.pos.y >= gridHeight) {
      return true;
    } else {
      // for (let p of this.hist) {
      // if (p.x == this.pos.x && p.y == this.pos.y) {
      // return true;
      // }
      // }
    }
  }

  eat() {
    if (this.pos.x == this.food.pos.x && this.pos.y == this.food.pos.y) {
      this.len++;
      this.lastAte = time;
      this.food.pos = randFoodPos(this);
    }
  }

  setDir(dir) {
    if (dir == UP && this.dir != DOWN) {
      this.dir = UP;
    } else if (dir == DOWN && this.dir != UP) {
      this.dir = DOWN;
    } else if (dir == LEFT && this.dir != RIGHT) {
      this.dir = LEFT;
    } else if (dir == RIGHT && this.dir != LEFT) {
      this.dir = RIGHT;
    }
  }

  move() {
    this.hist.push(createVector(this.pos.x, this.pos.y));
    moveVec(this.pos, this.dir);

    if (this.hist.length > this.len) {
      this.hist.shift();
    }
  }
}

function convertInputToText(arr) {
  let str = "";
  let order = ["Up", "Down", "Left", "Right", "UpLeft", "UpRight", "DownLeft", "DownRight"];
  for (let i = 0; i < arr.length; i += 2) {
    str += order[i / 2] + " - " + arr[i] + ((arr[i + 1] === WALLid) ? " Wall" : " Food") + "\n";
  }
  console.log(str);
}

function drawGrid() {
  for (let y = 0; y < height; y += gridSize) {
    stroke(255);
    line(0, y, width, y);
  }
  for (let x = 0; x < width; x += gridSize) {
    stroke(255);
    line(x, 0, x, height);
  }
}

function findDistVec(snakePos, objPos) {
  if (snakePos.equals(objPos)) {
    console.log("SNAKEPOS WAS EQUAL TO OBJPOS!!!!!");
    return -1;
  }
  let directionVec = p5.Vector.sub(objPos, snakePos);

  if (directionVec.x === 0) { //UP or DOWN
    if (directionVec.y < 0) { //UP
      return [UP, directionVec.y * -1];
    } else if (directionVec.y > 0) { //Down
      return [DOWN, directionVec.y - 1];
    }
  } else if (directionVec.y === 0) { //LEFT or RIGHT
    if (directionVec.x < 0) { //LEFT
      return [LEFT, directionVec.x * -1];
    } else if (directionVec.x > 0) {
      return [RIGHT, directionVec.x - 1];
    }
  } else if (abs(directionVec.x) == abs(directionVec.y)) { //If it's a diagonal
    if (directionVec.x < 0) { //On the left
      if (directionVec.y < 0) { //Up left
        return [UPLEFT, directionVec.x * -1]; //TODO Add min's here to make sure diag dist is correct
      } else if (directionVec.y > 0) { //Down Left
        return [DOWNLEFT, directionVec.x * -1];
      }
    } else if (directionVec.x > 0) { //On the right
      if (directionVec.y < 0) { //Up Right
        return [UPRIGHT, directionVec.x];
      } else if (directionVec.y > 0) {
        return [DOWNRIGHT, directionVec.x];
      }
    }
  } else { //NOT SEEN!
    return -1;
  }
}

function moveVec(v, dir) {
  switch (dir) {
    case UP:
      v.y--;
      break;
    case DOWN:
      v.y++;
      break;
    case LEFT:
      v.x--;
      break;
    case RIGHT:
      v.x++;
      break;
  }
}