class Checkpoint {
  constructor(x, y, index, r = 10) {
    this.pos = createVector(x, y);
    this.r = r;
    this.i = index;
  }

  show() {
    fill(0, 255, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    fill(0);
    textSize(this.r * 2 - 3);
    textAlign(CENTER, CENTER);
    text(this.i + 1, this.pos.x, this.pos.y);
  }
}