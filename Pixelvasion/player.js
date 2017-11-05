function Player() {
	this.pos = createVector(width / 2, height / 2);
	this.vel = createVector(0, 0);
	this.rot = 0 // = -PI / 2;
	this.rotS = 0.04;
	this.speed = 3;
	this.w = 117; //156 //MAYBE INCREASE THE SIZE OF TANK AGAIN
	this.h = 52.5; //70
}
//THE tank img w = 345 and it's h = 163
Player.prototype.move = function() {
	if (keyIsDown(87)) {
		var x = this.speed * cos(this.rot);
		var y = this.speed * sin(this.rot);
		this.vel.add(x, y);
		this.vel.setMag(this.speed);
	}
	if (keyIsDown(83)) {
		var x = -this.speed * cos(this.rot);
		var y = -this.speed * sin(this.rot);
		this.vel.add(x, y);
		this.vel.setMag(this.speed);
	}
	if (keyIsDown(65)) this.rot -= this.rotS;
	if (keyIsDown(68)) this.rot += this.rotS;

	if (this.vel.x + this.pos.x < (this.w / 2) - (this.w * .24) || this.vel.x + this.pos.x > (width - (this.w / 2)) + (this.w * .24)) this.vel.x = 0;
	if (this.vel.y + this.pos.y < (this.h / 2) || this.vel.y + this.pos.y > height - (this.h / 2)) this.vel.y = 0;

	this.pos.add(this.vel);
	this.vel.mult(0);
}

function keyPressed() {
	if (mode == 1 && key == ' ' && bullets.length <= 5) {
		var x = this.speed * cos(this.rot);
		var y = this.speed * sin(this.rot);
		bullets.push(new Bullet(player.pos.x, player.pos.y, player.rot));
	}
}

Player.prototype.show = function() {
	push();
	translate(this.pos.x, this.pos.y);
	rotate(this.rot);
	image(playerImg, -(this.w * 0.5), -(this.h * .5), this.w, this.h);
	pop();
	this.rot += random(-0.005, 0.005);
}

function Bullet(x, y, rot) {
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.speed = 7;
	this.r = 7;
	this.vel.x = this.speed * cos(rot);
	this.vel.y = this.speed * sin(rot);
	this.vel.setMag(34); //34 == this.w * .24
	this.pos.add(this.vel);
	this.vel.setMag(this.speed);
}

Bullet.prototype.show = function() {
	fill(255, 0, 0);
	ellipse(this.pos.x, this.pos.y, this.r, this.r);
}

Bullet.prototype.move = function() {
	this.pos.add(this.vel);
	if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
		bullets.splice(this, 1);
	}
	var t = this;
	pixels.forEach(function(p) {
		if (collideRectCircle(p.pos.x, p.pos.y, p.w, p.h, t.pos.x, t.pos.y, t.r * 2)) {
			pixels.splice(pixels.indexOf(p), 1);
			score++
		}
	});
}

p5.prototype.collideRectCircle = function(rx, ry, rw, rh, cx, cy, diameter) {
	//2d
	// temporary variables to set edges for testing
	var testX = cx;
	var testY = cy;

	// which edge is closest?
	if (cx < rx) {
		testX = rx // left edge
	} else if (cx > rx + rw) {
		testX = rx + rw
	} // right edge

	if (cy < ry) {
		testY = ry // top edge
	} else if (cy > ry + rh) {
		testY = ry + rh
	} // bottom edge

	// // get distance from closest edges
	var distance = this.dist(cx, cy, testX, testY)

	// if the distance is less than the radius, collision!
	if (distance <= diameter / 2) {
		return true;
	}
	return false;
};
