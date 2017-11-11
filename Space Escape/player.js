function Player() {
	this.pos = createVector(nW / 2, nH / 2);
	this.vel = createVector();
	this.lastVel = createVector();
	// this.speed = 4;
	this.maxspeed = 4;
	this.lives = 3;
	this.r = 15;
	this.growRate = 0.003;
	this.powerup = 0;
	this.powerTime = 0;

	this.show = function() {
		noStroke();
		fill(0, 0, 255);
		if (images) {
			image(data.player, this.pos.x - this.r, this.pos.y - this.r, this.r * 2, this.r * 2);
		} else {
			ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
		}
		fill(255);
	}

	this.move = function() {
		if (this.powerTime <= 0) this.powerup = 0;
		if (this.powerTime > 0 && this.powerup == 2) {
			if (frameCount % 3 === 0) {
				playerShoot();
			}
			this.powerTime--;
		}
		//W-87, A-65, S-83, D-68
		this.vel = createVector();
		if (keyIsDown(87) || keyIsDown(UP_ARROW)) this.vel.y--;
		if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) this.vel.y++;
		if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) this.vel.x--;
		if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.vel.x++;
		this.vel.setMag(this.maxspeed);
		// this.vel = createVector(mouseX, mouseY).div(scl);
		// var dst = this.vel.dist(this.pos);
		// var speed;
		// var range = 4;
		// if (dst > this.r * range) {
		// 	speed = this.maxspeed;
		// } else {
		// 	speed = map(dst, 0, this.r * range, .2, this.maxspeed);
		// }
		// if (dst > this.r * 0.8) {
		// 	this.vel.sub(this.pos);
		// 	this.vel.setMag(speed);
		// 	var newpos = this.pos.copy();
		// 	newpos.add(this.vel);

		this.pos.add(this.vel);

		this.r += this.growRate;
		if (this.r < 8) player.lives = 0;
		this.pos.x = constrain(this.pos.x, this.r, border - this.r);
		this.pos.y = constrain(this.pos.y, this.r, nH - this.r);
	}

	this.hit = function() {
		for (var i = squares.length - 1; i >= 0; i--) {
			if (hitboxes) {
				noFill();
				stroke(0);
				ellipse(s.pos.x, s.pos.y, s.w, s.w);
			}
			if (collide(this.pos, this.r, squares[i].pos, squares[i].w / 2)) {
				squares[i].dead = true;
				this.hurt();
			}
		}
	}
	this.hurt = function() {
		this.lives--;
		this.r -= 5;
		if (this.r < 3) player.lives = 0;
	}
}

function collide(pos1, r1, pos2, r2) {
	return (pos1.dist(pos2) <= r1 + r2);
}
