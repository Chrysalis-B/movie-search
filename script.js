var results = $("#results");

$(".search").on("click", function() {
    var nowId = $("input[name='nowtilusId']").val();
    var id = $("input[name='imdbId']").val();
    var title = $("input[name='title']").val();
    if (!title || !nowId) {
        return results.html("<p>please fill out the mandatory fields</p>");
    }
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
        html += "<div class='result new' id='" + data[i].imdbID + "'>";
        html += '<img src="' + image + '">';
        html += "<p>" + data[i].Title + "</p>";
        html += "<p>" + data[i].Year + "</p>";
        html += "</div>";
        html += "</a>";
    }
    return html;
}

$(document).on("click", ".new", function() {
    var imdbId = $(this).attr("id");
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=15876fbb&",
        method: "GET",
        data: {
            i: imdbId //imdb id
        },
        success: function(data) {
            $("#" + imdbId).append(checkResultHtml(data));
            $("#" + imdbId).removeClass("new");
            $("#" + imdbId).addClass("expand");
            console.log("#" + imdbId);
        }
    });
});

function checkResultHtml(data) {
    var html = "";
    var ratings = data.Ratings;
    console.log(data.Ratings);
    var x;
    html += '<div class="check_results">';
    html +=
        '<p>Synopsis<input placeholder="short synopsis" type="textarea" name="short synopsis" value="' +
        data.Plot +
        '"></p>';
    html +=
        '<p>Release date<input placeholder="Release Date" type="text" name="Release Date" value="' +
        data.Released +
        '" required></p>';
    html +=
        '<p>Studio<input placeholder="Studio" type="text" name="Studio" value="' +
        data.Production +
        '"></p>';
    for (x in ratings) {
        html +=
            '<p>Ratings<input placeholder="Ratings" type="text" name="Ratings" value="' +
            ratings[x].Source +
            " " +
            ratings[x].Value +
            '"></p>';
    }

    html +=
        '<p>Actors<input placeholder="Actors" type="text" name="Actors" value="' +
        data.Actors +
        '"></p>';
    html +=
        '<p>Director<input placeholder="Director" type="text" name="Director" value="' +
        data.Director +
        '"></p>';
    html +=
        '<p>Writer<input placeholder="Writer" type="text" name="Writer" value="' +
        data.Writer +
        '"></p>';
    html +=
        '<p>Genre<input placeholder="Genre" type="text" name="Genre" value="' +
        data.Genre +
        '"></p>';
    html += '<button class="save">Save</button>';
    html += "</div";

    return html;
}
