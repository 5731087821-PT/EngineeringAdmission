/*jslint plusplus: true*/
/*global $, alert */

var newsData = null;
var monthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function newsLoadSuccess(data) {
	"use strict";
    var i, $newsTL, newsHTML;
	newsData = JSON.parse(data).data;
	if ($("#news_content_tl").length > 0) {
		$newsTL = $("#news_content_tl");
		$newsTL.empty();

		newsHTML = "";
		for (i = 0; i < 5 && i < newsData.length; i++) {
			newsHTML = '<li class="media" id="news_id_' + i + '">';
            newsHTML += '  <div class="pull-left" href="#">';
            newsHTML += '    <div class="news-date">';
            newsHTML += '      <h4>' + Number(newsData[i].time.substring(0, 2)) + '</h4>';
            newsHTML += '      <h5>' + monthName[newsData[i].time.substring(3, 5) - 1] + '</h4>';
            newsHTML += '    </div>';
            newsHTML += '  </div>';
            newsHTML += '  <div class="media-body">';
            newsHTML += '    <h4 class="media-heading">' + newsData[i].header + '</h4>';
			if (newsData[i].hasOwnProperty("content")) {
                newsHTML += newsData[i].content;
            }
            newsHTML += '  </div>';
            newsHTML += '</li>';

			$newsTL.append(newsHTML);
		}
	}
}

function newsLoadFail(jqXHR, textStatus) {
	"use strict";
    alert("News Failed to load. =(\nERROR Code: " + textStatus);
}

function loadNews() {
	"use strict";
    $("#news_content_tl").html("<h4 style='text-align: center;'>Loading...</h4>");
	$.ajax({
		dataType: "text",
		url: "./news-content.json",
		success: newsLoadSuccess,
		error: newsLoadFail
	});
}

$(function () {
	"use strict";
    loadNews();
});
