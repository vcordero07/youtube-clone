let endPoint = 'https://www.googleapis.com/youtube/v3/search';

let apiKEY = 'AIzaSyBObrqAWLESv1eKZsNwBG8DBswlsYaIKCU';

function getDataFromApi(searchTerm, callback) {
  let query = {
    part: 'snippet',
    q: searchTerm,
    type: 'video',
    key: apiKEY,
    //r: 'json'
  }
  $.getJSON(endPoint, query, callback);
}

function displayData(data) {
  console.log(data.items[0].id.videoId);
  console.log(data);
  let resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
      resultElement += `<iframe width="300" height="169" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
    });
  } else {
    resultElement += '<p>No results</p>';
  }

  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    let query = $(this).find('.js-query').val();
    getDataFromApi(query, displayData);
  });
}

$(function() {
  watchSubmit();
});
