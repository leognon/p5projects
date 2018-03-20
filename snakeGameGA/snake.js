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
  }

  run() {
    if (this.dead) return;
    this.food.show();

    let guess = this.brain.predict(this.getInputs());
    this.setDir(pickHighest(guess));
    this.move();
    this.eat();
    this.show();
    if (this.lastAte + mustEatEvery < time || this.hit()) {
      deadSnakes++;
      this.dead = true;
    }
  }

  getInputs() {
    //By default all are going to the wall
    let upInfo = [this.pos.y, WALLid];
    let downInfo = [gridHeight - this.pos.y, WALLid];
    let leftInfo = [this.pos.x, WALLid];
    let rightInfo = [gridWidth - this.pos.x, WALLid];

    let upLeftInfo = [this.pos.x, WALLid];
    let upRightInfo = [gridWidth - this.pos.x, WALLid];
    let downLeftInfo = [this.pos.x, WALLid];
    let downRightInfo = [gridWidth - this.pos.x, WALLid];

    let foodDistVec = findDistVec(this.pos, this.food.pos);
    if (foodDistVec != -1) {
      switch (foodDistVec[0]) {
        case UP:
          upInfo = [foodDistVec[1], FOODid];
          break;
        case DOWN:
          downInfo = [foodDistVec[1], FOODid];
          break;
        case LEFT:
          leftInfo = [foodDistVec[1], FOODid];
          break;
        case RIGHT:
          rightInfo = [foodDistVec[1], FOODid];
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
          break;
      }
    }

    for (let v of this.hist) {
      let distVec = findDistVec(this.pos, v);
      if (distVec != -1) {
        switch (distVec[0]) {
          case UP:
            if (foodDistVec[1] < upInfo[1]) { //Make sure it is closer than before
              upInfo = [foodDistVec[1], FOODid];
            }
            break;
          case DOWN:
            if (foodDistVec[1] < upInfo[1]) {
              downInfo = [foodDistVec[1], FOODid];
            }
            break;
          case LEFT:
            if (foodDistVec[1] < upInfo[1]) {
              leftInfo = [foodDistVec[1], FOODid];
            }
            break;
          case RIGHT:
            if (foodDistVec[1] < upInfo[1]) {
              rightInfo = [foodDistVec[1], FOODid];
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
    // console.log(final);
    return upInfo.concat(downInfo, leftInfo, rightInfo, upLeftInfo, upRightInfo, downLeftInfo, downRightInfo);
  }

  getFitness() {
    return pow(this.len, 3); // this.len * this.len);
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
      let p = this.hist[0]; //TODO Make them collide with tail (uncomment code above)
      if (p.x == this.pos.x && p.y == this.pos.y) {
        return true;
      }
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
//Use constants for each of the 8 directions
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
      return [DOWN, directionVec.y];
    }
  } else if (directionVec.y === 0) { //LEFT or RIGHT
    if (directionVec.x < 0) { //LEFT
      return [LEFT, directionVec.x * -1];
    } else if (directionVec.x > 0) {
      return [RIGHT, directionVec.x];
    }
  } else if (abs(directionVec.x) == abs(directionVec.y)) { //If it's a diagonal
    if (directionVec.x < 0) { //On the left
      if (directionVec.y < 0) { //Up left
        return [UPLEFT, directionVec.x * -1];
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

//COMPUTE THE DISTANCE IN FINDDISTVEC FUNCTION, THEN RETURN THIS FUNCTION TO MAKE AN EASIER OBJECT (MAYBE MAKE ARRAY, THEN CONCAT THE ARRAY AS THE FINAL INPUTS?)
//MAKE FUNCTION RETURN OBJ WITH DIRECTION AND DIST (USE pythagorean theorem?), THEN USE IN GETINPUTS FUNCTION!

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