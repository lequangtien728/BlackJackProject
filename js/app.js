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
function init(){
  buildMasterDeck();
  tempDeck = getNewShuffledDeck();
  console.log(tempDeck)
  // Ace can be 1 or 11
  tempDeck.forEach(function(card){
    if (card.value ===1){
      card.value = 11;
    }
  });
  winner = null;
  dealerCard = [];
  playerCard = [];
  //add first two cards to dealer
  dealerCard.push(tempDeck[0], tempDeck[1]);
  
 //add first two cards to player
  playerCard.push(tempDeck[3], tempDeck[4]);

//Dealer total count when add up two cards
  dealerTotal = dealerCardTotal();
//Player total count when add up two cards
  playerTotal = playerCardTotal();
  console.log(dealerTotal,playerTotal)

  
  render();
};

// Render function updates the view
function render () {
  renderDeckInContainer(dealerCard, dealerCardEl, true)
  renderDeckInContainer(playerCard, playerCardEl, false)
  dealerTotalEl.textContent = `Dealer Total: ${dealerTotal}`;
  playerTotalEl.textContent = `Player Total: ${playerTotal}` 

  console.log(dealerTotal)
  console.log(playerTotal)
//In case the player get 21 for the first two cards: player win
  if (playerTotal === 21){
    winner = 'player'
  }
//In case the player get 21 for the first two cards: player win
  if (dealerTotal === 21){
    winner = 'dealer'
  }
// View game message on the browser
  if (winner === 'dealer'){
  winLoseEl.textContent = "Dealer WIN!"
 }else if (winner === 'player'){
  winLoseEl.textContent = "Player WIN!"
 }else if (winner === 'tie'){
  winLoseEl.textContent = "It's a tie"
 }else{
  winLoseEl.textContent=""
  console.log('else')
    };
   console.log(winLoseEl.textContent) 
   
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
  //disable hit button when the player is over 21 so the player would not draw more card
  
  if (playerTotal > 21){
    winner = 'dealer'
    hitButtonDisable();
  }
  
  render ();
  };


  //Function allow player to stand without drawing another card to end the turn and move to dealer turn.
function stand() {
  hitButtonDisable();
  
  // calculate playerTotal
  playerTotal = playerCardTotal();
  
  //while dealer total <16 add card to dealerHand
  while (dealerTotal < 16) {
      dealerCard.push(tempDeck[getCardsOnBoard()]);
      dealerTotal = dealerCardTotal();
  };
  //calculate dealerTotal
  dealerTotal = dealerCardTotal();
  console.log(dealerTotal)
  console.log(playerTotal)

  standButtonDisable()
  
  if(dealerTotal < playerTotal){
    winner = 'player'
  }

  if (dealerTotal === playerTotal){
    winner = 'tie'
  }
  else if (dealerTotal > 21) {
    winner = 'player'
  }
  else if (dealerTotal > playerTotal){
    winner = 'dealer'
  } 
  

  render();
};

//function to restart the game
function restart(){
  init();
  hitButtonEnable()
  standButtonEnable()
}

//add Disable button for Hit
function hitButtonDisable(){
  document.getElementById("hit").disabled = true;
}
//add Enable button for Hit
function hitButtonEnable(){
  document.getElementById("hit").disabled = false;
}
//add Disable button for Stand
function standButtonDisable(){
  document.getElementById("stand").disabled = true;
}
//add Enable button for Stand
function standButtonEnable(){
  document.getElementById("stand").disabled = false;
}

