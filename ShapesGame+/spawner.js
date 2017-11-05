function Spawner() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 35;

  this.show = function() {
    push();
    fill(255, 0, 0);
    rect(this.pos.x - (this.r / 2), this.pos.y - (this.r / 2), this.r, this.r);
    pop();
    this.r = map(frame % 90, 0, 90, 35, 50);
  }
}
