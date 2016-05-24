var abc;
var boc;
var ccb;
var icbc;
var windows_height;
var windows_width;
var bank_zoom;
var bank_to_circle = 200;
$(document).ready(function () {
    //  console.log("execute begin");
    abc = $("#abc");
    boc = $("#boc");
    ccb = $("#ccb");
    icbc = $("#icbc");
    init();
});
$(window).resize(function () {
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
    center(".inner");
    center(".outter");
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
    abc.css({
        "position": "absolute",
        "left": (bank_zoom - $(".inner").outerWidth() * 1.5 - bank_to_circle) / 2,
        "top": (bank_zoom - abc.outerHeight()) / 2,
    });
    boc.css({
        "position": "absolute",
        "right": (bank_zoom - $(".inner").outerWidth() * 1.5 - bank_to_circle) / 2,
        "top": (bank_zoom - boc.outerHeight()) / 2
    });
    ccb.css({
        "position": "absolute",
        "left": (bank_zoom - ccb.outerWidth()) / 2,
        "top": (bank_zoom - $(".inner").outerHeight() * 1.5 - bank_to_circle) / 2
    });
    icbc.css({
        "position": "absolute",
        "left": (bank_zoom - icbc.outerWidth()) / 2,
        "bottom": (bank_zoom - $(".inner").outerHeight() * 1.5 - bank_to_circle) / 2
    });
    setTimeout(function () { abc.fadeIn(700) }, 4000);
    setTimeout(function () { ccb.fadeIn(700) }, 4300);
    setTimeout(function () { boc.fadeIn(700) }, 4600);
    setTimeout(function () { icbc.fadeIn(700) }, 4900);
}