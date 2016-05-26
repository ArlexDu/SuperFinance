var abc;
var boc;
var ccb;
var icbc;
var windows_height;
var windows_width;
var bank_zoom;
var distance = 30;
var radius; //图标距离圆心的半径
$(document).ready(function () {
    //  console.log("execute begin");
    abc = $("#abc");
    boc = $("#boc");
    ccb = $("#ccb");
    icbc = $("#icbc");
    init();
});
function init() {
    windows_height = $(window).height();
    windows_width = $(window).width();
    bank_zoom = $("#bank").width();
    $("body").css({
        "height": windows_height,
        "width": windows_width
    });
    center("#logo");
    center("#inner");
    center("#outter");
    center("#bank");
    setbank();
}
//居中响应的div
function center(id) {
    $(id).css({
        "position": "absolute",
        "left": (windows_width - $(id).outerWidth()) / 2,
        "top": (windows_height - $(id).outerHeight()) / 2
    });
}

//设置银行图标位置
function setbank() {
    radius = abc.width() / 2 + distance + $("#inner").outerWidth() * 1.5 / 2;
    //console.log("radius is "+radius);
    abc.css({
        "position": "absolute",
        "left": bank_zoom/2 - radius -40 ,
        "top": bank_zoom / 2 -40
    });
    boc.css({
        "position": "absolute",
        "left": bank_zoom/2 +radius - 40,
        "top": bank_zoom/2 - 40
    });
    ccb.css({
        "position": "absolute",
        "left": bank_zoom/2 - 40,
        "top": bank_zoom/2 - radius -40
    });
    icbc.css({
        "position": "absolute",
        "left": bank_zoom/2 - 40,
        "top": bank_zoom/2 + radius -40
    });
    setTimeout(function () { abc.fadeIn(700) }, 4000);
    setTimeout(function () { ccb.fadeIn(700) }, 4300);
    setTimeout(function () { boc.fadeIn(700) }, 4600);
    setTimeout(function () { icbc.fadeIn(700) }, 4900);
    setTimeout("removeBuilding()", 5000);
}

function radians2degree(radians) {
    return (180 / Math.PI * radians);
}

function degree2radians(degree) {
    return (Math.PI / 180 * degree);
}

function removeBuilding() {
    $("#abc_bank").css({
        "opacity": "1"
    });
    $("#abc_building").css({
        "display":"none"
    });
    $("#boc_bank").css({
        "opacity": "1"
    });
    $("#boc_building").css({
        "display": "none"
    });
    $("#ccb_bank").css({
        "opacity": "1"
    });
    $("#ccb_building").css({
        "display": "none"
    });
    $("#icbc_bank").css({
        "opacity": "1"
    });
    $("#icbc_building").css({
        "display": "none"

    });
}
