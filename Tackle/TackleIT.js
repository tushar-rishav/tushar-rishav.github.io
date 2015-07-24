 gamebg=document.getElementById('gamebg');
 gamebgCtx=gamebg.getContext('2d');
 
 bricks=document.getElementById('bricks');
 bricksCtx=bricks.getContext('2d');

 striker=document.getElementById('striker');
 strikerCtx=bricks.getContext('2d');

 platform=document.getElementById('platform');
 platformCtx=platform.getContext('2d');
 
 score=document.getElementById('score');
 scoreCtx=score.getContext('2d');

 scoreCtx.fillStyle = "white";
 scoreCtx.font = "bold 20px Arial";

 spriteImage= new Image();
 spriteImage.src='backgSpriteImg.png';
 
   var browsers = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < browsers.length && !window.requestAnimationFrame; ++x) 
      window.requestAnimationFrame = window[browsers[x]+'RequestAnimationFrame'];

   var requestAnimFrame=window.requestAnimationFrame;
 gameWidth=gamebg.width;
 gameHeight=gamebg.height;
 var brickCount=[],platformObj= new createPlatform(), strikerObj= new createStriker(),player1= new player(), bricksObj=[],bricksX=0,j, bricksY=0,platformHit=false,keypressed=0,foul=false,isStart=false,speed_control;
 var spclBricks= new Array(7);  //for creating spcl bricks
 for(var coord=0;coord<7;coord++)
 {

    var genRandom= Math.random();
   genRandom=(genRandom*100)%65;
   genRandom=parseInt(genRandom);
   spclBricks[coord]=genRandom;
 }
 function init()
 {  
    gamebgCtx.fillStyle="black";
    gamebgCtx.fillRect(0,0,gameWidth,gameHeight);
    for(i=0;i<65;i++)   
       {        //BRICK OBJECTS CREATED
         if(i==spclBricks[0]||i==spclBricks[1]||i==spclBricks[2]||i==spclBricks[3]||i==spclBricks[4]||i==spclBricks[5]||i==spclBricks[6])
            bricksObj.push(new createSpecialBricks());    
         else
            bricksObj.push(new createNormalBricks());
       }
   
    myLoop();
 }

 function myLoop(){
    if(foul){ 
          window.cancelAnimationFrame(animationControl);
          clearTimeout(speed_control);
      } 
     platformObj.draw();
     strikerObj.draw();
     drawBricks();
     animationControl=requestAnimFrame(myLoop);
 }
 function fallingBricks(){
  
   for(var i=0;i<brickCount.length;i++)
   {
      bricksObj[brickCount[i]].drawY+=2;
   }

 }

 function drawBricks()
 {  
  for(var i=0;i<65;i++)
    {      bricksObj[i].drawX=bricksX;
           bricksObj[i].drawY=bricksY;
         
           if(!bricksObj[i].hit)
             { 
                bricksObj[i].draw();
               
             }

           bricksX+=bricksObj[0].width;


           if(i==12||i==25||i==38||i==51)
           {
            bricksX=0;
            bricksY+=bricksObj[0].height+2;
           }
           
       
    }

    checkHit();
    bricksX=0;
    bricksY=0;
      
  }
var k=0;
function checkHit()
{

  for(j=0;j<65;j++)
  {   

        var rel_position_from_end= 13-(Math.round( (1+ Math.floor(j/13))*13-1 )-j)  ;
        var layer_no= ( (4- Math.floor(j/13) )*13-1 );
 
    if(!bricksObj[layer_no+rel_position_from_end].hit&&strikerObj.drawY<=5*(bricksObj[0].height-2) && strikerObj.drawY>(4-Math.floor(j/13) )*bricksObj[0].height&&strikerObj.drawX>=bricksObj[j].drawX&&strikerObj.drawX<=(bricksObj[j].drawX+bricksObj[0].width) )
     {  
         for(k=0;k<7;k++)
         {
          if((layer_no+rel_position_from_end)==spclBricks[k]) //match if the hit brick is spcl brick
               {
                bricksObj[layer_no+rel_position_from_end].hit_count++;
                bricksObj[spclBricks[k]].no_spcl=true;
                console.log(spclBricks[k]); 
               
               } 

          if(bricksObj[spclBricks[k]].hit_count==2)
              {
                
                bricksObj[spclBricks[k]].no_spcl=false;
              } 
            
          }
             

         if(!bricksObj[layer_no+rel_position_from_end].no_spcl)
            {  
               bricksObj[layer_no+rel_position_from_end].hit=true;
               player1.updateScore();
            }


        
        strikerObj.velocity_y*=-1;
       
      
      
      break;  
     }
  }
}

function checkIfGameOver(){

  for( var g=0;g<65;g++)
    if(!bricksObj[g].hit)
      return;
    else
     {
      alert("game over!");
          foul=true;
          strikerObj.drawX=gameWidth/2+platformObj.width/2;
          strikerObj.drawY=gameHeight-105;
          platformObj.drawX=gameWidth/2;
          platformObj.drawY=gameHeight-60;
          player1.nameIs="Game Over"
          player1.updateScore();
          isStart=false;
    }
}

 spriteImage.addEventListener('load',init, false);



function createNormalBricks(){
  this.srcX=10;
  this.srcY=200;
  this.drawX=0;
  this.drawY=0;
  this.height=20;
  this.width=100;
  this.hit=false;
  this.exists=true;
  this.no_spcl=false;         //to check if the brick hit was special
}

createNormalBricks.prototype.draw=function(){
 
  bricksCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
 
}



function createSpecialBricks(){
  this.srcX=10;
  this.srcY=300;
  this.drawX=0;
  this.drawY=0;
  this.height=20;
  this.width=100;
  this.hit=false;
  this.exists=true;
  this.hit_count=0;
  this.no_spcl=false;   
 
}

createSpecialBricks.prototype.draw=function()
{
 
 bricksCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
}



function player(){
  this.nameIs="Mr X";
  this.score=0;
}
 player.prototype.updateScore=function() {   // updating score point
    scoreCtx.clearRect(0, 0, gameWidth, gameHeight);
    player1.score+=1;
    scoreCtx.fillText(player1.nameIs+" Score: "+ player1.score, gameWidth/2,gameHeight-30);
}


function createStriker()
{
  this.srcX=10;
	this.srcY=400;
	this.width=30;
	this.height=30;
	this.velocity_x=7;
	this.velocity_y=-7;
	this.init_angle=Math.PI*45/180;
  this.drawX=gameWidth/2+platformObj.width/2;
	this.drawY=gameHeight-105;
  this.speed_count=0;

}

createStriker.prototype.draw=function()
{  clearStriker();
  if(isStart)
  {  
      checkForCollision();
      this.drawX+=this.velocity_x*Math.cos(this.init_angle);
      this.drawY+=this.velocity_y*Math.sin(this.init_angle);
      strikerCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
  }
   
  else
    strikerCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
   
 }


  createStriker.prototype.increase_speed= function(){
  this.velocity_x+=0.8;
  this.velocity_y-=0.8;
  this.speed_count++;
  console.log("speed increased"+this.velocity_y);
  if(this.speed_count>9)
  {
    this.velocity_x=7;
    this.velocity_y=-7;
  }
 

 }


function clearStriker()
{
	strikerCtx.clearRect(0,0,gameWidth,gameHeight);
}


 function checkForCollision() //for platform
 {  
   if(strikerObj.drawX>1278||strikerObj.drawX<10||strikerObj.drawY<10||strikerObj.drawY>(gameHeight-platformObj.height-60))
    {

    	if(strikerObj.drawY<0||strikerObj.drawY>(gameHeight-platformObj.height))
    	{   
    		if(strikerObj.drawY>(gameHeight-platformObj.height-60))
    		{   //game over
    			foul=true;
          strikerObj.drawX=gameWidth/2+platformObj.width/2;
          strikerObj.drawY=gameHeight-105;
          platformObj.drawX=gameWidth/2;
          platformObj.drawY=gameHeight-60;
          isGameNotOver=false;
          player1.nameIs="Game Over"
          player1.updateScore();
          isStart=false;
    			
    		}
    		else
    		{
    			 strikerObj.velocity_y*=-1;
				   strikerObj.velocity_x*=1;
           //modify
			  }

    	}

    	if(strikerObj.drawX>1278||strikerObj.drawX<10)
    	{
    		strikerObj.velocity_y*=1;
			  strikerObj.velocity_x*=-1;
    	}


   }


    	if((strikerObj.drawX>platformObj.drawX )&& (strikerObj.drawX<(platformObj.drawX+platformObj.width))&&(strikerObj.drawY>(gameHeight-platformObj.height-40) ) )  	
   			{
                 strikerObj.velocity_y*=-1;
                 foul=false;
                 changeReboundAngle();
                 strikerObj.increase_speed();
        }
       
   
 }
 
// trying to calibrate reflecting angle with the position where it hits the platform
 function changeReboundAngle()
 {
  var sX=strikerObj.drawX,pX=platformObj.drawX,angle=0,origin=pX+(platformObj.width/2);

    
    angle=(90/platformObj.width)*Math.abs(origin-sX)+45;
    strikerObj.init_angle=Math.PI*angle/180;  //CONVERTED TO RADIAN
 }

function createPlatform() {
	this.srcX=0;
	this.srcY=0;
	this.drawX=gameWidth/2;
	this.width=170;
	this.height=60;
	this.drawY=gameHeight-this.height;
  this.isRightKey=false;
	this.isLeftKey=false;
	this.isSpacebar=false;

}
createPlatform.prototype.draw=function(){
     clearPlatform();
     checkForKeys();
     platformCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
     
}
function clearPlatform(){
	platformCtx.clearRect(0,0,gameWidth,gameHeight);
}

    document.addEventListener('keydown', checkKeyDown, false);  //game controls
    document.addEventListener('keyup', checkKeyUp, false);



   function checkKeyUp(e){
   			 var keyID = e.keyCode || e.which;
    if (keyID === 39)
	{     platformObj.isRightKey = false;
        e.preventDefault();
    }
   
    if (keyID === 37 )
	{     platformObj.isLeftKey = false;
        e.preventDefault();
    }
    if (keyID === 32)
	{     platformObj.isSpacebar = false;
        e.preventDefault();
    }
   if(keyID===38||keyID==40)
   {
   	e.preventDefault();
   }

   }
    
 var isGameNotOver=true;
   function checkKeyDown(e){
      
       var  keyID = e.keyCode || e.which;
       
      if (keyID === 13&&isGameNotOver)
    {   isStart = true;
        player1.score=-1;
        player1.nameIs="Mr X";
        e.preventDefault();
    }
    if(keyID!==13&&!isStart)
      alert("Game has not begin.Press F5 and press <ENTER> to play");
  

	    if(isStart)
        {
          if (keyID === 39)
      	  {   platformObj.isRightKey = true;
              e.preventDefault();
          }
         
          if (keyID === 37 )
      	  {   platformObj.isLeftKey = true;
              e.preventDefault();
          }
          if (keyID === 32)
      	  {   platformObj.isSpacebar = true;
              e.preventDefault();
          }
    
        }
 
   }

   function checkForKeys()
   {
	    
      if(platformObj.isRightKey&&platformObj.drawX<1146)
        platformObj.drawX+=3;
      

      if(platformObj.isLeftKey&&platformObj.drawX>0)
         platformObj.drawX-=3;
      
      
      if(platformObj.isSpacebar&&platformObj.isLeftKey&&platformObj.drawX>0)
          platformObj.drawX-=5;
       

      if(platformObj.isSpacebar&&platformObj.isRightKey&&platformObj.drawX<1146)
          platformObj.drawX+=5;
   }


