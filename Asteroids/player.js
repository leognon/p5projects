class Player {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;

    this.rotS = PI / 4;
    this.speed = 4;
    this.accR = 0.3;
    this.vel = createVector(0, -this.speed);
    this.acc = createVector();
  }

  move() {
    this.vel.add(this.acc);
    this.vel.setMag(this.speed);
    this.pos.add(this.vel);
    this.acc.mult(0);


    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  turn(dir) {
    let angle = this.vel.heading() + (dir * this.rotS);
    let x = cos(angle) * this.accR;
    let y = sin(angle) * this.accR;

    this.acc.add(x, y);
    // this.acc.rotate(dir * this.rotS);
  }

  shoot() {
    let startPoint = createVector(0, -this.height / 2).rotate(this.vel.heading() + PI / 2).add(this.pos.x, this.pos.y);
    bullets.push(new Bullet(startPoint.x, startPoint.y, this.vel.heading()));
  }

  hit(obj) {
    return (collideCircleToCircle(this.pos, this.height / 2.5, obj.pos, obj.radius));
  }

  showAll() {
    this.showOne(0, 0);
    this.showOne(-width, 0);
    this.showOne(width, 0);
    this.showOne(0, -height);
    this.showOne(0, height);
  }

  showOne(offsetX, offsetY) {
    push();
    translate(this.pos.x + offsetX, this.pos.y + offsetY);
    rotate(this.vel.heading() + PI / 2);

    noFill();
    stroke(255);
    strokeWeight(4);

    let topPos = createVector(0, -this.height / 2);
    let leftPos = createVector(-this.width / 2, this.height / 2);
    let rightPos = createVector(this.width / 2, this.height / 2);
    triangle(topPos.x, topPos.y, leftPos.x, leftPos.y, rightPos.x, rightPos.y);
    pop();
  }
}