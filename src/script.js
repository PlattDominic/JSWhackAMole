/*
    - Dominic Martinez
    - Whack A Mole JS Project
    - 11 - 14 - 22
    - This will be a webpage in which users will play a game of whack a mole
*/

// Delay value for the changing of mole position
let MOLECHANGEDELAY = 500;

// Main HTML Element Variables
let timerDisplay = document.getElementById('game-timer');
let userScoreDisplay = document.getElementById('score');
let startButton = document.getElementById('start-button');
let gameItemsContainer = document.getElementById('game-items');
let gameItems = gameItemsContainer.querySelectorAll('img');


let currentTime;
let userScore = 0;
let currentItem;
let gameDone = false;
let gameTimeout;

// Function will be called when user clicks on start button
let InitializeGame = () => {
    // Disable button for user
    startButton.disabled = true;

    // Initialize current time and user score to default values
    currentTime = 30;
    userScore = 0;

    // Will reset HTML user score display
    userScoreDisplay.innerText = 0;

    // Will set gameDone to false, so game timers work
    gameDone = false;

    setTimeout(gameTimer, 1000);
    


    gameTimeout = setTimeout(setNewItem, MOLECHANGEDELAY);
}

let gameTimer = () => {
    // Pre decrement the current time and updates the HTML time display to the current time
    timerDisplay.innerText = `${--currentTime}s`;

    // If the current time is 0, set gameDone to true to 'end' game,
    // Also return out of function to timer stops
    if (currentTime <= 0) {
        gameDone = true;
        return;
    }
     
    // Continue the timer by using setTimeout 
    setTimeout(gameTimer, 1000);
}


let randomArrayItem = (array, id) => {
    // Will be item to will be set to random value in array
    let item;

    // Initialize a do-while loop, and set 'item' to a random value in the array
    // IF the new items ID is the same as one provided in parameters, reloop and set
    // a new value to 'item'
    do {
        item = array[Math.floor(Math.random()*array.length)];
    } while (item.id == id)

    // return the random item
    return item;
}
    

let setNewItem = () => {
    if (gameDone) {
        currentItem.removeEventListener('click', moleClick);
        startButton.disabled = false;
        clearTimeout(gameTimeout);
        return;
    }

    if (currentItem != null) {
        currentItem.src = 'img/dirt.svg';
        currentItem.removeEventListener('click', moleClick);
    }
    
    // Changes the current item to a new random one
    currentItem = randomArrayItem(gameItems);

    // 
    currentItem.src = 'img/mole.png';
    currentItem.addEventListener('click', moleClick);

        
    gameTimeout = setTimeout(setNewItem, MOLECHANGEDELAY);
}

// function is called when user clicks on mole
let moleClick = () => {
    // Update users score, and update the HTMl display for it
    userScore++;
    userScoreDisplay.innerText = userScore;

    // Stop the current timeout for the mole, and then set a new mole position
    clearTimeout(gameTimeout);
    setNewItem();
}
