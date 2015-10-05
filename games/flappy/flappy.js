 /*
    Don't try to read the source code. 
    It was written in one night during my sophomore year and I know it sucks. :P
    Beside, i've no intention on working on this part in near future. :P
 */
   var skore;
   (function(){
     canvasGame = document.getElementById('game_canvas');
     ctxGame = canvasGame.getContext('2d');
     
     canvasPipes = document.getElementById('pipes_canvas');
     ctxPipes = canvasPipes.getContext('2d');
     
     canvasFlappy = document.getElementById('flappy_canvas');
     ctxFlappy = canvasFlappy.getContext('2d');

     gOvCanv=document.getElementById("gOver");
     ctxgOvCanv =gOvCanv.getContext('2d');
   
     skore=document.getElementById("score");
        

     bigS=new Image();
    bigS.src='images/birdie.png';

    bg1=new Image();
    bg1.src='images/game1.png';
    bg2=new Image();
    bg2.src='images/game2.png';
    bg3=new Image();
    bg3.src ='images/game3.png';
    bg=bg3;

    sHeight=screen.availHeight;
    sWidth=screen.availWidth;
    
    gOv=document.getElementById("gOverWrapper");
    gOv.style.width=sHeight/2;
    gOv.style.width=sWidth/2;

    canvy=document.getElementsByTagName("canvas");
    for(canv=0;canv<3;canv++)
  { 
   canvy[canv].width=sWidth*0.99;
   canvy[canv].height=sHeight*0.8;
  if(canv==1)
    canvy[canv].style.top=(-18*sHeight/744)+"px";
  }  
    birdChoosen=false,fStyle="darkgreen";
     obstacle=[], gameWidth=canvy[1].width, gameHeight=canvy[1].height,bgDrawX1 = 0,bgDrawX2 = 2400,colorCode=[],bg_speed=7*sHeight/744,first_time=true,bg1X=0,bg2X=2400;
      isPlaying=true,flag=1,divd=3;
     skore.style.top=-(100*sHeight/744)+"px";


    })();

    window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       ||        //adding browser compatibility
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();
    
     

    
    function start(choice)
    {

         switch(choice){
        case 1:{
           bird=new Image();
           bird.src="images/phoenix.png";                                                   
          flappy=new createFlappy(10,190,95,90,1);

          
          break;
        }
       
        case 2:{
           bird=new Image();
          bird.src="images/bird.png";
          flappy=new createFlappy(0,70,63,50,2);      //blue berry

          break;
        }
        
         case 3:{
          
          bird=bigS;
          flappy=new createFlappy(3,490,17,12.5,3);        //normal flappy
          break;
        }

         case 4:{
          
          bird=new Image();
          bird.src="images/birds.png";
          flappy=new createFlappy(25,0,150,140,4); 
                 //normal flappy
          break;
        }


        default:alert("no bird chosen");
      }	
      birdChoosen=true;

          if(birdChoosen)
        {
         
          document.getElementById("top").style.display="none";
          definePipes();
          welcomeMsg();
        }
    }

    function welcomeMsg(){

        if(isPlaying)
        {
          ctxGame.drawImage(bigS,292,57,97,27,gameWidth/2.5,gameHeight/3,gameWidth/4,gameHeight/4);
          setTimeout(playGame,2000);
        }
        
        else
           {
            ctxPipes.clearRect(0,0,gameWidth,gameHeight);
            drawPipes();        
           gOv.style.display="block";
            ctxgOvCanv.drawImage(bigS,394,57,97,25,60,45,(sWidth/1366)*gameWidth/8,(sHeight/744)*gameHeight/8);

          }
           

    }
     
     
     
     
     
    function playGame()
    {
       // drawBg();                    //creating a backg
        startLoop();
        document.addEventListener('keydown', checkKeyDown);  //game controls
        document.addEventListener('keyup', checkKeyUp);
    }
     
    function checkKeyDown(e)
    {
        var keyID = e.keyCode || e.which;
        if (keyID === 32)
       { 
            flappy.isSpacebar = true;
            e.preventDefault();
        }
        
    }
     
    function checkKeyUp(e)
     {
        var keyID = e.keyCode || e.which;
       
          if (keyID === 32)
       {    flappy.isSpacebar = false;
            e.preventDefault();
        }
       
    }
     
     
    function drawBg() {
     
        ctxGame.clearRect(0, 0, gameWidth, gameHeight);
        
        ctxGame.drawImage(bigS, 292.5, 0, 90.5, 55, bgDrawX1, sHeight*0.7, 2450,sHeight*0.3);  //backg 1
        ctxGame.drawImage(bigS, 292.5, 0, 90.5, 55, bgDrawX2, sHeight*0.7, 2450,sHeight*0.3);   //backg 2*/drawBg

        ctxGame.drawImage(bg,0,0,1500,600,bg1X,0,2450,sHeight*0.7);
        ctxGame.drawImage(bg,0,0,1500,600,bg2X,0,2450,sHeight*0.7);


       if(!(bgFlag%3500))
          { 
            if(!bflc)
             { bg=bg1; fStyle="blue";}
            if(bflc==1)
             { bg=bg2; fStyle="skyblue";}
            if(bflc==2)
             { bg=bg3; fStyle="green";}
            if(bflc>2)
              bflc=-1;

            bflc++;
            bgFlag=1;
           }
           else
           bgFlag++; 
       
     
    }
   var bflc=0,bgFlag=1;
    function startLoop()
    {
        isPlaying = true;
        loop();
    }
     
     
    function loop()
    {
        if (isPlaying)
         {
            moveBg();
            drawBg();
            animatePipes();
            flappy.wipe();
            flappy.draw();
           
             checkHit();

            animationControl=requestAnimFrame(loop);
            
            if(!(flag%divd))
            {
              flappy.animateFlappy();
              flag=1;
            }
            else
              flag++;
        }
    }
     
    function animatePipes()
    {
     
      if(obstacle[249].x_init>0)
      {
     
            for(i=0;i<250;i++)
                obstacle[i].x_init-=bg_speed;        //all pipes shifted to left by 3px;
           
     
            movePipes();
     
     
      }
     
      else
      {
        definePipes(); 
      }
     
    }
     
     
     
    function moveBg() {
        bgDrawX1 -=bg_speed;
        bgDrawX2 -=bg_speed;
       
        bg1X-=bg_speed/2;
        bg2X-=bg_speed/2;

       
        if (bg1X <=-2400) {      
            bg1X = 2400;
        } else if (bg2X<=-2400) {
            bg2X = 2400;

        }

        if (bgDrawX1 <=-2300) {          
            bgDrawX1 = 2300;
        } else if (bgDrawX2<=-2300) {
            bgDrawX2 =2300;
        }
        drawBg();
       
    }
     
     
     
     
     
    var obstacle=[];
    var c=0;
    function createObstacle(X,H){
     this.index=c++;
     this.x_init=X;
     this.height=H;          
     this.width=(sWidth*80)/1366;
     this.hole=(100*sHeight)/744;         
     this.gap=(250*sHeight)/744;          
     this.totalHeight=sHeight; 

    
    
    }
     
     
     
      function movePipes(){
         
          wipePipes();
          drawPipes();
     
      }
     
      function definePipes()
    {
      var x1=800*sWidth/1366,h1,h2;
      for(i=0;i<250;i+=2)
            {
                      h1=Math.floor(Math.random()*(365*sHeight/744) );           
                      h2=Math.floor(Math.random()*(365*sHeight/744) );                
                        
                      while( !( ( Math.abs(h1-h2)< (200*sHeight/744) )&&(h1<365*sHeight/744)&&(h2<365*sHeight/744)&&h1>40*sHeight/744) ) 
                      {
                         h1=Math.floor(Math.random()*365*sHeight/744);
                         h2=Math.floor(Math.random()*365*sHeight/744);

                      }

                         x1+=250*sWidth/1366;
                         obstacle[i]= new createObstacle(x1,h1);
                         x1+=250*sWidth/1366;  
                         obstacle[i+1]= new createObstacle(x1,h2);
     
                        if(i==249)
                               break;
                        
            }

            
           
     
    }
     
    function drawPipes(){
           
     ctxPipes.fillStyle=fStyle;
      for(i=0;i<250;i+=2)
      {   
            ctxPipes.fillRect(obstacle[i].x_init,0,obstacle[i].width,obstacle[i].height);
            ctxPipes.fillRect(obstacle[i].x_init,( (100*sHeight/744)+obstacle[i].height),obstacle[i].width,(sHeight*0.57)-obstacle[i].height);
            ctxPipes.fill();


      }

      
     
     }
    
     function wipePipes(){
     
      ctxPipes.clearRect(0,0,gameWidth,gameHeight);
     }
     

     function createFlappy(sX,sY,sW,sH,index){
     

      this.srcX=sX;
      this.srcY= sY;
      this.width=sW;
      this.height=sH;
      this.indx=index;
      this.drawX=50*sWidth/1366;
      this.drawY=100*sHeight/744;
       
      this.radius=15*sHeight/744;         
    
      this.playerName="";
      this.isSpacebar=false;
     
     
    }

   createFlappy.prototype.animateFlappy=function(){  

       switch(this.indx)
       {
        case 1:
        {
          this.radius=20*sHeight/744;
          if(this.srcX<375&&this.srcX>9)
                this.srcX+=90;

            else
              this.srcX=10;
          break;
        }

        case 2:
           {
              this.radius=17*sHeight/744;
            if(this.srcX<255&&this.srcX>=0)
                this.srcX+=64;
            if(this.srcX>255)
              this.srcX=0;
            
            break;
           }
       
        case 3:
              { if(this.srcX<76&&this.srcX>=3)
                  this.srcX+=28;
             
                if(this.srcX>=76)
                  this.srcX=3;
              
                break;
              }

        case 4:
              { 
                
                 this.radius=20*sHeight/744;
                        if(this.srcX<915)
                        { 
                            if(!this.srcY)                        //first row 
                          {    
                            if(!first_time)
                              this.srcX+=182;

                            this.height=160;
                            this.width=140;
                            first_time=false;
                            
                            if(this.srcX>900)
                             { 
                               this.srcX=25;
                               this.srcY=210;
                               first_time=true;
                             }

                          }
                        
                        else if(this.srcY==210)                         //second row
                        
                         { 
                           if(!first_time)
                            this.srcX+=180;
                          
                          this.height=130;
                          this.width=145;
                          first_time=false;

                          if(this.srcX>900)
                             { 
                               this.srcX=25;
                               this.srcY=390;
                               first_time=true;
                             }
                         }
                            if(this.srcY>=370)                  //third row             // pain removed!!
                              {
                                if(this.srcX==25)
                                 {
                                   this.height=105;
                                   this.width=145;

                                   if(drawn)
                                   {
                                    this.srcX=210;
                                    drawn=false;
                                   }
                                  
                                }
                                else if(this.srcX==210)
                                 {
                                 
                                  this.height=105;
                                  this.width=150;
                                  if(drawn)
                                    {
                                      this.srcX=375;
                                      drawn=false;
                                    }
                                  
                                }
                                
                                else if(this.srcX==375)
                                 {
                                 
                                  this.height=105;
                                  this.width=165;
                                  if(drawn)
                                    {
                                      this.srcX=544;
                                      drawn=false;
                                    }
                                 }
                                else if(this.srcX==544)
                                 {
                                 
                                  this.height=105;
                                  this.width=155;
                                  if(drawn)
                                    {
                                      this.srcX=744;
                                      drawn=false;
                                    }
                                }
                                
                                else if(this.srcX>700)
                                  {
                                    this.srcX=25;
                                    this.srcY=0;
                                    drawn=false;
                                  } 
                              }
                          
                        }

                     
                       
                       

                  
                break;
              }
       
       }
    
  }

    createFlappy.prototype.draw=function(){
      if(!(this.isSpacebar))
      {
        this.drawY+=6*sHeight/744;
        if( (this.drawY+this.radius)>=(sHeight*0.635))         
          {  
            isPlaying=false;
            welcomeMsg();
             setTimeout(function(){document.getElementById("pAgain").style.display="block";},1000);
             drawn=false;
                   
     
          }

          
     
      }
      else 
      {  
        if(this.drawY<0)
          this.drawY=0;              
        else  
        this.drawY-=(3.4*sHeight/744);
      }
     
     
        ctxFlappy.drawImage(bird,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.radius*2,this.radius*2);
        drawn=true;
     
    }
    
    var drawn=false;

    createFlappy.prototype.wipe=function(){
     ctxFlappy.clearRect(0,0,gameWidth,gameHeight);
    }
     
     
    function checkHit()
    {      
        for(var i=0;i<250;i+=2)
        {
           
               
           
              if( flappy.drawX+flappy.radius>obstacle[i].x_init && flappy.drawX-flappy.radius<obstacle[i].x_init+obstacle[i].width-(10*sWidth/744))
             {    
                if(flappy.drawY+flappy.radius+(25*sHeight/744)<=obstacle[i].height||flappy.drawY>=obstacle[i].height+(35*sHeight/744))  
                  {
                    
                    flappy.playerName="Game Over "+flappy.playerName+"Your ";
                    moveBg();
                    drawPipes();
                    drawBg(); 
                    
                    

                    isPlaying=false;
                    
                    window.cancelAnimationFrame(animationControl);
                    welcomeMsg();
                    setTimeout(function(){document.getElementById("pAgain").style.display="block";},800);
                    

                  }

                  else
                  { 
                    sbSk(obstacle[i].index/2+1)
                    

                  }

               }
     
             
        }        
    }

  

    function screwAgain(){
      document.getElementById("pAgain").style.display="none";
      document.getElementById("top").style.display="block";
      location.reload();
    }

  


      var xmlhttp;
        function sbSk(sky)
        {    
          skore.innerHTML="Score: "+sky;
          // if (window.XMLHttpRequest)
          //   xmlhttp=new XMLHttpRequest();
            
          // else
          //   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); //for older IEs



          //  xmlhttp.onreadystatechange=function()
          //     {
          //     if (xmlhttp.readyState==4 && xmlhttp.status==200) //requst finished nd response is ready
          //          skore.innerHTML="Score: "+xmlhttp.responseText;
                        
               
              

          //     }

          //   xmlhttp.open("POST","sky.php",true);
          //   xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          //   xmlhttp.send("submitData="+sky);
              


          }

   
