var grassLand,grassLandIma;
var deer,deerIma,deerIma2;
var ground;
var play=1;
var end=0;
var start=2;
var gameState=start;
var fruit1,fruit2,fruit3,fruit4,fruit5,fruit;
var score=0;
var FruitGroup,obstacleGroup;
var obstacle,obstacleIma;
var restart,restartIma;
var gameover,gameoverIma;

function preload()
{
  grassLandIma=loadImage("Grassland.png");
  
  deerIma=loadAnimation("deer1.png","deer2.png");
  deerIma2=loadAnimation("deer1.png");
  
  fruit1=loadImage("apple.png");
  fruit2=loadImage("banana.png");
  fruit3=loadImage("watermelon.png");
  fruit4=loadImage("orange.png");
  fruit5=loadImage("carrot.png");
  
  obstacleIma=loadImage("obstacle.png");
  
  restartIma=loadImage("restart.png");
  gameoverIma=loadImage("gameover.png");
}

function setup() 
{
  createCanvas(700,400);
  
  grassLand=createSprite(700,0,1400,800);
  grassLand.addImage("grass",grassLandIma);
  grassLand.scale=0.75;
  
  ground=createSprite(350,370,700,10);
  ground.visible=false;
  
  deer=createSprite(50,310,10,10);
  deer.addAnimation("deer",deerIma);
  deer.addAnimation("deer2",deerIma2);
  
  FruitGroup = createGroup();
  obstacleGroup = createGroup();
  
  gameover=createSprite(350,200,30,10);
  gameover.addImage("gameover",gameoverIma);
  gameover.visible=false;
  
  restart=createSprite(350,235,10,10);
  restart.addImage("restart",restartIma);
  restart.scale=0.4;
  restart.visible=false;
}

function draw() 
{
  background("black");
  
  if(gameState===start)
    {
      grassLand.visible=false;
      deer.visible=false;
      fill("white");
      stroke="black";
      textSize(15);
      text("A Lion is chasing the Deer and please help it to be safe.",150,200);
      text("Remember to dodge obstacles and collect food.",175,225);
      text("Press Space to Start",250,250);
      
      if(keyDown("space"))
        {
          gameState=play;
        }
    }
  
  
  
  if(gameState===play)
    {
    grassLand.velocityX=-5;
    grassLand.visible=true;
    deer.visible=true;
  
    if(grassLand.x < 0)
      {
        grassLand.x=grassLand.width/2-250;
      }
  
    if(keyDown("space")&&deer.y>=200)
      {
        deer.velocityY=-12;
      }
      
     
    deer.velocityY=deer.velocityY+0.8;
    deer.collide(ground);
    spwanFruit();
    spawnObstacles()
    
    if(deer.isTouching(FruitGroup))
      {
        score=score+2;
        FruitGroup.destroyEach();
      }
      
    if(deer.isTouching(obstacleGroup))
      {
        gameState=end;
      }
  }
  
  if(gameState===end)
    {
      grassLand.velocityX=0;
      deer.velocityY=0;
      
      deer.changeAnimation("deer2",deerIma2);
      
      FruitGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      
      obstacleGroup.setVelocityXEach(0);
      FruitGroup.setVelocityXEach(0);
      
      deer.collide(ground);
      
      gameover.visible=true;
      restart.visible=true;
      
      fruit.depth=restart.depth;
      fruit.depth=gameover.depth;
      restart.depth=restart.depth+1;
      gameover.depth=gameover.depth+1;
      
      if(mousePressedOver(restart)) 
      {
        reset();
      }
    }
  
  drawSprites();
  
  stroke="white";
  textSize(15);
  fill("black");
  text("Score : "+score,25,25);
}

function spwanFruit()
{
  if(frameCount % 150 === 0) 
  {
    fruit = createSprite(700,Math.round(random(100,350)),10,40);
    fruit.velocityX = grassLand.velocityX;
    fruit.lifeTime=300;
    FruitGroup.add(fruit);
    
    var rand = Math.round(random(1,5));
    switch(rand) 
    {
      case 1: fruit.addImage(fruit1);
        fruit.scale=0.7;
              break;
      case 2: fruit.addImage(fruit2);
        fruit.scale=0.15;
              break;
      case 3: fruit.addImage(fruit3);
        fruit.scale=0.15;
              break;
      case 4: fruit.addImage(fruit4);
        fruit.scale=0.15;
              break;
      case 5: fruit.addImage(fruit5);
        fruit.scale=0.7;
              break;
      default: break;
    }
  }
}

function spawnObstacles()
{
  if(frameCount%250===0)
    {
      obstacle=createSprite(700,350,10,40);
      obstacle.velocityX=grassLand.velocityX;
      obstacle.addImage("obi",obstacleIma);
      obstacle.lifeTime=300;
      //obstacle.debug=true;
      obstacle.setCollider("rectangle",0,0,40,50);
      obstacleGroup.add(obstacle);
    }
}

function reset()
{
  frameCount=0;
  gameState=play;
  gameover.visible=false;
  restart.visible=false;
  score=0;
  deer.changeAnimation("deer",deerIma);
  obstacleGroup.destroyEach();
  FruitGroup.destroyEach();
}
