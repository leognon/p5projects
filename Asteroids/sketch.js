let player;
let bullets = [];
let asteroids = [];
const asteroidVertex = 15;
let lives = 3;
let gameover = false;
let level = 1;
let score = 0;
let highscore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(width / 2, height / 2, 20, 40);
  reset(level);
}

function draw() {
  background(0);
  if (!gameover) {
    if (keyIsDown(LEFT_ARROW)) {
      player.turn(-1);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      player.turn(1);
    }

    player.move();
    player.showAll();

    for (let a of asteroids) {
      a.move();
      a.show();
      if (player.hit(a)) {
        playerHit();
      }
    }

    for (let b of bullets) {
      b.move();
      b.show();
      if (player.hit(b)) {
        playerHit();
      } else {
        for (let a of asteroids) {
          if (a.hit(b)) {
            score += a.radius * 20;
            a.split(b);
          }
        }
      }
    }

    for (let i = asteroids.length - 1; i >= 0; i--) {
      if (asteroids[i].removeThis) {
        asteroids.splice(i, 1);
      }
    }

    for (let i = 0; i < lives; i++) {
      let x = 20 + ((player.width + 10) * i);
      let y = player.height;

      noFill();
      stroke(255);
      strokeWeight(4);

      let topPos = createVector(0, -player.height / 2);
      let leftPos = createVector(-player.width / 2, player.height / 2);
      let rightPos = createVector(player.width / 2, player.height / 2);
      triangle(topPos.x + x, topPos.y + y, leftPos.x + x, leftPos.y + y, rightPos.x + x, rightPos.y + y);
    }
    fill(255);
    noStroke();
    textSize(30);
    textAlign(LEFT);
    text("Score: " + score, 5, 100);

    if (asteroids.length <= 0) {
      level++;
      reset(level);
    }
  } else {
    fill(255);
    noStroke();
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Game Over!\nYou made it to level " + level + "\nYou scored " + score + " points!\nHigh Score: " + highscore + "\n\nPress R to restart", width / 2, height / 2);
  }
}

function playerHit() {
  lives--;
  if (lives <= 0) {
    if (score > highscore) {
      highscore = score;
    }
    gameover = true;
  } else {
    reset(level);
  }
}

function reset(numAsteroids) {
  bullets = [];
  asteroids = [];
  player = new Player(width / 2, height / 2, 20, 40);
  for (let i = 0; i < numAsteroids; i++) {
    let pos = getAsteroidPos();
    asteroids[i] = new Asteroid(pos.x, pos.y, 100, 4);
  }
}

function getAsteroidPos() {
  let angle = random(TWO_PI);
  let radius = random(250, 400);
  let x = cos(angle) * radius;
  let y = sin(angle) * radius;
  return createVector(x, y);
}

function keyPressed() {
  if (key == ' ') {
    player.shoot();
  } else if (key == "R" && gameover) {
    level = 1;
    lives = 3;
    score = 0;
    reset(level);
    gameover = false;
  }
}

function collideCircleToCircle(cPos1, cR1, cPos2, cR2) {
  let distX = sq(cPos1.x - cPos2.x);
  let distY = sq(cPos1.y - cPos2.y);
  return (distX + distY < sq(cR1 + cR2));
}