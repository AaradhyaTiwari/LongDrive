var PLAY =1;
var END =0;
var gameState = PLAY;

var road, roadImg;
var bridgeGroup, bridgeImg;
var heartGroup, heartImg;
var car, carImg, bullet, bulletGroup, bulletImg;
var score, rightside, rightImg, leftside,  leftImg;
var gameOver, gameoverImg, msg, msgImg;

function preload(){
    roadImg = loadImage("images/road.png");
    
    bridgeImg = loadImage("images/bridge.png");
    heartImg = loadImage("images/heart.png");
    bulletImg = loadImage("images/bullet.png");

    rightImg = loadImage("images/right.png");
    leftImg = loadImage("images/left.png");

    carImg = loadImage("images/car.png");
    gameoverImg = loadImage("images/game-over.png");
    msgImg = loadImage("images/msg.png");
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    //400,600
    road = createSprite(width/2,height/2,width,height);
    road.addImage("moving", roadImg);
    road.scale = 3;
    road.velocityY = 4;
    road.y = road.height/2;

    car = createSprite(width/2,height-25,20,50);
    car.addImage("hero", carImg);
    car.scale = 0.1;

    rightside = createSprite(10,30,20,20);
    rightside.addImage(rightImg);
    rightside.scale = 0.02;
    leftside = createSprite(10,60,20,20);
    leftside.addImage(leftImg);
    leftside.scale = 0.02;

    bridgeGroup = createGroup();
    heartGroup = createGroup();
    bulletGroup = createGroup();

    gameOver = createSprite(width/2,height/2);
    gameOver.addImage("game over",gameoverImg);
    gameOver.scale = 0.6;
    gameOver.visible = false;
    msg = createSprite(width/2,height/2 - 100);
    msg.addImage("message",msgImg);
    msg.scale = 0.6;
    msg.visible = false;
    
    score = 0;
}

function draw(){
    background("black");

    if(gameState===PLAY){

        if(road.y > 600){
            road.y = road.height/2;
        }

        //car controls
        if(keyDown(RIGHT_ARROW)){
            car.x = car.x + 10;
        }
        if(keyDown(LEFT_ARROW)){
            car.x = car.x - 10;
        }
        if(keyDown("SPACE")){
            bullets();
        }
        
        bridges();
        hearts();
        
        //actions in game
        if(bridgeGroup.isTouching(bulletGroup)){
            bridgeGroup.destroyEach();
            bulletGroup.destroyEach();
            score = score + 20;
        }
        if(car.isTouching(bridgeGroup)){
            bridgeGroup.destroyEach();
            score = score - 20;
        }
        if(car.isTouching(heartGroup)){
            heartGroup.destroyEach();
            score = score + 50;
        }
        
        
        if(car.x < 520 || car.x > 840){
           gameState = END;
        }
        console.log(car.x);
    }

    if(gameState === END){
        car.destroy();
        road.velocityY = 0;
        bridgeGroup.setVelocityYEach(0);
        heartGroup.setVelocityYEach(0);
        bridgeGroup.setLifetimeEach(-1);
        heartGroup.setLifetimeEach(-1);
       
        gameOver.visible = true;
        msg.visible = true;
        
    }
    
    drawSprites();

    textSize(20);
    fill("white");
    text("SPACE", 5,15);

    textSize(15);
    fill("aqua");
    text("Score: "+ score, width - 100,15);
}