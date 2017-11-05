function Turret(x, y) {
	this.pos = createVector(x, y);
	this.r = 45;

	this.show = function() {
		push();
		noStroke();
		fill(112);
		rect(this.pos.x - this.r, this.pos.y - this.r, this.r * 2.1, this.r * 2.1);
		fill(0);
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
		fill(255);
		ellipse(this.pos.x, this.pos.y, 20, 20);
		stroke(255);
		rectMode(CORNER);
		translate(this.pos.x, this.pos.y);
		rotate(Math.atan2(this.pos.y - player.pos.y, this.pos.x - player.pos.x));
		rect(0, -7.5, -this.r * 2, 15);
		pop();
	}

	this.shoot = function() {
			bullets.push(new Bullet(this.pos.x, this.pos.y, player.pos.x, player.pos.y, 10, 15));

		/*for (var i = bullets.length - 1; i >= 0; i--) {
			if (bullets[i].pos.x > this.pos.x - (this.r * 1.05) && bullets[i].pos.x < this.pos.x + (this.r * 1.05) && bullets[i].pos.y > this.pos.y - (this.r * 1.05) && bullets[i].pos.y < this.pos.y + (this.r * 1.05)) {
				console.log("hit!");
			}
		}*/
	}
}

function turretsShoot1() {
	turrets[0].shoot();
	setTimeout(turretsShoot2, 250);
}

function turretsShoot2() {
	turrets[1].shoot();
	setTimeout(turretsShoot3, 250);
}

function turretsShoot3() {
	turrets[2].shoot();
	setTimeout(turretsShoot4, 250);
}

function turretsShoot4() {
	turrets[3].shoot();
	setTimeout(turretsShoot1, 2500);
}