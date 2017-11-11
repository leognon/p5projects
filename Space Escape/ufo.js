function Ufo() {
	this.r = 15;
	this.pos = createVector(random(border + this.r, nW - this.r), random(this.r, nH - this.r));
	this.vel = createVector();
	this.acc = createVector();
	this.dead = false;
	//this.rot = PI;
	this.lastShot = frameCount + 5;

	this.shoot = function() {
		if (frameCount > this.lastShot + 75) {
			bullets.push(new Bullet(this.pos, player.pos, 5, 1, 5));
			data.fireSound.play();
			data.fireSound.setVolume(fireVol);
			this.lastShot = frameCount;
		};
	}

	this.show = function() {
		fill(255, 0, 0);
		noStroke();
		if (images) {
			image(data.ufo, this.pos.x - this.r, this.pos.y - this.r, this.r * 2, this.r * 2);
		} else {
			ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
		}
	}
}
