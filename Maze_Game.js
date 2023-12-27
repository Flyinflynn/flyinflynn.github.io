document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the canvas
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Ensure canvas size is set appropriately in the HTML or here
    canvas.width = 600; // Adjust as necessary
    canvas.height = 450; // Adjust as necessary

    // Define the player icon
    const player = {
        x: 50,
        y: 50,
        width: 15,
        height: 15,
        speed: 15
    };

    let isGameOver = false;
    
    // Define the maze structure
    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 
        
    ];

    const tileSize = 30; // Size of each tile in the maze


    /// Define the finish point
    const finishPoint = {
        x: 5 * tileSize,  // x-coordinate of the finish point (2ndcolumn)
        y: 13 * tileSize // y-coordinate of the finish point (2nd row)
    };
    
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
                // Determine the color of the tile
                if (maze[row][col] === 1) {
                    ctx.fillStyle = 'black'; // Wall
                } else if ((col * tileSize === finishPoint.x && row * tileSize === finishPoint.y) ||
                           (col * tileSize === finishPoint.x - tileSize && row * tileSize === finishPoint.y)) {
                    ctx.fillStyle = 'green'; // Finish Point and tile to the left
                } else {
                    ctx.fillStyle = 'white'; // Open space
                }
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
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


    function checkCompletion() {
        // Check if the player's position overlaps or is very close to the finish point
        if (Math.abs(player.x - finishPoint.x) < player.width && Math.abs(player.y - finishPoint.y) < player.height) {
            displayCompletionMessage();
        }
    }
    
    
    function movePlayer(direction) {
        let newX = player.x;
        let newY = player.y;
        
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
    
        
        // Check for completion after updating position
        checkCompletion();
    }
    function checkCompletion() {
        if (!isGameOver && Math.abs(player.x - finishPoint.x) < player.width && Math.abs(player.y - finishPoint.y) < player.height) {
            displayCompletionMessage();
            isGameOver = true; // Set the game over flag
        }
    }


    
    function displayCompletionMessage() {
        // Display the completion message above the canvas
        const messageElement = document.createElement('div');
        messageElement.textContent = "Finish! Maze Complete!";
        messageElement.style.textAlign = 'center';
        messageElement.style.fontSize = '24px';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.marginBottom = '20px';
        document.body.insertBefore(messageElement, document.body.firstChild);
    
        // Stop the game or prevent further movement
        isMoving = false;
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
    function startMoving(direction) {
        if (!isMoving && !isGameOver) {
            isMoving = true;
            movingDirection = direction;
            continueMoving();
        } 
    }
    
    function stopMoving() {
        if (!isGameOver) {
            isMoving = false;
        }
    }
    // Start the game loop
    drawGame();
});
