function Player() {
  this.pos = createVector(width / 2, 50);
  this.vel = createVector(0, 0);
  this.maxspeed = 2;
  this.r = 12.5;
  this.health = 500;

  this.show = function() {
    push();
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    pop();
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, 0, 0);
    rect(-this.r * 1.5, -this.r - 17.5, this.r * 3, 7.5); //RED
    var hurt = map(this.health, 0, 500, 0, this.r * 3);
    fill(0, 255, 0);
    rect(-this.r * 1.5, -this.r - 17.5, hurt, 7.5); //GREEN
    pop();
  }

  this.move = function() {
    this.vel = createVector(mouseX, mouseY);
    var dst = this.vel.dist(this.pos);
    var speed;
    if (dst > this.r * 6) {
      speed = this.maxspeed;
    } else {
      speed = map(dst, 0, this.r * 6, .2, this.maxspeed);
    }
    if (dst > this.r / 1.5) {
      this.vel.sub(this.pos);
      this.vel.setMag(speed);
      var newpos = this.pos.copy();
      newpos.add(this.vel);
      if (this.pos.x + this.r > spawner.pos.x - spawner.r && this.pos.x - this.r < spawner.pos.x + spawner.r) {
        //      this.vel.x = 0;
      }

      this.pos.add(this.vel);
    }
  }

  this.hit = function() {
    if (this.health < 500) {
      this.health += 0.05;
    }
    for (var i = squares.length - 1; i >= 0; i--) { //rx, ry, rw, rh, cx, cy, diameter
      var hit = collideRectCircle(squares[i].pos.x, squares[i].pos.y, squares[i].r /* * 2*/ , squares[i].r /* * 2*/ , this.pos.x, this.pos.y, this.r * 2);
      if (hit) {
        squares.splice(i, 1);
        this.health -= 100;
      }
    }

    for (var v = dots.length - 1; v >= 0; v--) {
      var dst = player.pos.dist(dots[v].pos);
      if (dst < player.r + dots[v].r) {
        score += dots[v].r;
        this.maxspeed += .125;
        this.r += dots[v].r / 10;
        if (this.health < 500 - dots[v].r) {
          this.health += dots[v].r;
        }
        dots.splice(v, 1);
      }
    }


    if (this.health <= 0) {
      mode = "dead";
      reset();
    }
  }
}
