function newFinish() {
	if (finish === false) {
		var finishes = [];
		for (var d = 0; d < grid.length; d++) {
			var di = dist(grid[d].i * w, grid[d].j * h, player.loc.i * w, player.loc.j * h);
			if (di > (5 * w) + (level * 5)) {
				finishes.push(grid[d]);
				// push();
				// fill(0);
				// rect((grid[d].i * w) + 1, (grid[d].j * h) + 1, w - 1, h - 1);
				// pop();
			}
		}
		finish = finishes[floor(random(finishes.length))];
	}
}