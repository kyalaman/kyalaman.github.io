$( document ).ready(function() { 
  $("form").submit(function() {
    if($("#input").val()) {
      $("form").css("margin-top", "50px");
      var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&generator=search&exsentences=1&exintro=1&gsrlimit=10&gsrsearch=" + $("#input").val();

      $.ajax( {
        url: url,
        success: function(data) {
          for (var result in data.query.pages) {
            $("#resultsList").append("<a href=\"https://en.wikipedia.org/?curid=" + data.query.pages[result].pageid + "\" target=\"_blank\"><li><h3>" + data.query.pages[result].title + "</h3>" + data.query.pages[result].extract + "</li></a>");
          }
        },
        cache: false
      });
    }
  return false;
  });

  $("#random").click(function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
});