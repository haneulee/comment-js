var Comment = (function() {
  var curPage = 1;

  function init() {
    getComments();

    document.getElementById("prev").addEventListener("click", function(e) {
      pagination(e, -1);
    });

    document.getElementById("next").addEventListener("click", function(e) {
      pagination(e, 1);
    });

    document.commentForm.add.addEventListener("click", function(e) {
      createComment();
    });
  }

  function updateComments(res) {
    var list = document.getElementById("list"),
      result = "";

    if (res) {
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
    }
  }

  function getComments() {
    fetch("/api/comments")
      .then(data => {
        return data.json();
      })
      .then(res => {
        updateComments(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function pagination(e, val) {
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

  function createComment() {
    var name = document.commentForm.commentName.value,
      comment = document.commentForm.commentMsg.value;

    if (name.length < 1 || comment.length < 10) {
      window.alert("이름은 1자 이상, 댓글은 10자 이상 입력하세요.");
      return;
    }

    var param = {
      headers: {
        "content-type": "application/json; chart=UTF-8"
      },
      body: JSON.stringify({
        author: name,
        comment: comment
      }),
      method: "POST"
    };

    fetch("/api/comments", param)
      .then(data => {
        return data.json();
      })
      .then(res => {
        getComments();
      })
      .catch(error => {
        console.log(error);
      });

  }

  return {
    init
  };
})();
