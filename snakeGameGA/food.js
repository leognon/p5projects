class Food {
  constructor(pos = randFoodPos(snakes[0])) {
    this.pos = pos.copy();
  }

  show() {
    fill(255, 0, 0);
    drawRectOnGrid(this.pos.x, this.pos.y);
  }
}

function randFoodPos(s) {
  let x;
  let y;
  let tries = 0;
  let insideSnake = false;

  do {
    x = floor(random(gridWidth));
    y = floor(random(gridHeight));

    if (x == s.pos.x && y == s.pos.y) {
      insideSnake = true;
    } else {
      for (let p of s.hist) {
        if (x == s.pos.x && y == s.pos.y) {
          insideSnake = true;
        }
      }
    }
    tries++;
  } while (insideSnake && tries < 10000);

  return createVector(x, y);
}