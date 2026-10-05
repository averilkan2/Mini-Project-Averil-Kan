// DM2008 — Activity 4b [Guided]
// Objects in Motion (50 min)
//
// You have a working Agent class to start with — your job is to bring it to life.
// Each agent moves, changes over time, and is drawn to the screen.
// Mouse click adds a new agent. C clears them all.
//
// Things to try:
// - Change the starting values (size, speed, color) to see what happens
// - Make agents bounce instead of wrap — what needs to change?
// - Add a second method to your class beyond update() and show()
//
// Stretch: give each agent a lifespan — shrink or fade it over time, then remove it.
// Hint: a backward loop lets you safely splice items while iterating.

let agents = [];
const NUM_START = 12;

function setup() {
  createCanvas(600, 400);
  noStroke();

  for (let i = 0; i < NUM_START; i++) {
    let x = random(width);
    let y = random(height);
    let sz = random(12, 50);
    let speedX = random(-5, 5);
    let speedY = random(-5, 5);
    agents.push(new Agent(x, y, sz, speedX, speedY));
  }
}

function draw() {
  background(230);

  for (let i = 0; i < agents.length; i++) {
    agents[i].update();
    agents[i].show();
    agents[i].shrink();
  }
}

function mousePressed() {
  let sz = random(12, 50);
  let speedX = random(-5, 5);
  let speedY = random(-5, 5);
  agents.push(new Agent(mouseX, mouseY, sz, speedX, speedY));
}

function keyPressed() {
  // Replacing the array with an empty one effectively clears all agents
  if (key == "C" || key == "c") {
    agents = [];
  }
}

class Agent {
  constructor(x, y, sz, speedX, speedY) {
    this.x = x;
    this.y = y;

    this.sz = sz;
    this.sizeChange = 1;

    this.dx = speedX;
    this.dy = speedY;
    this.col = random(255); // a color value that will change over time
    // What else might your agent need to know about itself?
  }

  update() {
    // Position changes by speed each frame — can you see why?
    this.x += this.dx;
    this.y += this.dy;

    // This is a property changing over time — try changing size or speed instead
    this.col = (this.col + 1) % 255;

    // This wraps agents around the edges — could you make them bounce instead?
    if ((this.x - this.sz /2) <0) { // left edge 
      this.x = this.sz/2; //reset position
      this.dx *= -1;
    }
    if ((this.x + this.sz /2) > width) { //right edge
      this.x = width - this.sx/2;
      this.dx *= -1;
    }
    if ((this.y - this.sz /2) <0) { //top edge
      this.y = this.sz/2;
      this.dy *= -1;
    }
    if ((this.y +this.sz /2) > height) { //bottom edge
      this.y = height - this.sz/2;
      this.dy +=-1;
    }
  }

  show() {
    // this.col drives the color shift — how could you use your other properties here?
    fill(this.col, 150, 220);
    ellipse(this.x, this.y, this.sz);
  }

  shrink() {
    this.sz += this.sizeChange; //size changes by this value

    if (this.sz >= 100) {
      this.sizeChange = -1; //shrink
    }
    if (this.sz <= 25) {
      this.sizeChange = 1;
    }
  }
}
