var h1;
var gameover = 'start';
var spawnTime = 0;
var sqaures = [];
var points = [];
/*var canvas {
	wide: windowWidth,
	high: windowHeight
}*/

var player = {
	x: window.innerWidth / 2,
	y: 25,
	size: 25,
	speed: 3,
	lives: 5,
	score: 0,
	best: 0,
	time: 0,
	dirX: 0,
	dirY: 0,
	hit: false
};

function setup() {
	background(255, 255, 0);
	//	canvas = createCanvas(750, 750);
	createCanvas(window.innerWidth, window.innerHeight);
	setTimeout(sqaureSpawn, 3500);
	setTimeout(pointSpawn, 2000);
	setTimeout(timeAlive, 2000);
	setTimeout(spawnerGrow, 2000);
}

function draw() {
	background(0)
	if (gameover === false) {
		noStroke()
			//		player.hit = collideCircleCircle(player.x, player.y, player.size, width / 2, height / 2, 44); //Collision
		player.hit = dist(player.x, player.y, width / 2, height / 2)
		if (player.hit <= 25 + player.size / 2 - 5) { //Top and Botto

			if (player.dirX == 2) {
				player.X -= player.speed
			} else if (player.dirX == -2) {
				player.X += player.speed
			}

			if (player.dirY == 2) {
				player.y -= player.speed
			} else if (player.dirY == -2) {
				player.y += player.speed
			}
		}
		//Left and right

		pMove();
		fill(255, 255, 0);
		ellipse(player.x, player.y, player.size);

		for (var t = 0; t < points.length; t++) {
			points[t].display()
			if (points[t].hit) {
				points.splice([t], 1)
				player.score++
					player.speed += 0.05
			}
		}

		for (var i = 0; i < sqaures.length; i++) {
			sqaures[i].display()
			sqaures[i].move()

			if (sqaures[i].hit) {
				//		sqaures[i].die()
				//		setTimeout(delay, 1500)
				sqaures.splice([i], 1)
				player.lives--
					if (player.lives <= 0) {
						for (var x = 0; x < sqaures.length; x++) {
							sqaures.splice([x], 1)
						}
						gameover = true
					}
			}
		}

		//Spawner //map(45, 0, 1000, 0, width)
		noStroke();
		rectMode(CENTER);
		fill(255, 0, 0);
		rect(width / 2, height / 2, 40, 40);
		rect(width / 2, height / 2, map(spawnTime, 0, 1500, 0, 50), map(spawnTime, 0, 1500, 0, 50));
		fill(0, 255, 125);
		rect(width / 2, height / 2, map(spawnTime, 0, 1500, 0, 40), map(spawnTime, 0, 1500, 0, 40));
		fill(255, 0, 0);
		rect(width / 2, height / 2, map(spawnTime, 0, 1500, 0, 40) - 5, map(spawnTime, 0, 1500, 0, 40) - 5);
		fill(0, 255, 125);
		rect(width / 2, height / 2, map(spawnTime, 0, 1500, 0, 40) - 10, map(spawnTime, 0, 1500, 0, 40) - 10);
		fill(255, 0, 0);
		rect(width / 2, height / 2, map(spawnTime, 0, 1500, 0, 40) - 15, map(spawnTime, 0, 1500, 0, 40) - 15);
		fill(0, 255, 125);
		rect(width / 2, height / 2, map(spawnTime, 0, 1500, 0, 40) - 20, map(spawnTime, 0, 1500, 0, 40) - 20);
		fill(255, 0, 0);
		rect(width / 2, height / 2, map(spawnTime, 0, 1500, 0, 40) - 25, map(spawnTime, 0, 1500, 0, 40) - 25);
		/*fill(0)
		rectMode(CENTER)
		rect(width / 2, height / 2, map(spawnTime, 0, 1500, 0, 40), 5)
		rect(width / 2, height / 2, 5, map(spawnTime, 0, 1500, 0, 40))*/

		displayTextAlive();
	} else if (gameover === true) {
		for (var v = 0; v < sqaures.length; v++) {
			sqaures.splice([v], 100);
			points.splice([v], 100);
		}
		displayTextDead()
		if (player.score > player.best) {
			player.best = player.score;
		}
	} else {
		displayTextStart()
	}
}