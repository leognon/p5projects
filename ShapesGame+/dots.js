function Dot(){
	this.pos = createVector(random(width),random(height));
	this.col = color(random(255),random(255),random(255));
	this.r = random(3,5);
	
	this.show = function(){
		fill(this.col);
		noStroke();
		ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
	}
}

function newDot() {
	if (mode == "play" && frame % 30 === 0) {
		dots.push(new Dot());
	}
}