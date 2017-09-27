var game = new Phaser.Game(800, 600, Phaser.Auto, '', {
    preload: preload,
    create: create,
    update: update
});
var style, cursors, speedX = 150,
    speedY = 150,
    vectorX = 1,
    vectorY = 1,
    angularMovement = 5,
    currentNumber = 1;

function preload() {
    game.load.image('ball', '/assets/games/football.png');
    game.load.image('goal', '/assets/games/goal.png');
}

function create() {
    game.stage.backgroundColor = '#111111';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

    ball = game.add.sprite(10, 10, 'ball');
    createTarget();


    ball.body.velocity.setTo(200, 200);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);
    ball.scale.setTo(0.1, 0.1);
    ball.anchor.setTo(0.5, 0.5);


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
        ball.body.velocity.setTo(-200, 0);
        angularMovement = -5;
    } else if (cursors.right.isDown) {
        ball.body.velocity.setTo(200, 0);
        angularMovement = 5;
    } else if (cursors.up.isDown) {
        ball.body.velocity.setTo(0, -200);
        angularMovement = -5;
    } else if (cursors.down.isDown) {
        ball.body.velocity.setTo(0, 200);
        angularMovement = 5;
    }
    ball.angle += angularMovement;
}

function handleOverlap(){
    console.log('overlap');
    goal.destroy();
    text.destroy();
    currentNumber++;
    createTarget();
}