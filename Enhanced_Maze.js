document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    let blockSize = 40; // Initial block size

    // Define a simple maze
    let maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        // Add more rows similar to the above
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    let player = { x: 1, y: 1, size: 20, color: 'blue' };

    function resizeCanvas() {
        const aspectRatio = 3 / 2; // Desired aspect ratio (e.g., 3:2)
        const maxCanvasWidth = window.innerWidth * 0.9;
        const maxCanvasHeight = window.innerHeight * 0.7;
        const sizeBasedOnWidth = maxCanvasWidth / aspectRatio;
        const sizeBasedOnHeight = maxCanvasHeight * aspectRatio;

        canvas.width = Math.min(maxCanvasWidth, sizeBasedOnHeight);
        canvas.height = Math.min(maxCanvasHeight, sizeBasedOnWidth);

        blockSize = Math.min(canvas.width / maze[0].length, canvas.height / maze.length);
        player.size = blockSize * 0.5;

        drawMaze();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawMaze() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw maze walls
        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                if (maze[y][x] === 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                }
            }
        }

        // Draw player
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x * blockSize, player.y * blockSize, player.size, player.size);
    }

    function movePlayer(dx, dy) {
        const newX = player.x + dx;
        const newY = player.y + dy;

        if (maze[newY] && maze[newY][newX] === 0) {
            player.x = newX;
            player.y = newY;
        }

        drawMaze();
    }

    window.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp': movePlayer(0, -1); break;
            case 'ArrowDown': movePlayer(0, 1); break;
            case 'ArrowLeft': movePlayer(-1, 0); break;
            case 'ArrowRight': movePlayer(1, 0); break;
        }
    });

    document.querySelectorAll('#controls button').forEach(button => {
        button.addEventListener('click', (e) => {
            const btnId = e.target.id;
            switch(btnId) {
                case 'up': movePlayer(0, -1); break;
                case 'down': movePlayer(0, 1); break;
                case 'left': movePlayer(-1, 0); break;
                case 'right': movePlayer(1, 0); break;
            }
        });

        // Prevent double-tap zoom on mobile devices
        preventDoubleTapZoom(button);
    });

    function preventDoubleTapZoom(element) {
        let lastTouchEnd = 0;
        element.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
});
