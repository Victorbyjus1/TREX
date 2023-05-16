
var trex ,trex_running,trex_collided;
var ground, groundIMG,invisibleground;
var cloud, cloudImg, cloudGroup;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacleGroup;
var pontos;
var PLAY = 1; 
var END = 0;
var gameState = PLAY;
var gameOver, gameOverImg;
var restart, restarImg;
var die, jump,checkPoint;

function preload(){
  trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");
trex_collided = loadAnimation ("trex_collided.png");

groundIMG = loadImage ("ground2.png");

cloudImg = loadImage ("cloud.png");

obstacle1 = loadImage ("obstacle1.png");
obstacle2 = loadImage ("obstacle2.png");
obstacle3 = loadImage ("obstacle3.png");
obstacle4 = loadImage ("obstacle4.png");
obstacle5 = loadImage ("obstacle5.png");
obstacle6 = loadImage ("obstacle6.png");

gameOverImg = loadImage ("gameOver.png");
restartImg = loadImage ("restart.png");

die = loadSound ("die.mp3");
checkPoint = loadSound ("checkpoint.mp3");
jump = loadSound ("jump.mp3");
}

function setup(){

  createCanvas(600,200);

  gameOver = createSprite (300,100);
  gameOver.addImage (gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite (300,140);
  restart.addImage (restartImg);
  restart.scale =  0.5;
  restart.visible = false;

 trex = createSprite (50,150,20,50);
 trex.addAnimation ("running", trex_running);
trex.addAnimation ("trex collided",trex_collided);
trex.scale = 0.5;
trex.x = 50;
 
ground = createSprite (200,180,400,20);
ground.addImage ("ground",groundIMG);
invisibleground=createSprite (200,190,400,10);
invisibleground.visible=false;



pontos = 0; 

obstacleGroup = new Group ();
cloudGroup = new Group ();



}

function draw(){
 
 background(245);

 text ("Pontuação:" + pontos, 500,50);
 

 if (gameState === PLAY){
pontos = pontos + Math.round (getFrameRate ()/60);
if (pontos > 0 && pontos % 100 === 0){
  checkPoint.play();
}

ground.velocityX= -(4 + 3*pontos/100);

if (keyDown("space")&& trex.y >=160){
    trex.velocityY = -11;
    jump.play();
  }
  trex.velocityY = trex.velocityY + 0.5;
if (ground.x < 0 ){
  ground.x = ground.width/2;
}
 spawClouds ();
spawObstacle ();
if (obstacleGroup.isTouching(trex)){
  gameState = END;
  die.play();

}
 }
 else if (gameState === END){
ground.velocityX  = 0;

trex.changeAnimation ("trex collided",trex_collided);

obstacleGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);

obstacleGroup.setLifetimeEach(-1);
cloudGroup.setLifetimeEach(-1);

restart.visible = true; 
gameOver.visible = true;

 }

 
  

trex.collide(invisibleground);

if (mousePressedOver (restart)){
  reset();
}


drawSprites();


}

function reset (){
  gameState = PLAY;
  restart.visible = false; 
gameOver.visible = false;

obstacleGroup.destroyEach();
cloudGroup.destroyEach();

trex.changeAnimation ("running",trex_running);

pontos = 0;
}


function spawClouds (){
  if  (frameCount % 60 === 0) {
  cloud = createSprite (600,50,40,10);
  cloud.addImage (cloudImg);
  cloud.y = Math.round(random (50,100));
  cloud.scale = 0.65;
  cloud.velocityX = -4;



cloud.lifetime = 300;


  cloud.depth = trex.depth;
  trex.depth += 1;

  cloudGroup.add(cloud);
  }
 
}
function spawObstacle () {
  if (frameCount % 60 === 0){
  obstacle = createSprite (600,165,10,40);
 obstacle.velocityX = -(4 + 3*pontos/100);



 var rand = Math.round (random (1,6));
 switch (rand){
  case 1: obstacle.addImage (obstacle1);
                   break;
   case 2: obstacle.addImage (obstacle2);
                   break;
   case 3: obstacle.addImage (obstacle3);
                   break;
    case 4: obstacle.addImage (obstacle4);
                   break;
    case 5: obstacle.addImage (obstacle5);
                   break;
     case 6: obstacle.addImage (obstacle6);
                   break;
 default: break;
 }

 obstacle.scale = 0.5;
 obstacle.lifetime = 300;

 obstacleGroup.add(obstacle); 

}
  }