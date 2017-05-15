let endPoint = 'https://www.googleapis.com/youtube/v3/search';

let apiKEY = 'AIzaSyBObrqAWLESv1eKZsNwBG8DBswlsYaIKCU';

let getDataFromApi = (searchTerm, callback) => {
  let query = {
    part: 'snippet',
    order: 'relevance',
    q: searchTerm,
    type: 'video',
    key: apiKEY,
    //r: 'json'
  }
  $.getJSON(endPoint, query, callback);
}

//https://www.googleapis.com/youtube/v3/search?
//part=snippet
//&maxResults=25
//&order=relevance
//&q=site%3Ayoutube.com
//&topicId=%2Fm%2F02vx4
//&key={YOUR_API_KEY}


//https://www.googleapis.com/youtube/v3/search?
//pageToken=CBkQAA
//&part=snippet
//&maxResults=25
//&order=relevance
//&q=site%3Ayoutube.com
//&topicId=%2Fm%2F02vx4
//&key={YOUR_API_KEY}


let displayData = data => {
  //console.log(data.items[0].id.videoId);
  console.log(data);
  let resultElement = '';
  if (data.items) {
    data.items.forEach(item => {
      resultElement += `<iframe width="246" height="138" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
    });
  } else {
    resultElement += '<p>No results</p>';
  }

  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.main-section').hide();
  $('.js-search-form').submit((e) => {
    e.preventDefault();
    let query = $(e.currentTarget).find('.js-query').val();
    if (query === '') {
      console.log('please enter a value');
    } else {
      $('.main-section').show();
      getDataFromApi(query, displayData);
    }

  });
}

$(watchSubmit());
