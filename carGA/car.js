class Car {
    constructor(x = startX, y = startY, genes = randGenes()) {
        this.pos = createVector(x, y); //Position
        this.vel = createVector(0, 0); //Velocity

        this.genes = genes; //Genes (acc force for each frame, maxSpeed, accRate, width, and height)
    }

    move() {
        this.vel.add(this.genes.accs[time]); //Add acc to velocity
        this.vel.limit(this.genes.maxSpeed); //Limit velocity by max Speed
        this.pos.add(this.vel); //Add velocity to position
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y); //Translate to center
        rotate(this.vel.heading() + HALF_PI); //Rotate towards direction
        fill(50); //Greyish color
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
        if (random(1) < mutationRate) { //Each acceleration gene can be mutated to be completely random
            genes.accs.push((p5.Vector.random2D().mult(genes.accRate)));
        } else {
            genes.accs.push(pickRand(a.genes.accs[i], b.genes.accs[i])); //Or inherit it from a parent
        }
    }

    return genes;
}