var mario, mario_running, mario_collided;
var bg, bgImage;
var brickGroup, brickImage;
var coinsGroup, coinImage;
var coinScore=0;
var mushObstacleImage;
var turtleObstacleImage;
var dieSound;

function preload(){
  mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
  bgImage = loadImage("images/bgnew.jpg");
  brickImage = loadImage("images/brick.png");
  coinSound = loadSound("sounds/coinSound.mp3");
  coinImage = loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
  mushObstacleImage= loadAnimation("images/mush1.png", "images/mush2.png", "images/mush3.png", "images/mush4.png", "images/mush5.png", "images/mush6.png" );
  turtleObstacleImage= loadAnimation("images/tur1.png", "images/tur2.png", "images/tur3.png", "images/tur4.png", "images/tur5.png",);
  dieSound = loadSound("sounds/dieSound.mp3");
}

function setup() {
  createCanvas(1000, 600);

  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =0.5;
 
  bg.velocityX = -6;
  mario = createSprite(200,505,20,50);
  mario.addAnimation("running", mario_running);
  mario.scale =0.3;
  ground = createSprite(200,585,400,10);
  ground.visible = false;
  bricksGroup = new Group();
  coinsGroup = new Group();
  
}

function draw() {
 
  if (bg.x < 100){
    bg.x=bg.width/4;
  }
  if(mario.x<200){
    mario.x=200;
  }

  if(mario.y<50){
    mario.y=50;
  }

  if(keyDown("space") ) {
    mario.velocityY = -16;
  }
  mario.velocityY = mario.velocityY + 0.5;
  generateBricks();
  for(var i = 0 ; i< (bricksGroup).length ;i++){
    var temp = (bricksGroup).get(i) ;
    
    if (temp.isTouching(mario)) {
       mario.collide(temp);
      }
        
    }
  generateObstacles();
    generateCoins();
    for(var i = 0 ; i< (coinsGroup).length ;i++){
      var temp = (coinsGroup).get(i) ;
      
      if (temp.isTouching(mario)) {
        coinSound.play();
        coinScore++;
        temp.destroy();
        temp=null;
        }
          
      }
  
  mario.collide(ground);

  drawSprites();
  textSize(20);
  fill("brown")
  text("Coins Collected: "+ coinScore, 500,50);
  
}


function generateBricks() {
  if (frameCount % 70 === 0) {
    var brick = createSprite(1200,120,40,10);
    brick.y = random(50,450);
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    
    brick.lifetime =250;
    bricksGroup.add(brick);
  }
}

function generateCoins() {
  if (frameCount % 50 === 0) {
    var coin = createSprite(1200,120,40,10);
    coin.addAnimation("coin", coinImage);
    coin.y = Math.round(random(80,350));
    coin.scale = 0.1;
    coin.velocityX = -3;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}
function generateObstacles(){
  if (frameCount % 100 === 0){
    var obstacles =  createSprite(1200,545,10,40);
    obstacles.velocityX = -4;
    obstacles.scale = 0.2;
    var rand= Math.round(random(1,2));
    switch(rand){
      case 1:
          obstacles.addAnimation("mush",mushObstacleImage);
          break;
      case 2:
        obstacles.addAnimation("turtle", turtleObstacleImage);
          break;
      default:
          break;    
      }
      obstacles.lifetime = 300

  }
}