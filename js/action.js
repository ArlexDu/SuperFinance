var rotation ;
var move;//点击菜单下降的距离
var time = 0.6;//设置动画移动时间
var down;//第一次点击要下落
var radius_change = 5;//每一帧半径的变化
var icon_radius = 40; //每一帧图标大小的变化
var icon_stop = false;
//银行图标目标移动角度
var stop = false;
$(function () {
    $(".icons").click(function () {
        changestatus();
    });
    $("#logo").click(function () {
        window.location = "http://localhost:62754/";
    })
});

function getRotation(id) {
    var matrix = $(id).css("transform");
    var sin = matrix.split(",")[1];
    var radian = Math.asin(sin);
    return radians2degree(radian);
}

function changestatus() {
    //按钮区域平移下降
    stop = false;
    changey = (windows_height - 100 - ($("#inner").css("top").split("px")[0]) * 1.0) / (time / 0.03);
    changeypostion();
    changeicons();
}

function changeypostion() {
    //目标减到环形圆球的半径是80 之前是440所以每一帧变化是16 半径每帧变化是8
    var newwidth = ($("#bank").css("width").split("px")[0]) * 1.0 - radius_change*2;
    var newy = $("#bank").position().top + changey + radius_change;
    var newx = ($("#bank").css("left").split("px")[0]) * 1.0 + radius_change;
    if (!icon_stop) {
        radius = radius - radius_change;
        icon_radius = icon_radius - 1;
        //console.log("radius is " + radius);
        //console.log("width is " + newwidth);
        $("#bank").css({
            "top": newy + "px",
            "left": newx + "px",
            "width": newwidth + "px",
            "height": newwidth + "px"
        });
        iconSize(abc);
        iconSize(boc);
        iconSize(ccb);
        iconSize(icbc);
    }
    newy = ($("#inner").css("top").split("px")[0]) * 1.0 + changey;
    newx = ($("#inner").css("left").split("px")[0]) * 1.0 + 3;
    newwidth = ($("#inner").css("width").split("px")[0]) * 1.0 -6;
    $("#inner").css({
        "top": newy + "px",
        "left":newx + "px",
        "width": newwidth + "px",
        "height":newwidth + "px"
    });
    newy = ($("#logo").css("top").split("px")[0]) * 1.0 + changey - 1.5;
    newx = ($("#logo").css("left").split("px")[0]) * 1.0 + 1.5;
    newwidth = ($("#logo").css("width").split("px")[0]) * 1.0 - 3;
    $("#logo").css({
        "top": newy + "px",
        "left": newx + "px",
        "width": newwidth + "px",
        "height": newwidth + "px"
    });
    //console.log("newy is "+newy);
    if (newy < (windows_height - 80)) {
        setTimeout(changeypostion, 30);
    }
}

function iconSize(id) {
    var newwidth = ($(id).css("width").split("px")[0]) * 1.0 - 2;
    $(id).css({
        "width": newwidth + "px",
        "height": newwidth + "px"
    });
}

function changeicons() {
    // radius is 220
  
    //银行图片的旋转
    var angles = targetangle();
    //abc的位置变化
    var abc_step = (angles[0] - 180) / (time / 0.03);
    changeIcon(0, angles[0],180,abc_step,"abc");
    //icbc的位置变化
    var icbc_step = (angles[1] - 90) / (time / 0.03);
    changeIcon(0, angles[1], 90, icbc_step, "icbc");
    //boc的位置变化
    var boc_step = (angles[2] - 0) / (time / 0.03);
    changeIcon(0, angles[2], 0, boc_step, "boc");
    //ccb的位置变化
    var ccb_step = (angles[3] + 90) / (time / 0.03);
    //console.log("target ccb is " + angles[3]);
    //console.log("change ccb is " + abc_step);
    changeIcon(0, angles[3], -90, ccb_step, "ccb");
}

//改变银行图标的位置
function changeIcon(change,target,origin,step,name) {
    change = change + step;
    if (change > (target - origin)) {//处理最后一帧的位置
        var currentx = radius + Math.cos(degree2radians(target-origin)) * Math.cos(degree2radians(origin)) * radius - Math.sin(degree2radians(target-origin)) * Math.sin(degree2radians(origin)) * radius - icon_radius;
        var currenty = radius + Math.sin(degree2radians(origin)) * Math.cos(degree2radians(target - origin)) * radius + Math.cos(degree2radians(origin)) * Math.sin(degree2radians(target - origin)) * radius - icon_radius;
        var execute = name + ".css({\"position\": \"absolute\", \"left\": " + currentx + ", \"top\": " + currenty + " });";
        console.log(name + "stop radius is " + radius + " icon_radius is " + icon_radius);
        icon_stop = true;
        eval(execute);
    } else {
        var currentx = radius + Math.cos(degree2radians(change)) * Math.cos(degree2radians(origin)) * radius - Math.sin(degree2radians(change)) * Math.sin(degree2radians(origin)) * radius - icon_radius;
        var currenty = radius + Math.sin(degree2radians(origin)) * Math.cos(degree2radians(change)) * radius + Math.cos(degree2radians(origin)) * Math.sin(degree2radians(change)) * radius - icon_radius;
        var execute = name + ".css({\"position\": \"absolute\", \"left\": " + currentx + ", \"top\": " + currenty + " });";
        // console.log(execute);
        eval(execute);
  //     console.log("changeIcon(" + change + "," + target + "," + origin + "," + step + ", \"" + name + "\")");
       setTimeout("changeIcon("+change+","+target+","+origin+","+step+",\""+name+"\")", 30);
    }
}
function targetangle() {
    var abc_angle = parseInt(radians2degree(Math.atan(-40 / radius))) + 360;
 //   console.log("angle is " + parseInt(radians2degree(Math.atan(-40 / radius))));
    var icbc_angle = 315;
    var boc_angle = 225;
    var ccb_angle = 180 - parseInt(radians2degree(Math.atan(-40 / radius)));
    return [abc_angle, icbc_angle,boc_angle,ccb_angle];
}