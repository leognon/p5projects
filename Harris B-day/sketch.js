var cats = [];
var sign;
var meow;
var pcats;
var IheartYou;
var wait = true;

function setup() {
	background(51);
	createCanvas(windowWidth, windowHeight);
	sign = loadImage("images/Banner-Bday.jpg", function() {
		image(sign, width / 2 - sign.width / 2, 0);
	});
	IheartYou = loadImage("images/IheartYou.jpg", function() {
		image(IheartYou, width / 2 - IheartYou.width / 2, 650);
	});
	meow = loadSound("images/MeowS.mp3", function() {
		wait = false;
		console.log("loaded");
	});
	pcats = loadSound("images/PcatsIntroSong.mp3", function() {
		//pcats.loop();
		pcats.play();
	});
	for (var i = 0; i < 10; i++) {
		cats[i] = loadImage("images/cat" + i + ".jpg");
	}
	frameRate(.75);
}

function draw() {
	//if (!wait) {
	var img = random(cats);
	if (img && meow) {
		var w = img.width;
		var h = img.height;
		while (w >= 500 /* || h >= 500*/ ) {
			if (w > 500) {
				w /= 2;
				h /= 2;
			} // else {
			//break;
			//}
		}
		var x = random(width - w);
		var y = random(height - h);
		meow.setVolume(0.5);
		meow.play();
		//	meow.setVolume(0.5);
		image(img, x, y, w, h);
	}
	//	}
}
