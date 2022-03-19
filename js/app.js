//-----------------------------------From James_____________
// Cards constants: 
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));
//----------------------------------End from James--------------------

// Variables
let shuffledDeck; // Got this from James JS
let dealerTotal;
let dealerCard;
let winLose;
let playerCard;
let playerTotal;

// Connect to HTML elments
dealerTotalEl = document.querySelector('#dealerTotal');
dealerCardEl = document.querySelector('#dealerCard');
winLoseEl = document.querySelector('#winLose');
playerCardEl = document.querySelector('#playerCard');
playerTotalEl = document.querySelector('#playerTotal');
dealerStaysEl = document.querySelector('#dealerstays');

// Connect to HTML button with EventListener
const hitBtn = document.querySelector('#hit').addEventListener("click", hit);
const standBtn = document.querySelector('#stand').addEventListener("click", stand);
const restartBtn = document.querySelector('#restart').addEventListener("click", restart);


//---------------Card Deck function from James---------------------------

/*----- functions -----*/
function getNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
    }
  
function renderNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    shuffledDeck = getNewShuffledDeck();
    renderDeckInContainer(shuffledDeck, shuffledContainer);
    }
  
function renderDeckInContainer(deck, container) {
    container.innerHTML = '';
    // Let's build the cards as a string of HTML
    let cardsHtml = '';
    deck.forEach(function(card) {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    });
    // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
    // const cardsHtml = deck.reduce(function(html, card) {
    //   return html + `<div class="card ${card.face}"></div>`;
    // }, '');
    container.innerHTML = cardsHtml;
    }
  
function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          // Setting the 'value' property for game of blackjack, not war
          value: Number(rank) || (rank === 'A' ? 11 : 10)
        });
      });
    });
    return deck;
    }
  
  renderNewShuffledDeck();

  //---------------------End Card Deck function from James---------------------



// Function of ACE equal to 1 or 11

// Function of over 21 is Bursted

// Function to deal the player two cards

// Function to deal the Dealer cards. One face down and one face up.

// Function :Player click Hit to get card and add the amount to exist cards.

// Function: If the Dealer cards add below 17, the dealer has to draw another card. 
// Over 21 is burst

// Function of If Player card is higher than Dealer Card without going over 21. 
// Player win or else the Dealer win

// Function to restart the Game

//


