// Game Parameters
const wallSpeed = 2;
const gravity = 0.3;
const jumpSpeed = 5;
const wallWidth = 50;
const wallDelay = 100;
const x = 300;

// Used in game
let y = 300;
let ySpeed = 0;
let gameOver = false;
let wallList = [];

function preload() {
  // preload() runs once
  img = createImg(
    "https://freepngimg.com/save/109939-logo-pic-bird-flappy-free-transparent-image-hq/600x333"
  );
  img.hide();
}

function setup() {
  createCanvas(600, 700);
  noStroke();
}

function draw() {
  //   clear page
  if (gameOver) {
    background(255, 0, 0);
    return;
  }

  // draw character
  background(0);
  fill(255);
  image(img, x, y, 40, 40);

  // draw walls
  fill(100, 100, 100);
  for (let wall of wallList) {
    drawWall(wall);
    detectCrash(wall);
  }
  createNewWall();

  // Detect if the bird goes out of screen
  if (y + 40 >= height || y < 0) gameOver = true;

  // physics
  ySpeed += gravity;
  y += ySpeed;
}

function createNewWall() {
  let r = random(10);
  if (r <= 1) {
    if (wallList.length == 0 || wallList[wallList.length - 1].x < wallDelay) {
      let newWall = {
        x: 600,
        y: random(600),
        h: random(100, 300),
      };

      wallList.push(newWall);
    }
  }
}

function detectCrash(wall) {
  // X matches
  if (x + 40 >= wall.x && x <= wall.x + wallWidth)
    if (y <= wall.y || y + 40 >= wall.y + wall.h)
      // Y matches
      gameOver = true;
}

function drawWall(wall) {
  rect(wall.x, 0, wallWidth, wall.y); // top wall
  rect(wall.x, wall.y + wall.h, wallWidth, height); // bottom wall

  wall.x -= wallSpeed;
}

function keyPressed() {
  if (gameOver) return;

  if (key == " ") ySpeed = -jumpSpeed;
}
