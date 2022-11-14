/*
    - Dominic Martinez
    - Whack A Mole JS Project
    - 11 - 14 - 22
    - This will be a webpage in which users will play a game of whack a mole
*/

// Main HTML Element Variables
let timerDisplay = document.getElementById('game-timer');
let userScoreDisplay = document.getElementById('score');
let startButton = document.getElementById('start-button');
let gameItemsContainer = document.getElementById('game-items');
let gameItems = gameItemsContainer.querySelectorAll('img');

let currentTime = 30;


let startGame = () => {
    setTimeout(gameTimer, 1000);
    
    let userScore = 0;
    
    gameItems = gameItemsContainer.querySelectorAll('img');

    randItem = gameItems[Math.floor(Math.random()*gameItems.length)];
    randItem.src = 'img/mole.png';

    randItem.addEventListener("click", event => {
        userScore++;
        userScoreDisplay.innerText = userScore;
    })

    setTimeout(setNewItem, 500, randItem);
}

let gameTimer = () => {
    timerDisplay.innerText = `${currentTime--}s`;
    if (currentTime <= 0) {
        return;
    }

    setTimeout(gameTimer, 1000);
}

let randomArrayItem = (array) => array[Math.floor(Math.random()*array.length)];

let setNewItem = (current) => {
    current.src = 'img/dirt.svg';

    return 
}
