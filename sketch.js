var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg,G1,gameOverImage;
var banana ,bananaImage, obstacle, obstacleImage,backgroundImage,background1;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkey_Collide = loadAnimation("monkey_1.png");
  
   gameOverImage = loadImage("gameOver.png")
  groundImg = loadAnimation("ground.jpg") 
  backgroundImage = loadImage("background.jpeg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle1.png");
  JumpSound = loadSound("jump.mp3");
  bananaSound=loadSound("banana.mp3");
  gameOverSound = loadSound("gameOver.mp3");
}

function setup(){
createCanvas(500,400);
   background1 = createSprite(390,200);
  background1.addImage(backgroundImage);
  background1.scale = 0.8;
  
  G1 = createSprite(300,100);
  G1.addImage(gameOverImage);
  G1.scale = 0.15;
  G1.visible = false;
  
  monkey = createSprite(100,270)
  monkey.addAnimation("run",monkey_running);
  monkey.addAnimation("collide", monkey_Collide);
  
  monkey.scale = 0.15;
  
  invisibleGround = createSprite(100,340,150,30);
  invisibleGround.visible = false;
  
   obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  monkey.debug = false;
 
}

function draw(){
  background("white");
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    background1.velocityX = -(4+score/100);
  
    if(keyDown("space")&&monkey.y >=250) {
      monkey.velocityY = -15; 
       JumpSound.play();
    }
     if(keyDown("up")&&monkey.y >250) {
      monkey.velocityY = -15; 
       JumpSound.play();
    }
  
    monkey.velocityY = monkey.velocityY + 0.6;
  
    if (background1.x < 50){
      background1.x = background1.width/2.5;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
       bananaSound.play();
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      gameOverSound.play();
      
    }
    
  }
  
  if (gameState === END){
   background1.velocityX = 0;
    G1.visible = true;
    monkey.changeAnimation("collide", monkey_Collide);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
   
    
    if (keyDown("a")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("run",monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
      G1.visible = false;
    }
  }
  
    

  drawSprites(); 
  
  monkey.collide(invisibleGround);
  
  fill("black");
  text("SURVIVAL TIME: "+score, 100, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
}

function bananas(){
  if (frameCount%90 === 0){
      
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
    banana.y = Math.round(random(150,230));
   
 
     
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,313,10,10);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 400);
    obstacle.scale = 0.15 ;
    obstacle.velocityX = -(4+score/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
     obstacle.debug = false;
 
  }
  
  
}






