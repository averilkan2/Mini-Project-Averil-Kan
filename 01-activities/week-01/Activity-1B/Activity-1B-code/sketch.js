// DM2008 — Activity 1b [Ryoji Ikeda]
// Learning By Making (30 min)

let x;
let w;
let c;

function setup() {
  createCanvas(500, 500);
  background(255);
  noStroke();
  fill(255);
}

function draw() {
  background(255, 10);
  
  x = random(width);
  w = random(1, 10);
  c = color(random(10,200),230,40)
  rect(w, 0, x, height/2);
  fill(c,230,40)
  rect(w, 0, x, height/2);
  x = random(width);
  rect(x, height/2, w, height/2);
}

function mouseDragged() {
  rect(CENTER)
  fill(color(random(10,200),30,4))
  rect(x,0,x,height);
}