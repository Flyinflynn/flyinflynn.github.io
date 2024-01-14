document.addEventListener('DOMContentLoaded', function() {
    let projects = [
        { name: 'Maze Game', description: 'My very first project. Move the character to the finish line! Race to the end, but be careful of taking a wrong turn!' },
        { name: 'Memory Match', description: 'Try and find the matching images. This was my first attempt at incorporating images within a game' },
        { name: 'Stop the ball from falling', description: 'Move the platform to keep the ball alive. You have 3 lives!' },
        { name: 'Space Quiz', description: 'Answer space related questions. This was my introduction to APIs. The image on the screen is from NASAs Space Image of the Day and updates each day.' }
        // Add more projects here
    ];

    let projectsContainer = document.getElementById('projects');
    projects.forEach(project => {
        let projectElement = document.createElement('div');
        projectElement.classList.add('project-item');
        projectElement.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
        projectsContainer.appendChild(projectElement);
    });
});
