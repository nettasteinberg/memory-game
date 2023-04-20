const cardsArray = [    
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
        // const front = inner.querySelector(".front");
        const back = inner.querySelector(".back");
        back.innerHTML = cardsArray[index];
        // console.log(back.style.transform);
        back.style.transform = "none";
        numberOfFlippedCards++;
        // setTimeout(() => {
        //     isTwoCardsFlipped() ? (isMatchFound() ? resetVariables() : noMatch()) : null;
        // }, 2000);
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