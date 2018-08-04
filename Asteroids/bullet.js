class Bullet {
  constructor(x, y, angle) {
    this.pos = createVector(x, y);
    this.speed = 8;
    this.radius = 3;

    let dirX = cos(angle) * this.speed;
    let dirY = sin(angle) * this.speed;
    this.vel = createVector(dirX, dirY);
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x < -this.radius) {
      this.pos.x = width + this.radius;
    } else if (this.pos.x > width + this.radius) {
      this.pos.x = -this.radius;
    }
    if (this.pos.y < -this.radius) {
      this.pos.y = height + this.radius;
    } else if (this.pos.y > height + this.radius) {
      this.pos.y = -this.radius;
    }
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }
}