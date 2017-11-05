var player;
var squares = [];
var dots = [];
var spawner;
var mode = "start";
var score = 0;
var frame = 0;
var spawns = {
  sqaure: false,
  dot: false
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  spawner = new Spawner()
  mode = "start";
}

function draw() {
  background(0);

  if (mode == "play") {
    frame++
    for (var i = 0; i < dots.length; i++) {
      dots[i].show();
    }

    for (var v = 0; v < squares.length; v++) {
      squares[v].show();
      squares[v].move();
    }
    player.show();
    player.move();
    player.hit();
    spawner.show();
    newDot();
    newSquare();
  } else if (mode == "pause") {
    for (var i = 0; i < dots.length; i++) {
      dots[i].show();
    }

    for (var v = 0; v < squares.length; v++) {
      squares[v].show();
    }
    player.show();
    spawner.show();

    textAlign(CENTER);
    fill(255);
    textSize(width / 10); //30
    noStroke();
    text("Paused", width / 2, height / 2 - (width / 10));
    textSize(width / 15);
    text("Score: " + floor(score), width / 2, height / 2 - (width / 20));
    textSize(width / 30); //10
    text("Press space to unpause", width / 2, height / 2 + 15);
  } else if (mode == "start") {
    textAlign(CENTER);
    fill(255);
    textSize(width / 10);
    noStroke();
    text("ShapesGame+", width / 2, height / 2 - (width / 20));
    textSize(width / 30);
    text("Click to begin", width / 2, height / 2 + 15);
  } else if (mode == "dead") {
    textAlign(CENTER);
    fill(255);
    textSize(width / 10); //30
    noStroke();
    text("You died!", width / 2, height / 2 - (width / 10));
    textSize(width / 15);
    text("Score: " + floor(score), width / 2, height / 2 - (width / 20));
    textSize(width / 30); //10
    text("Press any key to begin", width / 2, height / 2 + 15);
  }
}

function reset() {
  player = new Player();
  spawner = new Spawner();
  clearInterval(spawns.square);
  clearInterval(spawns.dot);
  squares = [];
  dots = [];
  frame = 0;
}

function newGame() {
  if (mode == "start" || mode == "dead") {
    reset();
    score = 0;
    mode = "play";
    //	spawns.square = setInterval(newSquare, 1500);
    //	spawns.dot = setInterval(newDot, 500);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
/*
Created by http://benmoren.com
Some functions and code modified version from http://www.jeffreythompson.org/collision-detection
GNU LGPL 2.1 License
Version 0.1 | January 10th, 2016
*/
//CREDIT TO BEN MOREN FOR RECT-CIRCLE COLLISION
p5.prototype.collideRectCircle = function(rx, ry, rw, rh, cx, cy, diameter) {
  //2d
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx) {
    testX = rx // left edge
  } else if (cx > rx + rw) {
    testX = rx + rw
  } // right edge

  if (cy < ry) {
    testY = ry // top edge
  } else if (cy > ry + rh) {
    testY = ry + rh
  } // bottom edge

  // // get distance from closest edges
  var distance = dist(cx, cy, testX, testY)

  // if the distance is less than the radius, collision!
  if (distance <= diameter / 2) {
    return true;
  }
  return false;
};

function keyPressed() {
  if (mode == "play" && key == ' ') {
    mode = "pause";
  } else if (mode == "pause" && key == ' ') {
    mode = "play";
  }
}

function mousePressed() {
  newGame();
}
