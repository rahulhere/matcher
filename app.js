// card  options

const cardArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
var cardsChosen = [];
var cardsChosenId = [];
var cardsWon = [];

// Making the Board

function createBoard() {
  for (var i = 0; i < cardArray.length; i++) {
    var card = document.createElement("img");
    card.setAttribute("src", "images/Capture.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);

    grid.appendChild(card);
  }
}

// check for matches

function checkForMatch() {
  // added anim here

  var cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if (optionOneId == optionTwoId) {
    // This part is useless now but if I remove it then some part of your code breaks so kept it just to save a bit of Time.
    // cards[optionOneId].setAttribute("src", "images/Capture.png");
    // cards[optionTwoId].setAttribute("src", "images/Capture.png");
  } else if (cardsChosen[0] === cardsChosen[1]) {
    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    // console.log(cards[optionOneId]);
    $(cards[optionOneId]).addClass("flip-half");
    $(cards[optionTwoId]).addClass("flip-half");
    setTimeout(() => {
      cards[optionOneId].setAttribute("src", "images/Capture.png");
      cards[optionTwoId].setAttribute("src", "images/Capture.png");
    }, 500);
    setTimeout(() => {
      $(cards[optionOneId]).removeClass("flip-half");
      $(cards[optionTwoId]).removeClass("flip-half");
    }, 1000);

    cards[optionOneId].setAttribute("src", "images/Capture.png");
    cards[optionTwoId].setAttribute("src", "images/Capture.png");
  }

  cardsChosenId = [];
  cardsChosen = [];
  resultDisplay.textContent = cardsWon.length;

  if (cardsWon.length === cardArray.length / 2) {
    $("button").css("opacity", "1");
    resultDisplay.textContent = "You Won !!!!";
  }

  $("button").on("click", function () {
    location.reload();
  });
}

// Flip Card

function flipCard() {
  var cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);

  console.log(cardsChosen);

  // added anim here
  $(this).addClass("flip");
  setTimeout(() => {
    if (cardsChosen[1] && cardsChosen[0] === cardsChosen[1]) {
      this.setAttribute("src", "images/Capture.png");
    } else {
      this.setAttribute("src", cardArray[cardId].img);
    }
  }, 375);
  setTimeout(() => {
    $(this).removeClass("flip");
  }, 500);

  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 700);
  }
}

createBoard();
