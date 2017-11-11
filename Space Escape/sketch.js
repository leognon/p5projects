/*TO-DO list
Link to game: http://bit.ly/2seBkqX
https://ibb.co/byK2tF for the outline image
*/
var player;
var squares = [];
var bullets = [];
var ufos = [];
var powerups = [];
var nW = 683;
var nH = 384;
var border = nW - 150;
var scl = 1;
var score = 0;
var hitboxes = false;
var lastSpawn = 15;
var lastSpawnRate = 100;
var mode = 0;
var highscore = 0;
var bckground;
var loaded = false;
var clearScreen = 0;
var images = true;
var loaded = 0;
var totalLoad = 7;
var data = {
	square: null,
	player: null,
	ufo: null,
	fireSound: null,
	song1: null,
	song2: null,
	powerup1: null,
	powerup2: null,
	powerup3: null
};
var fireVol = 0.1;

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
	data.square = loadImage("data/Asteroid.png", addLoad);
	data.player = loadImage("data/player.png", addLoad);
	data.ufo = loadImage("data/UFO.png", addLoad);
	data.powerup1 = loadImage("data/powerup1.png", addLoad);
	data.powerup2 = loadImage("data/powerup2.png", addLoad);
	data.powerup3 = loadImage("data/powerup3.png", addLoad);
	data.fireSound = loadSound("data/fireSound2.mp3", function() {
		addLoad();
		data.fireSound.setVolume(0.5);
	});
	//data.song1 = loadSound("data/song1.mp3", addLoad);
	data.song2 = loadSound("data/song2.mp3", function() {
		data.song2.loop();
		data.song2.setVolume(3.0);
	});
	//bckground = loadImage("http://images2.fanpop.com/images/photos/7000000/Space-Art-Wallpaper-space-7076476-500-313.jpg", function(){loaded = true;});
	calcScl();
}

function draw() {
	if (loaded >= totalLoad) {
		push();
		scale(scl);
		background(0);
		noStroke();
		textSize(20);
		if (mode === 0) {
			fill(255);
			textAlign(CENTER, CENTER);
			var txt = "Space Escape\nMade by: Leo, Dominic, and Noah\nClick to start\nWASD/Arrow keys to move, space or click to shoot\nBetter to play with mouse";
			if (highscore > 0) txt += "\nHighscore: " + floor(highscore);
			if (score > 0) txt += "\nScore: " + floor(score);
			text(txt, nW / 2, (nH / 2) - 100);
		} else if (mode == 1) {
			score += .03;
			stroke(255);
			line(border, 0, border, nH);

			player.move(); //player.show is at end, so it is on top of bullets
			player.hit();

			for (var i = squares.length - 1; i >= 0; i--) {
				squares[i].move();
				squares[i].show();
				if (squares[i].dead) squares.splice(i, 1);
			}
			for (var i = ufos.length - 1; i >= 0; i--) {
				ufos[i].shoot();
				if (ufos[i].dead) ufos.splice(i, 1);
			}

			for (var i = powerups.length - 1; i >= 0; i--) {
				powerups[i].show();
				if (powerups[i].dead) powerups.splice(i, 1);
			}

			for (var i = bullets.length - 1; i >= 0; i--) {
				bullets[i].move();
				bullets[i].hit();
				bullets[i].show();
				if (bullets[i].dead) bullets.splice(i, 1);
			}

			for (var i = ufos.length - 1; i >= 0; i--) {
				ufos[i].show();
			}

			player.show();

			fill(255);
			textAlign(LEFT);
			text("Lives: " + player.lives + "\nYears: " + floor(score), 10, 25);
			pop();
			if (lastSpawnRate > 20) lastSpawnRate -= 0.04;
			spawn();

			if (clearScreen) {
				for (var i = squares.length - 1; i >= 0; i--) {
					squares[i].dead = true;
				}
				for (var i = ufos.length - 1; i >= 0; i--) {
					ufos[i].dead = true;
				}
				for (var i = bullets.length - 1; i >= 0; i--) {
					if (bullets[i].parent == 1) bullets[i].dead = true;
				}
				clearScreen = false;
			}

			if (player.lives === 0) {
				if (score > highscore) highscore = score;
				mode = 0;
			}
		}
	} else {
		text("Loading", width / 2, height / 2);
	}
}

function spawn() {
	if (random(1) < 0.001) powerups.push(new Powerup());
	if (frameCount > lastSpawn + lastSpawnRate) {
		if (random(1) < .2) {
			ufos.push(new Ufo());
		} else {
			squares.push(new Square());
		}
		lastSpawn = frameCount;
	}
}

function reset() {
	player = new Player();
	squares = [];
	bullets = [];
	ufos = [];
	powerups = [];
	score = 0;
	lastSpawn = 15;
	lastSpawnRate = 100;
}

function mouseClicked() {
	if (mode === 0) {
		mode = 1;
		reset();
	} else if (mode == 1) {
		playerShoot();
	}
}

function playerShoot() {
	if (mode == 1) {
		var target = createVector(mouseX, mouseY).div(scl); //player.vel.copy().add(player.pos);
		data.fireSound.play();
		data.fireSound.setVolume(fireVol);
		bullets.push(new Bullet(player.pos, target, constrain(player.r / 10, 4, 25), 0, 7));
	}
}

function keyPressed() {
	if (key == ' ') {
		playerShoot();
	}
	if (key == "I" || key == "i") {
		images = !images;
	}
	if (key == "O" || key == "o") {
		if (data.song2.isPlaying()) {
			data.song2.pause();
		} else {
			data.song2.play();
		}
	}
}

function calcScl() {
	var newWidth = windowWidth;
	var newHeight = windowHeight;
	if (windowWidth * 0.56 < windowHeight) {
		newWidth = windowWidth;
		newHeight = newWidth * 0.56;
	} else {
		newHeight = windowHeight;
		newWidth = newHeight / 0.56;
	}
	resizeCanvas(newWidth, newHeight);
	scl = width / nW;
}

function windowResized() {
	calcScl();
}

function addLoad() {
	loaded++;
}
