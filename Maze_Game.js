document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the canvas
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Ensure canvas size is set appropriately in the HTML or here
    canvas.width = 600; // Adjust as necessary
    canvas.height = 600; // Adjust as necessary

    // Define the player icon
    const player = {
        x: 50,
        y: 50,
        width: 20,
        height: 20,
        speed: 5
    };

    // Define the maze structure
    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        // ... more rows of the maze ...
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    const tileSize = 30; // Size of each tile in the maze

    // Draw the game
    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        drawPlayer();
        requestAnimationFrame(drawGame);
    }

    // Draw the player
    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    // Draw the maze
    function drawMaze() {
        for (let row = 0; row < maze.length; row++) {
            for (let col = 0; col < maze[0].length; col++) {
                if (maze[row][col] === 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
    }

    // Check if a move is allowed
    function canMove(x, y) {
        const col = Math.floor(x / tileSize);
        const row = Math.floor(y / tileSize);
        return maze[row][col] === 0;
    }

    // Handle keyboard input for player movement
    document.addEventListener('keydown', function(event) {
        let newX = player.x;
        let newY = player.y;

        switch(event.key) {
            case 'ArrowUp': newY -= player.speed; break;
            case 'ArrowDown': newY += player.speed; break;
            case 'ArrowLeft': newX -= player.speed; break;
            case 'ArrowRight': newX += player.speed; break;
            default: return; // exit this handler for other keys
        }

        // Check if the new position is within an open space
        if (canMove(newX, newY)) {
            player.x = newX;
            player.y = newY;
        }
    });

    // Start the game loop
    drawGame();
});
