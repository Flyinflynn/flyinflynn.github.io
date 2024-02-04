// Memory Match Game

document.addEventListener('DOMContentLoaded', () => {

    // Card options
    const cardArray = [
        { name: 'apple', img: 'flyinflynn.github.io/MemoryMatchGame/Images/apple.png' },
        { name: 'banana', img: 'flyinflynn.github.io/MemoryMatchGame/Images/banana.png' },
        { name: 'orange', img: 'flyinflynn.github.io/MemoryMatchGame/Images/orange.png' },
        { name: 'watermelon', img: 'flyinflynn.github.io/MemoryMatchGame/Images/watermelon.png' },
        { name: 'apple', img: 'flyinflynn.github.io/MemoryMatchGame/Images/apple.png' },
        { name: 'banana', img: 'flyinflynn.github.io/MemoryMatchGame/Images/banana.png' },
        { name: 'orange', img: 'flyinflynn.github.io/MemoryMatchGame/Images/orange.png' },
        { name: 'watermelon', img: 'flyinflynn.github.io/MemoryMatchGame/Images/watermelon.png' },
        // Add more card pairs
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // Create game board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    // Check for matches
    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        
        if (optionOneId == optionTwoId) {
            alert('You have clicked the same image!');
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match');
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('Sorry, try again');
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congratulations! You found them all!';
        }
    }

    // Flip your card
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();
});
