$(function() {
  let numberOfArticles = 0;
  let results = [];

  let sections = [
    { name: 'Arts', code: 'arts' },
    { name: 'Cars', code: 'automobiles' },
    { name: 'Books', code: 'books' },
    { name: 'Business', code: 'business' },
    { name: 'Fashion', code: 'fashion' },
    { name: 'Food', code: 'food' },
    { name: 'Health', code: 'health' },
    { name: 'Home', code: 'home' },
    { name: 'Insider', code: 'insider' },
    { name: 'Magazine', code: 'magazine' },
    { name: 'Movies', code: 'movies' },
    { name: 'National', code: 'national' },
    { name: 'New York', code: 'nyregion' },
    { name: 'Obituaries', code: 'obituaries' },
    { name: 'Opinion', code: 'opinion' },
    { name: 'Politics', code: 'politics' },
    { name: 'Real Estate', code: 'realestate' },
    { name: 'Science', code: 'science' },
    { name: 'Sports', code: 'sports' },
    { name: 'Sunday Review', code: 'sundayreview' },
    { name: 'Technology', code: 'technology' },
    { name: 'Theater', code: 'theater' },
    { name: 'Travel', code: 'travel' },
    { name: 'Upshot', code: 'upshot' },
    { name: 'World', code: 'world' }
  ];

  for (let i = 0; i < sections.length; i++) {
    $('.dropdown').append(`<option>${sections[i].name}</option>`);
  }

  //Create object for each language
  const languagesMap = [
    { name: 'English', code: 'en-US' },
    { name: 'Japanese', code: 'ja-JP' },
    { name: 'Egyptian', code: 'ar-EG' },
    { name: 'Irish', code: 'en-IE' },
    { name: 'Hindi', code: 'hi-IN' },
    { name: 'Korean', code: 'ko-KR' },
    { name: 'Chinese', code: 'zh-TW' },
    { name: 'Portuguese', code: 'pt-BR' }
  ];

  //Set dropdown options to have the name of each language
  for (let i = 0; i < languagesMap.length; i++) {
    $('.language-dropdown').append(`<option>${languagesMap[i].name}</option>`);
  }

  //Check language names for a match to set code
  $('.language-dropdown').on('change', function() {
    for (let i = 0; i < languagesMap.length; i++) {
      if (languagesMap[i].name === $(this).val()) {
        language = languagesMap[i].code;
      }
    }
  });

  //Get articles url from API and start loading them
  $('.dropdown').on('change', function() {
    $('.content-grid').empty();
    $('.loading').show();
    $('.dropdown-area').addClass('dropdown-area--active');
    $('.footer-bumper').addClass('footer-bumper--active');
    $('.dropdown-div').addClass('dropdown-div--active');
    $('.logo').addClass('logo--active');

    let selected = $(this).val();
    for (let i = 0; i < sections.length; i++) {
      if (selected === sections[i].name) {
        selected = sections[i].code;
      }
    }
    loadArticles(
      `https://api.nytimes.com/svc/topstories/v2/${selected}.json?api-key=9A0091nJwReeB9Uk3aD0VFbax9hwrv6p`
    );
  });

  //Create grid-cells to hold articles, then format them with .css
  //Grid cells are given IDs and then the IDs are used to load images
  function loadArticles(sectionURL) {
    $.ajax({
      method: 'get',
      url: sectionURL
    })
      .done(function(data) {
        results = data.results;
        numberOfArticles = 0;
        for (let i = 0; i < results.length; i++) {
          let article = results[i];
          if (article.multimedia[4] !== undefined && numberOfArticles < 12) {
            numberOfArticles++;
            $('.content-grid').append(
              `<a href='${
                article.url
              }'><div class="content-cell" id="content-cell-${i}" style="background: url(${
                article.multimedia[4].url
              })"><div class="text-box"><p>${
                article.abstract
              }</p></div></div></a>`
            );

            $(`#content-cell-${i}`).hover(function() {
              //`speek(article.abstract);
            });
          }
        }
        $('.content-cell').css({
          'background-size': 'cover',
          height: '300px',
          display: 'none',
          'align-items': 'flex-end'
        });
        $('.content-cell').css({
          display: 'flex'
        });
      })
      .fail(function() {
        //console.log('fail');
      })
      .always(function() {
        $('.loading').hide();
      });
  }

  const msg = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  let language = 'en-US';

  function speek(message) {
    msg.voice = voices[10];
    msg.voiceURI = 'native';
    msg.volume = 0.5; // 0 to 1
    msg.rate = 0.9; // 0.1 to 10
    msg.pitch = 1.8; //0 to 2
    msg.lang = language;
    msg.text = message;
    window.speechSynthesis.speak(msg);
  }
});
