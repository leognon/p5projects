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

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true]; //TOP, RIGHT, BOTTOM, LEFT
  this.visited = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }


  }
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*h;
    noStroke();
    fill(0);
    rect(x, y, w, h);

  }

  this.show = function() {
    var x = this.i*w;
    var y = this.j*h;
    stroke(255);
    strokeWeight(2)
    if (this.walls[0]) {	//TOP, RIGHT, BOTTOM, LEFT
      line(x    , y    , x + w, y); //top
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + h); //right
    }
    if (this.walls[2]) {
      line(x + w, y + h, x    , y + h); //bottom
    }
    if (this.walls[3]) {
      line(x    , y + h, x    , y); //left
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 255);
 //     rect(x-3, y-3, w+3, h+3);
    }
  }
}