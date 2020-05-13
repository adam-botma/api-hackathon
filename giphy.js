

var mortyGiphyURL = 'https://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&q=morty smith&limit=25&offset=0&rating=PG-13&lang=en';
var rickGiphyURL = 'https://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&q=rick sanchez&limit=25&offset=0&rating=PG-13&lang=en';
var bothGiphyURL = 'https://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&q=rick and morty&limit=25&offset=0&rating=G&lang=en';
var rickGiphLibrary = [];
var mortyGiphLibrary = [];

function buildGiphyLibrary (url, library) {

    $.ajax({
      url: url,
      success: successfulCall,
      error: failedCall,
    })


  function successfulCall(e) {
    console.log(e.data);
    for (var index = 0; index < e.data.length ; index++){
      library.unshift(e.data[index].images.original.url);

    }
  }

  function failedCall(e) {
    console.log('fail', e);
  }






}
