// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
const ball = {
    radius: 10,
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 2,
    dy: -2
};

// Platform properties
const platform = {
    width: 75,
    height: 10,
    x: (canvas.width - 75) / 2
};

// Game properties
let lives = 3;
let rightPressed = false;
let leftPressed = false;

// Key down event handler
function keyDownHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = true;
    } else if (event.keyCode == 37) {
        leftPressed = true;
    }
}

// Key up event handler
function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false;
    } else if (event.keyCode == 37) {
        leftPressed = false;
    }
}

// Attach event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Reset ball and platform positions
function resetBallAndPlatform() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    ball.dx = 2;
    ball.dy = -2;
    platform.x = (canvas.width - platform.width) / 2;
}

// Draw ball function
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw platform function
function drawPlatform() {
    ctx.beginPath();
    ctx.rect(platform.x, canvas.height - platform.height, platform.width, platform.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Draw game over message
function drawGameOver() {
    ctx.font = "40px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Game Over", canvas.width / 2 - 120, canvas.height / 2);
}

// Collision detection between ball and platform
function ballPlatformCollision() {
    if (ball.y + ball.dy > canvas.height - ball.radius - platform.height && 
        ball.x > platform.x && ball.x < platform.x + platform.width) {
        ball.dy = -ball.dy;
    }
}

// Game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPlatform();
    drawLives();

    // Check for game over
    if (lives <= 0) {
        drawGameOver();
        return; // Stop the game loop
    }

    // Ball movement logic
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Collision detection with walls
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }

    // Collision detection between ball and platform
    ballPlatformCollision();

    // Check for ball hitting bottom
    if (ball.y + ball.dy > canvas.height - ball.radius) {
        lives--; // Lose a life
        if (lives > 0) {
            resetBallAndPlatform();
        } else {
            drawGameOver();
            return; // Stop the game loop when no lives left
        }
    }

    // Platform movement logic
    if (rightPressed && platform.x < canvas.width - platform.width) {
        platform.x += 7;
    } else if (leftPressed && platform.x > 0) {
        platform.x -= 7;
    }

    requestAnimationFrame(draw);
}

resetBallAndPlatform(); // Initialize ball and platform positions
draw(); // Start the game loop
