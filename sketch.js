
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var score = 0;
var ground,invisibleGround;
var count
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(800,400);

 monkey = createSprite(200,312,10,10);
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.15;


  
ground = createSprite(400,380,800,50);
ground=color("grey");
ground.velocityX = -4;
ground.x  = ground.width/2;
score =  0
  
invisibleGround = createSprite(380,380,800,50);
invisibleGround.visible = false;

FoodGroup = new Group();
obstacleGroup = new Group();
  
var survialTime = 0;
  
}


function draw() {
  background(100,0,100);
  console.log(monkey.y);
  
  if(ground.x<0){
ground.x = ground.width/2;    
  }


  if(keyDown("space")) {
    monkey.velocityY= -15; 
    
}
 monkey.velocityY = monkey.velocityY+0.8;
  
  
  monkey.collide(invisibleGround);
    
 
    
 
  banana();
  spawnObstacles();
  
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  
  if (FoodGroup.isTouching(monkey))
  {
    score = score+1; 
    FoodGroup.destroyEach();
  }  
  switch(score)
  {
    case 10 : monkey.scale = 0.12;
              break;
    case 20 : monkey.scale = 0.14;
              break;    
    case 30 : monkey.scale = 0.16;
              break;  
    case 40 : monkey.scale = 0.18;
              break;    
              default : break;   
  }            
 
  
monkey.velocityY = monkey.velocityY + 1;
  
monkey.collide(invisibleGround);

  banana();
  spawnObstacles();
  

 drawSprites(); 
stroke("white");
textSize(20);
fill("white");
text ("score :" + score,500,50);
  
if(obstacleGroup.isTouching(monkey)){
 ground.velocityX = 0;
  monkey.velocityY =  0;
obstacleGroup.setVelocityXEach(0); FoodGroup.setVelocityXEach(0); obstacleGroup.setLifetimeEach(-1); FoodGroup.setLifetimeEach(-1);
}
stroke("black");
textSize(20); fill("black"); 
survivalTime=Math.ceil(frameCount/frameRate());
text("Survival Time: "+ survivalTime, 100,50);
}
 

function banana() {

    if(frameCount % 100 === 0){
       var banana= createSprite (700,random(50,100));
      
      banana.addImage(bananaImage);
     
      banana.velocityX = -3;
      
      banana.scale = 0.1;
      banana.lifetime = 200;

      FoodGroup.add(banana);
  } 
}


function spawnObstacles(){
 if (frameCount % 250 === 0){
   var obstacle = createSprite(400,340);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -2
   
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}



