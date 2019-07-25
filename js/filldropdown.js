$(document).ready(function() {
  let sectionTitle = "null";
  let results = [];
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

  $(".dropdown").on("change", function() {
    const selected = $(this).val();
    sectionTitle = selected;
    let sectionURL =
      "https://api.nytimes.com/svc/topstories/v2/" +
      sectionTitle +
      ".json?api-key=9A0091nJwReeB9Uk3aD0VFbax9hwrv6p";
    loadArticles(sectionURL);
  });

  function loadArticles(sectionURL) {
    $.ajax({
      method: "get",
      url: sectionURL
    })
      .done(function(data) {
        results = data.results;

        for (var i = 0; i < results.length; i++) {
          article = results[i];
          $(".content-grid").append(
            '<a href="' +
              article.url +
              '"><div class="content-cell" id="content-cell-' +
              i +
              '"><div class="text-box">' +
              article.abstract +
              "</div></div></a>"
          );

          //Make changes to specific grid cell
          if (article.multimedia.length > 4) {
            $("#content-cell-" + i).css(
              "background-image",
              'url("' + article.multimedia[4].url
            );
          }
        }
        $(".content-cell").css({
          "background-size": "cover",
          height: "300px",
          "vertical-align": "bottom",
          display: "flex",
          "align-items": "flex-end",
          "justify-content": "flex-end"
        });
        console.log(results);
      })
      .fail(function() {
        console.log("fail");
      })
      .always();
  }

  function readOutLoud() {
    let ttsURL = "https://microsoft-azure-translation-v1.p.rapidapi.com/Speak";
  }
});
