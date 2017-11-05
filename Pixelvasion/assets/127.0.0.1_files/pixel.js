//CREDIT TO DANIEL SHIFFMAN FOR THE STEERING https://www.youtube.com/watch?v=qzFlnX-z38U
function Pixel(s) {
	this.frame = 0;
	this.totalFrames = 10;
	if (s) {
		var p = random(pClaimed);
		this.pos = createVector((p.i * 20) + random(-5, 5), (p.j * 20) + random(-5, 5));
	} else {
		this.pos = createVector(random(width), random(height));
	}
	this.w = 20; //140 / 2;
	this.h = 20; //90 / 2;
	this.nextPos = this.newPos();
	this.speed = 2.2;
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.maxforce = 0.5;
	// setInterval(function() {
	// 	blobs[0].frame++;
	// 	blobs[0].frame = blobs[0].frame % blobs[0].totalFrames;
	// }, 1000 / 7); //MAKE SURE IT IS CORRECTING SCALED AND PROPORTION! (the width and height)
}

Pixel.prototype.move = function() {
	var desired = p5.Vector.sub(this.nextPos, this.pos);
	desired.setMag(this.speed);

	var steer = p5.Vector.sub(desired, this.velocity);
	steer.limit(this.maxforce);
	this.acc.add(steer);

	this.vel.add(this.acc);
	this.vel.setMag(this.speed);
	this.pos.add(this.vel);
	this.acc.mult(0);

	if (this.pos.x < this.w / 2) this.pos.x = this.w / 2;
	if (this.pos.y < this.h / 2) this.pos.h = this.h / 2;

	if (this.pos.x > width - this.w / 2) this.pos.x = width - this.w / 2;
	if (this.pos.y > height - this.h / 2) this.pos.h = height - this.h / 2;
	pixelate(this.pos.x, this.pos.y);
	if (this.nextPos) {
		if (this.pos.dist(this.nextPos) < this.speed + this.w / 1.5) {
			this.nextPos = this.newPos();
		}
	}
}

Pixel.prototype.newPos = function() {
	if (pClaimed.length < 900) {
		var r = 100;
		var x = random(this.pos.x - r, this.pos.x + r);
		var y = random(this.pos.y - r, this.pos.y + r);

		if (x <= 0) x = random(this.w / 1.5, this.w * 1.2);
		if (y <= 0) y = random(this.h / 1.5, this.h * 1.2); //Fix the bug where the square just keeps circling around the dot, not being able to get close enought to eat it.

		if (x > width) x = random(width - this.w * 1.2, width - (this.w / 1.5));
		if (y > height) y = random(height - this.h * 1.2, height - (this.h / 1.5));
	} else {
		var p = random(rClaimed);
		//console.log(rClaimed);
		//console.log(p);
		var x = p.i * 20;
		var y = p.j * 20;
		x += random(-5, 5);
		y += random(-5, 5);
	}
	return (createVector(x, y));
}

//MAKE A PROTOTYPE FUNCTION TO INCREASE THE FRAME, SO I CAN USE this.
//NEW SPRITE IDEA: MAKE A SQUARE SHAPE WITH EYES AND STUFF, THAT HAS A BUNCH OF PIXEL PARTICLES COMING OFF IT
Pixel.prototype.show = function() {
	fill(255);
	image(pixelImg, this.pos.x - (this.w / 2), this.pos.y - (this.h / 2), this.w, this.h)
	//rect(this.pos.x - (this.w / 2), this.pos.y - (this.h / 2), this.w, this.h);
	//ellipse(this.nextPos.x, this.nextPos.y, this.speed + this.w / 2);
	// push(); //THE BOTTOM CENTER SHOULD BE WHERE THE POS.X AND POS.Y IS!
	// //imageMode(CENTER);
	// image(blobsImg[this.frame], this.pos.x - (this.w / 2), this.pos.y - (this.h / 2), this.w, this.h);
	// fill(255);
	// ellipse(this.pos.x, this.pos.y + (this.h / 2), 5, 5);
	// pop();
}

function pixelate(x, y) {
	var px = floor(x / 20);
	var py = floor(y / 20);
	for (var i = 0; i < pbck.width; i++) {
		for (var j = 0; j < pbck.height; j++) {
			var d = dist(i, j, px, py);
			if (d <= 2 && px >= 0 && px <= width && py >= 0 && py <= height) {
				var loc = {
					i,
					j
				};
				var check = false;

				for (var z = 0; z < pClaimed.length; z++) {
					if (pClaimed[z].i == loc.i && pClaimed[z].j == loc.j) {
						check = true;
						break;
					}
					if (check) break;
				}

				if (check === false) {
					loc.col = pbck.get(loc.i, loc.j);
					loc.col[0] += bright;
					loc.col[1] += bright;
					loc.col[2] += bright;
					pClaimed.push(loc);
					//TRYING TO CREATE A RENDERING SYSTEM WHICH USES AN IMAGE

					// pImg = createImage(64, 26);
					// pImg.loadPixels();
					// for (var w = 0; w < pClaimed.length; w++) {
					// 	pImg.set(pClaimed[w].x, pClaimed[w].y, color(255, 0, 0));
					// }

					//	pClaimed.forEach(function(p) {
					//console.log(p.x, p.y);
					//for (var a = 0; a < 20; a++) {
					//	for (var s = 0; s < 20; s++) {
					//	pImg.set(p.i, p.j, color(p.col[0], p.col[1], p.col[2]));
					// var index = ((p.i * 20) + (p.j * 20) * width) * 4;
					// pImg.pixels[index + 0] = p.col[0];
					// pImg.pixels[index + 1] = p.col[1];
					// pImg.pixels[index + 2] = p.col[2];
					//pImg.pixels[index + 3] = 255;
					//	}
					//}
					//	});
					//	pImg.updatePixels();

					//pImg.resize(width, height);
					//pImg = n;
				}
			}
		}
	}
}
