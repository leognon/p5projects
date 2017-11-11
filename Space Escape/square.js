function Square() {
	this.w = floor(random(15, 25));
	this.speed = map(this.w, 15, 25, 5, 3);
	this.maxAcc = map(this.w, 15, 25, 0.3, 0.2);
	this.dead = false;
	this.rot = random(0, PI);

	var rand = random(1);
	if (rand < 0.25) {
		this.pos = createVector(random(this.w, nW - this.w), -this.w / 1.5); //Spawn at top
	} else if (rand < 0.5) {
		this.pos = createVector(random(this.w, nW - this.w), nH + (this.w / 1.5)); //Spawn at bottom
	} else if (rand < 0.75) {
		this.pos = createVector(-this.w / 1.5, random(this.w, nH - this.w)); //Spawn at left
	} else {
		this.pos = createVector(nW + (this.w / 1.5), random(this.w, nH - this.w)); //Spawn at right
	}
	this.vel = createVector().constructor.sub(player.pos, this.pos);
	this.vel.setMag(this.speed);

	this.show = function() {
		push();
		fill(255, 0, 0);
		noStroke();
		translate(this.pos.x, this.pos.y);
		if (images) {
			rotate(this.rot);
			image(data.square, -this.w / 2, -this.w / 2, this.w, this.w);
			this.rot += random(0.05, 0.01);
		} else {
			rotate(this.vel.heading());
			rect(-this.w / 2, -this.w / 2, this.w, this.w);
		}
		pop();
	}

	this.move = function() {
		// this.acc = createVector().constructor.sub(player.pos,this.pos);
		// this.acc.limit(0.3);
		// this.vel.add(this.acc);
		// this.vel.setMag(this.speed);
		this.pos.add(this.vel);
		if (this.pos.x < -this.w / 2 || this.pos.x > nW + this.w / 2 || this.pos.y < -this.w / 2 || this.pos.y > nH + (this.w / 2)) this.dead = true;
	}
}
