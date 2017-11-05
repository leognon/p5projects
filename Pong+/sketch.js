var shooter, player;
var bullets = [];
var scl = 1;
var mode = 0;
var sounds = {
	music: 0,
	boing: 0,
	hit: 0,
	win: 0
};
var speakerImg;
var loaded = 0;
var totalLoad = 5;

function setup() {
	sounds.music = loadSound("assests/BckrndMusic.mp3", function() {
		sounds.music.play();
		sounds.music.setVolume(.5);
		sounds.music.loop();
		loaded++;
	});
	sounds.boing = loadSound("assests/BounceSound.mp3", function() {
		loaded++;
	});
	sounds.hit = loadSound("assests/HitSound.mp3", function() {
		loaded++;
	});
	sounds.win = loadSound("assests/WinnerSound.mp3", function() {
		loaded++;
	});
	speakerImg = loadImage("assests/Speaker_Icon.png", function() {
		loaded++;
	});
	var cnv;
	if (windowWidth > windowHeight) {
		cnv = createCanvas(windowHeight, windowHeight);
		scl = windowHeight / 500;
	} else if (windowHeight > windowWidth) {
		cnv = createCanvas(windowWidth, windowWidth);
		scl = windowWidth / 500;
	} else {
		cnv = createCanvas(windowWidth, windowHeight);
		scl = windowWidth / 500;
	}
	cnv.parent("cnvContainer");
}


function draw() {
	noStroke();
	background(51);
	fill(255);
	textFont("Gergia");
	textAlign(CENTER);
	if (loaded >= totalLoad) {
		if (mode === 0) {
			startScreen();
		} else if (mode == 0.1) {
			helpScreen();
			//} else if (mode == 0.2) {
			//selectScreen();
		} else if (mode == 1) {
			play();
		} else if (mode == "RED" || mode == "BLUE") {
			winner(mode, shooter.score, player.score);
		}
	} else {
		textSize(50 * scl);
		text("LOADING...", width / 2, height / 2);
		var tw = textWidth("LOADING...");
		noFill();
		strokeWeight(3);
		stroke(255)
		rect(width / 2 - tw / 2 - 15, height / 2 + 10, tw + 30, 15 * scl);
		fill(255);
		noStroke();
		rect(width / 2 - tw / 2 - 15, height / 2 + 10, (loaded / 4) * (tw + 30), 15 * scl);
	}
}

function mouseClicked() {
	if (mode === 0) {
		textSize(35 * scl);
		if (mouseX > (width / 2) - (textWidth("How to play") / 2) - 7 && mouseX < (width / 2) + (textWidth("How to play") / 2) + 7) {
			if (mouseY > 142 * scl && mouseY < 184 * scl) {
				mode = 0.1;
			}
		}
		if (mouseX > (width / 2) - (textWidth("PLAY") / 2) - 9 && mouseX < (width / 2) + (textWidth("PLAY") / 2) + 5) {
			if (mouseY > 187 * scl && mouseY < 225 * scl) {
				mode = 1; //Change to 0.2, where you select amount of player's, and maybe some settings
				bullets = [];
				player = new Player(1, 250, 500 - 15, 7, 75); //MAKE BLUE HAVE TO AVOID BALLS, AND RED AUTO-AIMS AT BLUE
				shooter = new Player(0, 250, 15, 5, 75);
			}
		}
	} else if (mode == 0.1 /* || mode == 0.2*/ || mode == "RED" || mode == "BLUE") {
		textSize(20 * scl);
		if (mouseX > (width / 2) - (textWidth("BACK") / 2) - 5 && mouseX < (width / 2) + (textWidth("BACK") / 2) + 5) {
			if (mouseY > height - 100 * scl && mouseY < height - 60 * scl) {
				mode = 0;
			}
		}
	}
}

function play() {
	shooter.show();
	shooter.move();
	shooter.hit();
	player.show();
	player.move();
	player.hit();
	bullets.forEach(function(i) {
		i.show();
		i.move();
	});
	fill(255);
	textSize(25 * scl);
	text(shooter.score, 10 * scl, 25 * scl);
	text(player.score, 10 * scl, height - (10 * scl));
	if (shooter.score >= 5) {
		mode = "RED";
	}
	if (player.score >= 5) {
		mode = "BLUE";
	}
}

function windowResized() {
	if (windowWidth > windowHeight) {
		resizeCanvas(windowHeight, windowHeight);
		scl = windowHeight / 500;
	} else if (windowHeight > windowWidth) {
		resizeCanvas(windowWidth, windowWidth);
		scl = windowWidth / 500;
	} else {
		resizeCanvas(windowWidth, windowHeight);
		scl = windowWidth / 500;
	}
}
