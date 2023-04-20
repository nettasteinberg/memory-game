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
        isTwoCardsFlipped() ? (isMatchFound() ? resetVariables() : setTimeout(() => {noMatch()}, 2000)) : null;
    })
})

isTwoCardsFlipped = () => indicesOfFlippedCards[0] >=0 && indicesOfFlippedCards[1] >=0;

const isMatchFound =() => contentOfCard(indicesOfFlippedCards[0]) === contentOfCard(indicesOfFlippedCards[1]);

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
}

const contentOfCard = (index) => getCardBackByIndex(index).innerHTML;

const getCardByIndex = (index) => getCardInnerByIndex(index).parentElement;

const getCardInnerByIndex = (index) => document.querySelector(`[value="${index}"]`);

const getCardBackByIndex = (index) => getCardInnerByIndex(index).querySelector(".back");


/* Adding 'Randomize Board' button */
const div = document.createElement("div");
div.style.display = "flex";
div.style.justifyContent = "center";
const randomizeBoardButton = document.createElement("button");
randomizeBoardButton.classList.add("button");
randomizeBoardButton.innerText = "Randomize Board";

div.append(randomizeBoardButton);
body.append(div);

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
})