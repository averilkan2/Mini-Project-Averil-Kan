// DM2008 — Activity 1a
// Simple Creatures (20 min)

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature within the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(150,200,230);
  
  // YOUR CODE HERE
  strokeWeight(5)

  fill("#ffcc02");
  ellipse(200,150,200,200);

  fill("#ffab01")
  ellipse(200,150,100,20);

  fill("#ffcc02");
  ellipse(200,400,500,500);

  fill(0,0,0);
  ellipse(150,130,20,20);

  fill(0,0,0);
  ellipse(250,130,20,20);

  fill("#ffab01")
  line(50,250,0,350);
  line(350,250,400,350);
  
  helperGrid(); // do not edit or remove this line
}
