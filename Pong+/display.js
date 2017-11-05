function winner(p, r, b) {
	shooter.show();
	player.show();
	player.hit();
	bullets.forEach(function(i) {
		i.show();
	});
	fill(255);
	textSize(25 * scl);
	text(shooter.score, 10 * scl, 25 * scl);
	text(player.score, 10 * scl, height - (10 * scl));
	textSize(50 * scl);
	if (p == "RED") {
		fill(255, 0, 0);
	} else if (p == "BLUE") {
		fill(0, 0, 255);
	}
	text(p + " WINS!", width / 2, (height / 2) - 50);
	backButton();
}

function helpScreen() {
	textSize(25 * scl);
	text("CONTROLS:", width / 2, 50 * scl);
	textSize(20 * scl);
	var rc = "RED PLAYER:\nLeft and Right - A and D\nShoot - SPACE";
	var bc = "BLUE PLAYER:\nLeft and Right - LEFT ARROW and RIGHT ARROW";
	fill(255, 0, 0);
	text(rc, 25 * scl, 55 * scl, width - 50 * scl, height - 50 * scl);
	fill(0, 0, 255);
	text(bc, 25 * scl, 150 * scl, width - 50 * scl, height - 50 * scl);

	push();
	noStroke();
	translate(0, height - 325 * scl);
	textSize(25 * scl);
	fill(255);
	text("How to play:", width / 2, 50 * scl);
	textSize(20 * scl);
	var txt = "The red player has to shoot at the blue player, who must avoid the ball.\nThe ball will then bounce back, where the red player must also avoid it.\nIf you get touched by a ball, the other player scores. First to 5 wins!"
	text(txt, 25 * scl, 55 * scl, width - 50 * scl, height - 50 * scl);
	pop();
	backButton();
}

function backButton() {
	noStroke();
	fill(255);
	textSize(20 * scl);
	rect((width / 2) - (textWidth("BACK") / 2) - 5, height - 100 * scl, textWidth("BACK") + 10, 40 * scl, 20);
	fill(0);
	text("BACK", width / 2, height - 75 * scl);
}

function startScreen() {
	textSize(50 * scl);
	text("Pong+", width / 2, 100 * scl);
	var pw = textWidth("Pong+");
	textSize(15 * scl);
	textAlign(LEFT);
	text("By: Leo Gagnon", width / 2 + pw / 2 + 5, 100 * scl);
	textAlign(CENTER);
	textSize(35 * scl);
	rect((width / 2) - (textWidth("How to play") / 2) - 7, 142 * scl, textWidth("How to play") + 14, 42 * scl, 20);
	fill(0);
	text("How to play", width / 2, 175 * scl);
	fill(255);
	rect((width / 2) - (textWidth("PLAY") / 2) - 9, 187 * scl, textWidth("PLAY") + 14, 38 * scl, 20);
	fill(0);
	text("PLAY", width / 2, 220 * scl);
	image(speakerImg, width - 60, 10, 50, 50);
}
