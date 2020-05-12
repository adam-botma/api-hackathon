var rickData;
var mortyData;
var rickURL = 'https://rickandmortyapi.com/api/character/?name=rick&status=alive';
var mortyURL = 'https://rickandmortyapi.com/api/character/?name=morty&status=alive';
var mortyDeck = [];
var rickDeck = [];
apiCall(rickURL);
apiCall(mortyURL);


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

// api for giphyb : https://api.giphy.com/v1/gifs/search?api_key=IfQlruZk7GWmDGMkJV0vuYJ7FIhwn0co&q=rick and morty&limit=25&offset=0&rating=G&lang=en

function fillCards (characterData, characterDeck) {

  for (var index = 0 ; index < characterData.length; index++){
    var card = new Card (characterData[index].name, characterData[index].species, characterData[index].image, index+1);
    characterDeck.push(card);
  }
}

function pickRandomCard(playerDeck) {

    console.log(playerDeck[Math.floor(Math.random() * playerDeck.length)]);
}
