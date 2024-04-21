// mazescript.js

const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 40;
let startTime;
let endTime;

const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 3, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const player = { x: 1, y: 1, moved: false };

function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = 'black';
            } else if (maze[y][x] === 2) {
                ctx.fillStyle = 'red';  // Failure point
            } else if (maze[y][x] === 3) {
                ctx.fillStyle = 'green';  // Finish point
            } else {
                ctx.fillStyle = 'white';
            }
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function move(direction) {
    if (!player.moved) {
        startTime = new Date();
        player.moved = true;
    }
    if (endTime) return;

    let newX = player.x;
    let newY = player.y;

    if (direction === 'up' && newY > 0) newY--;
    if (direction === 'down' && newY < maze.length - 1) newY++;
    if (direction === 'left' && newX > 0) newX--;
    if (direction === 'right' && newX < maze[0].length - 1) newX++;

    if (maze[newY][newX] === 1) return; // Wall
    if (maze[newY][newX] === 2) { // Failure point
        document.getElementById('message').textContent = 'Game Over!';
        endTime = new Date();
        return;
    }
    if (maze[newY][newX] === 3) { // Finish point
        endTime = new Date();
        const totalTime = (endTime - startTime) / 1000;
        document.getElementById('message').textContent = `Congratulations! You completed the maze in ${totalTime} seconds.`;
        return;
    }

    player.x = newX;
    player.y = newY;
    drawMaze();
    drawPlayer();
}

drawMaze();
drawPlayer();
