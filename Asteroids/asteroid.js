class Asteroid {
  constructor(x, y, r, s, vel) {
    this.pos = createVector(x, y);
    if (!vel) {
      this.vel = p5.Vector.random2D().mult(s);
    } else {
      this.vel = vel;
    }
    this.radius = r;
    this.rot = 0;
    this.speed = s;

    let randstart = random(1000);
    this.randomVals = [];
    for (let a = 0; a < TWO_PI; a += PI / asteroidVertex) {
      this.randomVals[a] = noise(randstart + (a * 10)) * (this.radius / 1.5);
    }
    this.removeThis = false;
  }

  move() {
    this.pos.add(this.vel);

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

  split(b) {
    if (this.radius / 2 > 10) {
      let bulletDir = p5.Vector.sub(this.pos, b.pos).setMag(this.vel.mag() * 1.25);

      asteroids.push(new Asteroid(this.pos.x, this.pos.y, this.radius / 2, bulletDir.mag(), bulletDir.copy().rotate(PI / 15)));
      asteroids.push(new Asteroid(this.pos.x, this.pos.y, this.radius / 2, bulletDir.mag(), bulletDir.rotate(-PI / 15)));
    }
    bullets.splice(bullets.indexOf(b), 1);
    this.removeThis = true;
    // asteroids.splice(asteroids.indexOf(this));
  }

  hit(bullet) {
    return (
      collideCircleToCircle(this.pos, this.radius * 1.2, bullet.pos, bullet.radius) ||
      collideCircleToCircle(createVector(this.pos.x - width, this.pos.y), this.radius * 1.2, bullet.pos, bullet.radius) ||
      collideCircleToCircle(createVector(this.pos.x + width, this.pos.y), this.radius * 1.2, bullet.pos, bullet.radius) ||
      collideCircleToCircle(createVector(this.pos.x, this.pos.y - height), this.radius * 1.2, bullet.pos, bullet.radius) ||
      collideCircleToCircle(createVector(this.pos.x, this.pos.y + height), this.radius * 1.2, bullet.pos, bullet.radius)
    );
  }

  show() {
    this.showOne(0, 0);
    this.showOne(-width, 0);
    this.showOne(width, 0);
    this.showOne(0, -height);
    this.showOne(0, height);
    this.rot += PI / 500;
  }

  showOne(offsetX, offsetY) {
    push();
    translate(this.pos.x + offsetX, this.pos.y + offsetY);
    rotate(this.rot);
    noFill();
    stroke(255);
    strokeWeight(5);
    beginShape();
    for (let a = 0; a < TWO_PI; a += PI / asteroidVertex) {
      let newR = this.radius + this.randomVals[a];

      let x = cos(a) * (newR)
      let y = sin(a) * (newR)
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}