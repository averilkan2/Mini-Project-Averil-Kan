// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)
//
// Complete this scaffold into a playable game.
// Your game should have player control, collision detection,
// score tracking, and at least two game states.
//
// Not sure where to start? Try this order:
// 1. [DONE] Get the bird flapping — add control in keyPressed()
// 2. [DONE] Get pipes spawning — uncomment the spawn logic in draw()
// 3. [DONE] Add collision detection between the bird and pipes
// 4. [DONE] Add scoring when the bird passes a pipe
// 5. [DONE] Add game states — at minimum a playing state and a game over state
//
// Stretch: [DONE] add a start screen, a high score, or a difficulty curve.

/* ----------------- Globals ----------------- */
let birdSprite; //bird image
let bgImage; //bg image
let pipeImage; //pipe image
let bubbleSound; //bird movement sound
let deathSound; //bird death
let gameFont;

let bird;
let pipes = [];
let score = 0;
let spawnCounter = 0;
let bgX = 0; //bg top left corner

const SPAWN_RATE = 90;
const PIPE_SPEED = 2.5;
const PIPE_GAP = 200;
const PIPE_W = 60;
const BG_SPEED = 1.5;

// Game states: "homePage" or "playing" or "gameOver"
let gameState = "homePage";

/* ----------------- Setup & Draw ----------------- */
async function setup() {
  birdSprite = await loadImage("bird-sprite.png"); //load in bird sprite
  bgImage = await loadImage("bg-image.jpg"); //load in bg image
  pipeImage = await loadImage("pipe-image.jpeg"); //load in pipe image
  bubbleSound = await loadSound("bubble-audio.mp3");
  deathSound = await loadSound("death-audio.mp3");

  gameFont = await loadFont("upheavtt.ttf");
  
  createCanvas(480, 640);  
  noStroke();
  bird = new Bird(120, height / 2);
  pipes.push(new Pipe(width + 40));
}

function draw() {

  if (gameState === "homePage") {
    image(bgImage,0,0,1440,640);
    background(0,0,0,130);

    textFont(gameFont);
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text("FLOPPY FISH", width/2, height/3); //homepage text
    
    textSize(20);
    fill(255);
    text("> Press P to play <", width/2, height/2+200);
  }
  
  if (gameState === "playing") {
    bgScroll();
    bird.update();

    // Spawn a new pipe every SPAWN_RATE frames, then reset the counter
    spawnCounter++;
    if (spawnCounter >= SPAWN_RATE) {
      pipes.push(new Pipe(width + 40));
      spawnCounter = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      // When the bird hits a pipe, trigger game over
      if (pipes[i].hits(bird)) {
        // What should happen when the game ends?
        gameState = "gameOver";
        deathSound.play();
        //stop game
        noLoop();
      }
      
      // When the bird passes a pipe, increment the score
      // Hint: use pipes[i].passed to make sure you only score once per pipe
      if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        // increment score here
        pipes[i].passed = true;
        score++;
      }
      
      // pipes offscreen
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.update();
    bird.show();
    scoreBoard();

    // Display the score — look up textAlign() and textSize() in the p5.js reference
  }
function scoreBoard() {
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text("Score: " + score, width/2, 40)
  
  // What should the player see when the game ends?
  // How do they restart?
  if (gameState === "gameOver") {
    fill(0,0,0,180);
    rect(0,0,width, height);

    textAlign(CENTER);
    textSize(40);
    fill(255);
    text("GAME OVER", width/2, height/3); //gameover text
    
    textSize(20);
    text("Press ENTER to play again", width/2, height/2+200); //play again text
    text("Score: " + score, width/2, 40);
    
  } else if (gameState === "homePage") { //game has not started yet
    fill(0,0,0,180);
    rect(0,0,width, height);

    textAlign(CENTER);
    textSize(20);
    fill(255);
    text("Press P to play", width/2, height/3); //homepage text
  }
}
}

// scrolling background
function bgScroll () {
  imageMode(CORNER);
  bgX -=BG_SPEED;
  if (bgX <= -width) {
    bgX = 0;
  }
  image(bgImage,bgX,0, 1440, 640);
}

/* ----------------- Input ----------------- */
function keyPressed() {
  // Make the bird flap on space or UP_ARROW — call bird.flap()
  if (gameState === "playing" && key === " "){ // spacebar to flap
    bird.flap();
  } 
  
  if (gameState === "gameOver" && key == ENTER){ //press ENTER to play again
    gameState = "playing";
    
    score = 0;
    spawnCounter = 0;
    pipes = [];
    bird = new Bird(120, height / 2);
    pipes.push(new Pipe(width + 40));
    
    loop();
  }
  if (gameState === "homePage" && (key === "p" || key === "P")){ //press P to start playing
    gameState = "playing"
  }
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
    this.gravity = 0.25;
    this.flapStrength = -6.0;
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // A negative y velocity moves the bird upward
    this.vel.y = this.flapStrength;
    bubbleSound.play();
  }

  update() {
    this.applyForce(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Keep the bird within the canvas vertically
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }

    // Touching the ground is game over — same as hitting a pipe
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      gameState = "gameOver";
      deathSound.play();
      noLoop();
    }
  }

  show() {
    imageMode(CENTER);
    image(birdSprite, this.pos.x, this.pos.y);
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);
    this.top = gapY;
    this.bottom = gapY + PIPE_GAP;

    this.passed = false;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    // fill(120, 200, 160);
    // rect(this.x, 0, this.w, this.top);
    // rect(this.x, this.bottom, this.w, height - this.bottom);
    image(pipeImage, this.x, 0,this.w, this.top);
    image(pipeImage, this.x, this.bottom, this.w, height-this.bottom);
  }

  offscreen() {
    // 'return' sends a value back to wherever this method was called
    // We'll cover this properly next week, for now just know it gives back true or false
    return this.x + this.w < 0;
  }

  // Checks if the bird overlaps with either pipe rectangle
  // 1) Is the bird within the pipe's x range?
  // 2) If yes, is it outside the gap — above the top or below the bottom?
  hits(bird) {
    // This method also uses 'return' — coming up next week!
    const withinX = (bird.pos.x + bird.r > this.x) && (bird.pos.x - bird.r < this.x + this.w);
    const aboveGap = bird.pos.y - (bird.r) < this.top;
    const belowGap = bird.pos.y + (bird.r+12) > this.bottom;
    return withinX && (aboveGap || belowGap);
  }
}