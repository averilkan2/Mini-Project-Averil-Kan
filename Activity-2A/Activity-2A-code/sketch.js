// DM2008 — Activity 2a [Guided]
// Mode Switch (20 min)
//
// Keys 1, 2, 3 switch between modes — each one changes the background color.
// Try extending each mode to also change the fill, size, or speed of the ellipse.
// Keep it simple: one clear change per mode that's easy to see on screen.
//
// Stretch: add a 4th mode, or make the ellipse change shape between modes.

let x = 0; // ellipse position
let y = 0;

let circleSize;// ellipse size
let bgColor; // background color, changed by key presses
let circleColor;
let circleSpeed;

// Keys 1, 2, 3 change the background color — this is your mode switch
// mode 1: background red, circles have random speeds
// mode 2: background green, circles have random fill
// mode 3: background blue, random sized circles

function setup() {
  createCanvas(400, 400);
  bgColor = color(220);
  
  circleColor = 0;
  circleSpeed = 5;
  circleSize = 50;
}

function draw() {
  background(bgColor);

  // Draw the ellipse at its current position
  fill(circleColor);
  ellipse(x, height / 2, circleSize);
  ellipse(width/2, y, circleSize);

  // Move the ellipse
  x+= circleSpeed;
  y+= circleSpeed;

  // Wrap around when it exits the right edge
  if (x > width + circleSize/2) { //wrap around
    x = 0;
  }
  if (y > height + circleSize/2) {
    y = 0;
  }
}

// Keys 1, 2, 3 change the background color — this is your mode switch
// mode 1: background red, circles have random speeds
// mode 2: background green, circles have random fill
// mode 3: background blue, random sized circles
function keyPressed() {
  
  switch (key) {
    case "1": // mode 1: background red, circles have random speeds
      bgColor = color("#ff0000");

      circleSpeed = random(2,20);

      circleColor = color(0); //default
      circleSize = 50;
      break; // red
  
    case "2": // mode 2: background green, circles have random fill  
      bgColor = color("#aeff00");

      circleColor = color(random(255), random(255), random(255));

      circleSpeed = 5;
      circleSize =50;
      break; // green
  
    case "3": // mode 3: background blue, random sized circles
      bgColor = color("#00bfff");

      circleSize = random(20,100);

      circleColor = color(0);
      circleSpeed = 5;
      break; // blue
  
    default:
      bgColor = color(220); // grey
      circleColor = 0;
      circleSpeed = 50;
      circleSize = 5;
  }
}
