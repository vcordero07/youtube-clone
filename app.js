//05-31-2017
//make it responsible design

let endPoint = 'https://www.googleapis.com/youtube/v3/search';

let apiKEY = 'AIzaSyBObrqAWLESv1eKZsNwBG8DBswlsYaIKCU';

let query = {
  part: 'snippet',
  order: 'relevance',
  //q: searchTerm,
  type: 'video',
  key: apiKEY,
  //r: 'json'
}

let getDataFromApi = (searchTerm, callback) => {
  $.getJSON(endPoint, query, callback);
}

let displayData = data => {
  //console.log(data.items[0].id.videoId);
  console.log(data);
  query.pageToken = data.nextPageToken;

  let resultElement = '';
  if (data.items) {
    data.items.forEach(item => {
      resultElement +=
        //   `
        // <div class='video-container'>
        // <div class='video-frame'>
        // <a class='video-title-link' href="https://www.youtube.com/watch?v=${item.id.videoId}"><img width="246" height="138" src="${item.snippet.thumbnails.medium.url}" frameborder="0" ></img></a>
        // </div>
        // <div class='video-info'>
        // <h3 class='video-title'><a class='video-title-link' href="https://www.youtube.com/watch?v=${item.id.videoId}">${item.snippet.title}</a></h3>
        // <span class='video-channel'><a href="https://www.youtube.com/user/${item.snippet.channelTitle}">${item.snippet.channelTitle}</a></span>
        // <span class='video-description'>${item.snippet.description}</span>
        // </div>
        // </div>
        // `;
        `
      <div class='video-container'>
      <div class='video-frame'>
      <iframe width="246" height="138" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class='video-info'>
      <h3 class='video-title'><a class='video-title-link' href="https://www.youtube.com/watch?v=${item.id.videoId}">${item.snippet.title}</a></h3>
      <span class='video-channel'><a href="https://www.youtube.com/user/${item.snippet.channelTitle}">${item.snippet.channelTitle}</a></span>
      <span class='video-description'>${item.snippet.description}</span>
      </div>
      </div>
      `

    });
  } else {
    resultElement += '<p>No results</p>';
  }

  $('.js-search-results').append(resultElement);
}

$(".showmore-btn").click(() => {
  getDataFromApi(query, displayData);
});

function watchSubmit() {
  $('.video-section').hide();
  $('.thinktube-footer').hide();
  $('.js-search-form').submit((e) => {
    e.preventDefault();
    let quer = $(e.currentTarget).find('.js-query').val();
    if (quer === '') {
      console.log('please enter a value');
    } else {
      $('.video-section').show();
      $('.thinktube-footer').show()
      query.q = quer;
      getDataFromApi(quer, displayData);
    }

  });
}

$(watchSubmit());
