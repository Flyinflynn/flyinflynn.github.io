document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');
    const spaceImage = document.getElementById('space-image');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const scoreScreen = document.getElementById('score-screen');
    const scoreElement = document.getElementById('score');
    let currentQuestionIndex, score;

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartButton.addEventListener('click', startGame);

    async function startGame() {
        score = 0;
        currentQuestionIndex = 0;
        document.getElementById('welcome-screen').classList.add('hidden');
        scoreScreen.classList.add('hidden');
        document.getElementById('trivia-screen').classList.remove('hidden');
        await fetchAPOD();
        setNextQuestion();
    }

    async function fetchAPOD() {
        try {
            const apiKey = 'Ghqlco7NCPGKE8VnAKaTVcndaOchAGcQPa5QgZya'; // Replace with your NASA API key
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            spaceImage.src = data.url;
            spaceImage.alt = data.title;
            // Here, you can also fetch related trivia questions based on the data.title or other properties
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(button);
        });
    }

    function resetState() {
        nextButton.classList.add('hidden');
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        if (correct) {
            score++;
        }
        Array.from(optionsContainer.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (questions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hidden');
        } else {
            scoreElement.innerText = `Score: ${score}`;
            scoreScreen.classList.remove('hidden');
        }
    }

    function setStatusClass(element, correct) {
        element.classList.remove('correct', 'wrong');
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    // Sample questions - You should replace these with actual questions related to the APOD
    const questions = [
        {
            question: "What is the largest planet in our solar system?",
            answers: [
                { text: "Jupiter", correct: true },
                { text: "Saturn", correct: false },
                { text: "Neptune", correct: false },
                { text: "Mars", correct: false }
            ]
        },
        // More questions...
    ];
});

