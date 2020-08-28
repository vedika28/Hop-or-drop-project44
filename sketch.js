//declaring all variables:
var block1Img, block2Img, block1, block2, blockGroup;
var bgImg, bg, block = [], plank;
var player, playerAnm, player_jump;
var enemy1, enemy2, enemy = [];
var gameState;
var blockX;
var booster_enemy, booster_score, boosterScore = [], boosterEnemy = [];
var score=0;
var resetButton;

//all images
function preload() {
  block1Img = loadImage("imgs/block1.jpg");
  block2Img = loadImage("imgs/block2.jpg");
  bgImg = loadImage("imgs/bg.jpg");
  enemy1 = loadImage("imgs/rock1.png");
  enemy2 = loadImage("imgs/rock2.png");
  playerAnm = loadAnimation("imgs/c1.png", "imgs/c2.png", "imgs/c3.png",
    "imgs/c4.png", "imgs/c5.png", "imgs/c6.png", "imgs/c7.png", "imgs/c8.png");
  player_jump = loadImage("imgs/c8.png");
  booster_enemy = loadImage("imgs/booster_enemy.png");
  booster_score = loadImage("imgs/booster_score.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight-145);
  gameState = "play";

  //creating the objects for the classes:
  player = new Player(130, 120, 20, 20);
  plank = new Block(130, 150, 100, 10);

  block1 = new Block((width / 2)-100, 180, 100, 10)
  blockGroup = new Group();

  blockX = (width / 2) - 400;
  resetButton=new Button();
}

function draw() {
  background(bgImg);

  camera.position.x = player.body.position.x;

  if (gameState === "play") {
    //creating planks for player to jump in them:
    if (frameCount % 50 === 0) {
      var rand=Math.round(random(75,170))
      blockX = blockX + 300;
      block.push(new Block(blockX, 180, rand, 10));
    }

    //creating enemy:
    var rand3 = random(20, 200)
    if (frameCount % 300 === 0) {
      enemy = new Enemy(rand3, -20,);
    }
    //adding behaviour to player.
    player.behaviour();

    //to make reset button position outside canvas
    resetButton.hide();

    //adding behaviour to block and making player collide with it.
    if (block.length > 0) {
      for (var i = 0; i < block.length; i++) {
        block[i].behaviour();
        blockGroup.add(block[i].body);
      }
    }
    for (var i = 0; i < block.length; i++) {
      player.body.collide(block[i].body);
    }
    player.body.collide(plank.body);
    player.body.collide(block1.body);

    //scoring system:
    if (frameCount%4===0&&frameCount>150) {
      score+=1;
    }

    //to end game once the enemy(rock) touches the player:
    if (enemy.body) {
      player.die();
    }
  }
  console.log(gameState);

  //calling gameOver and reset function once hame ends:
  if (gameState==="end") {
    gameOver();
    resetButton.display();
  }

  drawSprites();
  text("x:" + mouseX + "y:" + mouseY, mouseX, mouseY);
  text("score: "+score,( player.body.position.x)-400,100);
}

function gameOver() {
  player.body.velocityX=0;
  //enemy.body.destroy();
}