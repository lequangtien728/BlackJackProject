const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const suits = ['s', 'c', 'd', 'h'];
// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();

let tempDeck = [...masterDeck];
let shuffledDeck = getNewShuffledDeck();
//----------------------------------End from James--------------------

// Variables

let dealerTotal;
let dealerCard;
let winner;
let playerCard;
let playerTotal;
let dealerTotalEl;
let dealerCardEl;
let winLoseEl;
let playerCardEl;
let playerTotalEl;


// Connect to HTML elments
dealerTotalEl = document.querySelector('#dealer-total');
dealerCardEl = document.querySelector('#dealer-card');
winLoseEl = document.querySelector('#win-lose');
playerCardEl = document.querySelector('#player-card');
playerTotalEl = document.querySelector('#player-total');

// Connect to HTML button with EventListener
const hitBtn = document.querySelector('#hit').addEventListener("click", hit);
const standBtn = document.querySelector('#stand').addEventListener("click", stand);
const restartBtn = document.querySelector('#restart').addEventListener("click", restart);

init();
function init(e){
  buildMasterDeck();
  tempDeck = getNewShuffledDeck();
  console.log(tempDeck)
  // Ace can be 1 or 11
  tempDeck.forEach(function(card){
    if (card.value ===1){
      card.value = 11;
    }
  });

  dealerCard = [];
  playerCard = [];
  //add first two cards to dealer
  dealerCard.push(tempDeck[0], tempDeck[1]);
  
 //add first two cards to player
  playerCard.push(tempDeck[3], tempDeck[4]);

 //add Dealer Card total amount

//Player total count when add up two cards
dealerTotal = dealerCardTotal();
//Player total count when add up two cards
playerTotal = playerCardTotal();



  

  render();
};

// Render function updates the view
function render () {
  renderDeckInContainer(dealerCard, dealerCardEl, true)
  renderDeckInContainer(playerCard, playerCardEl, false)
  dealerTotalEl.textContent = `Dealer Total: ${dealerTotal}`;
  playerTotalEl.textContent = `Player Total: ${playerTotal}`
  
};
//Calculate dealer Card total by using loop function
function dealerCardTotal(){
  total = 0;
  for (i = 0; i < dealerCard.length; i=i+1 ){
    total = total + dealerCard[i].value;
  }
  return total;
};

// Calculate player Card total by using lopp function
function playerCardTotal(){
  total = 0;
  for (i = 0; i < playerCard.length; i=i+1){
    total = total + playerCard[i].value;
  }
  return total;
};




//Card Deck function from James
// Build a 'master' deck of 'card' objects used to create shuffled decks

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

function renderDeckInContainer(deck, container, isDealer) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  let dealerAmount = 0;
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
//End Card Deck function from James

//Function that calculate cards on the board
function getCardsOnBoard(){
  return playerCard.length + dealerCard.length
};

//Function that add card to player
function hit(){
  //add card to player hand
  playerCard.push(tempDeck[getCardsOnBoard()]);
  //calculate playerTotal
  playerTotal = playerCardTotal();
  while (playerTotal > 21 && playerCard.some(card => card.value === 11)){
    playerCard.forEach(function(card){
      if(card.value === 11){
        card.value = 1;
        playerTotal = playerCardTotal();
        console.log(playerTotal, card.value);
      }
      if (playerTotal <= 21) return;
    });
  };
  if (playerTotal > 21){
    winner = 'computer- player busts'
  };
  render ();
  };



  //Function allow player to stand without drawing another card to end the turn and move to dealer turn.
function stand() {
  console.log('stay button test')
  // call dealerTurn()
  dealerTurn();
  // calculate playerTotal
  playerTotal = playerCardTotal();
  // if winner= null and playerTotal > dealerTotal, update winner to 'player
  if (winner === null && playerTotal > dealerTotal) {
      winner = 'player'
  } else if (winner === null && playerTotal === dealerTotal) {
      winner = 'tie'
  } else if (winner === null && playerTotal < dealerTotal) {
      winner = 'computer'
  }
  // call render()
  render();
};


//Function that adds cards to dealer hand if applicable, updates winner if applicable
function dealerTurn () {
  //while dealer total <17 add card to dealerHand
  while (dealerTotal < 17) {
      dealerCard.push(tempDeck[getCardsOnBoard()]);
      dealerTotal = dealerCardTotal();
  };
  //calculate dealerTotal
  dealerTotal = dealerCardTotal();
  //If aces are present, their value will be reduced until dealerTotal < 21
  while (dealerTotal > 21 && dealerCard.some(card => card.value === 11)){
  
      dealerCard.forEach(function(card){
          if (card.value === 11){
              card.value = 1;
              dealerTotal = dealerCardCTotal();
              console.log(dealerTotal, card.value);
          }
          if (playerTotal <= 21) return;
      });
      console.log(dealerTotal);
  //IF dealerTotal > 21 update winner to 'player' after reducing ace values 

  };
  if (dealerTotal > 21) {
      winner = 'player- dealer busts'
  };
  render ();
};
