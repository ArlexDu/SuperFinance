var rotation ;
var move;//点击菜单下降的距离
var time = 0.5;//设置动画移动时间
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
    var newy = $("#bank").position().top + changey;
    $("#bank").css({
        "top": newy + "px"
    });
    newy = ($("#inner").css("top").split("px")[0]) * 1.0 + changey;
    $("#inner").css({
        "top": newy + "px",
        "transform": "roate(23deg)",
        "-transform": "roate(23deg)",
        "-o-transform":"rotate(23deg)",
        "-moz-transform":"rotate(23deg)"
    });
    newy = ($("#logo").css("top").split("px")[0]) * 1.0 + changey;
    $("#logo").css({
        "top": newy + "px"
    });
    //console.log("newy is "+newy);
    if (newy < (windows_height - 100)) {
        setTimeout(changeypostion, 30);
    }
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
    changeIcon(0, angles[3], -45, ccb_step, "ccb");
}

//改变银行图标的位置
function changeIcon(change,target,origin,step,name) {
    change = change+ step;
    if (change > (target - origin)) {//处理最后一帧的位置
        var currentx = radius + Math.cos(degree2radians(target-origin)) * Math.cos(degree2radians(origin)) * radius - Math.sin(degree2radians(target-origin)) * Math.sin(degree2radians(origin)) * radius - 60;
        var currenty = radius + Math.sin(degree2radians(origin)) * Math.cos(degree2radians(target-origin)) * radius + Math.cos(degree2radians(origin)) * Math.sin(degree2radians(target-origin)) * radius - 60;
        var execute = name + ".css({\"position\": \"absolute\", \"left\": " + currentx + ", \"top\": " + currenty + " });";
        // console.log(execute);
        eval(execute);
    } else {
        var currentx = radius + Math.cos(degree2radians(change)) * Math.cos(degree2radians(origin)) * radius - Math.sin(degree2radians(change)) * Math.sin(degree2radians(origin)) * radius - 60;
        var currenty = radius + Math.sin(degree2radians(origin)) * Math.cos(degree2radians(change)) * radius + Math.cos(degree2radians(origin)) * Math.sin(degree2radians(change)) * radius - 60;
        var execute = name + ".css({\"position\": \"absolute\", \"left\": " + currentx + ", \"top\": " + currenty + " });";
        // console.log(execute);
        eval(execute);
  //     console.log("changeIcon(" + change + "," + target + "," + origin + "," + step + ", \"" + name + "\")");
       setTimeout("changeIcon("+change+","+target+","+origin+","+step+",\""+name+"\")", 30);
    }
}
function targetangle() {
    var abc_angle = parseInt(radians2degree(Math.atan(-40 / radius))) + 360;
    console.log("angle is " + parseInt(radians2degree(Math.atan(-40 / radius))));
    var icbc_angle = 315;
    var boc_angle = 225;
    var ccb_angle = 180 - parseInt(radians2degree(Math.atan(-40 / radius)));
    return [abc_angle, icbc_angle,boc_angle,ccb_angle];
}