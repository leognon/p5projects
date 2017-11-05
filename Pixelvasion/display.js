function uiScreen() {
	textSize(15);
	textAlign(LEFT);
	fill(255);
	text("Pixels: " + (floor((pClaimed.length / (pbck.width * pbck.height) * 1000))) / 10 + "%", 15, 25);
	text("Time: " + s2m(time), 15, 50);
	text("Kills: " + score, 15, 75);
}

function backButton() {
	noStroke();
	fill(255);
	textSize(20);
	rect((width / 2) - (textWidth("BACK") / 2) - 5, height - 100, textWidth("BACK") + 10, 40, 20);
	fill(0);
	text("BACK", width / 2, height - 75);
}

function startScreen() {
	textSize(50);
	textAlign(CENTER);
	text("Pixelvasion", width / 2, 100);
	var pw = textWidth("Pixelvasion");
	textSize(15);
	textAlign(LEFT);
	text("By: Leo Gagnon", width / 2 + pw / 2 + 5, 100);
	textSize(30);
	image(buttonImg, (width / 2) - (textWidth("PLAY") / 2) - 12, 128, textWidth("PLAY") + 24, 47); //width / 2 - (buttonImg.width / 2), 187
	fill(0);
	textAlign(CENTER);
	text("PLAY", width / 2, 170);
	fill(255);
	textSize(20);
	textLeading(35);
	if (time === 0) {
		var txt = "It is up to you to stop the invading pixel army!\nDestroy the pixel monsters before they pixelate the world!\n\nWASD - Move\nSPACE - Shoot"
	} else {
		var txt = "Time alive: " + s2m(time) + "\nKills: " + score + "\nLongest time: " + s2m(highscore.time) + "\nHighscore: " + highscore.score + " kills";
	}
	text(txt, width / 2, 250);
}

function loadingScreen() {
	text("LOADING...", width / 2, height / 2);
	var tw = textWidth("LOADING...");
	noFill();
	strokeWeight(3);
	stroke(255)
	rect(width / 2 - tw / 2 - 15, height / 2 + 10, tw + 30, 15);
	fill(255);
	noStroke();
	rect(width / 2 - tw / 2 - 15, height / 2 + 10, (loaded / totalLoad) * (tw + 30), 15);
}

function s2m(s) {
	var m = floor(s / 60);
	var s = floor((s % 60) * 10) / 10;
	if (m > 0) {
		return m + "m " + s + "s";
	} else {
		return s + "s";
	}
}

function mouseClicked() {
	if (mode === 0) {
		textSize(30);
		if (mouseX > (width / 2) - (textWidth("PLAY") / 2) - 12 && mouseX < (width / 2) + (textWidth("PLAY") / 2) + 12) {
			if (mouseY > 128 && mouseY < 175) {
				mode = 1;
				reset();
				for (var i = 0; i < 5; i++) {
					pixels.push(new Pixel(false));
				}
			}
		}
	}
}
