var Comment = (function() {
  var curPage = 1;

  function init() {
    fetch("/api/comments")
      .then(data => {
        return data.json();
      })
      .then(res => {
        var list = document.getElementById("list"),
          result = "";

        res.map(item => {
          result +=
            "<li><div>" +
            item.author +
            "</div><div>" +
            new Date(item.id) +
            "</div><div>" +
            item.comment +
            "</div></li>";
        });

        list.innerHTML = result;
      })
      .catch(error => {
        console.log(error);
      });

    document.getElementById("prev").addEventListener("click", function(e) {
      pagination(e, -1);
    });

    document.getElementById("next").addEventListener("click", function(e) {
      pagination(e, 1);
    });
  }

  function pagination(e, val) {
    // var param = {
    //   headers: {
    //     "content-type": "application/json; chart=UTF-8"
    //   },
    //   body: {},
    //   method: "POST"
    // };
    curPage += val;

    fetch("/api/comments/page/" + curPage)
      .then(data => {
        return data.json();
      })
      .then(res => {
        if (res.length === 0) {
          curPage += val * -1;
          return;
        }

        var list = document.getElementById("list"),
          result = "";

        res.map(item => {
          result +=
            "<li><div>" +
            item.author +
            "</div><div>" +
            new Date(item.id) +
            "</div><div>" +
            item.comment +
            "</div></li>";
        });

        list.innerHTML = result;
      })
      .catch(error => {
        console.log(error);
      });
  }

  return {
    init
  };
})();
