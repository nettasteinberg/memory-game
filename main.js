const body = document.querySelector("body");
let cardsArray = [    
    '&#128525;','&#128525;',
    '&#128561;','&#128561;',
    '&#128564;','&#128564;',
    '&#128520;','&#128520;',
    '&#128545;','&#128545;',
    '&#129313;','&#129313;']

let numberOfFlippedCards = 0;
let indicesOfFlippedCards = [-1, -2];
const playersScores = [0, 0];
let playerTurn = 0;
let matchedPairs = 0;

const cards = document.querySelectorAll(".card");
cards.forEach(function(card) {
    card.addEventListener("click", function(event) {
        if (card.classList.contains("flipped")) {
            return;
        }
        card.classList.add("flipped");
        const inner = card.querySelector(".inner");
        const index = indicesOfFlippedCards[numberOfFlippedCards] = inner.attributes.value.value;
        const back = inner.querySelector(".back");
        back.innerHTML = cardsArray[index];
        back.style.transform = "none";
        numberOfFlippedCards++;
        isTwoCardsFlipped() ? (isMatchFound() ? matchFound() : setTimeout(() => {noMatch()}, 1500)) : null;
    })
})

isTwoCardsFlipped = () => indicesOfFlippedCards[0] >=0 && indicesOfFlippedCards[1] >=0;

const isMatchFound =() => contentOfCard(indicesOfFlippedCards[0]) === contentOfCard(indicesOfFlippedCards[1]);

const matchFound = () => {
    resetVariables();
    playersScores[playerTurn]++;
    refreshScore();
    matchedPairs++;
    if (matchedPairs === cardsArray.length / 2) {
        const winnerIndex = playersScores[0] > playersScores[1] ? 0 : playersScores[0] < playersScores[1] ? 1 : 2;
        switch(winnerIndex) {
            case 0:
            case 1:
                gameOver.innerHTML = `Player ${playerTurn + 1} is the winner`;
                break;
            case 2:
                gameOver.innerHTML = "It's a tie!";
        }
        gameOver.style.backgroundColor = "red";
    }
}

const refreshScore = () => {
    const playerScores = Array.prototype.slice.call(document.querySelectorAll('.score'));
    for (let i = 0; i < playerScores.length; i++) {
        playerScores[i].innerHTML = `Player ${i+1} score: ${playersScores[i]}`;
    }
   
}

const resetVariables = function() {
    numberOfFlippedCards = 0;
    indicesOfFlippedCards = [-1, -2];
}

const noMatch = function() {
    indicesOfFlippedCards.forEach(function(index) {
        const card = getCardByIndex(index);
        card.classList.remove("flipped");
        getCardBackByIndex(index).style.transform = "rotateY(180deg)";
    })
    resetVariables();
    playerTurn = playerTurn === 0 ? 1 : 0;
    refreshTurnDisplay();
}

const contentOfCard = (index) => getCardBackByIndex(index).innerHTML;

const getCardByIndex = (index) => getCardInnerByIndex(index).parentElement;

const getCardInnerByIndex = (index) => document.querySelector(`[value="${index}"]`);

const getCardBackByIndex = (index) => getCardInnerByIndex(index).querySelector(".back");


/* Adding 'Randomize Board' button */
const RandomizeButtonDiv = document.createElement("div");
RandomizeButtonDiv.style.display = "flex";
RandomizeButtonDiv.style.justifyContent = "center";
const randomizeBoardButton = document.createElement("button");
randomizeBoardButton.classList.add("button");
randomizeBoardButton.innerText = "Randomize Board";

RandomizeButtonDiv.append(randomizeBoardButton);
body.append(RandomizeButtonDiv);

randomizeBoardButton.addEventListener("click", function(event) {
    let newCardArray = [];
    while(cardsArray.length > 0) {
        const index = Math.floor(Math.random() * cardsArray.length);
        newCardArray.push(cardsArray[index]);
        cardsArray = cardsArray.toSpliced(index, 1);
    }
    cardsArray = newCardArray;

    const cards = document.querySelectorAll(".card");
    cards.forEach(function(card) {
            if (card.classList.contains("flipped")) {
                card.classList.toggle("flipped");
            }
            const inner = card.querySelector(".inner");
            const index = indicesOfFlippedCards[numberOfFlippedCards] = inner.attributes.value.value;
            const back = inner.querySelector(".back");
            back.innerHTML = "";
            back.style.transform = "rotateY(180deg)";
            resetVariables();
    })
    for (let i = 0; i < playersScores.length; i++) {
        playersScores[i] = 0;
    }
    refreshScore();
    playerTurn = 0;
    refreshTurnDisplay();
    matchedPairs = 0;
})


/* Adding Score */
const scoreDiv = document.createElement("div");
scoreDiv.style.display = "flex";
scoreDiv.style.justifyContent = "space-around";
const scorePlayer1 = document.createElement("p");
scorePlayer1.classList.add("score");
scorePlayer1.innerHTML = `Player 1 score: ${playersScores[0]}`;
const scorePlayer2 = document.createElement("p");
scorePlayer2.classList.add("score");
scorePlayer2.innerHTML = `Player 2 score: ${playersScores[1]}`;

scoreDiv.append(scorePlayer1, scorePlayer2);
body.append(scoreDiv);

const playerTurnDiv = document.createElement("div");
playerTurnDiv.style.display = "flex";
playerTurnDiv.style.justifyContent = "center";
const turn = document.createElement("h1");
turn.innerHTML = `Player ${playerTurn + 1}'s turn`;
playerTurnDiv.append(turn);
body.append(playerTurnDiv);

const refreshTurnDisplay = function() {
    turn.innerHTML = `Player ${playerTurn + 1} turn`;
}


/* Game Over */
const gameOverDiv = document.createElement("div");
gameOverDiv.style.display = "flex";
gameOverDiv.style.justifyContent = "center";
const gameOver = document.createElement("h1");
gameOverDiv.append(gameOver);
body.append(gameOverDiv);