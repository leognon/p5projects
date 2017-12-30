let car;
let lifetime = 250;

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = new Car(width / 2, height / 2, 20, 50, 7, 0.4);
}

function draw() {
  background(220);

  car.move();
  car.show();
}

class Car {
  constructor(x, y, w, h, maxSpeed, accRate, genes) {
    this.pos = createVector(x, y);
    this.acc = createVector();
    this.vel = createVector(0, 0);
    this.w = w;
    this.h = h;
    // this.genes = new DNA(maxSpeed, accRate, w, h);
    this.genes = [];
    for (let i = 0; i < lifetime; i++) {
      this.genes.push(createVector(0.2, 0.4));
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading);
    fill(50);
    noStroke();
    rect(-this.w / 2, -this.h / 2, this.w, this.h);

    pop();
  }
}