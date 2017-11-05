function Sqaure() {
	this.x = width / 2 - 12.5 //random(25, width - 25)
	this.y = height / 2 - 12.5 //12.5 + 5
	this.col = color(255, 0, 0)
	this.size = 25;
	this.speed = 2;
	this.moveX = (random(-1.5, 1.5));
	this.moveY = (random(-1.6, 1.6));
	this.rotation = 0;
	this.hit = false;

	this.display = function() {
		noStroke()
		fill(this.col)
		rectMode(CORNER)
		this.rotation++
			//		rotate(this.rotation)
			rect(this.x, this.y, this.size, this.size)
	}

	this.die = function() {
		for (var i = this.size; i <= 0; i--) {
			this.size = i
			setTimeout(delay, 15)
		}
	}

	this.move = function() {
		if (this.x <= 0) { //Left wall
			//		this.size += 0.25
			this.moveX *= -1
			this.moveY *= 1
			if (this.speed <= 10) {
				this.speed += .25
			}
		}

		if (this.x >= width - this.size) { //Right wall
			//		this.size += 0.25
			this.moveX *= -1
			this.moveY *= 1
			if (this.speed <= 10) {
				this.speed += .25
			}
		}

		if (this.y <= 0) { //Top
			//		this.size += 0.25
			this.moveX *= 1
			this.moveY *= -1
			if (this.speed <= 10) {
				this.speed += .25
			}
		}

		if (this.y > height - this.size) { //Bottom
			//		this.size += 0.25
			this.moveX *= 1
			this.moveY *= -1
			if (this.speed <= 10) {
				this.speed += .25
			}
		}

		this.x += this.moveX * this.speed
		this.y += this.moveY * this.speed

		this.hit = collideRectCircle(this.x, this.y, this.size, this.size, player.x, player.y, player.size);
		/*		if (this.hit) {
					//	print("Collision!      " + this.x)

				}*/
	}
}