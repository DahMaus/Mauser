const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let playerY = 0;
let velocityY = 0;
const gravity = 0.6;
const jumpStrength = -13;
let onGround = true;

let GameOver = false;

const p1 = new Image(); p1.src = "./Sprites/Maus.png";
const p2 = new Image(); p2.src = "./Sprites/Maus1.png";
const p3 = new Image(); p3.src = "./Sprites/Maus2.png";

let tick = 0;

function drawPlayer() { //player shi
    velocityY += gravity;
    playerY += velocityY;

    if (playerY >= 0) {
        playerY = 0;
        velocityY = 0;
        onGround = true;
    }

    tick++;
    if (tick > 40) tick = 0;

    let img = p1;
    if (tick > 10) img = p2;
    if (tick > 20) img = p1;
    if (tick > 30) img = p3;

    const scale = 6; 
    const w = img.width * scale;
    const h = img.height * scale;

    ctx.imageSmoothingEnabled = false; //USE THIS ELSE BLURRY SHIT D:
    ctx.drawImage(img, 50, 400 + playerY - h, w, h);
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
    if(enemyX < 125){
        if(Math.abs(playerY) < 50){
            GameOver = true;
        }
    }
}

canvas.addEventListener("pointerdown", () => {
    if (onGround) {
        velocityY = jumpStrength;
        onGround = false;
    }


    if(GameOver) {
        location.reload(); 
    }
});

let score = 0
function drawScore(){
    score += 0.1
    let showscore = Math.round(score)

    ctx.fillStyle = "black";
    ctx.font = "25px Arial";
    ctx.fillText("Highscore:" + showscore,10,35);
}

function drawGameOver(){
    ctx.fillStyle = "rgb(0 0 0 / 50%)";
    ctx.fillRect(0, 0, 800, 400); 

    let showscore = Math.round(score)

    ctx.fillStyle = "white"; // text color setting same as the otehrs lol
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER D:",200,200);
    ctx.font = "30px Arial";
    ctx.fillText("Highscore: " + showscore,200,250);
}

function gameLoop() {
    if(GameOver) { //Gameover screen
        drawGameOver();
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white"; //this da background 
    ctx.fillRect(0, 0, 800, 400); 


    drawWorld()
    drawPlayer();
    drawEnemy();

    drawScore();

    checkDeath();

    requestAnimationFrame(gameLoop);
}

gameLoop();