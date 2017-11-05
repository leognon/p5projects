function Square() {
	this.pos = createVector(spawner.pos.x, spawner.pos.y);
	this.vel = p5.Vector.random2D();
	this.speed = 5;
	this.r = random(7,12);

	this.show = function() {
		push();
		fill(255, 0, 0);
		noStroke();
		translate(this.pos.x, this.pos.y);
	//	rotate(this.vel.heading());
		rect(-this.r, -this.r, this.r * 2, this.r * 2);
		pop();
	}

	this.move = function() {
		if (this.pos.x > 0 && this.pos.x < width && this.pos.y > 0 && this.pos.y < height) {
			this.vel.setMag(this.speed);
			this.pos.add(this.vel);
		} else {
			if (this.pos.x >= 0 || this.pos.x <= width) {
				this.vel.x *= -1.05;
				this.vel.setMag(this.speed);
				this.pos.add(this.vel);
			}
			if (this.pos.y <= 0 || this.pos.y >= height) {
				this.vel.y *= -1.05;
				this.vel.setMag(this.speed);
				this.pos.add(this.vel);
			}
		}
	}
}

function newSquare() {
	if (mode == "play" && frame % 90 === 0) {
		squares.push(new Square());
	}
}