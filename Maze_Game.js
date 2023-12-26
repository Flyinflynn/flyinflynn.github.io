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
        width: 15,
        height: 15,
        speed: 15
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
    let movingDirection = null;
    let isMoving = false;

    // Define the startMoving, continueMoving, and stopMoving functions here
    function startMoving(direction) {
        if (!isMoving) {
            isMoving = true;
            movingDirection = direction;
            continueMoving();
        } 
    }

    function continueMoving() {
        // ... implementation ...
        if (isMoving) {
            movePlayer(movingDirection);
            requestAnimationFrame(continueMoving);
        }
    }

    function stopMoving() {
        // ... implementation ...
        isMoving = false;
    }
    // Check if a move is allowed
    function canMove(x, y) {
        const col = Math.floor(x / tileSize);
        const row = Math.floor(y / tileSize);
        return maze[row][col] === 0;
    }

    // Unified movement function for both keyboard and touch controls
    function movePlayer(direction) {
        let newX = player.x;
        let newY = player.y;
        let moveDistance = player.speed * 1; // Move twice the distance

        switch(direction) {
            case 'ArrowUp': newY -= player.speed; break;
            case 'ArrowDown': newY += player.speed; break;
            case 'ArrowLeft': newX -= player.speed; break;
            case 'ArrowRight': newX += player.speed; break;
        }

        // Check if the new position is within an open space
        if (canMove(newX, newY)) {
            player.x = newX;
            player.y = newY;
        }
    }

    // Handle keyboard input for player movement
    document.addEventListener('keydown', function(event) {
        movePlayer(event.key);
    });

      // Adding touch event listeners here
      const buttons = ['up', 'down', 'left', 'right'];
      const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  
      buttons.forEach((id, index) => {
        const button = document.getElementById(id);
        button.addEventListener('mousedown', () => startMoving(directions[index]));
        button.addEventListener('mouseup', stopMoving);
        button.addEventListener('mouseleave', stopMoving); // Stop moving if the cursor leaves the button while pressed
        button.addEventListener('touchstart', () => startMoving(directions[index]), {passive: true});
        button.addEventListener('touchend', stopMoving);
    });
    // Start the game loop
    drawGame();
});
