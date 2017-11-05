var player = {
	x: 25,
	y: 50,
	w: 20,
	speed: 10
};
var boxes = [];
var dead = true;
var speed = 2;
var score = 0;
var lastSpawn = 0;
var nW = 1366;
var nH = 768;
var scl = 1;
var highscore = 0;

function setup() {
	//Calc correct dimensions here and scaling and when resized
	createCanvas(nW, nH);
	calcScl();
	noStroke();
	reset();
}

function draw() {
	push();
	scale(scl);
	background(0);
	textAlign(CENTER, CENTER);
	textSize(40);
	fill(255);
	if (dead == false) {
		text(floor(score), nW / 2, 22);
		if (mouseY / scl >= player.y + player.speed) player.y += player.speed;
		if (mouseY / scl <= player.y - player.speed) player.y -= player.speed;
		if (abs((mouseY / scl) - player.y) < player.speed) player.y = mouseY / scl;
		player.y = constrain(player.y, player.w / 2, nH - (player.w / 2));
		fill(0, 0, 255);
		rect(player.x - (player.w / 2), player.y - (player.w / 2), player.w, player.w);
		spawn();
		for (var i = boxes.length - 1; i >= 0; i--) {
			boxes[i].move();
			boxes[i].show();
			boxes[i].hit(); //Remove is called in hit, so it doesnt get removed twice
			//boxes[i].remove();
		}
		speed += .025;
		speed = constrain(speed, 2, 15);
		score += speed / 10;
	} else if (dead == true) {
		var txt = "Click to start\nAvoid rectangles\nMove with mouse";
		if (highscore > 0) txt += "\nHighscore: " + floor(highscore);
		text(txt, nW / 2, nH / 2);
	}
	pop();
}


function Box() {
	this.h = random(125, 250);
	this.w = random(7, 12);
	this.x = nW - this.w / 2;
	this.y = random(this.h / 2, nH - this.h / 2);

	this.move = function() {
		this.x -= speed;
	}

	this.hit = function() {
		if (collideRectRect(player.x - player.w / 2, player.y - player.w / 2, player.w, player.w, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h) /*abs(this.x - player.x) < (this.w / 2) + (player.w / 2) && abs(this.y - player.y) < (this.h / 2) + (player.h / 2)*/ ) {
			dead = true;
			reset(); //TO-DO Fix player collision, maybe its because the rectangles are going to fast and skipping the player
		} else {
			this.remove();
		}
	}

	this.show = function() {
		fill(255, 0, 0);
		rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
	}

	this.remove = function() {
		if (this.x < -this.w / 2) {
			boxes.splice(boxes.indexOf(this), 1);
		}
	}
}

function spawn() {
	if (score - lastSpawn > 15) {
		boxes.push(new Box());
		lastSpawn = score;
	}
}

function reset() {
	player.x = 25;
	player.y = nH / 2;
	boxes = [];
	speed = 2;
	if (score > highscore) highscore = score;
	score = 0;
	lastSpawn = 0;
}

function mouseClicked() {
	if (dead) {
		reset();
		dead = false;
	} else {
		return false;
	}
}

p5.prototype.collideRectRect = function(x, y, w, h, x2, y2, w2, h2) {
	//2d
	//add in a thing to detect rectMode CENTER
	if (x + w >= x2 && // r1 right edge past r2 left
		x <= x2 + w2 && // r1 left edge past r2 right
		y + h >= y2 && // r1 top edge past r2 bottom
		y <= y2 + h2) { // r1 bottom edge past r2 top
		return true;
	}
	return false;
};

function calcScl() {
	var newWidth = windowWidth;
	var newHeight = windowHeight;
	if (windowWidth * .56 < windowHeight) {
		var newWidth = windowWidth;
		var newHeight = newWidth * .56;
	} else {
		newHeight = windowHeight; //1366, 768
		newWidth = newHeight / .56;
	}
	resizeCanvas(newWidth, newHeight);
	scl = width / nW;
}

function windowResized() {
	calcScl();
}
