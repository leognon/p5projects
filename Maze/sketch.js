// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

var cols, rows;
var level = 1;
var w = window.innerWidth / ((level * 5) + 20); //CHANGE TO 20
var h = window.innerHeight / ((level * 2.5) + 10); //CHANGE TO 10
var grid = [];
var current;
var time;
var play = false;
player = {
	loc: grid[0],
};
var stack = [];
var finish = false;
var gen = 0;

function setup() {
	createCanvas(window.innerWidth, windowHeight);
	reset();
}

function draw() {
	background(255, 0, 255);

	if (play === false) {
		generate();
	}
	if (level >= 1 && play === true) {
		newFinish();
		fill(0, 255, 0);
		rect((finish.i * w) + 1, (finish.j * h) + 1, w - 1, h - 1); //Finish
		pMove();
		noStroke();
		fill(0, 0, 255);
		rect((player.loc.i * w) + 1, (player.loc.j * h) + 1, w - 1, h - 1); //PLAYER

		if (player.loc == finish) {
			play = false;
			level++;
			reset();
			generate();
		}
	}
	for (var i = 0; i < grid.length; i++) {
		if (level >= 1 && play === true) {
			grid[i].show();
		}
	}
	if (level >= 1 && play === true) {
		push();
		fill(112, 0, 255);
		noStroke();
		textSize(30);
		textStyle(BOLD);
		var mins = floor(time / 60);
		var seconds = floor((time / 60 - floor(time / 60)) * 60);
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		text("Level: " + level + "\nTime: " + mins + ":" + seconds, 15, 35);
		console.log(time)
		pop();
	}
	if (play === false && level === 1) {
		push();
		background(0);
		textAlign(CENTER)
		textSize(50);
		fill(255);
		text("Maze-Mania", width / 2, height / 2 - 95)
		textSize(35)
		text("The most a-maze-ing game!", width / 2, height / 2 - 60)
		textSize(20);
		text("Created by: Leo Gagnon", width / 2, height / 2 - 35)

		textSize(30);
		text("Move with WASD or the arrow keys" + "\nGenerating: " + round(map(gen, 0, ((cols * rows) * 2) - 2, 0, 100)) + "%", width / 2, height / 2 + 35);
		pop();
	} else if (play === false && level > 1) {
		push();
		background(0);
		textAlign(CENTER)
		textSize(60);
		fill(255);
		text("Level: " + level + "\nGenerating: " + round(map(gen, 0, ((cols * rows) * 2) - 2, 0, 100)) + "%", width / 2, height / 2);
		pop();
	}
}

function timer() {
	if (play === true) {
		if (time <= 0) {
			play = false;
		} else {
			console.log(time)
			time--;
			setTimeout(timer, 1000);
		}
	}
}


function windowResized() {
	resizeCanvas(window.innerWidth, windowHeight);
	w = window.innerWidth / ((level * 2) + 20);
	h = window.innerHeight / ((level * 1) + 10);
}

function index(i, j) {
	if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
		return -1;
	}
	return i + j * cols;
}

function removeWalls(a, b) {
	var x = a.i - b.i;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	var y = a.j - b.j;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}