const cards = document.querySelectorAll(".card"),
time = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refresh = document.querySelector(".text button");
let maxTime = 50;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;


function initTimer() {
    if(timeLeft <= 0) {
        alert ("Game over!");
        return clearInterval(timer); 
    } 
    timeLeft--;
    time.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
            if(matchedCard == 6 && timeLeft > 0)  {
              alert("You won!");
              matchedCard=0;
              return clearInterval(timer);
             } 
             
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;}
    
        

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200); 
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    time.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let array = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    array.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `resources/dog${array[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}
shuffleCard();

refresh.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
