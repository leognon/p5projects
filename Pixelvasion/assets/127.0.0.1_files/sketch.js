var rbck, pbck, pixelF, pImg, playerImg, player, pixelImg, buttonImg;
var loaded = 0;
var totalLoad = 6;
var pClaimed = [];
var rClaimed = [];
var bright = 45;
var pixels = [];
var bullets = [];
var time = 0;
var startTime = 0;
var score = 0;
var mode = 0;
var highscore = {
	time: 0,
	score: 0
};

function setup() {
	createCanvas(1280, 512);
	pixelDensity(1);
	textAlign(CENTER);
	load();
}

function draw() {
	noStroke();
	background(30, 40, 87);
	fill(255);
	if (loaded >= totalLoad) {
		if (mode === 0) {
			startScreen();
		} else {
			time = floor((millis() - startTime) / 100) / 10
			//textSize(100);
			image(rbck, 0, 0);

			pClaimed.forEach(function(p) {
				fill(p.col[0], p.col[1], p.col[2]);
				rect(p.i * 20, p.j * 19.72, 20, 20);
			});

			pixels.forEach(function(p) {
				p.show();
				p.move();
			});
			//console.log(rClaimed.length);
			//rClaim();
			//console.log(rClaimed.length);

			bullets.forEach(function(b) {
				b.show();
				b.move();
			});

			player.show();
			player.move();
			uiScreen();
			//time = millis() / 1000;
			if (random(0, 1000 - time) < 15) {
				pixels.push(new Pixel(true));
			}
			/*
			for (var i = 0; i < pbck.width; i++){
				for (var j = 0; j < pbck.height; j++){
					rClaimed.push({i,j});
			  }
			}

			pClaimed.forEach(function(p){
			var i = p.i
			var j = p.j
			rClaimed.splice(rClaimed.indexOf({i,j}, 1));
			});
			*/

			if (pClaimed.length >= pbck.width * pbck.height) {
				if (score > highscore.score) highscore.score = score;
				if (time > highscore.time) highscore.time = time;
				mode = 0;
			}
		}
		rClaim();
	} else {
		loadingScreen();
	}
}

function rClaim() {
	for (var i = rClaimed.length - 1; i >= 0; i--) {
		//console.log(rClaimed[i]);
		for (var p = 0; p < pClaimed.length; p++) {
			if (rClaimed[i].i == pClaimed[p].i && rClaimed[i].j == pClaimed[p].j) {
				rClaimed.splice(i, 1);
				break;
			}
		}
	}

	// pClaimed.forEach(function(p) {
	// 	var i = p.i;
	// 	var j = p.j;
	// 	rClaimed.splice(rClaimed.indexOf({
	// 		i,
	// 		j
	// 	}, 1));
	// });
}

function reset() {
	player = new Player();
	pClaimed = [];
	pixels = [];
	bullets = [];
	time = 0;
	startTime = millis();
	score = 0;
	rClaimed = [];
	for (var i = 0; i < pbck.width; i++) {
		for (var j = 0; j < pbck.height; j++) {
			rClaimed.push({
				i,
				j
			});
		}
	}
}

function load() {
	pixelF = loadFont("assets/fff-forward/FFFFORWA.TTF", function() {
		addLoad();
		textFont(pixelF);
	});
	// for (var i = 0; i < 10; i++) {
	// 	var b = loadImage("assets/PixelBlob2/BlobSprite0" + i + ".png", addLoad);
	// 	blobsImg.push(b);
	// }
	//blobsImg.push(loadImage("assets/PixelBlob2/BlobSprite10.png", addLoad));
	pixelImg = loadImage("assets/Pixel2.png", addLoad);
	buttonImg = loadImage("assets/Button.png", addLoad);
	rbck = loadImage("assets/Real_bck.jpg", addLoad);
	playerImg = loadImage("assets/player.png", addLoad);
	pbck = loadImage("assets/Pixel_bck.jpg", function() {
		addLoad();
		pbck.loadPixels();
	});
}

function addLoad() {
	loaded++;
}
