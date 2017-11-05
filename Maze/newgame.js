function generate() {
	frameRate(60);
	while (play === false) {
		if (play === false) {
			current.visited = true;
			var next = current.checkNeighbors();
			if (next) {
				next.visited = true;
				stack.push(current);
				removeWalls(current, next);
				current = next;
				gen++;
			} else if (stack.length > 0) {
				current = stack.pop();
				gen++;
			} else if (stack.length <= 0) {
				play = true;
				timer();
				console.log(play)
				break;
			}
		}
	}
}

function reset() {
	frameRate(60);
	grid = [];
	current = grid[0];
	play = false;
	stack = [];
	finish = false;
	time = 80 + (level * 15);
	gen = 0;

	w = window.innerWidth / ((level * 2) + 20);
	h = window.innerHeight / ((level * 1) + 10);

	cols = floor(window.innerWidth / w);
	rows = floor(window.innerHeight / h);
	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	current = grid[0];
	player.loc = grid[floor(random(grid.length))];
}