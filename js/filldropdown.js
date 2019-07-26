$(function() {
  let numberOfArticles = 0;
  let sectionTitle = "null";
  let results = [];

  const sectionsMap = [
    { name: "English", code: "en-US" },
    { name: "Japanese", code: "ja-JP" },
    { name: "Egyptian", code: "ar-EG" },
    { name: "Irish", code: "en-IE" },
    { name: "Jamaican", code: "en-JM" },
    { name: "Tagalog", code: "en-PH" },
    { name: "New Zealand", code: "en-NZ" },
    { name: "Hindi", code: "hi-IN" },
    { name: "Korean", code: "ko-KR" },
    { name: "Chinese", code: "zh-TW" },
    { name: "Vietnamese", code: "vi-VN" },
    { name: "Portuguese", code: "pt-BR" }
  ];
  let sections = [
    "arts",
    "automobiles",
    "books",
    "business",
    "fashion",
    "food",
    "health",
    "home",
    "insider",
    "magazine",
    "movies",
    "national",
    "nyregion",
    "obituaries",
    "opinion",
    "politics",
    "realestate",
    "science",
    "sports",
    "sundayreview",
    "technology",
    "theater",
    "tmagazine",
    "travel",
    "upshot",
    "world"
  ];

  for (var i = 0; i < sections.length; i++) {
    $(".dropdown").append("<option>" + sections[i] + "</option>");
  }

  //Create object for each language
  const languagesMap = [
    { name: "English", code: "en-US" },
    { name: "Japanese", code: "ja-JP" },
    { name: "Egyptian", code: "ar-EG" },
    { name: "Irish", code: "en-IE" },
    { name: "Hindi", code: "hi-IN" },
    { name: "Korean", code: "ko-KR" },
    { name: "Chinese", code: "zh-TW" },
    { name: "Portuguese", code: "pt-BR" }
  ];

  //Set dropdown options to have the name of each language
  for (var i = 0; i < languagesMap.length; i++) {
    $(".language-dropdown").append(
      "<option>" + languagesMap[i].name + "</option>"
    );
  }

  //Check language names for a match to set code
  $(".language-dropdown").on("change", function() {
    for (var i = 0; i < languagesMap.length; i++) {
      if (languagesMap[i].name === $(this).val()) {
        language = languagesMap[i].code;
        console.log(language);
      }
    }
  });

  //Get articles url from API and start loading them
  $(".dropdown").on("change", function() {
    $(".loading").show();
    const selected = $(this).val();
    sectionTitle = selected;
    let sectionURL =
      "https://api.nytimes.com/svc/topstories/v2/" +
      sectionTitle +
      ".json?api-key=9A0091nJwReeB9Uk3aD0VFbax9hwrv6p";
    loadArticles(sectionURL);
  });

  //Create grid-cells to hold articles, then format them with .css
  //Grid cells are given IDs and then the IDs are used to load images
  function loadArticles(sectionURL) {
    $.ajax({
      method: "get",
      url: sectionURL
    })
      .done(function(data) {
        results = data.results;
        for (var i = 0; i < results.length; i++) {
          let article = results[i];
          numberOfArticles = 0;
          if (article.multimedia.length > 4 && numberOfArticles < 12) {
            numberOfArticles++;
            $(".content-grid").append(
              '<a href="' +
                article.url +
                '"><div class="content-cell" id="content-cell-' +
                i +
                '"><div class="text-box">' +
                article.abstract +
                "</div></div></a>"
            );

            //Make css changes to specific grid cell (image)
            $("#content-cell-" + i).css(
              "background-image",
              'url("' + article.multimedia[4].url
            );
            $("#content-cell-" + i).hover(function() {
              speek(article.abstract);
            });
          }
        }
        $(".content-cell").css({
          "background-size": "cover",
          height: "300px",
          display: "flex",
          "align-items": "flex-end"
        });
      })
      .fail(function() {
        console.log("fail");
      })
      .always(function() {
        $(".loading").hide();
      });
  }

  const msg = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  let language = "en-US";

  function speek(message) {
    msg.voice = voices[10];
    msg.voiceURI = "native";
    msg.volume = 0.5; // 0 to 1
    msg.rate = 0.9; // 0.1 to 10
    msg.pitch = 1.8; //0 to 2
    msg.lang = language;
    msg.text = message;
    window.speechSynthesis.speak(msg);
  }
});
