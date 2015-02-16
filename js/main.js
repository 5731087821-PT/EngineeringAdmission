/*jslint plusplus: true*/
/*global $ */

var logoRatio = 1776 / 193; // Width : Height
var curMenuFix = false;

function docScroll() {
    "use strict";
    var shiftHeight = Math.ceil($('#logo_img').width() / logoRatio) + 30;
    if ($(window).scrollTop() > shiftHeight) {
        if (curMenuFix === false) {
            $('.menu-nav-bar').addClass('nav-bar-fixed');
            $('.menu-nav-bar').css('top', "0");
            curMenuFix = true;
            $("#navbar_logo").show(100);
        }
    } else {
        $('.menu-nav-bar').css('top', shiftHeight + "px");
        if (curMenuFix === true) {
            $('.menu-nav-bar').removeClass('nav-bar-fixed');
            curMenuFix = false;
            $("#navbar_logo").hide(100);
        }
    }
}

$(function () {
    "use strict";
    $("#navbar_logo").hide();
    // Make navigation bar sticky
    docScroll();
    $(document).scroll(docScroll);
    $(window).resize(docScroll);
});