function mouseClicked() {
	if (gameover == false) {
		//DO NOTHING
	} else {
		player.x = window.innerWidth / 2
		player.y = 25
		player.size = 25
		player.speed = 3
		player.lives = 5
		player.score = 0
		player.time = 0
		player.powerup = 'none'

		for (var i = 0; i < sqaures.length; i++) {
			sqaures.splice([i], 1)
		}
		for (var x = 0; x < points.length; x++) {
			points.splice([x], 1)
		}

		gameover = false
	}
}

function displayTextAlive() {
	textAlign(LEFT)
	textSize(25)
	textStyle(BOLD)
	textFont("Helvetica");
	fill(0, 102, 153);
	text("Score: " + player.score, 10, 25);
	var lifes = 'Lives: ' + player.lives
	var tWidth = textWidth(lifes);
	text(lifes, width - tWidth - 10, 25);

	var times = 'Time Alive: ' + player.time
	var t2Width = textWidth(times);
	text(times, width - width / 2 - t2Width / 2, height - 5);
}

function displayTextDead() {
	textAlign(CENTER)
	textSize(50)
	textStyle(BOLD)
	textFont("Helvetica")
	fill(255);
	text("Highscore: " + player.best + "\nScore: " + player.score + "\nTime Alive: " + player.time + " seconds" + "\nClick to play again", width / 2, height / 2)
}

function displayTextStart() {
	textAlign(CENTER)
	textSize(50)
	textStyle(BOLD)
	textFont("Helvetica")
	fill(255);
	text("How to play:\nMove with WASD or arrow keys\nAvoid Sqaures and eat dots", width / 2, height / 2 - 150)
	textSize(25)
	text("Click to start", width / 2, height / 2 + 10)
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
}