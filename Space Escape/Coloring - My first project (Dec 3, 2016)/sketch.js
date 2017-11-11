var fillValr = 126;
var fillValg = 50;
var fillValb = 255; //My first programming proj. Dec 3, 2016
var colors = 1

function setup() {
	createCanvas(1500, 750);
}

function draw() {
	if (mouseIsPressed) {
		//Does nothing
	} else {
		fill(fillValr, fillValg, fillValb, 10);
		if (colors == 1) { //Pink
			noStroke()
			ellipse(mouseX, mouseY, 150, 150);
		} else {
			noStroke()
			ellipse(mouseX, mouseY, 50, 50);
		}
	}

}

function keyPressed() {
	if (keyCode == 32) {
		if (colors == 1) { //Pink
			fillValr = 255;
			fillValg = 32;
			fillValb = 180;
			colors = 2

		} else if (colors == 2) { //Purple
			fillValr = 255;
			fillValg = 255;
			fillValb = 0;
			colors = 3

		} else if (colors == 3) {
			fillValr = 0;
			fillValg = 255;
			fillValb = 0;
			colors = 4
		}

	} else if (colors == 4) {
		fillValr = 255;
		fillValg = 255;
		fillValb = 0;
		colors = 1
	}
	if (keyCode == 67) { //C = clear the board
		background(255)
	}
}
