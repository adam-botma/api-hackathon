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
var winnerModalText = document.getElementById('winner');
var winnerModal = document.getElementById('winner-modal');
var playerCardImage = document.getElementById('charImg');
var playerCardStrength = document.getElementById('charStrength');
var playerCardName = document.getElementById('charName');
var opponentCardImage = document.getElementById('charImgOpponent');
var opponentCardStrength = document.getElementById('charStrengthOpponent');
var opponentCardName = document.getElementById('charNameOpponent');
var winnerGifEnd = document.getElementById('winner-gif');
var indicatorText = document.getElementById('indicator-text');
var ricksCardToFlip = document.getElementById('ricks-actual-card');
var mortysCardToFlip = document.getElementById('mortys-actual-card');
var tvGif = document.getElementById('tv-gif');
var soundOn = false;
var quickAudio;
var tieSound = new Audio('https://sound.peal.io/ps/audios/000/000/547/original/Oooo_yeah__caaan_doo!.wav')
var rickWin = new Audio('https://sound.peal.io/ps/audios/000/000/543/original/lick_my_balls.wav');
var mortyWin = new Audio('https://sound.peal.io/ps/audios/000/000/978/original/youtube.mp3');
tieSound.muted = true;
rickWin.muted = true;
mortyWin.muted = true;
var soundIcon = document.getElementById('sound-icon');
var dealButton = document.getElementById('deal');
var startModal = document.getElementById('start-modal');
var startText = document.getElementById('start-text');
document.getElementById('reset-button').addEventListener('click', resetGame);
dealButton.addEventListener('click', playRound);
document.getElementById('volume').addEventListener('click', ()=> {changeSoundOption()});
startApp();


document.onkeypress = function (e) {
  if (e.keyCode == 32) {
    startModal.classList.add('hidden');
  }
}

// if (navigator.userAgent.match(/Mobile/)) {
//   startText.textContent = 'Tap to Start';
//   startModal.addEventListener('click', () => startModal.classList.add('hidden'));
// }

function changeSoundOption (){
  if(soundOn === true){
    tieSound.muted = true;
    rickWin.muted = true;
    mortyWin.muted = true;
    tieSound.pause();
    rickWin.pause();
    mortyWin.pause();
    soundOn = false;
    soundIcon.className = 'fas fa-volume-mute';
  } else {
    tieSound.muted = false;
    rickWin.muted = false;
    mortyWin.muted = false;
    soundOn = true;
    soundIcon.className = 'fas fa-volume-up';
  }
}



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
    if (navigator.userAgent.match(/Mobile/)) {
      startText.textContent = 'Tap to Start';
      startModal.addEventListener('click', () => startModal.classList.add('hidden'));
    } else {
      startText.textContent = 'Press Space to Start';
    }
  }
}


function failedCall(e) {
  console.log('fail', e);
  startText.textContent = 'Network Error: please try again'
}


function playRound () {
  dealButton.disabled = true;
  pickRandomCard(rickDeck);
  opponentsTurn(mortyDeck);
  ricksCardToFlip.classList.add('the-card-flip');
  setTimeout(()=> mortysCardToFlip.classList.add('the-card-flip'), 500);
  setTimeout(checkBattle, 1000 )
}

function checkScore(){
  if (playCount === 10) {
    if(quickAudio){
    quickAudio.pause();
    }
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
  var pickedIndex = Math.floor(Math.random() * playerDeck.length);
    currentCard = playerDeck[pickedIndex];
    playerCardImage.style.backgroundImage = "url("+currentCard.image+")";
    playerCardStrength.textContent = currentCard.strength;
    playerCardName.textContent = currentCard.name;
  playerDeck.splice(pickedIndex,1);

}


function opponentsTurn(playerDeck){
  var pickedIndexOpponent = Math.floor(Math.random() * playerDeck.length);
  currentOpponentCard = playerDeck[pickedIndexOpponent];
  opponentCardImage.style.backgroundImage = "url(" + currentOpponentCard.image + ")";
  opponentCardStrength.textContent = currentOpponentCard.strength;
  opponentCardName.textContent = currentOpponentCard.name;
  playerDeck.splice(pickedIndexOpponent, 1);

}


function checkBattle (){
  if( currentCard.strength > currentOpponentCard.strength){
    if(soundOn === true){
    playGameAudio(rickAudioArray);
    }
    yourScore ++
    playCount ++
    document.getElementById('ricks-score').textContent = yourScore;
    indicatorText.textContent = 'Rick Wins';
    indicatorText.classList.remove('hidden');
    indicatorText.classList.add('blink');
    tvGif.setAttribute('src', rickGiphLibrary[Math.floor(Math.random()
    * rickGiphLibrary.length)]);
    checkScore();

  } else if (currentCard.strength < currentOpponentCard.strength){
    if(soundOn === true){
    playGameAudio(mortyAudioArray);
    }
    opponentsScore ++
    playCount ++
    document.getElementById('mortys-score').textContent = opponentsScore;
    indicatorText.textContent = 'Morty Wins'
    indicatorText.classList.remove('hidden');
    indicatorText.classList.add('blink');
    tvGif.setAttribute('src', mortyGiphLibrary[Math.floor(Math.random()
    * mortyGiphLibrary.length)]);
    checkScore();
  } else if (currentCard.strength === currentOpponentCard.strength){

    indicatorText.textContent = 'you tied';
    indicatorText.classList.remove('hidden');
    indicatorText.classList.add('blink');
    playCount ++
    checkScore();
  }
  setTimeout(()=> {
    ricksCardToFlip.classList.remove('the-card-flip');
    mortysCardToFlip.classList.remove('the-card-flip');
    indicatorText.classList.remove('blink');
    indicatorText.classList.add('hidden');
    dealButton.disabled = false;
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
  document.getElementById('ricks-score').textContent = 0;
  document.getElementById('mortys-score').textContent = 0;
  playerCardImage.style.backgroundImage = '';
  playerCardImage.style.border = "";
  playerCardStrength.textContent = '';
  playerCardName.textContent = '';
  opponentCardImage.style.backgroundImage = '';
  opponentCardImage.style.border = "";
  opponentCardStrength.textContent = '';
  opponentCardName.textContent = '';
}


function startApp() {
  startText.textContent = '...loading'
  apiCall(rickURL);
  apiCall(mortyURL);
  buildGiphyLibrary(rickGiphyURL, rickGiphLibrary);
  buildGiphyLibrary(mortyGiphyURL, mortyGiphLibrary);

}
