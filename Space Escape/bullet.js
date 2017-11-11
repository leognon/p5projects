function Bullet(startPos, targetPos, r, parent, speed) {
	this.pos = startPos.copy();
	this.speed = speed;
	this.r = r;
	this.parent = parent;
	this.vel = createVector().constructor.sub(targetPos, this.pos).setMag(this.speed);
	this.dead = false;

	this.show = function() {
		if (this.parent === 0) {
			fill(0, 0, 255);
		} else {
			fill(125);
		}
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
	}

	this.hit = function() {
		if (this.parent == 1 && collide(this.pos, this.r, player.pos, player.r)) {
			player.hurt();
			this.dead = true;
		}
		for (var i = 0; i < squares.length; i++) {
			if (collide(this.pos, this.r, squares[i].pos, squares[i].w / 2)) {
				this.dead = true;
				player.r += 1;
				score += 10;
				squares[i].dead = true; //Any bullet can hit squares
			}
		}

		if (this.parent === 0) {
			for (var i = 0; i < powerups.length; i++) {
				if (collide(this.pos, this.r, powerups[i].pos, powerups[i].r)) {
					this.dead = true;
					player.r += 1;
					score += 5;
					powerups[i].dead = true;
					if (powerups[i].type == 1) {
						player.lives++; //Extra life
					} else if (powerups[i].type == 2) {
						player.powerup = 2; //powerups[i].type;
						player.powerTime = floor(constrain(map(powerups[i].r, 0, 17, 100, 250), 25, 100));
					} else if (powerups[i].type == 3) {
						clearScreen = true;
					}
				}
			}

			for (var i = 0; i < ufos.length; i++) {
				if (collide(this.pos, this.r, ufos[i].pos, ufos[i].r)) {
					this.dead = true;
					player.r += 1;
					score += 10;
					ufos[i].dead = true;
				}
			}
		}
	}

	this.move = function() {
		this.pos.add(this.vel);
		if (this.pos.x < -this.r || this.pos.x > nW + this.r || this.pos.y < -this.r || this.pos.y > nH + this.r) this.dead = true;
	}
}
