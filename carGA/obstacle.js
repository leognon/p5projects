class Obstacle {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;

    this.halfW = this.width / 2;
    this.halfH = this.height / 2;
    this.center = createVector(this.pos.x + this.halfW, this.pos.y + this.halfH);
  }

  show() {
    fill(25, 150);
    stroke(0);
    strokeWeight(3);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

function collideRect(pos1, w1, h1, pos2, w2, h2) {
  if (showDebug) {
    noFill();
    stroke(255, 0, 0);
    rect(pos2.x, pos2.y, w2, h2);
  }
  return (
    pos1.x < pos2.x + w2 &&
    pos1.x + w1 > pos2.x &&
    pos1.y < pos2.y + h2 &&
    pos1.y + h1 > pos2.y
  )
}