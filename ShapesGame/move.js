function pMove() {
	if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
		if (player.x <= player.size / 2) {
			//DO NOTHING
		} else {
			player.dirX = -2;
			player.x -= player.speed;
		}
	}

	if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
		if (player.x >= width - player.size / 2) {
			//DO NOTHING
		} else {
			player.dirX = 2;
			player.x += player.speed;
		}
	}

	if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
		if (player.y <= player.size / 2) {
			//DO NOTHING
		} else {
			player.dirY = -2;
			player.y -= player.speed;
		}
	}

	if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
		if (player.y > height - player.size / 2) {
			//DO NOTHING
		} else {
			player.dirY = 2;
			player.y += player.speed;
		}
	}
}