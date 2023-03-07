//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//create background
var backG=createSprite(200,200,20000,400);
backG.setAnimation("b.jpg_1");
backG.scale=2;
backG.velocityX=-2;




var fire = createSprite(0, 0, 20, 20);
fire.setAnimation("fire");
fire.scale=0.67;
fire.visible = true;




//create a goku sprite
var goku = createSprite(200,380,20,50);
goku.setAnimation("goku");

//set collision radius for the trex
goku.setCollider("circle",0,0,30);
goku.debug=false;
//scale and position the goku
goku.scale=0.7;
goku.x = 50;





//invisible Ground to support goku
var invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;
invisibleGround.x = invisibleGround.width /2;

//create Villain group
var VillainGroup = createGroup();
//create cloud group
var CloudsGroup=createGroup();


//place gameOver and restart icon on the screen
var gameOver = createSprite(200,200);
var restart = createSprite(200,240);
gameOver.setAnimation("gameOver");
gameOver.scale = 0.3;
restart.setAnimation("reset");
restart.scale = 0.1;

gameOver.visible = false;
restart.visible = false;

//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);


//score
var count = 0;

function draw() {
 
  
  if(gameState === PLAY){
    //move the ground
    invisibleGround.velocityX = -(6 + 3*count/100);
    //scoring
    count =count+ Math.round(World.frameRate/60);

    if(VillainGroup.isTouching(fire)){
        VillainGroup.destroyEach();
      }
   
        
    if(keyWentDown("right")){
      
      playSound("sound://category_hits/retro_game_weapon_-_sword_on_shield_1.mp3");
      fire.visible=true;
      goku.setAnimation("goku fire ");
      
  fire.x=goku.x;
  fire.y=goku.y;
      
      
     
      fire.velocityX=50;
     
      
    
     
        
      
    }
    
    if(keyWentUp("right")){
      goku.setAnimation("goku");
    }
    
    
    if (invisibleGround.x < 0){
        invisibleGround.x = invisibleGround.width/2;
      }
      
resetBackground();
 //spawn obstacles
    spawnVillain();
    
    
    //End the game when goku is touching the obstacle
    if(VillainGroup.isTouching(goku)){
      gameState=END;
      playSound("sound://category_explosion/retro_game_take_damage_chirp_3.mp3");
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velocity of each game object to 0
    invisibleGround.velocityX = 0;
    goku.velocityY = 0;
    VillainGroup.setVelocityXEach(0);
    
    
    
    
    //set lifetime of the game objects so that they are never destroyed
     VillainGroup.setLifetimeEach(-1);
    
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  goku.collide(invisibleGround);
  
  drawSprites();
//display score
fill("blue");
  text("Score: "+ count, 250, 100);
  console.log(gameState);


}

function resetBackground() {
  //write code here to spawn the clouds
  if (backG.x<0) {
backG.x=200;
  }
  
}



function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  VillainGroup.destroyEach();
  count=0;
}

function spawnVillain() {
  if(World.frameCount % 60 === 0) {
    var villain = createSprite(400,360,10,40);
    villain.velocityX = - (6 + 3*count/100);
    villain.setAnimation("villain 1");
    villain.scale=1.5;
    
     //add each villain to the group
    VillainGroup.add(villain);
    
     
  }
}

