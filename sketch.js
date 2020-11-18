var tower, towerImage;
var door, doorImage, doorGroup, x;
var ghost, ghostImage;
var climber, climberImage, climberGroup;
var ib, ibGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var canvas;



function preload() {

  towerImage = loadImage('tower.png');
  doorImage = loadImage('door.png');
  climberImage = loadImage('climber.png')
  ghostImage = loadImage('ghost-jumping.png');
  ghostImage2 = loadImage('ghost-standing.png');

}

function setup()

{

  canvas = createCanvas(600, 600);

  tower = createSprite(300, 200);
  tower.addImage(towerImage);

  ghost = createSprite(300, 400);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;

  doorGroup = new Group();
  climberGroup = new Group();
  ibGroup = new Group();


}

function draw() {

  background(0);

  if (gameState === PLAY) {

    tower.velocityY = 1;

    if (tower.y > 300) {

      tower.y = 200;

    }

    if (climberGroup.isTouching(ghost)) {

      ghost.velocityY = 0;

    }

    if (ibGroup.isTouching(ghost)) {



    }

    if (keyDown('space')) {

      ghost.velocityY = -9

    }

    if (keyDown('LEFT_ARROW')) {

      ghost.x = ghost.x - 5;

    }

    if (keyDown('RIGHT_ARROW')) {

      ghost.x = ghost.x + 5;

    }

    ghost.velocityY = ghost.velocityY + 0.5;

    spawnDoor();

    if (ibGroup.isTouching(ghost) || ghost.y > 600) {

      gameState = END;

    }

  }

  if (gameState === END) {

    background(0);
    ghost.destroy();
    tower.visible = false;
    stroke('white');
    fill('white');
    textSize(60);
    text('GAME OVER', 125, canvas.height/2)

  }

  drawSprites();

}

function spawnDoor()

{

  if (frameCount % 300 === 0)

  {

    x = Math.round(random(200, 400))
    door = createSprite(x, -70);
    door.addImage(doorImage);
    door.velocityY = 1;
    doorGroup.add(door);
    door.lifetime = 750;
    door.debug = true;

    climber = createSprite(door.x, door.y + 50);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.lifetime = 750;
    //climber.debug = true;
    climberGroup.add(climber);

    ib = createSprite(climber.x, climber.y + 5, climber.width, 2);
    ib.velocityY = climber.velocityY;
    ib.velocityX = climber.velocityX;
    ibGroup.add(ib);
    ib.lifetime = 750;
    //ib.debug = true;

    ghost.depth = door.depth + 1;


  }


}