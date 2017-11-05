function pMove() {
	if (play === true) {
		push()
		var up = grid[index(player.loc.i, player.loc.j - 1)];
		var right = grid[index(player.loc.i + 1, player.loc.j)];
		var down = grid[index(player.loc.i, player.loc.j + 1)];
		var left = grid[index(player.loc.i - 1, player.loc.j)];

		if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
			if (left && player.loc.walls[3] === false) {
				player.loc = grid[index(player.loc.i - 1, player.loc.j)]
				return;
			}
		}

		if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
			if (right && player.loc.walls[1] === false) {
				player.loc = grid[index(player.loc.i + 1, player.loc.j)]
				return;
			}
		}
		if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
			if (up && player.loc.walls[0] === false) {
				player.loc = grid[index(player.loc.i, player.loc.j - 1)]
				return;
			}
		}

		if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
			if (down && player.loc.walls[2] === false) {
				player.loc = grid[index(player.loc.i, player.loc.j + 1)]
				return;
			}
		}
		frameRate(8);
		pop();
	} else {
		frameRate(60);
	}
}