function Player() {
	this.pos = createVector(width / 2, height / 2);
	this.vel = createVector(0, 0);
	this.speed = 2;
	this.r = 12.5;
	this.health = 100;

	this.show = function() {
		push();
		noStroke();
		fill(255);
		translate(this.pos.x, this.pos.y);
		rotate(Math.atan2(this.pos.y - mouseY, this.pos.x - mouseX));
		rect(0, -2.5, -this.r * 2, 5);
		fill(0);
		ellipse(0, 0, this.r * 2, this.r * 2);
		pop();
		push();

		translate(this.pos.x, this.pos.y);
		rectMode(CORNER);
		fill(255, 0, 0);
		rect(-this.r * 1.75, -this.r - 20, this.r * 3.5, this.r - 5);

		noStroke();
		strokeWeight(2);
		var hurt = map(this.health, 0, 100, 0, this.r * 3.5);
		fill(0, 255, 0);
		rect(-this.r * 1.75, -this.r - 20, hurt, this.r - 5);

		pop();
		//HIT DETECTION!
		for (var i = bullets.length - 1; i >= 0; i--) {
			//		var distance = this.pos.dist(bullets[i].pos)
			// var bpos = bullets[i].pos.copy();
			// push();
			// translate(bullets[i].pos.x, bullets[i].pos.y);
			// bpos.x += bullets[i].len;
			// bpos.rotate(bullets[i].vel.heading());
			// //		console.log(bullets[i].pos);
			// bpos.limit(10 /*bullets[i].len*/ );
			// var hit = collideLineCircle(0, 0, bpos.x, bpos.y, this.x, this.y, this.r * 2);
			// stroke(255);
			// strokeWeight(5);
			// line(0, 0, bpos.x, bpos.y);

			var bpos = bullets[i].pos.copy();
			push();
			bpos.x += bullets[i].len;
			translate(bullets[i].pos.x, bullets[i].pos.y);
			bpos.rotate(bullets[i].rot);
			bpos.limit(bullets[i].len);
			fill(255);
			strokeWeight(3);
			ellipse(bpos.x,bpos.y,3,3);
		//	line(0, 0, bpos.x, bpos.y);
			pop();


			//	console.log(hit);
			if (1==2 /*distance < this.r*/ ) {
				//		bullets.splice(i,1);
				this.health -= 5;
				if (this.health <= 0) {
					console.log("YOU DIED!!!!!");
				}
			}
			pop();
		}
	}

	this.move = function() {
		this.vel = createVector(mouseX, mouseY);
		if (floor(this.pos.x) != floor(this.vel.x) && floor(this.pos.y) != floor(this.vel.y)) {
			this.vel.sub(this.pos);
			this.vel.setMag(this.speed);
			var newpos = this.pos.copy();
			newpos.add(this.vel);
			for (var i = 0; i < turrets.length; i++) {
				//RIGHT AND LEFT WALLS
				if (newpos.y > (turrets[i].pos.y - turrets[i].r) + this.speed && newpos.y < (turrets[i].pos.y + turrets[i].r) - this.speed) {
					if (dist(newpos.x, 10, turrets[i].pos.x, 10) < turrets[i].r) {
						this.vel.x = 0;
					}
				}
				//TOP AND BOTTOM WALLS
				if (newpos.x > (turrets[i].pos.x - turrets[i].r) + this.speed && newpos.x < (turrets[i].pos.x + turrets[i].r) - this.speed) {
					if (dist(newpos.y, 10, turrets[i].pos.y, 10) < turrets[i].r) {
						this.vel.y = 0;
					}
				}
			}
			this.pos.add(this.vel);
		}
	}
}