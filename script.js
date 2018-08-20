var results = $("#results");

$(".search").on("click", function() {
    var id = $("input[name='imdb_Id']").val();
    var title = $("input[name='title']").val();
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=15876fbb&",
        method: "GET",
        data: {
            i: id, //imdb id
            s: title, //title
            type: "movie"
        },
        success: function(data) {
            results.html(getResultsHtml(data.Search, title));
        }
    });
});

function getResultsHtml(data, title) {
    var html = "";
    if (title) {
        html += "<p> Results for " + title + "<p>";
        html += "<p> Select your movie by clicking on the result</p>";
    }
    for (var i = 0; i < data.length; i++) {
        var image = "default-image.jpg";
        if (data[i].Poster && data[i].Poster !== "N/A") {
            image = data[i].Poster;
        }
        html += "<div class='result' id='" + data[i].imdbID + "'>";
        html += '<img src="' + image + '">';
        html += "<p>" + data[i].Title + "</p>";
        html += "<p>" + data[i].Year + "</p>";
        html += "</div>";
        html += "</a>";
    }
    return html;
}

$(document).on("click", ".result", function() {
    var imdbId = $(this).attr("id");
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=15876fbb&",
        method: "GET",
        data: {
            i: imdbId //imdb id
        },
        success: function(data) {
            $("#" + data.imdbID).append(checkResultHtml(data));
        }
    });
});

function checkResultHtml(data) {
    var html = "";

    html +=
        '<input placeholder="short synopsis" type="text" name="short synopsis">';
    html +=
        '<input placeholder="Release Date" type="text" name="Release Date" required>';
    html += '<input placeholder="Studio" type="text" name="Studio">';
    html += '<input placeholder="Ratings" type="text" name="Ratings">';
    html += '<input placeholder="Actors" type="text" name="Actors">';
    html += '<input placeholder="Director" type="text" name="Director">';
    html += '<input placeholder="Writer" type="text" name="Writer">';
    html += '<input placeholder="Genre" type="text" name="Genre">';
    html += '<button class="save">Save</button>';

    return html;
}
