class Food {
  constructor(pos = randFoodPos(snake)) {
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
  for (let i = 0; i < 3000; i++) {
    x = floor(random(gridWidth));
    y = floor(random(gridHeight));
    let insideSnake = false;
    if (x == s.pos.x && y == s.pos.y) {
      insideSnake = true;
    } else {
      for (let p of s.hist) {
        if (x == p.x && y == p.y) {
          insideSnake = true;
          return;
        }
      }
    }
  }
  return createVector(x, y);
}