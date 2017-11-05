function Player(type, x, y, s, w) {
	this.type = type;
	this.pos = createVector(x, y);
	this.ammo = 4;
	this.w = w;
	this.h = 10;
	this.score = 0;
	this.speed = s;
	this.aim = PI / 2;
}

function keyPressed() {
	if (mode == 1) {
		if (key == ' ' && shooter.ammo > 0) {
			bullets.push(new Bullet(shooter.pos.x, shooter.pos.y + (shooter.h / 2), shooter.aim));
			shooter.ammo--;
		}
	}
}

Player.prototype.hit = function() {
	var obj = this;
	bullets.forEach(function(i) {
		if (i.pos.x + i.r > obj.pos.x - (obj.w / 2) && i.pos.x - i.r < obj.pos.x + (obj.w / 2)) {
			if (i.pos.y - i.r < obj.pos.y + (obj.h / 2) && i.pos.y + i.r > obj.pos.y - (obj.h / 2)) {
				if (i.health <= 345) {
					if (obj.type === 0) {
						removeBullet(i);
						player.score++;
					}
					if (obj.type == 1) {
						removeBullet(i);
						shooter.score++;
					}
					sounds.hit.play();
					if (shooter.score >= 5 || player.score >= 5) {
						sounds.win.play();
					}
				}
			}
		}
	});
}

Player.prototype.move = function() {
	if (mode == 1) {
		if (this.type === 0) {
			if (keyIsDown(65) && this.pos.x > this.w / 2) {
				this.pos.x -= this.speed;
			}
			if (keyIsDown(68) && this.pos.x < 500 - this.w / 2) {
				this.pos.x += this.speed;
			}
			//var v1 = createVector(width / 2, 15);
			//var v2 = createVector(width / 2, height - 15);
			//console.log(angleBetween(v1, v2));
			// if (keyIsDown(87) && this.aim > (PI / 1.2) - 2) {
			// 	this.aim -= 0.05;
			// }
			// if (keyIsDown(83) && this.aim < PI / 1.2) {
			// 	this.aim += 0.05;
			// }
		} else if (this.type === 1) {
			if (keyIsDown(LEFT_ARROW) && this.pos.x > this.w / 2) {
				this.pos.x -= this.speed;
			}
			if (keyIsDown(RIGHT_ARROW) && this.pos.x < 500 - this.w / 2) {
				this.pos.x += this.speed;
			}
		}
	}
}

Player.prototype.show = function() {
	noStroke();
	if (this.type === 0) {
		fill(255, 0, 0);
	} else {
		fill(0, 0, 255);
	}
	rect((this.pos.x - (this.w / 2)) * scl, (this.pos.y - (this.h / 2)) * scl, this.w * scl, this.h * scl);
	if (this.type === 0) {
		push();
		translate(this.pos.x * scl, (this.pos.y + this.h / 2) * scl);
		ellipse(0, 0, 15 * scl);
		this.aim = p5.Vector.angleBetween(this.pos, player.pos);
		//rotate(this.aim);
		rotate(Math.atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x));
		rect(0, -2.5 * scl, 20 * scl, 5 * scl);
		pop();
	}
}
