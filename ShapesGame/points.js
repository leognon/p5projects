function Point() {
	this.x = random(width) //random(25, width - 25)
	this.y = random(height) //12.5 + 5
	this.size = 8
	this.hit = false

	this.display = function() {
		noStroke()
		fill(random(255), random(255), random(255))
		ellipse(this.x, this.y, this.size, this.size)
		
		this.hit = collideCircleCircle(this.x,this.y,this.size,player.x,player.y,player.size) //Collision
	}
}