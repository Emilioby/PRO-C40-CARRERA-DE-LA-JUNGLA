var canvas;
var backgroundImage, bgImg, animal1_img, animal2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers, animal1, animal2,bush, grass;
var animals = [];
var bushImage, grassImage;
//BP
function preload() {
  backgroundImage = loadImage("./assets/background.jpg");
  animal1_img = loadImage("./assets/animal1.png");
  animal2_img = loadImage("./assets/animal2.png");
  track = loadImage("./assets/track.png");
  bushImage = loadImage("./assets/bush.png");
 grassImage = loadImage("./assets/grass.png");
}

//BP
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
 
}

//BP
function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
