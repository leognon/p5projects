var player;
var bullets = [];
var enemys = [];
var tank;
var turrets = [];

/*function preload() {
	tank = loadImage('images/tank.png');
}*/

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
	turrets[0] = new Turret(100, 100);
	turrets[1] = new Turret(width - 100, 100);
	turrets[2] = new Turret(100, height - 100);
	turrets[3] = new Turret(width - 100, height - 100);
	setTimeout(turretsShoot1, 1500);
}

function draw() {
	background(125, 255, 125);
	//image(tank, 0, 0);
	push();
	fill(0);
	for (var w = 0; w < height; w += 50) {
		line(0, w, width, w);
	}
	for (var h = 0; h < width; h += 50) {
		line(h, 0, h, height);
	}
	pop();

	for (var i = bullets.length - 1; i >= 0; i--) {
		bullets[i].move();
		bullets[i].show();
		if (bullets[i].pos.x < 0 || bullets[i].pos.x > width || bullets[i].pos.y < 0 || bullets[i].pos.y > height) {
			bullets.splice(i, 1);
		}
	}

	for (var v = turrets.length - 1; v >= 0; v--) {
		turrets[v].show();
	}

	player.show(); //TO-DO - MAKE TURRET WHICH ARE STATIONAIRY WITH LOTS OF HEALTH AND POWERFUL BULLETS
	player.move(); //MAKE ENEMYS, SOME THAT SHOOT AND FOLLOW YOU, OTHERS THAT JUST FOLLOW YOU (maybe add friendly fire?)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}