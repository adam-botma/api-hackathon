var rickData;
var mortyData;
var rickURL = 'https://rickandmortyapi.com/api/character/?name=rick&status=alive';
var mortyURL = 'https://rickandmortyapi.com/api/character/?name=morty&status=alive';
var mortyDeck = [];
var rickDeck = [];
var currentCard;
var currentOpponentCard;
var yourScore = 0;
var opponentsScore = 0;
var playCount= 0;
var playerCard= document.getElementById('players-card');
var opponentCard = document.getElementById('opponent-card-slot');
var winnerModalText = document.getElementById('winner');
var winnerModal = document.getElementById('winner-modal');
var playerCardImage = document.getElementById('charImg');
var playerCardStrength = document.getElementById('charStrength');
var playerCardName = document.getElementById('charName');
var opponentCardImage = document.getElementById('charImgOpponent');
var opponentCardStrength = document.getElementById('charStrengthOpponent');
var opponentCardName = document.getElementById('charNameOpponent');
var playerWinnerIndicator = document.getElementById('player-winner');
var opponentWinnerIndicator = document.getElementById('opponent-winner');
var playerWinnerGIF = document.getElementById('player-winner-gif');
var opponentWinnerGIF = document.getElementById('opponent-winner-gif');
document.getElementById('reset-button').addEventListener('click', resetGame);
document.getElementById('deal').addEventListener('click', playRound);
apiCall(rickURL);
apiCall(mortyURL);
buildGiphyLibrary(rickGiphyURL, rickGiphLibrary);
buildGiphyLibrary(mortyGiphyURL, mortyGiphLibrary);


function playRound () {
  playerWinnerGIF.setAttribute('src', '');
  opponentWinnerGIF.setAttribute('src','');
  pickRandomCard(rickDeck);
    opponentsTurn(mortyDeck);
    checkBattle();
}


function refreshBoard () {
  playerCard.classList.add('hidden');
}


function checkScore(){
  if (playCount === 10) {
    if (yourScore > opponentsScore) {
      console.log('you won');
      winnerModalText.textContent ='you won!';
      winnerModal.classList.remove('hidden');

    } else if (opponentsScore > yourScore) {
      console.log('you lost');
      winnerModalText.textContent = 'you lost!';
      winnerModal.classList.remove('hidden');
    } else {
      console.log('you tied?!');
      winnerModalText.textContent = 'a tie!?';
      winnerModal.classList.remove('hidden');
    }

  }
}

function fillDecks (){
  fillCards (rickData, rickDeck);
  fillCards (mortyData, mortyDeck);

}

function apiCall (url){

  $.ajax({
    url: url,
    success: successfulCall,
    error: failedCall,
  })
}

  function successfulCall (e){

    if (e.results[0].name === 'Rick Sanchez' ){
    rickData = e.results;
    fillCards(rickData, rickDeck);
    } else if (e.results[0].name === 'Morty Smith'){
      mortyData = e.results;
      fillCards(mortyData, mortyDeck);
    }
}

function failedCall (e){
  console.log('fail', e);
}


function fillCards (characterData, characterDeck) {

  for (var index = 0 ; index < characterData.length; index++){
    var card = new Card (characterData[index].name, characterData[index].species, characterData[index].image, index+1);
    characterDeck.push(card);
  }
}

function pickRandomCard(playerDeck) {
  playerWinnerIndicator.className = "winner-div blink hidden";
  opponentWinnerIndicator.className = "winner-div blink hidden";
  var pickedIndex = Math.floor(Math.random() * playerDeck.length);
    currentCard = playerDeck[pickedIndex];
    console.log(currentCard);

    playerCardImage.style.backgroundImage = "url("+currentCard.image+")";
    playerCardImage.style.border = "solid white 4px";
    playerCardStrength.textContent = currentCard.strength;
    playerCardName.textContent = currentCard.name;
  playerDeck.splice(pickedIndex,1);
  playerCard.style.backgroundImage = "url(images/front1.png";


}


function opponentsTurn(playerDeck){
  var pickedIndexOpponent = Math.floor(Math.random() * playerDeck.length);
  currentOpponentCard = playerDeck[pickedIndexOpponent];

  opponentCardImage.style.backgroundImage = "url(" + currentOpponentCard.image + ")";
  opponentCardImage.style.border = "solid white 4px";
  opponentCardStrength.textContent = currentOpponentCard.strength;
  opponentCardName.textContent = currentOpponentCard.name;
  playerDeck.splice(pickedIndexOpponent, 1);
  opponentCard.style.backgroundImage = "url(images/front1.png)";

}

function checkBattle (){
  console.log(currentCard.strength);
  console.log(currentOpponentCard.strength);
  if( currentCard.strength > currentOpponentCard.strength){
    console.log('you win this battle!');
    yourScore ++
    playCount ++
    playerWinnerIndicator.classList.remove('hidden');
    document.getElementById('theScore').textContent = yourScore;
    playerWinnerGIF.setAttribute('src',rickGiphLibrary[Math.floor(Math.random()
    * rickGiphLibrary.length)]);
    checkScore();
  } else if (currentCard.strength < currentOpponentCard.strength){
    console.log('morty got ya this time');
    opponentsScore ++
    playCount ++
    opponentWinnerIndicator.classList.remove('hidden');
    document.getElementById('opponentsScore').textContent = opponentsScore;
    opponentWinnerGIF.setAttribute('src', mortyGiphLibrary[Math.floor(Math.random()
    * mortyGiphLibrary.length)]);
    checkScore();
  } else if (currentCard.strength === currentOpponentCard.strength){
    console.log('tie play again');
    playCount ++
    checkScore();
  }
}


function resetGame () {
  winnerModal.classList.add('hidden');
  apiCall(rickURL);
  apiCall(mortyURL);
  yourScore = 0;
  opponentsScore = 0;
  playCount = 0;
  document.getElementById('theScore').textContent = 0;
  document.getElementById('opponentsScore').textContent = 0;
  playerCard.style.backgroundImage = "";
  opponentCard.style.backgroundImage = "";
  playerCardImage.style.backgroundImage = '';
  playerCardImage.style.border = "";
  playerCardStrength.textContent = '';
  playerCardName.textContent = '';
  opponentCardImage.style.backgroundImage = '';
  opponentCardImage.style.border = "";
  opponentCardStrength.textContent = '';
  opponentCardName.textContent = '';
  playerWinnerIndicator.className = "winner-div blink hidden";
  opponentWinnerIndicator.className = "winner-div blink hidden";



}
