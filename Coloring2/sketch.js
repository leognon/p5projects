let strokes = [];
let drawing = false;
let currentStroke = [];
let drawingHeight;
let currentColIndex = 0;
let colors;
let strokeW = 3;

let freq = 0.42;
let amtOfCol = 15;

function setup() {
  createCanvas(window.innerWidth, windowHeight - 4);
  drawingHeight = height - 50;
  background(200);

  colors = [];
  for (let i = 0; i < amtOfCol; i++) {
    let r = Math.sin(freq * i + 0) * 127 + 128;
    let g = Math.sin(freq * i + 2) * 127 + 128;
    let b = Math.sin(freq * i + 4) * 127 + 128;
    colors.push(color(r, g, b));
  }
  colors.push(color(255));
}

function draw() {
  background(0);
  if (drawing && mouseX != pmouseX && mouseY != pmouseY) {
    currentStroke.push({
      x: mouseX,
      y: mouseY,
      s: strokeW,
      i: currentColIndex
    });
  }
  noFill();
  beginShape();
  for (point of currentStroke) {
    stroke(colors[point.i]);
    strokeWeight(point.s);
    vertex(point.x, point.y);
  }
  endShape();
  showDrawing();

  fill(200);
  noStroke();
  rect(0, drawingHeight, width, 51);
  let w = 48;
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(width - (colors.length * w) + (i * w), drawingHeight, w, w);
  }
  fill(colors[currentColIndex]);
  strokeWeight(3);
  stroke(255);
  rect(width - (colors.length * w) + (currentColIndex * w), drawingHeight, w, w);

  strokeWeight(strokeW);
  stroke(255);
  line(width - (colors.length * w) - 300, drawingHeight + 25, width - (colors.length * w) - 20, drawingHeight + 25);

  fill(0);
  textSize(20);
  noStroke();
  text("Z - Undo           Number Keys - Stroke\nSpace - Color   Backspace - Clear", 12, drawingHeight + 20);
}

function showDrawing() {
  noFill();
  stroke(255);
  for (s of strokes) {
    beginShape();
    for (point of s) {
      stroke(colors[point.i]);
      strokeWeight(point.s);
      vertex(point.x, point.y);
    }
    endShape();
  }
}

function erase() {
  strokes = [];
  showDrawing();
}

function keyPressed() {
  if (keyCode == 90) {
    strokes.splice(strokes.length - 1, 1);
    showDrawing()
  } else if (keyCode == 32) {
    currentColIndex = (currentColIndex + 1) % colors.length;
  } else if (keyCode == 8) {
    erase();
  } else if (keyCode >= 48 && keyCode <= 57) { //Number keys
    strokeW = keyCode - 47;
  }
}

function mousePressed() {
  currectStroke = [];
  drawing = true;
}

function mouseReleased() {
  strokes.push(currentStroke);
  drawing = false;
  currentStroke = [];
  showDrawing();
}

function windowResized() {
  resizeCanvas(window.innerWidth, windowHeight - 4);
  drawingHeight = height - 50;
}