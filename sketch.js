score=0;

var trex,trex_running;
var trexcollide;
var ground,groundimage;
var cloud;
var ob1;
var ob2;
var ob3;
var ob4;
var ob5;
var ob6;
var PLAY=1;
var END=0;
var highscore=0;
var gameover;
var restart;
var gameState=PLAY;
var jump;
var die;
var checkpoint;

function preload(){
 trex_running=loadAnimation ("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  ob1image=loadImage("obstacle1.png");
  ob2image=loadImage("obstacle2.png");
  ob3image=loadImage("obstacle3.png");
  ob4image=loadImage("obstacle4.png");
  ob5image=loadImage("obstacle5.png");
  ob6image=loadImage("obstacle6.png");
  trexcollideimage=loadImage("trex_collided.png");
  gameoverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png"); 
  jumpsound=loadSound("jump.mp3");
  diesound=loadSound("die.mp3");
  checkpointsound=loadSound("checkPoint.mp3")
  
}

function setup(){
 createCanvas(600,200)
  trex=createSprite(50,180,10,10)
  trex.addAnimation("running",trex_running);
  trex.addAnimation("colided",trexcollideimage);
  trex.scale=0.5
  
  
  ground=createSprite(200,180,600,20)
  ground.addImage("ground",groundimage);
  ground.x=ground.width/2
  
  invisibleground=createSprite(300,185,600,5);
  invisibleground.visible=false;
    
  cloudGroup=createGroup();
    
  obstacleGroup=createGroup();
  
  gameover=createSprite(280,100,10,10);
  gameover.addImage(gameoverimage);
  gameover.scale=0.6;
  restart=createSprite(280,130,10,10);
  restart.addImage(restartimage); 
  restart.scale=0.6;
  gameover.visible=false;
  restart.visible=false;
  
}



function draw(){
  
  background("white")
  edges=createEdgeSprites();
  
  if(gameState==PLAY){
  if(keyDown("space")&& trex.y>=159){
      trex.velocityY=-10;
    jumpsound.play();
  }
    
    score=score+Math.round (World.frameRate/60);
    
    if(score>0 && score%100==0){
      checkpointsound.play();
    }
    
    ground.velocityX=-(6+3*score/100);
    
   trex.velocityY=trex.velocityY+0.5; 
    
    if(ground.x<0){
   ground.x=ground.width/2;
  }
    if (trex.isTouching(obstacleGroup)){
     gameState=END;
     trex.changeAnimation("colided",trexcollideimage);
     diesound.play();
    }
     spawnclouds();
  
     spawnobjects();
  }
  
  else if(gameState==END){
   ground.velocityX=0;
   trex.velocityY=0;
   cloudGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
   cloudGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
   gameover.visible=true;
   restart.visible=true;
  }
  
  if(mousePressedOver(restart)){
    reset()
  }
  
  
 // console.log(trex.y)
  
   text("SCORE:" + score,500,10);
  
   text("HIGH SCORE:" +highscore,390,10);
  
  trex.collide(invisibleground);
  
  drawSprites();
}

function reset(){
 gameState=PLAY;
 obstacleGroup.destroyEach();
 cloudGroup.destroyEach();
 trex.changeAnimation("running",trex_running);
 gameover.visible=false;
 restart.visible=false;
 if(highscore<score){
   highscore=score;
 }
  
  score=0;
}


function spawnclouds(){
  if(frameCount%60==0){
   cloud=createSprite(600,100,10,10) 
   cloud.y=Math.round(random(50,100));
   cloud.addImage("cloud",cloudimage);
   cloud.velocityX=-5;
   cloud.scale=0.8;
   cloud.depth=trex.depth;
   cloudGroup.add(cloud);
   trex.depth=trex.depth+1;
  }  
}

function spawnobjects(){
if(frameCount%60==0){
  obstacle=createSprite(600,165,10,10);
  obstacle.velocityX=-(6+3*score/100);
  obstacleGroup.add(obstacle);
  obstacle.scale=0.6;
  var rand=Math.round(random(1,6));
  switch(rand){
    case 1: obstacle.addImage(ob1image);
    break;
    case 2: obstacle.addImage(ob2image);
    break;
    case 3: obstacle.addImage(ob3image);
    break;
    case 4: obstacle.addImage(ob4image);
    break;
    case 5: obstacle.addImage(ob5image);
    break; 
    case 6: obstacle.addImage(ob6image);
    break; 
    
    default:break
    
  }
    
    
  
}
}

