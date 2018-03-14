class Snake {
  constructor(x, y, len = 0) {
    this.pos = createVector(x, y);
    this.dir = UP;
    this.hist = [];
    this.len = len;
  }

  show() {
    noStroke();
    fill(100);
    drawRectOnGrid(this.pos.x, this.pos.y);
    for (let p of this.hist) {
      drawRectOnGrid(p.x, p.y);
    }
  }

  hit() {
    if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x >= gridWidth || this.pos.y >= gridHeight) {
      return true;
    } else {
      for (let p of this.hist) {
        if (p.x == this.pos.x && p.y == this.pos.y) {
          return true;
        }
      }
    }
  }

  eat(f) {
    if (this.pos.x == food.pos.x && this.pos.y == food.pos.y) {
      this.len++;
      food.pos = randFoodPos(this);
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