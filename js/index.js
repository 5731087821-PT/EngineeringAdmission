/*jslint plusplus: true*/
/*global $, alert */

// var curTime = new Date().getTime();
var curTime = new Date().getTime();
var monthThaiName = ["","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม"];
var tlDetails = [
    {
        header: "เริ่มรับสมัครรับตรงปกติ",
        desc: "สมัครได้ที่ www.atc.chula.ac.th",
        date: "27-2-2015"
    },
    {
        header: "หมดเขตรับสมัคร",
        desc: "สมัครได้ที่ www.atc.chula.ac.th",
        date: "5-3-2015"
    },
    {
        header: "เริ่มตรวจสอบรายชื่อ",
        desc: "เริ่มตรวจสอบรายชื่อสถานะผู้สมัคร",
        date: "2-3-2015"
    },
    {
        header: "หมดเขตตรวจสอบรายชื่อ",
        desc: "หมดเขตตรวจสอบรายชื่อสถานะผู้สมัคร",
        date: "6-3-2015"
    },
    {
        header: "ทักท้วง",
        desc: "ทักท้วงสถานะการสมัครในกรณีไม่ถูกต้อง",
        date: "9-3-2015"
    },
    {
        header: "เริ่มตรวจสอบคะแนน",
        desc: "เริ่มตรวจสอบความถูกต้องของคะแนน",
        date: "12-3-2015"
    },
    {
        header: "หมดเขตตรวจสอบคะแนน",
        desc: "หมดเขตตรวจสอบความถูกต้องคะแนน",
        date: "13-3-2015"
    },
    {
        header: "ประกาศรายชื่อสัมภาษณ์",
        desc: "ประกาศรายชื่อผู้มีสิทธิ์สอบสัมภาษณ์",
        date: "24-3-2015"
    },
    {
        header: "ทักท้วง",
        desc: "ทักท้วงการประกาศรายชื่อกรณีไม่ถูกต้อง",
        date: "25-3-2015"
    },
    {
        header: "หมดเขตทักท้วง",
        desc: "ทักท้วงการประกาศรายชื่อกรณีไม่ถูกต้อง",
        date: "26-3-2015"
    },
    {
        header: "สอบสัมภาษณ์",
        desc: "การสอบสัมภาษณ์และรายงานตัวเข้าศึกษา",
        date: "31-3-2015"
    },
    {
        header: "ประกาศผล",
        desc: "ประกาศรายชื่อผู้มีสิทธิ์เข้าศึกษา",
        date: "9-4-2015"
    },
    {
        header: "เริ่มยืนยันสิทธิ์",
        desc: "การยืนยันสิทธิ์ในระบบเคลียร์ริงเฮาส์",
        date: "28-4-2015"
    },
    {
        header: "หมดเขตยืนยันสิทธิ์",
        desc: "การยืนยันสิทธิ์ในระบบเคลียร์ริงเฮาส์",
        date: "1-5-2015"
    },
    {
        header: "เปิดเรียน",
        desc: "วันเปิดเรียนภาคการศึกษาต้น",
        date: "10-8-2015"
    }/*,
    {
        header: "จบวิศวฯ จุฬาฯ",
        desc: "เรียนจบและรับปริญญา",
        day: 31, month: 5, year: 2018
    }*/
]; // Please ensure that it's sorted by date already. Date format: D-M-Y

function seperateDateString(dateStr) {
    "use strict";
    var strArr = dateStr.split("-");
    return {
        day: Number(strArr[0]),
        month: Number(strArr[1]),
        year: Number(strArr[2])
    };
}

function getDaysLeft(day, month, year) {
    "use strict";
    return Math.ceil((new Date(year, month - 1, day, 0, 0, 0, 0).getTime() - curTime) / 86400000);
}

function setCountdownBanner(dayLeft, desc) {
    "use strict";
    $("#main-countdown-day-left").html(dayLeft);
    $("#main-countdown-desc").html(desc);
}

function writeTimelinePiece(day, month, year, header, desc, i) {
    "use strict";
    var timeInterval, leftTime = getDaysLeft(day, month, year), $newLi;
    if (leftTime < 0) {
        leftTime *= -1;
        timeInterval = -1;
    } else if (leftTime === 0) {
        timeInterval = 0;
    } else {
        timeInterval = 1;
    }

    $newLi = $(
        "<div class='media' id='tl_" + i + "'><div class='media-left media-middle'><div class='timeline-day-rect" +
            (timeInterval === -1 ? " timeline-day-rect-passed " : " ") +
            "'>" +
            "<span class='top-text'>" +
            (timeInterval === -1 ? "ผ่านไปแล้ว" : (timeInterval === 1 ? "เหลือเวลา" : "")) +
            "</span><h1 class='center-day-text'>" +
            (timeInterval === 0 ? "วันนี้" : leftTime) +
            "</h1><span class='bottom-text'>" +
            (timeInterval === 0 ? "" : "วัน") +
            "</span>" +
            "</div></div><div class='media-body timeline-desc media-middle'><h4 class='media-heading'>" + header + "</h4>" + desc +
            "</div></div>"
    );
    $("#timeline_placeholder").append($newLi);

    return timeInterval;
}

function resizeItems() {
    "use strict";
    $(".timeline-panel").height($(window).height() + 200);
}

// On Load
$(function () {
    "use strict";
    // Create timeline-panel
    var i, missionId = -1, curDate;
    for (i = 0; i < tlDetails.length; i++) {
        curDate = seperateDateString(tlDetails[i].date);
        if (writeTimelinePiece(curDate.day, curDate.month, curDate.year, tlDetails[i].header, tlDetails[i].desc, i) === 1) {
            if (missionId === -1) {
                missionId = i;
            }
        }
    }
    // Fallback choice
    if (missionId === -1) {
        missionId = tlDetails.length - 1;
    }

    curDate = seperateDateString(tlDetails[missionId].date);
    setCountdownBanner(getDaysLeft(curDate.day, curDate.month, curDate.year), tlDetails[missionId].header);
    $("#main-countdown-date").html("วันที่ " + curDate.day + " " + monthThaiName[curDate.month] + " " + (curDate.year + 543));

    // Make panel scrollable
    resizeItems();
    $(window).resize(resizeItems);

    $(".timeline-panel").scrollTop(Math.max(0, $("#tl_" + missionId).position().top - 160));
});