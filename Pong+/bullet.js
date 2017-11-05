function Bullet(x, y, aim) {
	this.pos = createVector(x, y);
	this.health = 350;
	this.r = 7.5;
	this.speed = 7;
	this.vel = createVector(player.pos.x, player.pos.y);
	this.vel.sub(this.pos);
	this.vel.setMag(this.speed);
}

Bullet.prototype.move = function() {
	this.pos.add(this.vel);
	if (this.pos.x < 0 || this.pos.x > 500) {
		this.vel.x *= -1.05;
		sounds.boing.play();
	}
	if (this.pos.y < 0 || this.pos.y > 500) {
		this.vel.y *= -1.05;
		sounds.boing.play();
	} //else if (this.pos.y > 500) {
	//removeBullet(this);
	//		shooter.score++;
	//}
	if (this.health <= 0) {
		removeBullet(this);
	}
	this.health--;
}

Bullet.prototype.show = function() {
	fill(255);
	noStroke();
	ellipse(this.pos.x * scl, this.pos.y * scl, this.r * 2 * scl, this.r * 2 * scl);
}

function removeBullet(b) {
	bullets.splice(bullets.indexOf(b), 1);
	shooter.ammo++;
}
