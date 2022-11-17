/*
    - Dominic Martinez
    - Whack A Mole JS Project
    - 11 - 14 - 22
    - This will be a webpage in which users will play a game of whack a mole and will use Timeouts to simulate a game timer and change of mole position
*/

// Delay value for the changing of mole position
let MOLECHANGEDELAY = 700;

// Main HTML Element Variables
let timerDisplay = document.getElementById('game-timer');
let userScoreDisplay = document.getElementById('score');
let startButton = document.getElementById('start-button');
let gameItemsContainer = document.getElementById('game-items');
// Contains all the images where the mole can be positioned at
let gameItems = gameItemsContainer.querySelectorAll('img');

// Current time will be used in the game timer and will be used to determine
// The current second of the timer
let currentTime;
// The user score will be displayed in HTML and will be incremented every time
// A user clicks on a mole
let userScore = 0;
// Will be used to determine the current position of the mole, which will be
// a HTML img element
let currentPosition;
// Will be used to determine if the game is done, once timer is up
let gameDone = false;
// This will store the ID of the setNewPosition timeout, and will be used
// To stop the timer
let positionTimeout;

// Function will be called when user clicks on start button
// Will Initialize game and setup variables
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

    // Begin a timeout for the game timer, this will timeout will continue going in 
    // gameTimer function
    setTimeout(gameTimer, 1000);
    

    // Begin a timeout for the mole spawning, and also assign the timer ID
    // To a variable so the timer is able to be cleared later
    positionTimeout = setTimeout(setNewPosition, MOLECHANGEDELAY);
}

// This function will be called when game is initialized and will act as the game
// timer and will end game once timer hits zero
let gameTimer = () => {
    // Pre decrement the current time and updates the HTML time display to the current time
    timerDisplay.innerText = `${--currentTime}s`;

    // If the current time is 0, set gameDone to true to 'end' game,
    // Also return out of function so timer stops
    if (currentTime <= 0) {
        gameDone = true;
        return;
    }
     
    // Continue the timer by using setTimeout 
    setTimeout(gameTimer, 1000);
}

// This function will return a random item from an array of HTML elements which will be used to 
// Determine which HTML img will be used to show Mole
// Array - the array to return a random item from, most likely gonna be gameItems array
// Id - the id of current HTML element, will be used to make sure that the same element is not
// used twice in a row
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
    

// The function will be called every 'MOLECHANGEDELAY' seconds, and will
// Change the position of the mole and remove the the mole from the last position
let setNewPosition = () => {
    // Check if game is done, and if so..
    if (gameDone) {
        // Remove current position event listener so user can't gain any more points
        currentPosition.removeEventListener('click', moleClick);
        // Renable button so user can reset game
        startButton.disabled = false;
        // Stop timeout, so moles stop spawning
        clearTimeout(positionTimeout);
        return;
    }

    // Check if the position is already set, if so set
    // Image back to dirt, and remove the event listener for it
    if (currentPosition != null) {
        currentPosition.src = 'img/dirt.svg';
        currentPosition.removeEventListener('click', moleClick);
    }
    
    // Changes the current position to a new random one
    currentPosition = randomArrayItem(gameItems);

    // Changes the image of the current position to mole and addEventListener
    // So it can read if user scores points
    currentPosition.src = 'img/mole.png';
    currentPosition.addEventListener('click', moleClick);

    // Continue setting a new position    
    positionTimeout = setTimeout(setNewPosition, MOLECHANGEDELAY);
}

// function is called when user clicks on mole
let moleClick = () => {
    // Update users score, and update the HTMl display for it
    userScore++;
    userScoreDisplay.innerText = userScore;

    // Stop the current timeout for the mole, and then set a new mole position
    clearTimeout(positionTimeout);
    setNewPosition();
}
