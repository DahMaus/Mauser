const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let playerY = 0;
let velocityY = 0;
const gravity = 0.6;
const jumpStrength = -13;
let onGround = true;

let GameOver = false;

function drawPlayer() { //player shi
    velocityY += gravity;
    playerY += velocityY;

    if (playerY >= 0) {
        playerY = 0;
        velocityY = 0;
        onGround = true;
    }

    ctx.fillStyle = "red";
    ctx.fillRect(50, 300 + playerY, 100, 100);
}

function drawWorld(){ 
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, 400);
    ctx.lineTo(800, 400);
    ctx.lineWidth = 10;
    ctx.stroke();
}

let enemyX = 800;

function drawEnemy(){
    enemyX -= 10;

    ctx.fillStyle = "black";
    ctx.fillRect(enemyX, 350, 50, 50);

    if(enemyX == 0){
        enemyX = 800;
    }
}

function checkDeath(){
    if(enemyX < 155){
        if(Math.abs(playerY) < 25){
            GameOver = true;
        }
    }
}

canvas.addEventListener("pointerdown", () => {
    if (onGround) {
        velocityY = jumpStrength;
        onGround = false;
    }
});

function gameLoop() {
    if(GameOver) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWorld()
    drawPlayer();
    drawEnemy();

    checkDeath();

    requestAnimationFrame(gameLoop);
}

gameLoop();