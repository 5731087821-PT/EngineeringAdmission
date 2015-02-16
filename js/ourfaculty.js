/*jslint plusplus: true*/
/*global $ */

var totalPicture = 142; // So the pictures' file names would be 0.jpg to n-1.jpg
var picturePerPage = 25;
var totalPage = Math.ceil(totalPicture / picturePerPage);

$(function () {
    "use strict";
	var i, j, $divObj;
	// Add Nav items
	for (i = 1; i <= totalPage; i++) {
		$("<li role='presentation'" + (i === 1 ? " class='active'" : " ") + "><a href='#page" + i + "' role='tab' data-toggle='tab'>Page " + i + "</a></li>").appendTo("#gallery_tab");
	}

	// Add tab contents
	for (i = 0; i < totalPage; i++) {
		$divObj = $("<div role='tabpanel' class='tab-pane fade" + (i === 0 ? " in active" : "") + "' id='page" + (i + 1) + "'></div>");
		for (j = 8; j <= Math.min(picturePerPage - 1, totalPicture - picturePerPage * i); j++) {
			$divObj.append("<a href=\"img/gallery/" + (picturePerPage * i + j) + ".jpg\" data-lightbox=\"gallery\"><img src=\"img/gallery/thumbnails/" + (picturePerPage * i + j) + ".jpg\"/></a>");
		}
		$divObj.appendTo("#gallery_tab_content");
	}

	$('#gallery_tab_content a:first').tab('show');
});