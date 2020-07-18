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
var playerCard= document.getElementById('ricks-played-card');
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
var winnerGifEnd = document.getElementById('winner-gif');
const indicatorText = document.getElementById('indicator-text');
const ricksCardToFlip = document.getElementById('ricks-actual-card');
const mortysCardToFlip = document.getElementById('mortys-actual-card');
// var opponentWinnerText = document.getElementById('blink-text-opponent');
// var playerWinnerText = document.getElementById('blink-text-you');
var tvGif = document.getElementById('tv-gif');
var quickAudio;
var tieSound = new Audio('https://sound.peal.io/ps/audios/000/000/547/original/Oooo_yeah__caaan_doo!.wav')
var rickWin = new Audio('https://sound.peal.io/ps/audios/000/000/543/original/lick_my_balls.wav');
var mortyWin = new Audio('https://sound.peal.io/ps/audios/000/000/978/original/youtube.mp3');
document.getElementById('reset-button').addEventListener('click', resetGame);
document.getElementById('deal').addEventListener('click', playRound);
startApp();



function apiCall(url) {

  $.ajax({
    url: url,
    success: successfulCall,
    error: failedCall,
  })
}

function successfulCall(e) {

  if (e.results[0].name === 'Rick Sanchez') {
    rickData = e.results;
    fillCards(rickData, rickDeck);
  } else if (e.results[0].name === 'Morty Smith') {
    mortyData = e.results;
    fillCards(mortyData, mortyDeck);
  }
}

function failedCall(e) {
  console.log('fail', e);
}





function playRound () {
  pickRandomCard(rickDeck);
  opponentsTurn(mortyDeck);
  ricksCardToFlip.classList.add('the-card-flip');
  setTimeout(()=> mortysCardToFlip.classList.add('the-card-flip'), 500);
  setTimeout(checkBattle, 1000 )
//   opponentCard.style.border = 'none';
//   playerCard.style.border = 'none';
//   playerCard.className = "played-card-slot";
//   opponentCard.className = "opponent-played-card-slot";
//   pickRandomCard(rickDeck);
//     opponentsTurn(mortyDeck);
//     checkBattle();
}





function checkScore(){
  if (playCount === 10) {
    playerWinnerGIF.setAttribute('src', '');
    opponentWinnerGIF.setAttribute('src', '');
    quickAudio.pause();
    if (yourScore > opponentsScore) {
      winnerModalText.textContent = 'you won!';
      winnerGifEnd.setAttribute('src', 'https://media.giphy.com/media/IdZpAop5IISbK2iePU/giphy.gif');
      winnerModal.classList.remove('hidden');
      rickWin.play();
    } else if (opponentsScore > yourScore) {
      winnerGifEnd.setAttribute('src', 'https://media.giphy.com/media/SsZViiaRCjgp8fVexU/giphy.gif');
      winnerModalText.textContent = 'Morty Somehow Beat you!?';
      winnerModal.classList.remove('hidden');
      mortyWin.play();
    } else {
      winnerGifEnd.setAttribute('src', 'https://media.giphy.com/media/Qs0QEnugOy0xIsFkpD/giphy.gif');
      winnerModalText.textContent = 'wait... you can tie in war?';
      winnerModal.classList.remove('hidden');
      tieSound.play();
    }

  }
}



function fillCards (characterData, characterDeck) {

  for (var index = 0 ; index < characterData.length; index++){
    var card = new Card (characterData[index].name, characterData[index].species, characterData[index].image, index+1);
    characterDeck.push(card);
  }
}

function pickRandomCard(playerDeck) {
  // opponentWinnerText.textContent = 'winner';
  // playerWinnerText.textContent = "winner";
  // playerWinnerIndicator.className = "winner-div blink hidden";
  // opponentWinnerIndicator.className = "winner-div blink hidden";
  var pickedIndex = Math.floor(Math.random() * playerDeck.length);
    currentCard = playerDeck[pickedIndex];
    playerCardImage.style.backgroundImage = "url("+currentCard.image+")";
    // playerCardImage.style.border = "solid white 4px";
    playerCardStrength.textContent = currentCard.strength;
    playerCardName.textContent = currentCard.name;
  playerDeck.splice(pickedIndex,1);
  // playerCard.style.backgroundImage = "url(images/front1.png";
}


function opponentsTurn(playerDeck){
  var pickedIndexOpponent = Math.floor(Math.random() * playerDeck.length);
  currentOpponentCard = playerDeck[pickedIndexOpponent];

  opponentCardImage.style.backgroundImage = "url(" + currentOpponentCard.image + ")";
  // opponentCardImage.style.border = "solid white 4px";
  opponentCardStrength.textContent = currentOpponentCard.strength;
  opponentCardName.textContent = currentOpponentCard.name;
  playerDeck.splice(pickedIndexOpponent, 1);
  // opponentCard.style.backgroundImage = "url(images/front1.png)";

}


function checkBattle (){
  if( currentCard.strength > currentOpponentCard.strength){
    playGameAudio(rickAudioArray);
    yourScore ++
    playCount ++
    // playerWinnerIndicator.classList.remove('hidden');
    // playerCard.style.border = 'solid 5px green ';
    // playerCard.style.borderRadius = '5px';
    // playerCard.classList.add('blink');
    document.getElementById('ricks-score').textContent = yourScore;
    indicatorText.textContent = 'Rick Wins';
    indicatorText.classList.remove('hidden');
    indicatorText.classList.add('blink');
    tvGif.setAttribute('src', rickGiphLibrary[Math.floor(Math.random()
    * rickGiphLibrary.length)]);
    // checkScore();

  } else if (currentCard.strength < currentOpponentCard.strength){
    playGameAudio(mortyAudioArray);
    opponentsScore ++
    playCount ++
    // opponentWinnerIndicator.classList.remove('hidden');
    // opponentCard.style.border = 'solid 5px green ';
    // opponentCard.style.borderRadius = '5px';
    // opponentCard.classList.add('blink');
    document.getElementById('mortys-score').textContent = opponentsScore;
    indicatorText.textContent = 'Morty Wins'
    indicatorText.classList.remove('hidden');
    indicatorText.classList.add('blink');
    tvGif.setAttribute('src', mortyGiphLibrary[Math.floor(Math.random()
    * mortyGiphLibrary.length)]);
    // checkScore();
  } else if (currentCard.strength === currentOpponentCard.strength){
    // opponentWinnerText.textContent = 'TIE';
    // playerWinnerText.textContent = "TIE";
    // opponentWinnerIndicator.classList.remove('hidden');
    // playerWinnerIndicator.classList.remove('hidden');
    indicatorText.textContent = 'you tied';
    indicatorText.classList.remove('hidden');
    indicatorText.classList.add('blink');
    playCount ++
    // checkScore();
  }
  setTimeout(()=> {
    ricksCardToFlip.classList.remove('the-card-flip');
    mortysCardToFlip.classList.remove('the-card-flip');
    indicatorText.classList.remove('blink');
    indicatorText.classList.add('hidden');
  }, 3000)
}

function playGameAudio(whichArray) {
  quickAudio = new Audio(whichArray[Math.floor(Math.random()
    * whichArray.length)]);
  quickAudio.play();
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

function startApp() {
  apiCall(rickURL);
  apiCall(mortyURL);
  buildGiphyLibrary(rickGiphyURL, rickGiphLibrary);
  buildGiphyLibrary(mortyGiphyURL, mortyGiphLibrary);
}


// Quick Check incase a none square gif slips through
// var imgPlayer1 = document.getElementById('player-winner-gif');
// var imgPlayer2 = document.getElementById('opponent-winner-gif');
// tvGif.onload = resizeGIF(tvGif);
// // imgPlayer2.onload = resizeGIF(imgPlayer2);

// function resizeGIF(img) {
//   if (img.height > img.width) {
//     img.height = '100%';
//     img.width = 'auto';
//   }
// }
