var game = new Phaser.Game(800, 600, Phaser.Auto, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var style, cursors, speedX = 150,
    speedY = 150,
    vectorX = 1,
    vectorY = 1,
    angularMovement = 5,
    currentNumber = 1
    score = 0;

function preload() {
    game.load.image('ball', '/assetsgames/football.png');
    game.load.image('goal', '/assets/games/goal.png');

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
}

function create() {
    //go full screen on mobile device
    if(!game.device.desktop){game.input.onDown.add(gofull, this);}
    game.stage.backgroundColor = '#11aa11';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

    ball = game.add.sprite(10, 10, 'ball');
    createTarget();


    ball.body.velocity.setTo(200, 200);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);
    ball.scale.setTo(0.1, 0.1);
    ball.anchor.setTo(0.5, 0.5);

    game.input.addPointer();

    game.input.onUp.add(function() {
      console.log('UP');
    });
    game.input.onDown.add(function() {
      console.log('DOWN');
    });
    game.input.onTap.add(function() {
      console.log('TAP');
    });

}

function update() {
    playerUpdate();
}

function createPlayer(x, y) {

}

function createTarget() {
    style = { font: "32px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: ball.width, align: "center"};
    
    var x = game.rnd.integerInRange(50, 700);
    var y = game.rnd.integerInRange(50, 500);
    //console.log("x: ", x, 'y: ', y);
    goal = game.add.sprite(x, y, 'goal');
    goal.scale.setTo(0.1, 0.1);
    game.physics.enable([ball, goal], Phaser.Physics.ARCADE);
    goal.body.immovable = true;
    text = game.add.text(goal.x+goal.width/2 ,goal.y+goal.height/2,currentNumber, style);
    text.anchor.setTo(0.5);
    goal.body.setSize(50, 50, goal.x+goal.width/2 - 50,goal.y+goal.height/2 - 50);
}

function playerUpdate() {

    game.physics.arcade.overlap(goal, ball, handleOverlap, null, this);
    
    if (cursors.left.isDown) {
        moveLeft();
    } else if (cursors.right.isDown) {
        moveRight();
    } else if (cursors.up.isDown) {
        moveUp();
    } else if (cursors.down.isDown) {
        moveDown();
    }
}

function moveLeft(){
    ball.body.velocity.setTo(-200, 0);
    ball.angle -= 5;
}

function moveRight(){
    ball.body.velocity.setTo(200, 0);
    ball.angle += 5;
}

function moveUp(){
    ball.body.velocity.setTo(0, -200);
    ball.angle -= 5;
}

function moveDown(){
    ball.body.velocity.setTo(0, 200);
    ball.angle += 5;
}

function handleOverlap(){
    //console.log('overlap');
    goal.destroy();
    text.destroy();
    currentNumber++;
    createTarget();
}

function render(){
    game.debug.pointer(game.input.mousepointer);
}