class Car {
  constructor(x = startX, y = startY, genes = randGenes()) {
    this.pos = createVector(x, y); //Position
    this.vel = createVector(0, 0); //Velocity
    this.colG = 0;
    this.colRB = 0;
    this.dead = false;
    this.prob;
    this.fitness;
    this.checkpointsReached = 0;

    this.genes = genes; //Genes (acc force for each frame, maxSpeed, accRate, width, and height)
    this.halfDim = createVector(this.genes.width / 2, this.genes.height / 2);
  }

  move() {
    this.vel.add(this.genes.accs[time]); //Add acc to velocity
    this.vel.limit(this.genes.maxSpeed); //Limit velocity by max Speed
    this.pos.add(this.vel); //Add velocity to position
  }

  hit() {
    if (this.pos.x < this.genes.width ||
      this.pos.x > width - this.genes.width ||
      this.pos.y < this.genes.width ||
      this.pos.y > height - this.genes.width) {

      this.dead = true;
      return;
    }

    for (let obstacle of obstacles) {
      let heading = this.vel.heading();

      let a = abs((simplifyAngle(heading) + HALF_PI) % PI);

      if (a === 0) { //Facing up or down
        if (collideRect(obstacle.pos, obstacle.width, obstacle.height, p5.Vector.sub(this.pos, this.halfDim), this.genes.width, this.genes.height)) {
          this.dead = true;
          return;
        }
      } else if (a == HALF_PI) { //Facing left or right
        if (collideRect(obstacle.pos, obstacle.width, obstacle.height, createVector(this.pos.x - this.halfDim.y, this.pos.y - this.halfDim.x), this.genes.height, this.genes.width)) {
          this.dead = true;
          return;
        }
      } else if (a == QUARTER_PI) { //Facing 45 or 225 degrees
        let theW = this.genes.height * abs(sin(heading)) + this.genes.width * abs(cos(heading));
        let theH = this.genes.height * abs(cos(heading)) + this.genes.width * abs(sin(heading))
        if (collideRect(obstacle.pos, obstacle.width, obstacle.height, createVector(-theW / 2 + this.pos.x, this.pos.y), theW / 2, theH / 2)) {
          this.dead = true;
          return;
        } else if (collideRect(obstacle.pos, obstacle.width, obstacle.height, createVector(this.pos.x, -theH / 2 + this.pos.y), theW / 2, theH / 2)) {
          this.dead = true;
          return;
        }
      } else if (a == QUARTER_PI * 3) { //Facing 135 or 315 degrees
        let theW = this.genes.height * abs(sin(heading)) + this.genes.width * abs(cos(heading));
        let theH = this.genes.height * abs(cos(heading)) + this.genes.width * abs(sin(heading));
        if (collideRect(obstacle.pos, obstacle.width, obstacle.height, createVector(this.pos.x, this.pos.y), theW / 2, theH / 2)) {
          this.dead = true;
          return;
        } else if (collideRect(obstacle.pos, obstacle.width, obstacle.height, createVector(-theW / 2 + this.pos.x, -theH / 2 + this.pos.y), theW / 2, theH / 2)) {
          this.dead = true;
          return;
        }
      } else {
        console.log("ANGLE WAS AN INVALID VALUE: " + a);
      }
    }


    let index = constrain(this.checkpointsReached, 0, checkpoints.length - 1);
    let checkpoint = checkpoints[index];

    if (pow(this.pos.x - checkpoint.pos.x, 2) + pow(this.pos.y - checkpoint.pos.y, 2) < pow(this.genes.width + checkpoint.r, 2)) {
      this.checkpointsReached++;
      this.colG = (this.checkpointsReached / checkpoints.length) * 255;
      this.colRB = this.colG * 0.8;
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y); //Translate to center
    rotate(this.vel.heading() + HALF_PI); //Rotate towards direction
    fill(this.colRB, this.colG, this.colRB, 230); //Start Black, eventually turn green
    noStroke();
    rect(-this.genes.width / 2, -this.genes.height / 2, this.genes.width, this.genes.height); //Draw rect
    pop();
  }
}

function randGenes() { //Randomly generate genes
  genes = {
    accs: [],
    maxSpeed: random(limits.minSpeed, limits.maxSpeed),
    accRate: random(limits.minAcc, limits.maxAcc),
    width: random(limits.minW, limits.maxW),
    height: random(limits.minH, limits.maxH)
  };
  for (let i = 0; i < lifetime; i++) {
    genes.accs.push((p5.Vector.random2D().mult(genes.accRate))); //Random acc for each frame, scaled by the acceleration rate
  }
  return genes;
}

function crossover(a, b) {
  genes = { //Pick a random gene from one parent or the other
    accs: [],
    maxSpeed: pickRand(a.genes.maxSpeed, b.genes.maxSpeed),
    accRate: pickRand(a.genes.accRate, b.genes.accRate),
    width: pickRand(a.genes.width, b.genes.width),
    height: pickRand(a.genes.height, b.genes.height)
  };

  if (random(1) < mutationRate) genes.maxSpeed = random(limits.minSpeed, limits.maxSpeed);
  if (random(1) < mutationRate) genes.AccRate = random(limits.minAcc, limits.maxAcc);
  if (random(1) < mutationRate) genes.width = random(limits.minW, limits.maxW); //Randomly mutate genes
  if (random(1) < mutationRate) genes.height = random(limits.minH, limits.maxH);

  for (let i = 0; i < lifetime; i++) {
    if (random(1) > mutationRate && a.genes.accs[i] != undefined) {
      genes.accs.push(pickRand(a.genes.accs[i], b.genes.accs[i])); //Inherit acc gene from a parent
    } else {
      genes.accs.push((p5.Vector.random2D().mult(genes.accRate))); //Or be mutated to be completely random
      //New gene is generated by chance, or if the parents don't have that gene
    }
  }

  return genes;
}