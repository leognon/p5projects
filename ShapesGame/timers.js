function sqaureSpawn() {
	if (gameover === false) {
		sqaures.push(new Sqaure())
	//	points.push(new Point())
		spawnTime = 0
	}
	setTimeout(sqaureSpawn, 1500);
}

function spawnerGrow() {
	if (gameover === false) {
		if (spawnTime <= 1500) {
			spawnTime += 5
		}
	}
	setTimeout(spawnerGrow, 1)
}

function pointSpawn() {
	if (gameover === false) {
		points.push(new Point())
	}
	setTimeout(pointSpawn, 500);
}

function timeAlive() {
	if (gameover === false) {
		player.time++
	}
	setTimeout(timeAlive, 1000)
}

function delay() {
	//This does nothing....
}