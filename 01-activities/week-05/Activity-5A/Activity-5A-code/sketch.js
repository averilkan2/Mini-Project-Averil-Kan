// DM2008 — Activity 5a [Guided]
// Colliding Circles (30 min)
//
// A vector stores position and movement together — cleaner than separate x and y variables.
// Your job is to get two balls moving, then detect and respond to their collision.
//
// Suggested order:
// 1. Create two Ball objects in setup()
// 2. Check the distance between them in draw()
// 3. Trigger a visual response when they collide
// 4. Implement edge behaviour in move() — wrap or bounce, your choice
//
// Stretch: add a third ball, or make the collision response affect both balls.

let balls = [];

function setup() {
  createCanvas(400, 400);

  // Create two balls at different starting positions
  balls.push(new Ball(100, 200));
  balls.push(new Ball(300, 200));
  balls.push(new Ball(200, 100));
  balls.push(new Ball(200, 300));
}

function draw() {
  background(230);

  for (let i = 0; i < balls.length; i++) {
    balls[i].colliding = false;
    balls[i].col = color(0); //starting colour/ colour changes back to this if balls not colliding
  }

  // Check collision between the two balls
  // dist() measures the distance between their centers
  // They overlap when that distance is less than the sum of their radii

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let d = dist(
        balls[i].pos.x,
        balls[i].pos.y,
        balls[j].pos.x,
        balls[j].pos.y
      );

      if (d < balls[i].r + balls[j].r) {
        //distance between the centers of each ball, if touching, should be equal or less than the sum of the radii of each of the balls
        balls[i].colliding = true;
        balls[j].colliding = true;

        balls[i].colorChange();
        balls[j].colorChange();
      }

      balls[i].show();
      balls[i].move();

      balls[j].show();
      balls[j].move();
    }
  }
}

class Ball {
  constructor(x, y) {
    // pos and vel are vectors — they store x and y together as one object
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 5), random(-2, 5));
    this.r = 30;
    this.col = color(0);
    this.colliding = false;
  }

  move() {
    // Move the ball
    this.pos.add(this.vel);

    //wrap
    if (this.pos.x + this.r > width) {
      // right edge
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }

    if (this.pos.x - this.r < 0) {
      //left edge
      this.pos.x = this.r;
      this.vel.x *= -1;
    }

    if (this.pos.y + this.r > height) {
      //bottom edge
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }

    if (this.pos.y - this.r < 0) {
      //top edge
      this.pos.y = this.r;
      this.vel.y *= -1;
    }
  }

  colorChange() {
    // colliding is true or false — try using it in an if/else to change fill or size
    this.col = color("#7a219e");
  }

  show() {
    fill(this.col);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
