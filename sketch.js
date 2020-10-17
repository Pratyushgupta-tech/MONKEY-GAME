  var ground;
  var monkey , monkey_running;
  var monkey1;
  var banana ,bananaImage, obstacle, obstacleImage;
  var Foodgroup, obstaclegroup;
  var score=0,survivaltime=0;
  gamestate="play";
  
function preload(){
  
  // loading animation for monkey
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png"," sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  // loading image for banana
  bananaImage = loadImage("banana.png");

  // loading image for obstacle
  obstacleImage = loadImage("obstacle.png");
  
  monkey1=loadAnimation("sprite_5.png");
  
}

function setup() {
  createCanvas(600,400); 

  // creating ground sprite
  ground=createSprite(300,350,600,15);  
  ground.shapeColor="purple";
  ground.velocityX=-3;  

  // creating monkey sprite
  monkey=createSprite(50,315,10,10);
  monkey.addAnimation("monkey moving",monkey_running);
  monkey.scale=0.1;
  monkey.addAnimation("monkey1",monkey1);
  //monkey.debug=true;
  monkey.setCollider("circle",0,0,290);

  // creating groups
  obstaclegroup=new Group();
  Foodgroup=new Group();  
  
}

function draw() {
  background("red");

  console.log(frameCount);  

  // resetting the ground  
  ground.x=ground.width/2;  

  // colliding monkey with ground
  monkey.collide(ground);  

  // giving gravity to ground
  monkey.velocityY=monkey.velocityY+0.8;
  
  // displaying the score
  fill("white");
  textsize=20;
  text("score =  "+score,10,50);

  // displaying survival time
  fill("black");
  textsize=20;
  text("Survival Time =  "+survivaltime,10,30);
  
  // instructions if gamestate is play
  if(gamestate=="play"){ 
     // calling the functions
     spawnrocks();
     spawnbanana();
    
  // making the monkey jump if keydown space
  if(keyDown("space")&&monkey.y>200){                
     monkey.velocityY=-12;
 }
    
  survivaltime= Math.ceil(frameCount/20);  
     
}
 
  // instruction to change gamestate to end
  if(monkey.isTouching(obstaclegroup)&&gamestate=="play"){
    gamestate="end";
 } 
  
  // instructions if gamestate is end
  if(gamestate=="end"){
    // giving the lifetime-1 for groups  
    Foodgroup.setLifetimeEach(-1)
    obstaclegroup.setLifetimeEach(-1);
   
    // giving velocity 0 to groups
    Foodgroup.setVelocityXEach(0)
    obstaclegroup.setVelocityXEach(0);
    
    // changing monkey animtion
    monkey.changeAnimation("monkey1",monkey1);
   
    // displaying gameover text
    fill("black");
    textSize(50);
    text("GAME OVER",150,100);
    
    // displaying gameover text
    fill("black");
    textSize(30);
    text("Press r to restart",200,130);
   
 } 
  
  // restarting the game
  if(keyDown("r") && gamestate=="end"){
     reset();
  }
  
  // calling function eat
  eat();
  
  drawSprites(); 
  
}

// creating function to spawn rocks
function spawnrocks(){
  
if(frameCount%100==0){
   // creating obstacle sprite
   obstacle=createSprite(600,315,15,15);
  
   // adding rock image to obstacle
   obstacle.addImage(obstacleImage);
  
   // scaling the obstacle to 0.2
   obstacle.scale=0.2;
  
   // giving velocity to obstacle
   obstacle.velocityX=-4;
  
   // giving lifetime to obstacle
   obstacle.lifetime=150;
   
   // adding obstacle to obstaclegroup
   obstaclegroup.add(obstacle);
 }
  
}

// creating function for spawning banana
function spawnbanana(){
  
if(frameCount%80==0){
   // creating banana sprite 
   banana=createSprite(600,Math.round(random(150,250)))
   
   // adding banana image to banana sprite
   banana.addImage(bananaImage);
  
   // scaling the banana to 0.1
   banana.scale=0.1;
  
   // giving velocity to banana
   banana.velocityX=-4; 
  
   // giving lifetime to banana 
   banana.lifetime=150;
  
   // adding banana sprite to foodgroup 
   Foodgroup.add(banana);
 }
}

// creating function reset
function reset(){
  // changing gamestate to play  
  gamestate="play"; 

  // changing the monkey animation  
  monkey.changeAnimation("monkey moving",monkey_running);

  // destroying the groups 
  obstaclegroup.destroyEach();
  Foodgroup.destroyEach();
  
  // changing score to 0
  score=0;
  
  //
  survivaltime=0;
  
}

// creating function eat
function eat(){

 if(monkey.isTouching(Foodgroup) && gamestate=="play"){
    Foodgroup.destroyEach();
    score=score+10;
 }   
}