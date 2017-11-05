function Bullet(startx, starty, endx, endy, w, l) {
  this.pos = createVector(startx, starty);
  this.end = createVector(endx, endy);

  if (this.end == this.pos) {
    this.end.add(1);
    console.log("ugh");
  } else {
    this.end.x += random(-10, 10);
    this.end.y += random(-10, 10);
  }

  this.vel = this.end.copy();
  this.speed = 8;
  this.len = l;
  this.wide = w;
  this.dir = p5.Vector.angleBetween(this.pos, this.end) //this.vel.copy()

  this.vel.sub(this.pos);
  this.vel.setMag(this.speed);
  this.rot = this.vel.heading();

  this.show = function() {
    push();
    strokeWeight(this.wide);
    fill(0);
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    line(0, 0, this.len, 0);
    pop();
  }

  this.move = function() {
    this.pos.add(this.vel);
  }
}

function mouseClicked() {
  bullets.push(new Bullet(player.pos.x, player.pos.y, mouseX, mouseY, 3, 10));
}
