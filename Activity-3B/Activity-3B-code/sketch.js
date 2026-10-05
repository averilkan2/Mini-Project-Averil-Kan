// DM2008 — Activity 3b
// One Function Wonder (20 min)
//
// Write a function that draws a shape or group of shapes.
// It should take at least one parameter — try x, y, size, or color.
// Call it several times with different values to create variation.
//
// Ideas: a simple face, a flower, a house, an icon.
// Example: myShape(100, 200, 50); myShape(300, 200, 80);
//
// Stretch: call your function inside a for loop to create a repeating pattern.

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background("#e9a6a7");
  let spacing = 100;
  for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
      molly(i * spacing,j*spacing,50)
    }
  }
  molly(mouseX, mouseY, 100);
  
  
  function molly (x,y, size) {
    // petals
    noStroke();
    fill (color(0));
    ellipse(x, y-size/2, size/2.5, size);
    ellipse(x-size/2, y, size, size/2.5);
    ellipse(x, y+size/2, size/2.5, size);
    ellipse(x+size/2, y, size, size/2.5);

    // Center
    push();
    translate(x, y)
    rotate(QUARTER_PI)
    fill(color(255))
    rect(0, 0, size/5, size/5)
    pop();
  }
}

// Define your function outside draw()
// It can be called from anywhere in your sketch