function Powerup() {
	//1 - Extra life, 2 - Autofire, 3 - Clear screen
	this.r = random(15, 17);
	this.type = floor(random(1, 4));
	this.pos = createVector(random(this.r, nW - this.r), random(this.r, nH - this.r));
	this.dead = false;

	this.show = function() {
		fill(0, 255, 255);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
		if (images) {
			var newR = this.r * 0.75;
			var imgName = null;
			if (this.type == 1) imgName = data.powerup1;
			else if (this.type == 2) imgName = data.powerup2;
			else if (this.type == 3) imgName = data.powerup3;
			image(imgName, this.pos.x - newR, this.pos.y - newR, newR * 2, newR * 2);
		}
		this.r -= 0.025;
		if (this.r < 1) this.dead = true;
	}
}
