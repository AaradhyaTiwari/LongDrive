function bridges(){
    if (frameCount % 100 === 0){
        bridge = createSprite(200,0,50,20);
        bridge.addImage("obstacle", bridgeImg);
        bridge.scale = 0.2;
        bridge.x = Math.round(random(500, 900));
        bridge.velocityY = (4 + score/100);
        bridge.lifetime = 200;
        bridgeGroup.add(bridge);
    }
}

function hearts(){
    if(frameCount%200 === 0){
        heart = createSprite(100,0,20,20);
        heart.addImage("life", heartImg);
        heart.scale = 0.09;
        heart.x = Math.round(random(520,840));
        heart.velocityY = (4 + score/100);
        heart.lifetime = 200;
        heartGroup.add(heart);
    }
}

function bullets(){
    bullet = createSprite(car.x, car.y - 30, 10,20);
    bullet.addImage("fire", bulletImg);
    bullet.scale = 0.05;
    bullet.velocityY = -10;
    bullet.lifetime = 200;
    bulletGroup.add(bullet);
}