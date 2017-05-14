var endPoint = 'http://www.googleapis.com/youtube/v3/search';

var apiKEY = 'AIzaSyBObrqAWLESv1eKZsNwBG8DBswlsYaIKCU';

//https://content.googleapis.com/youtube/v3/search?
//part=snippet
//&q=bunbury
//&type=video
//&key=AIzaSyD-a9IF8KKYgoC3cpgS-Al7hLQDbugrDcw

//https://www.youtube.com/watch?v=5dsGWM5XGdg
function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    q: searchTerm,
    type: 'video',
    key: apiKEY,
    //r: 'json'
  }
  $.getJSON(endPoint, query, callback);
}
//<iframe width="560" height="315" src="https://www.youtube.com/embed/5dsGWM5XGdg" frameborder="0" allowfullscreen></iframe>
function displayData(data) {
  console.log(data.items[0].id.videoId);
  console.log(data);
  var resultElement = '';
  if (data.Search) {
    data.Search.forEach(function(item) {
      resultElement += '<p>' + item.Title + '</p>';
    });
  } else {
    resultElement += '<p>No results</p>';
  }

  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayData);
  });
}

$(function() {
  watchSubmit();
});
