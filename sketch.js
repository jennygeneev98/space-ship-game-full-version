
var bg,backgroundImg,spaceship,spaceshipImg;
var obstacle1g,obstacle2g,powerg,spike1g,spike2g,goldg
var gamestate="PLAY"
var score=0
var counter

function preload(){

backgroundImg=loadImage("space.png")
spaceshipImg=loadImage("ship.png")
spaceshipSheild = loadImage("rocket.png")
obstacle1Img=loadImage("obstacel1.png")

obstacle2Img=loadImage("obstacle2.png")
goldImg=loadImage("gold.png")
sheildImg=loadImage("sheild.png")
spike1Img=loadImage("obstacel1.png")
spike2Img=loadImage("obstacle2.png")
restartImage = loadImage("restart.png")

}

function setup(){
createCanvas(1000,1000)

bg=createSprite(500,500)
bg.addImage(backgroundImg)
bg.scale=3
bg.velocityX=-5

spaceship=createSprite(100,500)
spaceship.addImage(spaceshipImg)
spaceship.scale=0.5

restart = createSprite(width/2 , height/2 +200);
restart.addImage(restartImage)
restart.scale = 3
restart.visible = false

obstacle1g=new Group()
obstacle2g=new Group()
spike1g=new Group()
spike2g=new Group()
sheildg=new Group()
goldg=new Group()

}

function draw(){

   background(0)

   if(gamestate==="PLAY"){
   
      counter = 1000;
      spaceship.addImage (spaceshipImg)
      if(keyDown("space")){
         spaceship.setVelocity(0,-9)
      }
         
      spaceship.velocityY=spaceship.velocityY+1
         
      if(bg.x<400){
         bg.x=500
      }   
        
      if(spaceship.isTouching(obstacle1g) || spaceship.isTouching(obstacle2g) 
      || spaceship.isTouching(spike1g)|| spaceship.isTouching(spike2g)
      || spaceship.y >1000 ||  spaceship.y<0 ){
         gamestate="END"
      }
               
            
      for (var i = 0; i < goldg.length; i++) {
         if (goldg.get(i).isTouching(spaceship)) {
               goldg.get(i).destroy();
            score =score+1;
         }    
      }
      for (var i = 0; i < sheildg.length; i++) {
         if (sheildg.get(i).isTouching(spaceship)) {
               sheildg.get(i).destroy();
               gamestate = "sheild"
         }    
      }

      spawnobstacle();
      powers();
      currency(); 
     

   }

   if (gamestate === "sheild"){

    //  console.log("i am working dude")
   
      if(keyDown("space")){
         spaceship.setVelocity(0,-9)
      }
         
      spaceship.velocityY=spaceship.velocityY+1
         
         
      if(bg.x<400){
         bg.x=500
      } 
      for (var i = 0; i < goldg.length; i++) {
         if (goldg.get(i).isTouching(spaceship)) {
               goldg.get(i).destroy();
            score =score+1;
         }    
      }
      for (var i = 0; i < sheildg.length; i++) {
         if (sheildg.get(i).isTouching(spaceship)) {
               sheildg.get(i).destroy();
               gamestate = "sheild"
         }    
      }

      spaceship.addImage(spaceshipSheild)

      //sheildingTime()
      if (counter === 0){
         gamestate = "PLAY"
      }
      spawnobstacle();
      powers();
      currency(); 
     
     

      counter = counter -1
      console.log(counter)

     
      if (counter === 0){
         gamestate = "PLAY"
      }
     
   }


   if(gamestate==="END"){
      textSize(50)
      fill ("white")
      text("☠️ GAMEOVER ☠️",300,500)
      restart.visible= true;
      
   }

   if(mousePressedOver(restart)){
      reset ()
   }

   
   drawSprites();
   textSize(25)
   stroke ("white")
   strokeWeight (2)
   fill ("white")
   text("score:"+score,50,50) 

    if (gamestate === "sheild"){
      textSize(50)
      stroke ("white")
      strokeWeight (6)
      fill ("red")
      text(counter/10,width/2,50) 
    }
}


function reset (){
   score = 0
   spaceship.x = 100
   spaceship.y = 500
   restart.visible = false
   gamestate = "PLAY"
  
   
}


function spawnobstacle(){
   if(frameCount%400===0){
      obstacle1=createSprite(1200,800);
      obstacle1.addImage(obstacle1Img)
      //obstacle1.debug=true
      obstacle1.setCollider("rectangle",0,0,obstacle1.width/2,obstacle1.height)
     
      obstacle2=createSprite(800,200);
      obstacle2.addImage(obstacle2Img)
      //obstacle2.debug=true
      obstacle2.setCollider("rectangle",0,0,obstacle2.width/2,obstacle2.height)

      obstacle1.velocityX=-2    
      obstacle2.velocityX=-2  
      
      obstacle1.scale=2
      obstacle2.scale=2

      obstacle1.lifetime=500
      obstacle1g.add(obstacle1)

      obstacle2.lifetime=500
      obstacle2g.add(obstacle2)

   }
   if(frameCount%50===0){
      spike1=createSprite(900,50)
      spike1.addImage(obstacle2Img)
      spike2=createSprite(1000,950)
      spike2.addImage(obstacle1Img)
   
      //spike1.debug=true
      //spike2.debug=true

      spike1.setCollider("rectangle",0,0,spike1.width/2,spike1.height)
      spike2.setCollider("rectangle",0,0,spike2.width/2,spike2.height)

      spike1.velocityX=-2
      spike2.velocityX=-2

      spike1.lifetime=500
      spike1g.add(spike1)

      spike2.lifetime=500
      spike2g.add(spike2)
   }

}

function currency(){
   if(frameCount%200===0){
      gold=createSprite(1000,Math.round(random(100,900)))
      gold.addImage(goldImg)
      gold.velocityX=-2
      gold.scale=0.2
      gold.lifetime=500
      goldg.add(gold)
   }
}



function powers(){

   if(frameCount%2000===0){
      sheild=createSprite(800,Math.round(random(100,900)))
      sheild.addImage(sheildImg)
      sheild.velocityX=-2
      sheild.scale=0.2
      sheild.lifetime=500
      sheildg.add(sheild)
   }
}
