document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the canvas
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let startTime = null; // Start time
    let isGameOver = false;

    // Ensure canvas size is set appropriately in the HTML or here
    canvas.width = 600; // Adjust as necessary
    canvas.height = 450; // Adjust as necessary

    // Define the player icon
    const player = {
        x: 40,
        y: 37,
        width: 15,
        height: 15,
        speed: 15
    };

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

    // Define the failure point
    const failurePoint = {            
        x: 15 * tileSize,  // Example: x-coordinate of the failure point   
        y: 3 * tileSize   // Example: y-coordinate of the failure point
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
                } else if (col * tileSize === failurePoint.x && row * tileSize === failurePoint.y) {
                    ctx.fillStyle = 'red'; // Failure Point
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
        if (!isMoving && !isGameOver) {
            if (startTime === null) {
                startTime = Date.now();
            }
            
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
        if (!isGameOver && Math.abs(player.x - finishPoint.x) < player.width && Math.abs(player.y - finishPoint.y) < player.height) {
            displayCompletionMessage();
            isGameOver = true;
        }
    }

    function checkFailure() {
        if (!isGameOver && Math.abs(player.x - failurePoint.x) < player.width && Math.abs(player.y - failurePoint.y) < player.height) {
            displayFailureMessage();
            isGameOver = true;
        }
    }

    function movePlayer(direction) {
        if (startTime === null && !isGameOver) {
            startTime = Date.now();
        }
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
    
        // Check for completion and failure after updating position
        checkCompletion();
        checkFailure(); // Added call to checkFailure() function
    }

    function displayCompletionMessage() {
        const endTime = Date.now(); // Get the end time
        const timeTaken = (endTime - startTime) / 1000; // Calculate the time taken in seconds

        // Display the completion message with time taken
        const messageElement = document.createElement('div');
        messageElement.textContent = "Finish! Maze Complete! Time taken: " + timeTaken.toFixed(2) + " seconds";
        messageElement.style.textAlign = 'center';
        messageElement.style.fontSize = '24px';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.marginBottom = '20px';
        document.body.insertBefore(messageElement, document.body.firstChild);

        isMoving = false;
    }

    function displayFailureMessage() {
        const messageElement = document.createElement('div');
        messageElement.textContent = "Game Over! You've hit the failure point!";
        messageElement.style.textAlign = 'center';
        messageElement.style.fontSize = '24px';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.marginBottom = '20px';
        document.body.insertBefore(messageElement, document.body.firstChild);
    
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
            if (startTime === null) { // Start the timer on first move
                startTime = Date.now();
            }
            isMoving = true;
            movingDirection = direction;
            continueMoving();
        } 
    }

    // Start the game loop
    drawGame();
});
