
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");



let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// const resetGame = () => {
//     // Reseting all game variables and UI
//     correctLetters = [];
//     wrongGuessCount = 0;
//     hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
//     guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
//     keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
//     wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
//     gameModal.classList.remove("show");
// }

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");

    // Remove animation if present
    document.getElementById("hangman-container").classList.remove("swing");
}


// Selecting a random word and hint from the word list
const getRandomWord = () => {
    const { word , hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

// const gameOver = (isVictory) => {
//     // After 600ms of game complete ... showing modal with relevant details
//     setTimeout(() => {
//         const modalText = isVictory ? `You found the word` : `The correct word was : `;
//         gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
//         gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats !' : 'Game Over !'}`;
//         gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord.toUpperCase()}</b>`;
//         document.getElementById("hangman-container").classList.add("swing");
//         gameModal.classList.add("show");
//     },300);
// }

// const gameOver = (isVictory) => {
//     setTimeout(() => {
//         const modalText = isVictory ? `You found the word` : `The correct word was : `;
//         gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
//         gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats !' : 'Game Over !'}`;
//         gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord.toUpperCase()}</b>`;
        
//         // Add swing animation on loss
//         if (!isVictory) {
//             document.getElementById("hangman-container").classList.add("swing");
//         }

//         gameModal.classList.add("show");
//     }, 300);
// };

// const gameOver = (isVictory) => {
//     if (!isVictory) {
//         // Start the swing animation immediately on loss
//         document.getElementById("hangman-container").classList.add("swing");
//     }

//     // Show modal after 3 seconds delay
//     setTimeout(() => {
//         const modalText = isVictory ? `You found the word` : `The correct word was : `;
//         gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
//         gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats !' : 'Game Over !'}`;
//         gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord.toUpperCase()}</b>`;
//         gameModal.classList.add("show");
//     }, 3000);
// };

const gameOver = (isVictory) => {
    if (!isVictory) {
        document.getElementById("hangman-container").classList.add("swing");
    }

    setTimeout(() => {
        const upperWord = currentWord.toUpperCase();
        const modalText = isVictory 
            ? `Well done, noble outlaw! ‘<b>${upperWord}</b>’ was correct, and you’ve saved a life from the Sheriff of Nottingham!` 
            : `Alas! You failed to guess ‘<b>${upperWord}</b>’. One of Robin Hood’s Merry Men has fallen.`;

        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = isVictory ? 'Victory!' : 'Captured!';
        gameModal.querySelector("p").innerHTML = modalText;
        gameModal.classList.add("show");
    }, isVictory ? 0 : 3000); // No delay on win, 3s delay on loss
};



// const initGame = (button, clickedLatter) => {
//     // Checking if clickedLetter is exist on the currentWord
//     if(currentWord.includes(clickedLatter)) {
//         // Show all correct word on the display 
//         [...currentWord].forEach((letter, index) => {
//             if(letter === clickedLatter) {
//                 correctLetters.push(letter);
//                 wordDisplay.querySelectorAll("li")[index].innerText = letter;
//                 wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
//             }
//         })
//     } else {
//         // if clicked letter doesn't correct then update the wrongguess count and hangman image
//         wrongGuessCount++;
//         hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
//     }

//     button.disabled = true;

//     guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

//     // Calling Game Over functions if any of these condition meets
//     // if(wrongGuessCount === maxGuesses) return gameOver(false);
//     if(wrongGuessCount === maxGuesses) {
//         keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
//         return gameOver(false);
//     }
    
//     if(correctLetters.length === currentWord.length) return gameOver(true);

// }


const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        // Show all correct letters on the display 
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter is wrong
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    // Disable the clicked button
    button.disabled = true;

    // Update guesses text
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Check for game over conditions

    if (wrongGuessCount === maxGuesses) {
        // Disable all keyboard buttons immediately
        keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
        
        // Start hangman swing animation immediately
        document.getElementById("hangman-container").classList.add("swing");
        
        // Show Game Over modal after 3 seconds delay
        setTimeout(() => {
            gameOver(false);
        }, 3000);
        return;
    }

    if (correctLetters.length === currentWord.length) {
        // Disable all keyboard buttons immediately
        keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);

        // Show Congrats modal immediately
        gameOver(true);
        return;
    }
}



// Creating Keyboard buttons and adding event listener
for(let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);

