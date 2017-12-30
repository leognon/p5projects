let car;
let lifetime = 250;
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = new Car(width / 2, height / 2, 20, 50, 5, 0.4);
  time = 0;
}

function draw() {
  background(220);

  car.move();
  car.show();


  time++;
}

class Car {
  constructor(x, y, w, h, maxSpeed, accRate, genes) {
    this.w = w;
    this.h = h;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);

    // this.genes = new DNA(maxSpeed, accRate, w, h);
    this.genes = [];
    for (let i = 0; i < lifetime; i++) {
      this.genes.push(p5.Vector.random2D().setMag(accRate));
    }
  }

  move() {
    this.vel.add(this.genes[time]);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + HALF_PI);
    fill(50);
    noStroke();
    rect(-this.w / 2, -this.h / 2, this.w, this.h);

    pop();
  }
}